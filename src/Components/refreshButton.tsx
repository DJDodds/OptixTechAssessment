import { IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh'

export const refreshButton = (getData: ()=> void) => {
    return <IconButton onClick={getData}
      ><RefreshIcon/></IconButton>;
};