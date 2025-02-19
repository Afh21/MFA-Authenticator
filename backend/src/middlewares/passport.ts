import passport from "passport";
import { setupJWTStrategy } from "../common/strategies/jwt_strategies";

const initializePassport = () => {
  setupJWTStrategy(passport);
};

initializePassport();

export default passport;
