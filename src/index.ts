import express from "express";
import connectToDatabase from "./db/connection-Mongo.ts";

const app = express();

//DB and PORT
connectToDatabase();
