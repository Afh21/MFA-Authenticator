import { NotFoundExceptcion } from "../../common/utils/catch-errors";
import SessionModel from "../../database/models/session.model";

export class SessionService {
  public async getAllSession(userId: string) {
    const sessions = await SessionModel.find(
      {
        userId,
        expiredAt: { $gt: Date.now() },
      },
      {
        _id: 1,
        userId: 1,
        userAgent: 1,
        createdAt: 1,
        expiredAt: 1,
      },
      {
        sort: {
          createdAt: -1,
        },
      }
    );

    return {
      sessions,
    };
  }

  public async getSessionById(sessionId: string) {
    const session = await SessionModel.findById(sessionId)
      .populate("userId")
      .select("-expiredAt");

    if (!sessionId) {
      throw new NotFoundExceptcion("Session ID not found");
    }

    return {
      user: session?.userId,
    };
  }

  public async deleteSessionById(sessionId: string, userId: string) {
    await SessionModel.findByIdAndDelete({
      _id: sessionId,
      userId,
    });

    if (!sessionId) {
      throw new NotFoundExceptcion("Session ID not found");
    }

    return;
  }
}
