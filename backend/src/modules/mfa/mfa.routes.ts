import { Router } from "express";
import { mfaController } from "./mfa.module";
import { authenticateJWT } from "../../common/strategies/jwt_strategies";

const mfaRoutes = Router();

mfaRoutes.get("/setup", authenticateJWT, mfaController.generateMFASetUp);
mfaRoutes.post("/verify", authenticateJWT, mfaController.verifyMFASetup);
mfaRoutes.put("/revoke", authenticateJWT, mfaController.revokeMFA);
mfaRoutes.post("/verify-login", mfaController.verifyMFALogin);

export default mfaRoutes;
