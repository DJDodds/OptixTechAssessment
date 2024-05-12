import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IMovie, IMovieCompany } from "./model";
import { ReviewDialog } from "./Components/ReviewDialog";
import { refreshButton } from "./Components/refreshButton";

export const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [movieCompanies, setMovieCompanies] = useState<IMovieCompany[]>([]);
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    getData()
  }, []);

  const getData = ()=> {
    getMoviesData();
    getMovieCompaniesData();
  }

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

  const selectRow = (event: any) => {
    setOpen(true);
    setSelectedMovie(event.row);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{padding:"5px", display:"flex", height:"98vh", flexDirection:"column"}}>
      <div style={{display:"flex", placeContent:"space-between", alignItems:"center"}}>
        <h2>Welcome to Movie Database!</h2>
        <span>{refreshButton(getData)}</span>
      </div>
      <div style={{flex:"1 1 0"}}>
        <DataGrid
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
        {selectedMovie && (
          <ReviewDialog
            selectedMovie={selectedMovie}
            open={open}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};
