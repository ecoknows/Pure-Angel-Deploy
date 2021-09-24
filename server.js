import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UtilsRouter from "./server/router/utils.router.js";
import UserRouter from "./server/router/user.router.js";
import GenealogyRouter from "./server/router/genealogy.router.js";
import DirectReferralRouter from "./server/router/direct-referral.router.js";
import AdminRouter from "./server/router/admin.router.js";

dotenv.config();

mongoose.connect(process.env.TESTING_DATABASE).then(() => {
  console.log("Connected to Database!");
});

const app = express();
const port = process.env.PORT || 3000;

app.use(UtilsRouter);

app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/genealogy", GenealogyRouter);
app.use("/api/direct-referral", DirectReferralRouter);

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
