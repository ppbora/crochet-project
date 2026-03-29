import {Router, type Request, type Response} from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../db/schemas/users-schemas.ts"
import { loginSchema } from "../../utils/validation-schemas.ts";
import { checkSchema, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import env from "../../config/config-env.ts";

const router=Router();
const ACCESS_SECRET_KEY=env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY=env.REFRESH_SECRET_KEY;

router.post("/api/login", checkSchema(loginSchema),async(req:Request,res:Response)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty)
        return res.status(400).json({ errors: errors.array() });
    try {
        const { username, password } = req.body;
        const findUser = await UserModel.findOne({username});

        if(!findUser) return res.status(401).send({error: "This username is not existed"});
        const matchPassword = await bcrypt.compare(password, findUser.password);

        if (matchPassword) {
            const accessToken = jwt.sign({ username }, ACCESS_SECRET_KEY, { expiresIn: '30m' });
            const refreshToken = jwt.sign({ username }, REFRESH_SECRET_KEY, { expiresIn: '30d' });
            findUser.refreshToken = refreshToken;
            await findUser.save();

            return res.status(200).send({ 
                message: "Login successful!",
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } else{
            return res.status(401).json({ error: "Password is not corrected" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
