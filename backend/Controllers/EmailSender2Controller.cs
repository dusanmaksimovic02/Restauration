namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class EmailSender2Controller : ControllerBase
{
    private readonly UserManager<Osoba> _userManager;
    private readonly IConfiguration _configuration;

    public EmailSender2Controller(UserManager<Osoba> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        this._configuration = configuration;
    }

    [HttpPost("SendEmail")]
    public async Task<ActionResult> SendEmail([FromBody] MailModel model)
    {
        
        try
        {
            if (string.IsNullOrEmpty(model.to))
            {
                return BadRequest("Email address is required.");
            }

            var user = await _userManager.FindByEmailAsync(model.to);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = HttpUtility.UrlEncode(token);
            var resetLink = $"{_configuration["AppUrl"]}/reset-password?token={encodedToken}&email={model.to}";

            var message = new MailMessage()
            {
                From=new MailAddress("apprestauration@gmail.com"),
                Subject="Reset password for Restauration",
                IsBodyHtml=true,
                Body= $"Please reset your password by clicking here: <a href='{resetLink}'>link</a>"
            };
            message.To.Add(new MailAddress(model.to));

            using (var smtp = new SmtpClient("smtp.gmail.com"))
            {
                smtp.Port=587;
                smtp.Credentials=new NetworkCredential("apprestauration@gmail.com", "jjwh xwny avnd drbw");
                smtp.EnableSsl=true;
                smtp.Send(message);
            };

            return Ok("Email poslat");
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("SendNotificationEmail")]
    public async Task<ActionResult> SendNotificationEmail(string m, int id)
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

            var link = $"{_configuration["AppUrl"]}/recenzije";

            var message = new MailMessage()
            {
                From=new MailAddress("apprestauration@gmail.com"),
                Subject="Narudzbina je spremna",
                IsBodyHtml=true,
                Body= $"Vasa narudzbina ({id}) je spremna! Uzivajte! Ocenite hranu i uslugu na sledecem linku: <a href='{link}'>link</a>"
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

public class MailModel 
{
    public string? to {get;set;}
    public string? subject {get;set;}
    public string? body {get;set;}
}