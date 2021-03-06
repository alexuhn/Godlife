import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Divider, Stack } from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo/Godlife/logo.svg";
import { StyledIconButton, TextButton } from "../../components/common/Button";
import LoginForm from "./LoginForm/LoginForm";
import LoginOAuth from "./LoginOAuth";

const Login = ({
  setPage,
}: {
  setPage?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Stack
        justifyContent="center"
        width="300px"
        height="100%"
        margin="0 auto"
      >
        <Box sx={{ textAlign: "center" }}>
          <img
            src={Logo}
            alt="logo"
            style={{
              width: "120px",
              height: "120px",
              margin: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              setPage ? setPage("landing") : navigate("/");
            }}
          />
        </Box>

        <LoginForm />

        <Box sx={{ textAlign: "right" }}>
          <TextButton disableRipple={true} href="/join">
            회원가입
          </TextButton>
        </Box>

        <Divider
          sx={{ fontSize: "14px", color: "#6D6D6D", margin: "10px 0 20px 0" }}
        >
          혹은
        </Divider>

        <LoginOAuth />
      </Stack>

      {location.pathname === "/login" && (
        <StyledIconButton
          onClick={() => {
            navigate("/");
          }}
          sx={{
            left: "10px",
          }}
        >
          <Stack alignItems="center">
            <ArrowBackIosNewIcon sx={{ paddingRight: "2px" }} />
          </Stack>
        </StyledIconButton>
      )}
    </>
  );
};

export default Login;
