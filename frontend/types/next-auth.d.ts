import { User } from "@/interfaces/user";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
