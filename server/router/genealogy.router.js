import express from "express";
import expressAsyncHandler from "express-async-handler";
import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import { verifyUserToken } from "../utils.js";

import { updateBranches } from "../middlewares/genealogy.js";

const GenealogyRouter = express.Router();

GenealogyRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const root = await Genealogy.findOne({ user_id: req.user._id });

    if (root) {
      const leaves = [];
      await updateBranches(root);
      res.send({
        message: "Sucessfully Fetch Genealogy!",
        data: root,
      });
    } else {
      res.status(401).send({
        message: "Failed to Fetch Genealogy!",
      });
    }
  })
);

GenealogyRouter.post(
  "/view-child",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const root = await Genealogy.findOne({ user_id: req.body.user_id });

    if (root) {
      await updateBranches(root);
      res.send({
        message: "Sucessfully Fetch Genealogy!",
        data: root,
      });
    } else {
      res.status(401).send({
        message: "Failed to Fetch Genealogy!",
      });
    }
  })
);

GenealogyRouter.post(
  "/view-parent",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user_id);

    if (user) {
      const root = await Genealogy.findOne({
        user_id: user.root_user_genealogy.user_id,
      });

      if (root) {
        await updateBranches(root);
        res.send({
          message: "Sucessfully Fetch Genealogy!",
          data: root,
        });
      } else {
        res.status(401).send({
          message: "Failed to Fetch Genealogy!",
        });
      }
    } else {
      res.status(401).send({
        message: "Failed to Fetch Genealogy! User doesn't exist",
      });
    }
  })
);

GenealogyRouter.post(
  "/search-account",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const root = await Genealogy.findOne({
      account_number: req.body.account_number,
    });

    if (root) {
      await updateBranches(root);
      res.send({
        message: "Sucessfully Fetch Account Number: " + req.body.account_number,
        data: root,
      });
    } else {
      res.status(401).send({
        message: "Cannot find Account Number: " + req.body.account_number,
      });
    }
  })
);

GenealogyRouter.post(
  "/fetch-leave",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const root = await Genealogy.findOne({ user_id: req.body.user_id });

    if (root) {
      res.send({
        message: "Successfull!",
        data: root,
      });
    } else {
      res.send({
        message: "No more root!!",
        isReach: true,
      });
    }
  })
);

export default GenealogyRouter;
