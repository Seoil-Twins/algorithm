import Comment from "@/interfaces/comment";

export interface ResponseComment {
  comments: Comment[];
  total: number;
}

export interface PageOptions {
  count: number;
  page: number;
}

export const getComments = async (
  boardId: string | number,
  pageOptions: PageOptions,
): Promise<ResponseComment> => {
  console.log(boardId, pageOptions);

  return {
    comments: [
      {
        commentId: 1323,
        boardId: 3,
        user: {
          userId: 1,
          profile:
            "https://www.birds.cornell.edu/home/wp-content/uploads/2023/09/334289821-Baltimore_Oriole-Matthew_Plante.jpg",
          nickname: "황야의고라니1111",
        },
        content:
          "제가 생각하기에는 저는 하이 제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이제가 생각하기에는 저는 하이",
        recommend: 0,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        commentId: 1324,
        boardId: 3,
        user: {
          userId: 2,
          nickname: "황야의고라니",
        },
        content: "제가 생각하기에는 저는 똥이 마려워용!!~",
        recommend: 0,
        createdTime: "2023-12-25 12:25:25",
      },
    ],
    total: 2,
  };
};

export const modifyCommentSolved = (commentId: number) => {
  console.log(commentId);
};

export const deleteComment = (commentId: number) => {
  console.log(commentId);
};
