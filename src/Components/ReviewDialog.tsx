import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IMovie } from "../model";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  selectedMovie: IMovie;
}

export const ReviewDialog = (props: ReviewDialogProps) => {
  const { open, selectedMovie } = props;

  const [message, setMessage] = React.useState("");
  const [responseMessage, setResponseMessage ] = React.useState("")

  const handleChange = (event: any) => {
    setMessage(event.target.value.slice(0, 100));
  };

  const handleClose = () => {
    setMessage("");
    setResponseMessage("");
    props.onClose();
  };

  const handleSubmit = (e: any) => {
    e.stopPropagation();
    fetch("http://192.168.0.12:3002/submitReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({review: message}),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setResponseMessage(json.message)
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{ display: "flex",alignItems: "center" }}>
        <DialogTitle className="dialogTitle">
          {"Review " + selectedMovie.title}
        </DialogTitle>
          <IconButton style={{position:"absolute", right:0, top : 0}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
      </div>
      
      {responseMessage ? <div style={{minWidth:"400px"}}><Alert severity="success">{responseMessage}</Alert></div>:  (
        <>
          <textarea
            id="message"
            name="message"
            rows={4}
            style={{
              minWidth: "calc(25vw - 20px)",
              boxSizing: "border-box",
              margin: "10px",
              height:"200px"
            }}
            maxLength={100}
            value={message}
            onChange={handleChange}
          />
          <span style={{placeSelf:"self-end", marginRight:"5px", fontSize:"12px"}}>
            {message.length + "/100"}
          </span>
          <br />
          <Button
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </>
      )}
    </Dialog>
  );
};