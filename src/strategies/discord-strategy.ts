import passport from "passport";
import {Strategy} from 'passport-discord';
import env from "../config/config-env.ts";
import UserModel from "../db/schemas/users-schemas.ts";

const DISCORD_CLIENT_SECRET = env.DISCORD_CLIENT_SECRET;

passport.use(
    new Strategy ({
        clientID: '1488774066725978262',
        clientSecret: DISCORD_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/discord/redirect',
        scope:["identify"] 
    }, async (accessToken, refreshToken, profile, done)=>{
        let findUser ;
        try{ 
            findUser = await UserModel.findOne({discordId: profile.id});
        } catch(err){
            return done(err);
        }

        try{
            if(!findUser) {

                const newUser = new UserModel({
                    username: profile.username, 
                    discordId: profile.id,
                    login: "discord",
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