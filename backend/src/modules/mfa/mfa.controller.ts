import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { MFAService } from "./mfa.service";
import { HTTPSTATUS } from "../../config/http.config";
import {
  verifyMfaForLoginSchema,
  verifyMfaSchema,
} from "../../common/validators/mfa.validator";
import { setAuthenticationCookies } from "../../common/utils/cookie";

export class MFAController {
  private mfaService: MFAService;

  constructor(mfaService: MFAService) {
    this.mfaService = mfaService;
  }

  public generateMFASetUp = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { secret, qrImageUrl, message } =
        await this.mfaService.generateMFASetup(req);

      return res.status(HTTPSTATUS.OK).json({
        message,
        secret,
        qrImageUrl,
      });
    }
  );

  public verifyMFASetup = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code, secretKey } = verifyMfaSchema.parse({ ...req.body });
      const { message, userPreferences } = await this.mfaService.verifyMFASetup(
        req,
        code,
        secretKey
      );

      return res.status(HTTPSTATUS.OK).json({
        message,
        userPreferences,
      });
    }
  );

  public revokeMFA = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { message, userPreferences } = await this.mfaService.revokeMFA(req);

      return res.status(HTTPSTATUS.OK).json({
        message,
        userPreferences,
      });
    }
  );

  public verifyMFALogin = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { code, email, userAgent } = verifyMfaForLoginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],
      });

      const { user, accessToken, refreshToken } =
        await this.mfaService.verifyMFAForLogin(code, email, userAgent);

      return setAuthenticationCookies({ res, accessToken, refreshToken })
        .status(HTTPSTATUS.OK)
        .json({
          message: "Verified & login successfully",
          user,
        });
    }
  );
}
