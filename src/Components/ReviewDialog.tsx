import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { IMovie } from "../model";
import { Alert, AlertPropsColorOverrides, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, useState } from "react";
import { sendMovieReview } from "../CommonFunctions/sendMovieReview";

export interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  selectedMovie: IMovie;
}

export const ReviewDialog = (props: ReviewDialogProps) => {
  const { open, selectedMovie } = props;

  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage ] = useState<{message: string, severity: string}>({message: "", severity:"success"})


  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value.slice(0, 100));
  };

  const handleClose = () => {
    setMessage("");
    setResponseMessage({message: "", severity:"success"});
    props.onClose();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      const responseMessage= await sendMovieReview(message);
      setResponseMessage({message:responseMessage, severity:"error"})
    } catch {
      setResponseMessage({message:"Failed to publish review", severity:"error"})
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div style={{ display: "flex",alignItems: "center", width:"85%" }}>
        <DialogTitle className="dialogTitle">
          {"Review " + selectedMovie.title}
        </DialogTitle>
          <IconButton style={{position:"absolute", right:0, top : 0}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
      </div>
      
      {responseMessage ? <div style={{minWidth:"400px"}}><Alert severity={responseMessage.severity == "success"? "success": "error"}>{responseMessage.message}</Alert></div>:  (
        <>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={"reviewTextbox"}
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