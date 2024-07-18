export type RecommendAlgorithmItem = {
  algorithmId: number;
  title: string;
  kinds: string[];
  content: string;
};

export type RecommendAlgorithm = {
  algorithms: RecommendAlgorithmItem[];
};
