public class GoogleCloudStorageService
{
    private readonly StorageClient _storageClient;
    private readonly string _bucketName;

    public GoogleCloudStorageService(IConfiguration configuration)
    {
        var jsonKeyFilePath = configuration["GoogleCloud:JsonKeyFilePath"];
        _bucketName = configuration["GoogleCloud:BucketName"]!;
        _storageClient = StorageClient.Create(Google.Apis.Auth.OAuth2.GoogleCredential.FromFile(jsonKeyFilePath));
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName)
    {
        var objectName = Guid.NewGuid().ToString() + Path.GetExtension(fileName);
        await _storageClient.UploadObjectAsync(_bucketName, objectName, null, fileStream);
        return $"https://storage.googleapis.com/{_bucketName}/{objectName}";
    }
}
