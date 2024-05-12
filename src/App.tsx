import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IMovie, IMovieCompany } from "./model";
import { ReviewDialog } from "./Components/ReviewDialog";
import { refreshButton } from "./Components/refreshButton";
import { MoviesGrid } from "./Components/MoviesGrid";

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
// const mockMovieCompanyData: any = [
//   {id: "1", name: "Test Productions"},
// ];

// // TODO: use https://giddy-beret-cod.cyclic.app/movies
// const mockMovieData: any = [
//   {id: "1", reviews: [6,8,3,9,8,7,8], title: "A Testing Film", filmCompanyId: "1", cost : 534, releaseYear: 2005},
//   {id: "2", reviews: [5,7,3,4,1,6,3], title: "Mock Test Film", filmCompanyId: "1", cost : 6234, releaseYear: 2006},
// ];

export const App = () => {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    getData()
  }, []);

  const getData = ()=> {
    getMoviesData();
    getMovieCompaniesData();
  }
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

  const handleClose = () => {
    setOpen(false);
  };

  const selectRow = (event: any) => {
    setOpen(true);
    setSelectedMovie(event.row);
  };

  return (
    <div style={{padding:"5px", display:"flex", height:"98vh", flexDirection:"column"}}>
      <div style={{display:"flex", placeContent:"space-between", alignItems:"center"}}>
        <h2>Welcome to Movie Database!</h2>
        <span>{refreshButton(getData)}</span>
      </div>
      <div style={{flex:"1 1 0"}}>
        <MoviesGrid  />
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
