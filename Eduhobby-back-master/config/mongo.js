import { createMongoDBDataAPI } from "mongodb-data-api";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION, {
    dbName: 'test_db'
})
    .then(() => console.log('Connection success to MongoDB'))
    .catch((error) => console.log(error));


export const api = createMongoDBDataAPI({
    apiKey: process.env.MONGO_DATA_API_KEY,
    urlEndpoint: 'https://us-east-2.aws.data.mongodb-api.com/app/data-mglusqz/endpoint/data/v1'
});

const clusterA = api.$cluster('Eduhobby-cluster1');
const database = clusterA.$database('test_db');

const Database = {
    admin: database.$collection('admins'),
    professor: database.$collection('professors'),
    student: database.$collection('students'),
    professorRequest: database.$collection('professorrequests'),
    course: database.$collection('courses'),
    videoMetadata: database.$collection('videometadatas'),
    imageMetadata: database.$collection('imagemetadatas'),
    courseCont: database.$collection('contents'),
    subscription: database.$collection('subcriptions'),
    $collection: (collection) => database.$collection(collection),
};

export default Database;