import { Grid, Hidden, Stack, Tooltip } from "@mui/material";

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/logo/Godlife/logo.svg";
import Profile from "../../pages/profile/Profile";
import { setDialog } from "../../store/dialog";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";
import { selectTodayBingo } from "../../store/todayBingo";
import { clearLoggedUser } from "../../store/user";
import { TextButton } from "../common/Button";
import MobileNavbarDialog from "./MobileNavbarDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const pageNameList: { [key: string]: string } = {
    list: "이전의 갓생",
    group: "내 그룹",
    item: "아이템 샵",
    create: "갓생 만들기",
    bingo: "하루 갓생",
  };

  const location = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    navigate("login");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
    dispatch(clearLoggedUser());
    dispatch(
      setSnackbar({
        open: true,
        message: "로그아웃 되었습니다.",
        severity: "success",
      })
    );
  };

  const code = useAppSelector(selectTodayBingo);

  return (
    <>
      <Profile open={open} setOpen={setOpen} />

      <Hidden smDown>
        <Grid
          container
          alignItems="end"
          sx={{
            padding: "20px 10px 40px 10px",
          }}
        >
          <Grid item sm={5}>
            <Stack direction="row" justifyContent="space-around">
              <TextButton
                onClick={() => {
                  if (code) {
                    navigate(`/bingo/${code}`);
                  } else {
                    navigate("create");
                  }
                }}
              >
                오늘의 갓생
              </TextButton>
              <TextButton href="/list">이전의 갓생</TextButton>

              <Tooltip title={"서비스 준비중입니다."}>
                <TextButton
                  onClick={() => {
                    dispatch(
                      setSnackbar({
                        open: true,
                        message: "서비스 준비중입니다.",
                        severity: "info",
                      })
                    );
                  }}
                >
                  내 그룹
                </TextButton>
              </Tooltip>
            </Stack>
          </Grid>
          <Grid
            item
            sm={2}
            sx={{
              textAlign: "center",
            }}
          >
            <Logo
              width="100px"
              height="100px"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Grid>
          <Grid item sm={5}>
            <Stack direction="row" justifyContent="space-around">
              <TextButton
                onClick={() => {
                  dispatch(
                    setDialog({
                      open: true,
                      title: "아이템샵",
                      content: "서비스 준비중입니다.",
                    })
                  );
                }}
              >
                아이템 샵
              </TextButton>
              <TextButton onClick={() => setOpen(true)}>내 정보</TextButton>
              <TextButton onClick={logout}>로그아웃</TextButton>
            </Stack>
          </Grid>
        </Grid>
      </Hidden>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        display={{ sm: "none", md: "none" }}
        sx={{
          padding: "10px",
        }}
      >
        <Grid
          item
          xs
          sx={{
            textAlign: "left",
          }}
        >
          <Logo
            width="70px"
            height="70px"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Grid>
        <Grid
          item
          xs
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{pageNameList[location.pathname.split("/")[1]]}</p>
        </Grid>
        <Grid item xs>
          <MobileNavbarDialog logout={logout} setOpen={setOpen} />
        </Grid>
      </Grid>
    </>
  );
};

export default Navbar;
