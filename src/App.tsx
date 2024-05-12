import { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { IMovie, IMovieCompany } from "./model";
import { ReviewDialog } from "./Components/ReviewDialog";
import { refreshButton } from "./Components/RefreshButton";
import { calculateReviewScore } from "./CommonFunctions/CalculateReviewScore";
import { getMovieCompaniesData } from "./CommonFunctions/getMovieCompanies";
import { getMoviesData } from "./CommonFunctions/getMoviesData";

export const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [movieCompanies, setMovieCompanies] = useState<IMovieCompany[]>([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    getData()
  }, []);

  const getData = ()=> {
    getMoviesData(setMovies);
    getMovieCompaniesData(setMovieCompanies);
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

  const selectRow = (params: GridRowParams) => {
    setOpen(true);
    setSelectedMovie(params.row);
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