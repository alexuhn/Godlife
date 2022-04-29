import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";

import { selectGoal } from "../../../store/goal";
import { useAppSelector } from "../../../store/hooks";
import axiosWithToken from "../../../utils/axios";
import Goal from "./Goal";

const BingoCreateGoalList = () => {
  const selectedGoals = useAppSelector(selectGoal);
  const [selectedCategory, setSelectedCategory] = useState("건강한삶");
  const [goalList, setGoalList] = useState<any[]>([]);
  const [allGoalList, setAllGoalList] = useState<any[]>([]);
  const [userFavorites, setUserFavorites] = useState<
    {
      seq: number;
      content: string;
      category: string;
      favoriteSeq: string;
    }[]
  >([]);

  const changeCategoryGoalList = useCallback(
    (selectedCategory: string) => {
      const classifiedGoalList = allGoalList.filter(
        (goal) => goal.category === selectedCategory
      );
      setGoalList(classifiedGoalList);
    },
    [allGoalList]
  );

  const changeCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectedCategory = (e.target as HTMLLIElement).textContent;

    selectedCategory && setSelectedCategory(selectedCategory);
    if (selectedCategory === "전체") {
      setGoalList(allGoalList);
    } else if (selectedCategory === "즐겨찾기") {
      setGoalList(userFavorites);
    } else if (selectedCategory === "선택된목표") {
      setGoalList(selectedGoals);
    } else if (selectedCategory !== null && selectedCategory !== "전체") {
      changeCategoryGoalList(selectedCategory);
    }
  };

  const getGoals = () => {
    axios
      .get("goal")
      .then((res) => {
        const classifiedGoalList = res.data.goals.filter(
          (goal: { category: string }) => goal.category === "건강한삶"
        );
        setGoalList(classifiedGoalList);
        setAllGoalList(res.data.goals);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    changeCategoryGoalList("건강한삶");
  }, [changeCategoryGoalList]);

  const getFavorites = () => {
    axiosWithToken
      .get("goal/usergoal")
      .then((res) => {
        const favoriteGoals: {
          seq: number;
          content: string;
          category: string;
          favoriteSeq: string;
        }[] = [];
        res.data.userGoals.forEach((goal: { goals: any; seq: string }) => {
          favoriteGoals.push({ ...goal.goals, favoriteSeq: goal.seq });
        });
        setUserFavorites(favoriteGoals);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getGoals();
    getFavorites();
  }, []);

  const category = [
    "선택된목표",
    "건강한삶",
    "미라클모닝",
    "자기개발",
    "삶의질",
    "습관개선",
    "환경",
    "즐겨찾기",
    "전체",
  ];

  return (
    <>
      <Stack direction="row" spacing={2} marginBottom={4}>
        <Stack>
          {category.map((c, index) => (
            <Chip
              key={index}
              label={c}
              sx={{
                width: "100px",
                height: "30px",
                fontSize: "14px",
                "& span": {
                  padding: 0,
                  fontFamily: "NotoSerifKR",
                },
                marginBottom: "10px",
                border: "1px solid #6D6D6D",
                color: selectedCategory === c ? "black" : "#6D6D6D",
                backgroundColor: selectedCategory === c ? "#D8D8D8" : "white",
              }}
              onClick={(e) => changeCategory(e)}
            />
          ))}
        </Stack>

        <Box>
          <Grid
            container
            spacing={2}
            sx={(theme) => ({
              width: "672px",
              [theme.breakpoints.down(800)]: {
                width: "448px",
              },
              [theme.breakpoints.down("sm")]: {
                width: "224px",
              },
            })}
          >
            {goalList.length ? (
              <>
                {goalList.map(
                  (goal: {
                    seq: number;
                    content: string;
                    category: string;
                    favoriteSeq?: string;
                  }) => (
                    <Grid item key={goal.seq}>
                      <Goal
                        {...goal}
                        isFavorite={userFavorites.some(
                          (el) => el.seq === goal.seq
                        )}
                        getFavorites={getFavorites}
                        userFavorites={userFavorites}
                      />
                    </Grid>
                  )
                )}
              </>
            ) : (
              <Stack
                sx={{ width: "100%", height: "360px" }}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  sx={{ textAlign: "center", whiteSpace: "pre-line" }}
                >
                  {selectedCategory === "즐겨찾기"
                    ? "즐겨찾는 목표가 없습니다. \n자주 찾는 목표의 별을 눌러보세요!"
                    : "선택된 목표가 없습니다."}
                </Typography>
              </Stack>
            )}
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default BingoCreateGoalList;
