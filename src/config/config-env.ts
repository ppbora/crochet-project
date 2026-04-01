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

export const accessSecretKey = process.env.ACCESS_SECRET_KEY
if (!accessSecretKey) {
    throw new Error (`Error: Please specify the Secret Key`)
}

export const refreshSecretKey = process.env.REFRESH_SECRET_KEY
if (!refreshSecretKey) {
    throw new Error (`Error: Please specify the Secret Key`)
}

export const discordClientSecret = process.env.DISCORD_CLIENT_SECRET
if (!discordClientSecret) {
    throw new Error (`Error: Please specify the Dicord Client Secret`)
}
//constants .env
const env = {
    PORT: parseInt(port, 10),
    MONGO_DB: mongoDB,
    ACCESS_SECRET_KEY: accessSecretKey,
    REFRESH_SECRET_KEY: refreshSecretKey,
    DISCORD_CLIENT_SECRET: discordClientSecret    
};

export default env;

//Pascal : ConfigDotEnv
//snake : pus_fdlsk