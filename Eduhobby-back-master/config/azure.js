import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net`,
    new StorageSharedKeyCredential(
        process.env.ACCOUNT_NAME,
        process.env.ACCOUNT_KEY
    )
);
const blobService = blobServiceClient.getContainerClient(process.env.CONTANIER);

export { blobService };