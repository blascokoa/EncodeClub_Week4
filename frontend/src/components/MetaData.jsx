import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { getMetadataInfoService } from "../services/ipfs.service";

const MetaDataSearcher = () => {
  const [metadataId, setMetadataId] = useState("");
  const [metadataError, setMetadataError] = useState("");
  const [medataInfo, setMetadataInfo] = useState("");

  const getMetadataInfo = async () => {
    const metadataInfoRequest = await getMetadataInfoService(metadataId);
    console.log(metadataInfoRequest);
    try {
      if (metadataInfoRequest.data.error.name) {
        setMetadataError("Metadata not found");
        setMetadataInfo(null);
      }
    } catch (e) {
      setMetadataInfo(metadataInfoRequest.data);
      setMetadataError(null);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <TextField
          placeholder={"Please input the ID here:"}
          onChange={(e) => {
            setMetadataId(e.target.value);
          }}
        ></TextField>
        <Button onClick={getMetadataInfo}> Search Metadata </Button>
      </Box>
      <Box>{medataInfo && `Metadata Info: ${medataInfo.author}`}</Box>
      <Box>{metadataError && `${metadataError}`}</Box>
    </Box>
  );
};

export default MetaDataSearcher;
