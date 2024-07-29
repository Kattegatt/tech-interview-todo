import express from "express";
import dotenv from "dotenv";
import router from "./routes/TaskRouter.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.use("/api/tasks", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
