namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = "RequireAdminRole")]
public class AdminController : ControllerBase
{

    private DataContext context { get; set; }
    public AdminController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet("GetAdminById/{id}")]
    public async Task<ActionResult<Admin>> GetAdminById(string id)
    {
        try
        {
            var admin = await context.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception
                ($"Admin sa zadatim id { id } ne postoji u bazi");

            return Ok(admin);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}