import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  try {
    const user = bodyToUser(req.body); // 요청 본문에서 사용자 정보를 변환
    // 이후 사용자 생성 및 응답 처리 로직 추가
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

// controllers/user.controller.js

export const getUser = async (req, res) => {
  console.log('Received request for userId:', req.params.userId); // 로그 추가
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { userId: Number(userId) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};


