import { SessionOptions } from "iron-session";

export interface SessionData {
  sessionId: string | undefined;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PW!.toString(),
  cookieName: "sessionId",
  cookieOptions: {
    secure: process.env.ENVIROMENT === "product" ? true : false,
  },
};
