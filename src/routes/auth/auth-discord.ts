import '../../strategies/discord-strategy.ts'
import { Router } from "express";
import passport from "passport";
import { redirectOAUTH2 } from '../../middleware/redirect.ts';

const router = Router();

router.get('/api/auth/discord', passport.authenticate("discord"));
router.get('/api/auth/discord/redirect', passport.authenticate("discord", {failureRedirect: '/api/auth/login'}), redirectOAUTH2);

export default router;