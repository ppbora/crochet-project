import passport from "passport";
import {Strategy} from 'passport-google-oauth20';
import env from "../config/config-env.ts";
import UserModel from "../db/schemas/users-schemas.ts";

const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;

passport.use(
    new Strategy ({
        clientID: '719281420110-5lan736s3j7eqdkm35ebt3c61du3kamn.apps.googleusercontent.com',
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/google/redirect',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
        scope:['profile','email'] 
    }, async (accessToken, refreshToken, profile, done)=>{
        let findUser ;
        try{ 
            findUser = await UserModel.findOne({googleId: profile.id});
        } catch(err){
            return done(err);
        }

        try{
            if(!findUser) {
                const googleName = profile.displayName || null
                const newUser = new UserModel({
                    username: googleName, 
                    googleId: profile.id,
                    login: "google",
                })
                const newSavedUser = await newUser.save();
                return done(null, newSavedUser as Express.User);
            }
            return done (null, findUser as Express.User)
        } catch(err){
            console.log(err);
            return done(err);
        }
    })
)