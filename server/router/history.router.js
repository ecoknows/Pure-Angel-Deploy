import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken } from "../utils.js";
import History from "../models/history.model.js";

let HistoryRouter = express.Router();

HistoryRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    let history = await History.find({
      user_id: user._id,
    });

    if (history) {
      res.send({
        message: "Successfully Fetch Data!",
        data: history,
      });
    } else {
      res.send({
        message: "Cannot find history!",
      });
    }
  })
);

export default HistoryRouter;
