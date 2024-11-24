import { challengeSignUp } from "../services/challenge.service.js";
import { bodyToChallenge } from "../dtos/challenge.dto.js";
import { addChallenge } from "../services/challenge.service.js";


export const handleChallengeSignUp = async (req, res) => {
    try {
        console.log("챌린지 추가 요청이 들어왔습니다!");
        console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    
        const challenge = await addChallenge(bodyToChallenge(req.body));
    
        res.status(StatusCodes.OK).success(challenge);
      } catch (err) {
        next(err);
      }
    };