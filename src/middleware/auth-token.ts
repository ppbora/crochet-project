import type { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { MyTokenPayload } from "jsonwebtoken";
import env from "../config/config-env.ts";

export const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>
    if (!token) {
        res.send({ error: "Access Denied. No token provided." });
        return res.redirect('/api/auth/login');  
    }
    jwt.verify(token, env.ACCESS_SECRET_KEY, (err, decoded) => {
        const payload = decoded as MyTokenPayload;

        if (err || !decoded) return res.redirect('/api/auth/login');  
        if (req.user == undefined || req.user.id == undefined) {
            return res.status(401).send({ error: "User not authenticated" });
        }
        req.user = {
            id: payload.id,
            username: payload.username
        };
        next();
    });
};