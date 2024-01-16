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
  kinds: string[];
  testcase: Testcase[];
  solved?: boolean;
  solvedRate: number;
}
