import { PageOptions } from "@/types/algorithmBoard";
import { BoardResponse } from "@/types/board";

export const getAlgorithmBoards = async (
  algorithmId: number,
  options: PageOptions,
): Promise<BoardResponse> => {
  console.log(algorithmId, options);

  return {
    contents: [],
    total: 0,
  };
};
