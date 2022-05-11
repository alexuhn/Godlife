import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import React from "react";

import LoginBannerImage1 from "../../assets/images/loginBannerImage1.webp";
import LoginBannerImage2 from "../../assets/images/loginBannerImage2.webp";
import Stamp from "../../assets/images/stamp.webp";

const LoginBanner = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down(1550));

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <Box
        position="absolute"
        sx={{
          top: fullScreen ? "60vh" : "-20px",
          left: fullScreen ? "calc(50% - 150px)" : "50px",
        }}
      >
        <img src={LoginBannerImage1} alt="banner 1" />
      </Box>

      <Box
        position="absolute"
        sx={{
          bottom: "-40px",
          right: "50px",
          display: fullScreen ? "none" : "block",
        }}
      >
        <img
          src={LoginBannerImage2}
          alt="banner 2"
          style={{ width: "300px" }}
        />
      </Box>

      <Stack
        sx={(theme) => ({
          height: "100%",
          textAlign: "center",
          width: "100%",
          "& p": {
            zIndex: 2,
          },
          [theme.breakpoints.down(1550)]: {
            height: "55%",
          },
        })}
        alignItems="center"
        justifyContent={fullScreen ? "end" : "center"}
      >
        <Box position="relative">
          <Typography
            sx={{ fontFamily: "BMEULJIRO", fontSize: "80px" }}
            variant="h1"
          >
            God <span style={{ fontFamily: "Reggae One" }}>生</span>
          </Typography>

          <img
            src={Stamp}
            alt="stamp"
            style={{
              position: "absolute",
              top: "-59px",
              left: "-69px",
              opacity: "30%",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontFamily: "BMEULJIRO",
            fontSize: "40px",
            marginBottom: "30px",
          }}
          variant="h1"
        >
          한 번 살아보시지 않으렵니까?
        </Typography>

        <Typography fontSize={20} variant="h1">
          매일의 갓생 목표를 달성하고, <br />
          친구들과 함께 도전을 이어가시오.
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginBanner;
