import { AlgorithmImage } from "./algorithmImage";
import { Testcase } from "./testcase";

export interface Algorithm {
  algorithmId: number;
  userId: number;
  title: string;
  level: string;
  algorithmKind: number;
  algorithmCompe: number;
  limitTime: string;
  limitMem: string;
  createdTime: string;
  content: string;
  tags: string[];
  images?: AlgorithmImage[];
  testcase: Testcase[];
}
