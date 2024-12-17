import { apiSearch } from "../../apis";

export const fetchSearchData = async (keyword) => {
  try {
    const response = await apiSearch(keyword);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchSearchDataKeyword = async (keyword) => {
  try {
    const response = await apiSearch(keyword);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
