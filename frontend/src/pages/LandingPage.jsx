import { Box, Typography } from "@mui/material";
import MetaDataSearcher from "../components/MetaData";
import ConnectButtons from "../components/ConnectButtons";

const LandingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant={"h2"}>Week 4 - EncodeClub Bootcamp</Typography>
      </Box>
      <ConnectButtons />
      {/*<MetaDataSearcher />*/}
    </Box>
  );
};

export default LandingPage;
