import { Testcase } from "./testcase";
import { RequiredUser } from "./user";

export interface Algorithm {
  algorithmId: number;
  user: RequiredUser;
  title: string;
  level: string;
  algorithmKind: number;
  algorithmCompe: number;
  limitTime: string;
  limitMem: string;
  createdTime: string;
  content: string;
  thumbnail?: string;
  kinds: string[];
  testcase: Testcase[];
  isFavorite?: boolean;
  solved?: boolean;
  correctRate: number;
}
