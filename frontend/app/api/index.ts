export const FRONTEND_API_URL = "http://localhost:3000/api";
export const BACKEND_API_URL = "http://localhost:8080";

export class CustomException {
  status: number;
  errorCode: number;
  error: string;
  message: string;
  code: string;
  timestamp: string;

  constructor(
    status: number,
    errorCode: number,
    error: string,
    message: string,
    code: string,
    timestamp: string,
  ) {
    this.status = status;
    this.errorCode = errorCode;
    this.error = error;
    this.message = message;
    this.code = code;
    this.timestamp = timestamp;
  }
}

export const ErrorCode = {
  NOT_MATCH_PASSWORD: 40010,
  VERIFIED_EMAIL: 40020,
  EXPIRED_TIME_EMAIL: 40030,
  NOT_MATCH_VERIFY_CODE: 40040,
  BROKEN_IMAGE: 40050,
  INVALID_COOKIE: 40110,
  BLANK_COOKIE: 40120,
  NOT_VERIFIED_EMAIL: 40310,
  DELETED_USER: 40330,
  NOT_FOUND_USER: 40410,
  NOT_FOUND_BOARD_TYPE: 40470,
  NOT_FOUND_EMAIL_VERIFIED: 40480,
  DUPLICATE_PARAMETER_NICKNAME: 40910,
  DUPLICATE_PARAMETER_EMAIL: 40920,
  ERROR_EMAIL_SENDER: 50020,
  ERROR_IMAGE_UPLOAD: 50030,
} as const;

export const createNextApiError = (error: any) => {
  const response: CustomException = new CustomException(
    500,
    500,
    "Next API Error",
    error ? error : "알 수 없는 오류가 발생하였습니다.",
    "UNKNOWN ERROR",
    new Date(Date.now()).toString(),
  );

  return response;
};
