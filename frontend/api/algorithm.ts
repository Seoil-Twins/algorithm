import { API_INSTANCE } from ".";

const API_URL = "/algorithm";

export const AlgorithmAPI = {
  getRecommendAlgorithms: async () => {
    return await API_INSTANCE.GET(`${API_URL}/recommend`);
  },
};
