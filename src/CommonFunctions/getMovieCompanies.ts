import axios, { AxiosResponse } from 'axios';
import { IMovieCompany } from '../model';

export const getMovieCompaniesData = async (): Promise<IMovieCompany[]> => {
  try {
    const response: AxiosResponse<IMovieCompany[]> = await axios.get<IMovieCompany[]>("http://localhost:4321/movieCompanies");
    return response.data;
  } catch (error) {
    console.error("Failed to get the movie company data: ", error);
    return []; // Return an empty array if there's an error
  }
};
