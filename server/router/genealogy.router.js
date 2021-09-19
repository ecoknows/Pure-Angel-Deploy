import express from "express";
import expressAsyncHandler from "express-async-handler";
import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import { decodeUserToken } from "../utils.js";

const GenealogyRouter = express.Router();

async function updateGenealogy(genealogy, child_user, res) {
  genealogy.branches.push({
    _id: child_user._id,
    first_name: child_user.first_name,
    last_name: child_user.last_name,
    address: child_user.address,
  });
  genealogy.save();
  res.send({
    message: "New branch has succesfully push to array!",
  });
}

async function addNewGenealogy(genealogy, child_user, current_user, res) {
  genealogy = new Genealogy({
    user_id: current_user._id,
    first_name: current_user.first_name,
    last_name: current_user.last_name,
    address: current_user.address,
    branches: [
      {
        _id: child_user._id,
        first_name: child_user.first_name,
        last_name: child_user.last_name,
        address: child_user.address,
      },
    ],
  });
  genealogy.save();

  res.send({
    message: "New Branch Added Successfully!",
  });
}

async function findChildUser(body) {
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

  return child_user;
}

GenealogyRouter.post(
  "/add",
  decodeUserToken,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;

    let current_user = await User.findById(req.user._id);
    let genealogy = await Genealogy.findOne({ user_id: current_user._id });

    if (genealogy) {
      if (genealogy.branches.length < 2) {
        let child_user = await findChildUser(body);

        await updateGenealogy(genealogy, child_user, res);
      } else {
        res
          .status(409)
          .send({ message: "Branch Exceed only 2 branch allowed!" });
      }
    } else if (genealogy == null && current_user != null) {
      let child_user = await findChildUser(body);

      await addNewGenealogy(genealogy, child_user, current_user, res);
    } else {
      res.status(409).send({ message: "All nulls!" });
    }
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
