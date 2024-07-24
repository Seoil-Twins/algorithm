import { TestCase } from "./testcase";
import { RequireUser } from "./user";

export type RecommendAlgorithmItem = {
  algorithmId: number;
  title: string;
  kinds: string[];
  content: string;
};

export type RecommendAlgorithm = {
  algorithms: RecommendAlgorithmItem[];
};

type AlgorithmKindItem = {
  kindId: number;
  kindName: string;
};

export type AlgorithmKind = {
  kinds: AlgorithmKindItem[];
};

export type Algorithm = {
  algorithmId: number;
  title: string;
  kind: string;
  content: string;
  limitTime: string;
  limitMemory: string;
  isRecommend: boolean | null;
  thumbnail: string | null;
  testcases: TestCase[];
};

type AlgorithmsItem = {
  algorithmId: number;
  title: string;
  level: string;
  kind: string;
  correctRate: number;
  solved: boolean;
};

export type Algorithms = {
  algorithms: AlgorithmsItem[];
  total: number;
};

export type CorrectItem = {
  correctId: number;
  codeType: string;
  user: RequireUser;
  code: string;
  recommendCount: number;
};

export type Corrects = {
  corrects: CorrectItem[];
  total: number;
};
