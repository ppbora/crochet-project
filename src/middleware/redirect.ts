import type { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/config-env.ts";


const ACCESS_SECRET_KEY=env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY=env.REFRESH_SECRET_KEY;

export const redirectOAUTH2 = (req:Request, res:Response)=>{
    try{
        const user = req.user

        if (!user) {
            return res.status(401).send({ error: "User not authenticated" });
        }

        const jwtPayload = {
            id: user.id,           // Use this for database lookups
            username: user.username // Use this for frontend display
        };

        const accessToken = jwt.sign( jwtPayload, ACCESS_SECRET_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign( jwtPayload, REFRESH_SECRET_KEY, { expiresIn: '30d' });
        if (refreshToken) {
            res.cookie('refreshToken', refreshToken,{
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
            })
        }
        return res.status(200).send({ 
                message: "Login successful!",
                accessToken: accessToken
        });
    } catch(err){
        console.error("Login Server Error: ", err);
        res.status(500).json({ error: "Server error" });
    }
};