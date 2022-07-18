import { Box, Button, Input, TextField } from "@mui/material";
import { useState } from "react";
import { uploadFileService } from "../services/ipfs.service";

const IPFSHandler = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      console.log(formData);
      await uploadFileService(formData);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Select a file</h1>

          <Input
            type="file"
            sx={{ mb: 1 }}
            accept="image/*"
            id={"file_upload"}
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
          />
          <label htmlFor={"file_upload"}>
            <Button
              variant={"contained"}
              sx={{ width: "400px" }}
              disabled={!file}
              type={"submit"}
            >
              Upload File
            </Button>
          </label>
        </Box>
      </form>
      <h3>Metadata</h3>
      <TextField
        label="Name"
        sx={{ mb: 1, width: "400px" }}
        variant="outlined"
      />

      <TextField
        label="Description"
        sx={{ mb: 1, width: "400px" }}
        variant="outlined"
      />
      <TextField
        label="Author"
        sx={{ mb: 1, width: "400px" }}
        variant="outlined"
      />
      <TextField
        label="Timestamp"
        sx={{ mb: 1, width: "400px" }}
        variant="outlined"
      />
      <TextField
        label="Type"
        sx={{ mb: 1, width: "400px" }}
        variant="outlined"
      />
      <TextField
        label="Class"
        sx={{ mb: 1, width: "400px" }}
        variant="outlined"
      />
      <Button variant={"contained"} sx={{ width: "400px" }}>
        Upload Metadata
      </Button>
    </Box>
  );
};

export default IPFSHandler;
