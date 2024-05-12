import axios, { AxiosResponse } from 'axios';
import { IMovieCompany } from '../model';

export const getMovieCompaniesData = (setMovieCompaniesCallback: (data: IMovieCompany[]) => void) => {
  axios.get<IMovieCompany[]>("http://localhost:4321/movieCompanies")
    .then((response: AxiosResponse<IMovieCompany[]>) => {
      setMovieCompaniesCallback(response.data);
    })
    .catch((error) => {
      console.error("Failed to get the movie company data: ", error);
    });
};