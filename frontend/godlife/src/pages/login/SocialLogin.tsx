import { Button, Stack } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ReactComponent as GoogleLoginImage } from "../../assets/logo/Brand/oAuth/google/google.svg";
import { ReactComponent as KakaoLoginImage } from "../../assets/logo/Brand/oAuth/kakao/kakao.svg";
import { setTodayBingo } from "../../store/todayBingo";
import { setLoggedUser } from "../../store/user";

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseGoogle = async (res: any) => {
    let jwtToken = await axios.post("oauth/google", JSON.stringify(res), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    if (jwtToken.status === 200) {
      localStorage.setItem("token", jwtToken.data.jwtToken);
      axios
        .get("user/info", {
          headers: {
            Authorization: jwtToken.data.jwtToken,
          },
        })
        .then((res) => {
          dispatch(setLoggedUser(res.data));
          axios
            .get(`bingo/date/${dayjs().format("YYYY-MM-DD")}`, {
              headers: {
                Authorization: jwtToken.data.jwtToken,
              },
            })
            .then((res) => dispatch(setTodayBingo(res.data.code)))
            .catch((err) => console.log(err));
        });
      navigate("/");
    }
  };

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY!}
        render={(renderProps) => (
          <Button
            sx={{ padding: 0 }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <GoogleLoginImage />
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />

      <Button href={KAKAO_AUTH_URL} sx={{ padding: 0 }}>
        <KakaoLoginImage />
      </Button>
    </Stack>
  );
};

export default SocialLogin;
