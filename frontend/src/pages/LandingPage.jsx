import { Box, Button, Typography } from "@mui/material";
import MetaDataSearcher from "../components/MetaData";
import ConnectButtons from "../components/ConnectButtons";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ConnectButtons />

      {/*<Button onClick={(e) => navigate("/ipfs_upload")}>*/}
      {/*  Go to IPFS Uploader*/}
      {/*</Button>*/}
      {/*<MetaDataSearcher />*/}
    </Box>
  );
};

export default LandingPage;
