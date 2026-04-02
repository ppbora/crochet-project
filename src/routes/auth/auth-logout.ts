import {Router} from "express";
import UserModel from "../../db/schemas/users-schemas.ts";
 
const router=Router();

router.post("/api/auth/logout", async (req,res)=>{
    if (!req.cookies?.refreshToken) {
        res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.clearCookie('accessToken', { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        return res.status(204).send(); // 204 means "Success, but I have no data to send back"
    }    
    try{
        await UserModel.findOneAndUpdate(
                { refreshToken: req.cookies?.refreshToken }, 
                { refreshToken: "" });
        res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
        });
        res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
        });
        return res.status(200).send({
            msg: "logout successful",
            accessToken: req.cookies.accessToken
        })
    }catch(err){
        return res.status(500).send({error: "server error"})
    }
});

export default router;