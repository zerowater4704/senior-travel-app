import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("トークンが見つかりません。");
  }

  jwt.verify(
    token,
    process.env.SECRET_TOKEN as string,
    (err: any, user: any) => {
      if (err) {
        return res.status(403).send("無効なトークンです。");
      }
      req.user = user;
      next();
    }
  );
};
