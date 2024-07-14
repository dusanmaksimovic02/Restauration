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
}