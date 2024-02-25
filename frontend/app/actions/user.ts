"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import cookie from "cookie";
import { redirect } from "next/navigation";

import { ActionError, ActionResponse, axiosInstance, errorHandler } from ".";
import { PageOptions, RequestNotification, User } from "@/types/user";
import {
  validationEmail,
  validationNickname,
  validationPassword,
} from "@/utils/validation";

export const getUser = async (): Promise<
  ActionResponse<User> | ActionError
> => {
  try {
    const response = await axiosInstance.get<User>("/user/me");
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getUserSNSInfo = async (
  userId: string | number,
): Promise<ActionResponse | ActionError> => {
  try {
    const response = await axiosInstance.get(`/user/link/${userId}`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getUserSolved = async () => {
  try {
    const response = await axiosInstance.get("/user/mypage/solved");
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getMyQuestions = async (data: PageOptions) => {
  try {
    const response = await axiosInstance.get("/user/mypage/question", {
      params: data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getMyFrees = async (data: PageOptions) => {
  try {
    const response = await axiosInstance.get("/user/mypage/free", {
      params: data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getMyFeedbacks = async (data: PageOptions) => {
  try {
    const response = await axiosInstance.get("/user/mypage/feedback", {
      params: data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getMyFavorites = async (data: PageOptions) => {
  try {
    const response = await axiosInstance.get("/user/mypage/favorite", {
      params: data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getMyComments = async (data: PageOptions) => {
  try {
    const response = await axiosInstance.get("/user/mypage/comment", {
      params: data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getMyAnswers = async (data: PageOptions) => {
  try {
    const response = await axiosInstance.get("/user/mypage/answer", {
      params: data,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getNotifications = async () => {
  try {
    const response = await axiosInstance.get(`/user/notification`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const updateNotifications = async (
  userId: number | string,
  data: RequestNotification,
) => {
  try {
    const response = await axiosInstance.patch(`/user/nofi/${userId}`, data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const login = async (
  _prevState: any,
  formData: FormData,
): Promise<ActionResponse | ActionError> => {
  const validatedEmail = validationEmail(String(formData.get("email")));
  const validatedPassword = validationPassword(
    String(formData.get("password")),
  );
  if (validatedEmail.isError) {
    return {
      status: 400,
      data: validatedEmail.errMsg,
    };
  }
  if (validatedPassword.isError) {
    return {
      status: 400,
      data: validatedPassword.errMsg,
    };
  }

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

export const logout = async (): Promise<ActionResponse | ActionError> => {
  const response = await axiosInstance.post("/logoutee");

  cookies().delete(
    (process.env.NEXT_PUBLIC_SESSION_KEY as string) || "JSESSIONID",
  );
  return {
    status: response.status,
    data: response.data,
  };
};

export const signup = async (
  isCheck: boolean,
  isVerified: boolean,
  email: string,
  formData: FormData,
): Promise<ActionResponse | ActionError> => {
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

  const validatedNickname = validationNickname(
    String(formData.get("nickname")),
  );
  const validatedEmail = validationEmail(email);
  const validatedPassword = validationPassword(
    String(formData.get("password")),
  );
  if (validatedNickname.isError) {
    return {
      status: 400,
      data: validatedNickname.errMsg,
    };
  }
  if (validatedEmail.isError) {
    return {
      status: 400,
      data: validatedEmail.errMsg,
    };
  }
  if (validatedPassword.isError) {
    return {
      status: 400,
      data: validatedPassword.errMsg,
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

export const sendVerifyCode = async (data: {
  email: string;
}): Promise<ActionResponse | ActionError> => {
  const validatedEmail = validationEmail(data.email);
  if (validatedEmail.isError) {
    return {
      status: 400,
      data: validatedEmail.errMsg,
    };
  }

  try {
    const response = await axiosInstance.post("/user/verify/send", data);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const compareVerifyCode = async (data: {
  email: string;
  verifyCode: string;
}): Promise<ActionResponse | ActionError> => {
  try {
    const response = await axiosInstance.post("/user/verify/compare", data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const updateProfileUser = async (
  isVerified: boolean,
  isChangeEmail: boolean,
  isChangeNickname: boolean,
  email: string,
  formData: FormData,
): Promise<ActionResponse<User> | ActionError | undefined> => {
  if (isChangeEmail && !isVerified) {
    return {
      status: 400,
      data: "이메일 인증을 진행해주세요.",
    };
  }

  const validatedNickname = validationNickname(
    String(formData.get("nickname")),
  );
  const validatedEmail = validationEmail(email);
  if (isChangeNickname && validatedNickname.isError) {
    return {
      status: 400,
      data: validatedNickname.errMsg,
    };
  }
  if (isChangeEmail && validatedEmail.isError) {
    return {
      status: 400,
      data: validatedEmail.errMsg,
    };
  }

  let redirectUrl = undefined;

  try {
    const response = await axiosInstance.patch<User>(
      `/user/${formData.get("userId")}`,
      {
        email: isChangeEmail ? email : undefined,
        nickname: isChangeNickname ? formData.get("nickname") : undefined,
      },
    );

    revalidatePath("/", "layout");
    return {
      status: 200,
      data: response.data,
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
      } else if (error.response?.status === 401) {
        redirectUrl = "/login?error=unauthorized&redirect_url=/account";
      }
    } else {
      return {
        status: 500,
        data: "서버와의 통신 중 오류가 발생했습니다.",
      };
    }
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }
};

export const updateProfileImg = async (
  userId: number | string,
  data: { image: File },
) => {
  try {
    const response = await axiosInstance.patchForm(
      `/user/profile/${userId}`,
      data,
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteUser = async (
  isCheck: boolean,
  userId: number | string,
): Promise<ActionResponse | ActionError | undefined> => {
  if (!isCheck) {
    return {
      status: 400,
      data: "회원 탈퇴에 동의해주세요.",
    };
  }

  let redriectUrl = undefined;

  try {
    await axiosInstance.delete(`/user/${userId}`);
    revalidatePath("/", "layout");
    return {
      status: 200,
      data: "회원 탈퇴가 완료되었습니다.",
    };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      redriectUrl = "/login?error=unauthorized&redirect_url=/account";
    } else {
      return {
        status: 500,
        data: "서버와의 통신 중 오류가 발생했습니다.",
      };
    }
  } finally {
    if (redriectUrl) {
      redirect(redriectUrl);
    }
  }
};
