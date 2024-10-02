import { ApiResponse, ApiResponseSchema } from "./types";

const API_URL = "https://images-api.nasa.gov/search";

export const fetchAssets = async (
  query: string,
  mediaType: string = "image",
  page: number = 1,
): Promise<ApiResponse> => {
  const response = await fetch(
    `${API_URL}?q=${query}&media_type=${mediaType}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch assets");
  }

  const data = await response.json();
  const parsedData = ApiResponseSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("API response validation failed:", parsedData.error);
    throw new Error("Invalid data format received from API");
  }

  return parsedData.data;
};
