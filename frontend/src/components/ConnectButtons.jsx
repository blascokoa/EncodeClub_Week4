import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const ConnectButtons = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accountsChanged);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await accountsChanged(res[0]);
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    } else {
      setErrorMessage("Install MetaMask");
    }
  };

  const accountsChanged = async (newAccount) => {
    setAccount(newAccount);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      setErrorMessage("There was a problem connecting to MetaMask");
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAccount(null);
    setBalance(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", m: 2 }}>
      <Button
        onClick={connectHandler}
        // disabled={shouldDisable}
        variant={"contained"}
        color={"success"}
        sx={{ width: "200px", mr: 2 }}
      >
        Connect Metamask
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          m: 2,
        }}
      >
        <Typography>Connected to: {account}</Typography>
        <Typography>
          Using Network: {parseInt(window.ethereum.chainId, 16)}
        </Typography>
        <Typography>
          Balance: {(Math.round(Number(balance) * 10000) / 10000).toFixed(4)}{" "}
          ETH
        </Typography>
      </Box>
    </Box>
  );
};

export default ConnectButtons;
