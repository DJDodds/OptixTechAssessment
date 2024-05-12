export interface IMovie {
  id: string;
  reviews: number[];
  title: string;
  filmCompanyId: string;
  cost: number;
  releaseYear: number;
}

export interface IMovieCompany {
  id: string;
  name: string;
}
