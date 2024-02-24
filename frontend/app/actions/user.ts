"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import cookie from "cookie";

import { ActionResponse, axiosInstance } from ".";

export const login = async (
  _prevState: any,
  formData: FormData,
): Promise<ActionResponse> => {
  try {
    const response = await axiosInstance.post("/login", {
      email: formData.get("email"),
      userPw: formData.get("password"),
    });

    const apiCookie = response.headers["set-cookie"];
    if (!apiCookie) {
      return {
        status: 500,
        data: "서버와의 통신 중 오류가 발생했습니다.",
      };
    }

    const parsedCookie = cookie.parse(apiCookie[1]);
    cookies().set("JSESSIONID", parsedCookie["JSESSIONID"], {
      path: "/",
      maxAge: Number(parsedCookie["Max-Age"]),
      expires: new Date(parsedCookie["Expires"]),
      httpOnly: true,
      secure: true,
    });
    revalidatePath("/", "layout");
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        data: error.response?.data,
        status: error.response?.status || 500,
      };
    } else {
      return {
        status: 500,
        data: "서버와의 통신 중 오류가 발생했습니다.",
      };
    }
  }
};

export const signup = async (
  isCheck: boolean,
  isVerified: boolean,
  email: string,
  formData: FormData,
): Promise<ActionResponse> => {
  if (!isCheck) {
    return {
      status: 400,
      data: "약관에 동의해주세요.",
    };
  }
  if (!isVerified) {
    return {
      status: 400,
      data: "이메일 인증을 진행해주세요.",
    };
  }
  if (formData.get("password") !== formData.get("confirmPassword")) {
    return {
      status: 400,
      data: "비밀번호가 일치하지 않습니다.",
    };
  }

  try {
    await axiosInstance.post("/user", {
      email: email,
      nickname: formData.get("nickname"),
      userPw: formData.get("password"),
    });

    return {
      status: 201,
      data: "회원가입이 완료되었습니다.",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.errorCode === 40910) {
        return {
          status: 409,
          data: "중복된 닉네임입니다.",
        };
      } else if (error.response?.data.errorCode === 40920) {
        return {
          status: 409,
          data: "중복된 이메일입니다.",
        };
      } else if (error.response?.status === 400) {
        return {
          status: 400,
          data: error.response?.data,
        };
      }
    }

    return {
      status: 500,
      data: "서버와의 통신 중 오류가 발생했습니다.",
    };
  }
};
