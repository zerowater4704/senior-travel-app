import express from "express";
import connectDB from "./db";
import userRouter from "./routes/user";
import cors from "cors";

const app = express();
const PORT = 3000;
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("サーバー起動中");
});
