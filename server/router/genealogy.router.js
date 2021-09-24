import express from "express";
import expressAsyncHandler from "express-async-handler";
import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import { verifyUserToken } from "../utils.js";

const GenealogyRouter = express.Router();

async function updateGenealogy(
  genealogy,
  child_user,
  res,
  position,
  id_of_the_user_that_invite
) {
  if (position == "left") {
    genealogy.left_branch = {
      user_id: child_user._id,
      id_of_the_user_that_invite,
      first_name: child_user.first_name,
      last_name: child_user.last_name,
      address: child_user.address,
    };
    await genealogy.save();
    res.send({
      message: "New branch has succesfully push to array!",
    });
  } else if (position == "right") {
    genealogy.right_branch = {
      user_id: child_user._id,
      id_of_the_user_that_invite,
      first_name: child_user.first_name,
      last_name: child_user.last_name,
      address: child_user.address,
    };
    await genealogy.save();
    res.send({
      message: "New branch has succesfully push to array!",
    });
  } else {
    res.stats(409).send({
      message: "Oppss incorrect position!",
    });
  }
}

async function addNewGenealogy(
  genealogy,
  child_user,
  current_user,
  res,
  position,
  id_of_the_user_that_invite
) {
  if (position == "left") {
    genealogy = new Genealogy({
      user_id: current_user._id,
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      address: current_user.address,
      left_branch: {
        user_id: child_user._id,
        id_of_the_user_that_invite,
        first_name: child_user.first_name,
        last_name: child_user.last_name,
        address: child_user.address,
      },
    });
    await genealogy.save();
  } else {
    genealogy = new Genealogy({
      user_id: current_user._id,
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      address: current_user.address,
      right_branch: {
        user_id: child_user._id,
        id_of_the_user_that_invite,
        first_name: child_user.first_name,
        last_name: child_user.last_name,
        address: child_user.address,
      },
    });
    await genealogy.save();
  }

  res.send({
    message: "New Branch Added Successfully!",
  });
}

async function createChildUser(body, id_of_the_user_that_invite) {
  let child_user = new User({
    first_name: body.first_name,
    last_name: body.last_name,
    address: body.address,
    birthdate: body.birthdate,
  });

  child_user = await child_user.save();

  let child_user_verification = new UserVerification({
    user_id: child_user._id,
    first_name: child_user.first_name,
    last_name: child_user.last_name,
    address: child_user.address,
    birthdate: body.birthdate,
    id_of_the_user_that_invite,
  });

  child_user_verification.save();

  return child_user;
}

GenealogyRouter.post(
  "/add",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const position = req.body.position;
    const id_of_the_user_that_invite = req.user._id;

    let current_user = await User.findById(body.root_id);
    console.log(body.root_id);

    let genealogy = await Genealogy.findOne({ user_id: current_user._id });

    if (genealogy) {
      if (genealogy.right_branch || genealogy.left_branch) {
        let child_user = await createChildUser(
          body,
          id_of_the_user_that_invite
        );

        await updateGenealogy(
          genealogy,
          child_user,
          res,
          position,
          id_of_the_user_that_invite
        );
      } else {
        res
          .status(409)
          .send({ message: "Branch Exceed only 2 branch allowed!" });
      }
    } else if (genealogy == null && current_user != null) {
      let child_user = await createChildUser(body, id_of_the_user_that_invite);

      await addNewGenealogy(
        genealogy,
        child_user,
        current_user,
        res,
        position,
        id_of_the_user_that_invite
      );
    } else {
      res.status(409).send({ message: "All nulls!" });
    }
  })
);

async function updateBranches(root) {
  if (root.left_branch) {
    const branch = root.left_branch;
    const newBranch = await Genealogy.findOne({ user_id: branch.user_id });
    if (newBranch) {
      root.left_branch = newBranch;
      await updateBranches(root.left_branch);
    }
  }

  if (root.right_branch) {
    const branch = root.right_branch;
    const newBranch = await Genealogy.findOne({ user_id: branch.user_id });
    if (newBranch) {
      root.right_branch = newBranch;
      await updateBranches(root.right_branch);
    }
  }
}

GenealogyRouter.get(
  "/",
  verifyUserToken,
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
