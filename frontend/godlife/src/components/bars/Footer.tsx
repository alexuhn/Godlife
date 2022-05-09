import { Stack, Typography } from "@mui/material";

import React from "react";

import Logo from "../../assets/logo/Godlife/logo.svg";

const Footer = () => {
  return (
    <Stack alignItems="center" sx={{ padding: "60px 0" }} spacing={1}>
      <img src={Logo} alt="logo" style={{ width: "60px", height: "60px" }} />
      <Typography fontFamily="BMEULJIRO" fontSize="36px" paddingY={1}>
        갓 생 살 기
      </Typography>
      <a
        style={{
          textDecoration: "none",
          color: "black",
          fontFamily: "Noto Sans KR",
        }}
        href="mailto:today.godlife@gmail.com?subject=갓생살기"
      >
        today.godlife@gmail.com
      </a>
      <span style={{ fontFamily: "Noto Sans KR", color: "#6d6d6d" }}>
        서울특별시 강남구 테헤란로 212길
      </span>

      <span style={{ fontFamily: "Noto Sans KR", color: "#6d6d6d" }}>
        CopyRight 2022 갓생살기 All rights reserved.
      </span>
    </Stack>
  );
};

export default Footer;
