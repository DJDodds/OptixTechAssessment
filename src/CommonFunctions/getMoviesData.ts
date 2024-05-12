import axios, { AxiosResponse } from 'axios';
import { IMovie } from '../model';

export const getMoviesData = async (): Promise<IMovie[]> => {
  try {
    const response: AxiosResponse<IMovie[]> = await axios.get<IMovie[]>("http://localhost:4321/movies");
    return response.data;
  } catch (error) {
    console.error("Failed to get the movie data: ", error);
    return []; // Return an empty array if there's an error
  }
};
