import { TestCase } from "./testcase";

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
  testcase: TestCase[];
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
