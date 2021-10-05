import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UtilsRouter from "./server/router/utils.router.js";
import UserRouter from "./server/router/user.router.js";
import GenealogyRouter from "./server/router/genealogy.router.js";
import DirectReferralRouter from "./server/router/direct-referral.router.js";
import AdminRouter from "./server/router/admin.router.js";

import path from "path";
import IndirectReferralRouter from "./server/router/indirect-referral.router.js";
import PairingBonusRouter from "./server/router/pairing-bonus.router.js";
import SeedRouter from "./server/router/seed.router.js";

const __dirname = path.resolve();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to Database!");
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/dist/pure-angel-coffee"));

app.use(UtilsRouter);

app.use("/api/user", UserRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/genealogy", GenealogyRouter);
app.use("/api/direct-referral", DirectReferralRouter);
app.use("/api/indirect-referral", IndirectReferralRouter);
app.use("/api/pairing-bonus", PairingBonusRouter);
app.use("/api/seed", SeedRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/pure-angel-coffee/index.html"));
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
