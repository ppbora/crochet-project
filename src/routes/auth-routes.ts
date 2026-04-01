import {Router} from "express";
import loginRoute from "./auth/auth-login.ts";
import regisRoute from "./auth/auth-regis.ts";
import refreshRoute from "./auth/auth-refresh.ts";
import logoutRoute from "./auth/auth-logout.ts";
import discordRoute from "./auth/auth-discord.ts"

const router=Router();

router.use(loginRoute);
router.use(regisRoute);
router.use(refreshRoute);
router.use(logoutRoute);
router.use(discordRoute)


export default router;