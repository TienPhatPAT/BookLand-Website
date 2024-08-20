import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  TextField,
  Modal,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import classes from "./Link.module.scss";

const LinkedAccounts = () => {
  const [linkedAccounts, setLinkedAccounts] = useState([
    { id: 1, provider: "Google", email: "example@gmail.com", linked: true },
    {
      id: 2,
      provider: "Facebook",
      email: "example@facebook.com",
      linked: true,
    },
    { id: 3, provider: "Twitter", email: "example@twitter.com", linked: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAccount, setNewAccount] = useState({ provider: "", email: "" });

  const handleUnlink = (id) => {
    setLinkedAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id ? { ...account, linked: false } : account
      )
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAccount({ provider: "", email: "" });
  };

  const handleAddAccount = () => {
    setLinkedAccounts((prevAccounts) => [
      ...prevAccounts,
      {
        id: prevAccounts.length + 1,
        provider: newAccount.provider,
        email: newAccount.email,
        linked: true,
      },
    ]);
    handleCloseModal();
  };

  return (
    <div className={classes["linked_accounts_container"]}>
      <Typography variant="h4" className={classes["linked_accounts_header"]}>
        Tài khoản liên kết
      </Typography>

      <Box className={classes["linked_accounts_list"]}>
        {linkedAccounts.map((account) => (
          <React.Fragment key={account.id}>
            <div className={classes["linked_account_item"]}>
              <div className={classes["account_info"]}>
                <Typography variant="h6" sx={{ fontSize: "15px" }}>
                  {account.provider}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  {account.email}
                </Typography>
              </div>
              {account.linked ? (
                <Button
                  variant="contained"
                  className={classes["unlink_button"]}
                  onClick={() => handleUnlink(account.id)}
                  sx={{ fontSize: "13px", backgroundColor: "#a259ff" }}
                >
                  Hủy liên kết
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className={classes["link_button"]}
                  disabled
                  sx={{ fontSize: "13px" }}
                >
                  Chưa liên kết
                </Button>
              )}
            </div>
            <Divider className={classes["divider"]} />
          </React.Fragment>
        ))}
      </Box>

      <Button
        variant="contained"
        className={classes["add_account_button"]}
        onClick={handleOpenModal}
        sx={{
          marginTop: 2,
          backgroundColor: "#a259ff",
          "&:hover": { backgroundColor: "#8147cc" },
          fontSize: "13px",
        }}
      >
        Thêm tài khoản liên kết
      </Button>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontSize: "15px" }}>
            Thêm tài khoản liên kết mới
          </Typography>
          <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
            <InputLabel id="provider-label" sx={{ fontSize: "15px" }}>
              Tài khoản
            </InputLabel>
            <Select
              labelId="provider-label"
              value={newAccount.provider}
              onChange={(e) =>
                setNewAccount({ ...newAccount, provider: e.target.value })
              }
              fullWidth
              sx={{ fontSize: "15px" }}
            >
              <MenuItem value="Facebook">Facebook</MenuItem>
              <MenuItem value="Gmail">Gmail</MenuItem>
              <MenuItem value="Zalo">Zalo</MenuItem>
              <MenuItem value="Google">Google</MenuItem>
              <MenuItem value="Twitter">Twitter</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Email"
            value={newAccount.email}
            onChange={(e) =>
              setNewAccount({ ...newAccount, email: e.target.value })
            }
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2, fontSize: "15px" }}
            InputProps={{ style: { fontSize: "15px" } }}
            InputLabelProps={{ style: { fontSize: "15px" } }}
          />
          <Button
            variant="contained"
            onClick={handleAddAccount}
            sx={{
              backgroundColor: "#a259ff",
              "&:hover": { backgroundColor: "#8147cc" },
              marginBottom: 1,
              fontSize: "15px",
            }}
          >
            Thêm tài khoản
          </Button>
          <Button
            variant="text"
            onClick={handleCloseModal}
            sx={{ fontSize: "15px" }}
          >
            Hủy
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LinkedAccounts;
