interface Property {
  value: string;
}

export interface ValidationError {
  isError: boolean;
  errMsg: string;
}

export type Info<T, K extends keyof T> = {
  [key in K]: Property & ValidationError;
};

const notError: ValidationError = {
  isError: false,
  errMsg: "",
};

export const validationNickname = (nickname?: string) => {
  if (!nickname || nickname.length < 2)
    return {
      isError: true,
      errMsg: "2글자 이상 입력해주세요.",
    };
  else if (nickname.length > 8) {
    return {
      isError: true,
      errMsg: "8글자 이하 입력해주세요.",
    };
  }

  return notError;
};

export const validationEmail = (email?: string) => {
  if (!email)
    return {
      isError: true,
      errMsg: "이메일을 입력해주세요.",
    };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email);

  if (!isValidEmail) {
    return {
      isError: true,
      errMsg: "유효하지 않은 이메일입니다.",
    };
  }

  return notError;
};

export const validationPassword = (password?: string) => {
  if (!password)
    return {
      isError: true,
      errMsg: "비밀번호를 입력해주세요.",
    };

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const isValidPassword = passwordRegex.test(password);

  if (!isValidPassword) {
    return {
      isError: true,
      errMsg: "형식에 맞지 않은 패스워드입니다.",
    };
  }

  return notError;
};

export const changeErrorInfo = <T, K extends keyof T>(
  info: Info<T, K>,
  name: K,
  isError: boolean,
  errMsg?: string,
): Info<T, K> => {
  const { [name]: updatedField } = info;

  const updatedInfo = {
    ...info,
    [name]: {
      ...updatedField,
      isError,
      errMsg: errMsg ? errMsg : info[name].errMsg,
    },
  };

  return updatedInfo;
};
