using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using SightSeers.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace SightSeers.Core.Services
{
    public class BlobStorage : IBlobStorage
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobStorage()
        {
            _blobServiceClient = new BlobServiceClient("DefaultEndpointsProtocol=https;AccountName=hibook;AccountKey=0Fo2LNLycdLDR8Y8hJQFBtx+ugbn1RPN2rXBx0rQtJhWg4vFSHB7Y1LnG0L5n00FczThyB5tTxWY94+jkAKqLg==;EndpointSuffix=core.windows.net");
        }

        private BlobContainerClient GetContainerClient(string blobContainerName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(blobContainerName);
            containerClient.CreateIfNotExists(PublicAccessType.Blob);
            return containerClient;
        }

        public async Task<Uri> UploadFileBlobAsync(string blobContainerName, Stream content, string contentType, string fileName)
        {
            var containerClient = GetContainerClient(blobContainerName);
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(content, new BlobHttpHeaders { ContentType = contentType });

            return blobClient.Uri;
        }

        public async Task DeleteAsync(string fileName, string containerName)
        {
            var containerClient = GetContainerClient(containerName);
            BlobClient blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.DeleteAsync();
        }
    }
}
