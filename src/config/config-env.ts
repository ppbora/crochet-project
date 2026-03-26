import { configDotenv } from 'dotenv';
import path from 'path';

configDotenv({ path: path.resolve(import.meta.dirname, '../../.env') });
//PORT
const port = process.env.PORT || '8080'
if (!port) {
    throw new Error (`Error: Please specify the port`)
}


//MONGODB
export const mongoDB = process.env.MONGO_DB
if (!mongoDB) {
    throw new Error (`Error: Please specify the MongoDB URL`)
}

//constants .env
const env = {
    PORT: parseInt(port, 10),
    MONGO_DB: mongoDB
};

export default env;

//Pascal : ConfigDotEnv
//snake : pus_fdlsk