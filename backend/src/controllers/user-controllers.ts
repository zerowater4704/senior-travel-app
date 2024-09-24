import User from "../modle/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dayjs from "dayjs";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, birthDate, image } = req.body;

  const currentYear = dayjs().year();
  const birthYear = dayjs(birthDate).year();
  const age = currentYear - birthYear;

  if (age < 50) {
    return res.status(400).json({ message: "50以上の方しか登録できません。" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "今のメールアドレスは既に登録されています。" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    birthDate,
    image,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "新規登録APIにエラーが発生しました。", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "emailがまちがいました。" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "パスワードがまちがいました。" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_TOKEN as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user: { name: user.name, id: user._id } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "ログインAPIにエラーになりました。", error });
  }
};
