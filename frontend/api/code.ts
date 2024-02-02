import Code from "@/interfaces/code";
import Comment from "@/interfaces/comment";
import { RequiredUser } from "@/interfaces/user";

export type ResponseAnswerItem = {
  user: RequiredUser;
  comments: Pick<Comment, "commentId" | "user" | "content" | "createdTime">[];
} & Pick<Code, "codeId" | "code" | "type" | "recommend" | "createdTime">;

export interface ResponseAnswer {
  answers: ResponseAnswerItem[];
  total: number;
}

export interface PageOptions {
  count: number;
  page: number;
}

export const getAnswer = async (
  language: string,
  options: PageOptions,
): Promise<ResponseAnswer> => {
  console.log(language, options);

  return {
    answers: [
      {
        codeId: 33,
        user: {
          userId: 1,
          nickname: "답변왕",
        },
        code: `<pre><code class="language-typescript">export const getTimeAgo = (dateString: string): string =&gt; {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate.getTime() - inputDate.getTime()) / 1000,
  );

  if (timeDifferenceInSeconds &lt; 60) {
    return \`\${timeDifferenceInSeconds}초전\`;
  } else if (timeDifferenceInSeconds &lt; 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return \`\${minutesAgo}분전\`;
  } else if (timeDifferenceInSeconds &lt; 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return \`\${hoursAgo}시간전\`;
  } else if (timeDifferenceInSeconds &lt; 2592000) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return \`\${daysAgo}일전\`;
  } else if (timeDifferenceInSeconds &lt; 31536000) {
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return \`\${monthsAgo}달전\`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return \`\${yearsAgo}년전\`;
  }
};</code></pre>`,
        type: 3001,
        comments: [
          {
            commentId: 1,
            user: {
              userId: 1,
              nickname: "태클걸러옴",
            },
            content: " 이렇게 푸는거 아닌데 ㅋ ",
            createdTime: "2023-12-12 12:12:12",
          },
          {
            commentId: 2,
            user: {
              userId: 33,
              nickname: "태클걸러옴",
            },
            content: " 이렇게 푸는거 아닌데 ㅋ ",
            createdTime: "2023-12-12 12:12:12",
          },
        ],
        recommend: 3,
        createdTime: "2023-12-12 12:12:12",
      },
      {
        codeId: 343,
        user: {
          userId: 1,
          nickname: "답변왕",
        },
        code: `<pre><code class="language-typescript">export const getTimeAgo = (dateString: string): string =&gt; {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifferenceInSeconds = Math.floor(
    (currentDate.getTime() - inputDate.getTime()) / 1000,
  );

  if (timeDifferenceInSeconds &lt; 60) {
    return \`\${timeDifferenceInSeconds}초전\`;
  } else if (timeDifferenceInSeconds &lt; 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return \`\${minutesAgo}분전\`;
  } else if (timeDifferenceInSeconds &lt; 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return \`\${hoursAgo}시간전\`;
  } else if (timeDifferenceInSeconds &lt; 2592000) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return \`\${daysAgo}일전\`;
  } else if (timeDifferenceInSeconds &lt; 31536000) {
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return \`\${monthsAgo}달전\`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return \`\${yearsAgo}년전\`;
  }
};</code></pre>`,
        type: 3001,
        comments: [
          {
            commentId: 3,
            user: {
              userId: 33,
              nickname: "태클걸러옴",
            },
            content: " 이렇게 푸는거 아닌데 ㅋ ",
            createdTime: "2023-12-12 12:12:12",
          },
          {
            commentId: 4,
            user: {
              userId: 33,
              nickname: "태클걸러옴",
            },
            content: " 이렇게 푸는거 아닌데 ㅋ ",
            createdTime: "2023-12-12 12:12:12",
          },
        ],
        recommend: 3,
        createdTime: "2023-12-12 12:12:12",
      },
    ],
    total: 70,
  };
};
