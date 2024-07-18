import { AlgorithmOptions } from "@/types/algorithm";
import { API_INSTANCE } from ".";

const API_URL = "/algorithm";

export const AlgorithmAPI = {
  getRecommendAlgorithms: async () => {
    return await API_INSTANCE.GET(`${API_URL}/recommend`);
  },
  getAlgorithms: async (options: AlgorithmOptions) => {
    const searchParams = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      value && searchParams.append(key, String(value));
    });

    return await API_INSTANCE.GET(`${API_URL}?${searchParams.toString()}`);
  },
  getAlgorithmKinds: async () => {
    return await API_INSTANCE.GET(`${API_URL}/kind`);
  },
};
