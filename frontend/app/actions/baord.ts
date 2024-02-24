"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ActionResponse, axiosInstance } from ".";

export const addBoard = async (
  algorithmId: number,
  boardType: number | string,
  content: string,
  formData: FormData,
): Promise<ActionResponse | undefined> => {
  if (content.trim() === "" || content.trim().length < 10) {
    return {
      status: 400,
      data: "내용을 10자 이상 입력해주세요.",
    };
  }

  let redirectUrl: string | undefined = undefined;

  try {
    await axiosInstance.post("/board", {
      algorithmId,
      boardType,
      content,
      title: formData.get("title"),
    });

    revalidatePath("/algorithm/[algorithmId]/*", "layout");
    redirectUrl = `/algorithm/${algorithmId}/all`;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        redirectUrl = `/login?error=unauthorized&redirect=/algorithm/${algorithmId}/new`;
      }

      return {
        data: error.response?.data,
        status: error.response?.status || 500,
      };
    } else {
      return { status: 500, data: "서버 오류가 발생했습니다." };
    }
  } finally {
    // try-catch redirect 버그로 인해 finally에서 redirect를 실행
    // https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }
};
