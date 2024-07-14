using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<Osoba> _userManager;
    private readonly SignInManager<Osoba> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;
    public AuthController(
        UserManager<Osoba> userManager,
        SignInManager<Osoba> signInManager,
        RoleManager<IdentityRole> roleManager,
        IConfiguration configuration,
        ILogger<AuthController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        _logger.LogInformation("Login attempt for user {Username}", model.Username);
        if (model == null || string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
        {
            _logger.LogWarning("Username or Password not provided.");
            return BadRequest("Username or Password not provided.");
        }

        var user = await _userManager.FindByNameAsync(model.Username);
        if (user == null)
        {
            _logger.LogWarning("User {Username} not found.", model.Username);
            return Unauthorized();
        }

        if (!user.EmailConfirmed)
        {
            return BadRequest("Email not confirmed.");
        }

        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            _logger.LogWarning("Invalid password for user {Username}.", model.Username);
            return Unauthorized();
        }

        var token = GenerateJwtToken(user);
        _logger.LogInformation("Token generated for user {Username}", model.Username);
        
        var roles = await _userManager.GetRolesAsync(user);

        var userInfo = new 
        {
            Id = user.Id,
            Username = user.UserName,
            Email = user.Email,
            Roles = roles.First(),
            Token = token
        };

        return Ok(userInfo);
    }

    private string GenerateJwtToken(Osoba user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };

        var roles = _userManager.GetRolesAsync(user).Result;
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
            Console.WriteLine(role);
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);
        Console.WriteLine(token.ToString()); 

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        
        _logger.LogInformation("Registration attempt for user {Username}", model.Username);

        if (model == null || string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password))
        {
            _logger.LogWarning("Username or Password not provided.");
            return BadRequest("Username or Password not provided.");
        }

        var user = new Musterija { UserName = model.Username, Email = model.Email, Ime=model.Ime!, Prezime=model.Prezime!, 
        Pol=model.Pol, DatumRodjenja=model.DatumRodjenja, Grad=model.Grad, Adresa=model.Adresa , PhoneNumber=model.telefon};
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            if (!await _roleManager.RoleExistsAsync("Musterija"))
            {
                await _roleManager.CreateAsync(new IdentityRole("Musterija"));
            }

            await _userManager.AddToRoleAsync(user, "Musterija");
            _logger.LogInformation("User {Username} registered successfully.", model.Username);

            var token = GenerateJwtToken(user);
            _logger.LogInformation("Token generated for user {Username}", model.Username);
            var roles = await _userManager.GetRolesAsync(user);
    
            var userInfo = new 
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Roles = roles.First(),
                Token = token,
                message = "User registered successfully" 
            };

            await SendConfirmationEmail(user.Email!);
            

            return Ok(userInfo);
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return BadRequest(ModelState);
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
        var email = model.Email!.ToUpper();
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return BadRequest("User not found");
        }

        var result = await _userManager.ResetPasswordAsync(user, model.Token!, model.Password!);

        if (result.Succeeded)
        {
            return Ok("Password has been reset.");
        }

        return BadRequest("Error resetting password.");
    }

    [HttpGet("ConfirmEmail/{email}")]
    public async Task<ActionResult> ConfirmEmail(string email)
    {
        var user = await _userManager.FindByEmailAsync(email.ToUpper());
        if(user!=null)
        {
            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);

            return Ok("Success");
        }
        return BadRequest("Error occured");
    }

    [HttpPost("SendConfirmationEmail")]
    public async Task<ActionResult> SendConfirmationEmail(string m)
    {
        
        try
        {
            if (m == null)
            {
                return BadRequest("Invalid input data.");
            }

            if (string.IsNullOrEmpty(m))
            {
                return BadRequest("Email address is required.");
            }

            var user = await _userManager.FindByEmailAsync(m);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var confirmationLink = $"{_configuration["AppUrl"]}/ConfirmEmail?token={emailToken}&email={m}";

            var message = new MailMessage()
            {
                From=new MailAddress("apprestauration@gmail.com"),
                Subject="Verify your email",
                IsBodyHtml=true,
                Body= $"Please verify your account by clicking here: <a href='{confirmationLink}'>link</a>"
            };
            message.To.Add(new MailAddress(m!));

            var smtp=new SmtpClient("smtp.gmail.com")
            {
                Port=587,
                Credentials=new NetworkCredential("apprestauration@gmail.com", "jjwh xwny avnd drbw"),
                EnableSsl=true
            };

            smtp.Send(message);
            
            return Ok("Email poslat");
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public class LoginModel
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class RegisterModel
{
    [MaxLength(30)]
    public required string Ime { get; set; }
    [MaxLength(50)]
    public required string Prezime { get; set; }
    [RegularExpression("^(m|z|o)$", ErrorMessage = "Pol može biti 'm', 'z' ili 'o'.")]
    [MaxLength(1)]
    public string? Pol { get; set; }
    public DateOnly DatumRodjenja { get; set; }
    [MaxLength(100)]
    public string? Adresa { get; set; }
    [MaxLength(100)]
    public string? Grad { get; set; }
    public string? telefon {get;set;}
    [EmailAddress]
    public string? Email {get;set;}
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class ForgotPasswordModel
{
    [EmailAddress]
    public string? Email { get; set; }
}

public class ResetPasswordModel
{
    [EmailAddress]
    public string? Email { get; set; }
    public string? Token { get; set; }
    public string? Password { get; set; }
}

// public class DateOnlyJsonConverter: JsonConverter<DateOnly>
// {
//     private readonly string _format;

//     public DateOnlyJsonConverter(string format = "yyyy-MM-dd")
//     {
//         _format = format;
//     }

//     public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
//     {
//         var dateString = reader.GetString();
//         if (DateOnly.TryParseExact(dateString, _format, null, System.Globalization.DateTimeStyles.None, out var date))
//         {
//             return date;
//         }
//         throw new JsonException($"Unable to convert \"{dateString}\" to DateOnly.");
//     }

//     public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
//     {
//         writer.WriteStringValue(value.ToString(_format));
//     }
// }