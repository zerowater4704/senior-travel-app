import { Router } from "express";
import { createUser, loginUser } from "../controllers/user-controllers";
import { check } from "express-validator";
import dayjs from "dayjs";

const router = Router();

router.post(
  "/",
  [
    check("name").notEmpty().withMessage("名前を入力してください。"),
    check("email")
      .isEmail()
      .withMessage("有効なメールアドレスを入力してください。"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("パスワードは6文字以上にしてください。"),
    check("birthDate")
      .notEmpty()
      .withMessage("生年月日を入力してください。")
      .custom((value) => {
        const birthYear = dayjs(value).year();
        const currentYear = dayjs().year();
        const age = currentYear - birthYear;
        if (age < 50) {
          throw new Error("50以上の方しか登録できません。");
        }
        return true;
      }),
  ],
  createUser
);
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("メールアドレスが間違っています。"),
    check("password").notEmpty().withMessage("パスワードが間違っています。"),
  ],
  loginUser
);

export default router;
