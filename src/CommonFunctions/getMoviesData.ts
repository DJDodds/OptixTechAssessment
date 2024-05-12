import axios, { AxiosResponse } from 'axios';
import { IMovie } from '../model';

export const getMoviesData = (setMoviesCallback: (data: IMovie[]) => void) => {
  axios.get<IMovie[]>("http://localhost:4321/movies")
    .then((response: AxiosResponse<IMovie[]>) => {
      setMoviesCallback(response.data);
    })
    .catch((error) => {
      console.error("Failed to get the movie data: ", error);
    });
};
