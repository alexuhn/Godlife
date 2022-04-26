import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import BingoCreateComponents from "./BingoCreateComponents";


interface Goal {
  seq: number;
  content: string;
  category: string;
}

const BingoCreate = () => {
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);

  return (
    <>
      <Stack direction="column" alignItems="center">
        <BingoCreateComponents />
        <Box sx={{ textAlign: "center", padding: "20px" }}>
          <Button 
            variant="outlined"
            sx={{
              border: "1px solid #6D6D6D",
              color: "black",
              marginRight: "10px"
            }}
          >빙고 복사</Button>
          <Button 
            variant="outlined"
            sx={{
              border: "1px solid #6D6D6D",
              color: "black",
              marginLeft: "10px"
            }}
          >시작하기</Button>
        </Box>
      </Stack>
    </>
  )
}

export default BingoCreate