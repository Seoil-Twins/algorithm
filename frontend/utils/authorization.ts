import { ErrorCode } from "@/app/api";

export const checkAuth = (errorCode: number) => {
  return (
    errorCode === ErrorCode.BLANK_COOKIE ||
    errorCode === ErrorCode.DELETED_USER ||
    errorCode === ErrorCode.INVALID_COOKIE
  );
};
