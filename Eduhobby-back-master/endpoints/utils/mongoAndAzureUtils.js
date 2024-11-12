/**
 * Este archivo no contiene endpoints, son funciones que se encargan
 * de manejar los uploads a mongo. Las llamo usualmente desde otros
 * enpoints.
 */

import { BlobSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob/dist/index.js";
import { validateImageMetatadaSchema } from "../../schemas/metadata/imageMetadataSchema.js";
import { validateVideoMetatadaSchema } from "../../schemas/metadata/videoMetadataSchema.js";
import { containerClient, makeRequestToDB } from "../../server.js";

export const storeMetadata = async (filename, caption, filetype, isImage) => {
    if (!filename || !caption || !filetype) {
        throw new Exception('bruu, wrong data');
    }

    try {
        const validator = isImage ? validateVideoMetatadaSchema : validateImageMetatadaSchema;

        const metadata = {name: filename, caption, fileType: filetype};
        const newVideoMetadata = validator(metadata);
        if(!newVideoMetadata) {console.log(validator.errors); throw new Exception(`${validator.errors}`);};

        const collection = isImage ?
            makeRequestToDB.$collection('imagemetadatas') :
            makeRequestToDB.$collection('videometadatas');

        const response = await collection.insertOne({
            document: {
                ...metadata,
                creationDate: { $date: new Date(metadata.creationDate).toISOString() }
            }
        });
        if (!response) throw new Exception('Error inserting metadata');

        return response.insertedId;
    } catch (error) {
        console.log(error);
        throw new Exception('error uploading metadata');
    }
};

export async function uploadStream(blobName, dataStream, mimeType, length, isImage) {
    
    const fileName = isImage ? `categoryImages/${blobName}` : blobName;

    const blobClient = containerClient.getBlockBlobClient(fileName);
    
    await blobClient.uploadStream(dataStream, length, undefined, {
        blobHTTPHeaders: {
            blobContentType: mimeType
        }
    });
    return blobClient.url;
}

export function getSasUrl(blobName) {
    const blobSASPermissions = new BlobSASPermissions();
    blobSASPermissions.read = true;
            
    const sasToken = generateBlobSASQueryParameters(
        {
            containerName: process.env.CONTANIER,
            blobName,
            permissions: blobSASPermissions,
            expiresOn: new Date(Date.now() + (3600 * 1000)),
        },
        new StorageSharedKeyCredential(
            process.env.ACCOUNT_NAME,
            process.env.ACCOUNT_KEY
        )
    ).toString();
              
    const sasUrl = `https://${process.env.ACCOUNT_NAME}.blob.core.windows.net/${process.env.CONTANIER}/${blobName}?${sasToken}`;
    console.log(sasUrl);
    return sasUrl;
}


