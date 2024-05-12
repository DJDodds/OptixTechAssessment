import axios, { AxiosResponse } from "axios";

export const sendMovieReview = async (message: string): Promise<string> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post<{
      message: string;
    }>(
      "http://localhost:4321/submitReview",
      { review: message },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error("Failed to publish review", error);
    throw error;
  }
};