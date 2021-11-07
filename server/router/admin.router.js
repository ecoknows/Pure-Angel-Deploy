import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserVerification from "../models/user.verification.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";

const AdminRouter = express.Router();

AdminRouter.get(
  "/users",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    let user = req.user;

    const users = await UserVerification.find({
      secret_code: { $exists: true },
    });

    if (users) {
      res.send({
        message: "Sucessfully fetch Users Table!",
        data: users,
      });
    } else {
      res.status(401).send({
        message: "Empty document",
      });
    }
  })
);

export default AdminRouter;
