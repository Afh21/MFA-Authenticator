import { add } from "date-fns";

export const thirtyDaysFromNow = (): Date =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const fortyFiveMinutesFromNow = (): Date => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  return now;
};

export const calculateExpirationDate = (expiresIn: string = "15m"): Date => {
  const match = expiresIn.toString().match(/^(\d+)([mhd])$/);
  if (!match) {
    throw new Error("Invalid format. Use 'm', 'h' or 'd' suffix");
  }
  const [, value, unit] = match;
  const expirationDate = new Date();

  switch (unit) {
    case "m":
      return add(expirationDate, { minutes: parseInt(value) });
    case "h":
      return add(expirationDate, { hours: parseInt(value) });
    case "d":
      return add(expirationDate, { days: parseInt(value) });
    default:
      throw new Error("Invalid format. Use 'm', 'h' or 'd' suffix");
  }
};

export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const anHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);

export const threeMinutesAgo = (): Date => new Date(Date.now() - 3 * 60 * 1000);

export const tenMinutesAgo = (): Date => new Date(Date.now() - 10 * 60 * 1000);
