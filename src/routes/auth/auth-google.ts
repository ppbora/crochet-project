import '../../strategies/google-strategy.ts'
import { Router } from "express";
import passport from "passport";
import { redirectOAUTH2 } from '../../middleware/redirect.ts';

const router = Router();

router.get('/api/auth/google', passport.authenticate("google"));
router.get('/api/auth/google/redirect', passport.authenticate("google", {failureRedirect: '/api/auth/login'}), redirectOAUTH2);

export default router;