export default interface Code {
  codeId: number;
  userId: number;
  algorithmId: number;
  code: string;
  type: number;
  solved: boolean;
  recommend: number;
  createdTime: string;
}
