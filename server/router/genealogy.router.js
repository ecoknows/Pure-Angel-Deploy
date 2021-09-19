import express from "express";
import expressAsyncHandler from "express-async-handler";
import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import { decodeUserToken } from "../utils.js";

const GenealogyRouter = express.Router();

async function addNewGenealogy(genealogy, child_id) {
  let newBranch = await User.findById(child_id);
  genealogy.branches.push({
    _id: newBranch._id,
    first_name: newBranch.first_name,
    last_name: newBranch.last_name,
    address: newBranch.address,
  });
  genealogy.save();
}

async function updateGenealogy(genealogy, child_id, root) {
  let newBranch = await User.findById(child_id);
  genealogy = new Genealogy({
    user_id: root._id,
    first_name: root.first_name,
    last_name: root.last_name,
    address: root.address,
    branches: [
      {
        _id: newBranch._id,
        first_name: newBranch.first_name,
        last_name: newBranch.last_name,
        address: newBranch.address,
      },
    ],
  });
  genealogy.save();
}

GenealogyRouter.post(
  "/add",
  decodeUserToken,
  expressAsyncHandler(async (req, res) => {
    const current_user = req.user;
    const body = req.body;

    let child_user = await User.findOne({
      first_name: body.first_name,
      last_name: body.last_name,
      address: body.address,
      birthdate: body.birthdate,
    });

    if (child_user == null) {
      child_user = new User({
        first_name: body.first_name,
        last_name: body.last_name,
        address: body.address,
        birthdate: body.birthdate,
      });

      child_user = await child_user.save();
    }

    const child_id = child_user._id;

    let genealogy = await Genealogy.findOne({ user_id: current_user._id });

    if (genealogy) {
      addNewGenealogy(genealogy, child_id);
    } else {
      updateGenealogy(genealogy, child_id, current_user);
    }

    res.send({
      message: "User Created and Branch Added Successfully!",
    });
  })
);

async function updateBranches(root) {
  if (root.branches.length > 0) {
    for (let i = 0; i < root.branches.length; i++) {
      let branch = root.branches[i];
      const newBranch = await Genealogy.findOne({ user_id: branch._id });
      if (newBranch) {
        root.branches[i] = newBranch;
        updateBranches(root.branches[i]);
      }
    }
  }
}

GenealogyRouter.get(
  "/",
  decodeUserToken,
  expressAsyncHandler(async (req, res) => {
    const root = await Genealogy.findOne({ user_id: req.user._id });

    if (root) {
      await updateBranches(root);
      res.send({
        message: "Sucessfully Fetch Genealogy!",
        data: root,
      });
    } else {
      res.send({
        message: "Failed to Fetch Genealogy!",
        data: root,
      });
    }
  })
);

export default GenealogyRouter;
