import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IMovie, IMovieCompany } from "../model";

interface IMoviesGrid  {
  selectRow: (event:any) => void
}

export const MoviesGrid = (props: IMoviesGrid) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [movieCompanies, setMovieCompanies] = useState<IMovieCompany[]>([]);

  const getCompanyById = (companyId: string) => {
    const companyName = movieCompanies.find(
      (company) => company.id == companyId
    )?.name;
    return companyName;
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", type: "string" },
    {
      field: "filmCompanyId",
      type: "string",
      headerName: "Film Company",
      valueGetter: getCompanyById,
    },
    {
      field: "reviews",
      headerName: "Review Score",
      type: "number",
      valueGetter: calculateReviewScore,
    },
  ];

  const getMoviesData = () => {
    fetch("http://192.168.0.12:3002/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: IMovie[]) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Failed to get the movie data: ", error);
      });
  };

  const getMovieCompaniesData = () => {
    fetch("http://192.168.0.12:3002/movieCompanies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: IMovieCompany[]) => {
        setMovieCompanies(data);
      })
      .catch((error) => {
        console.error("Failed to get the movie company data: ", error);
      });
  };


    return <DataGrid
          rows={movies}
          columns={columns}
          onRowClick={selectRow}
          autosizeOnMount={true}
          autoPageSize={true}
          autosizeOptions={{
            columns: ["title", "reviews", "filmCompanyId"],
            includeHeaders: true,
            includeOutliers: true,
            outliersFactor: 1.5,
            expand: true,
          }}
        />
}