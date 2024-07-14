[Route("api/[controller]")]
[ApiController]
public class OsobaController : ControllerBase
{
    private readonly GoogleCloudStorageService _storageService;
    private DataContext context { get; set; }

    public OsobaController(GoogleCloudStorageService storageService, DataContext context)
    {
        _storageService = storageService;
        this.context = context;
    }

    [HttpPost("upload")]
    [Authorize(Roles ="Admin,Manager,Kuvar,Konobar,Sanker,Musterija")]
    public async Task<IActionResult> UploadImage(IFormFile file,[FromBody]int id)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var fileName = Path.GetFileName(file.FileName);
        using var stream = file.OpenReadStream();
        
        var url = await _storageService.UploadFileAsync(stream, fileName);

        var o = await context.Users.FindAsync(id);
            if (o != null)
            {
              o.SlikaUrl = url;
              await context.SaveChangesAsync();
            }

        return Ok(new { Url = url });
    }
}
