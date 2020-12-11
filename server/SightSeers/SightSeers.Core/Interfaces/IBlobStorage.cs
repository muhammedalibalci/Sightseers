using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace SightSeers.Core.Interfaces
{
    public interface IBlobStorage
    {
        Task DeleteAsync(string fileName, string containerName);

        Task<Uri> UploadFileBlobAsync(string blobContainerName, Stream content, string contentType, string fileName);
    }
}
