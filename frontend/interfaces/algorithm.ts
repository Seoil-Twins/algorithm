import { Testcase } from "./testcase";

export interface Algorithm {
  algorithmId: number;
  user: {
    userId: number;
    profile?: string;
    nickname: string;
  };
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
  isSave: boolean;
  solved?: boolean;
  solvedRate: number;
}
