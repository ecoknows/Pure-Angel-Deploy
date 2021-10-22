import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken, generateUserToken } from "../utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import UserVerification from "../models/user.verification.model.js";
import { updateUserAuthentication } from "../utils/user.js";

const UserRouter = express.Router();

UserRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      account_number: req.body.account_number,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          message: "Successfully Login",
          userToken: generateUserToken(user),
        });
      } else {
        res.status(401).send({
          message: "Failed Login",
        });
      }
    } else {
      res.status(401).send({
        message: "Failed Login",
      });
    }
  })
);

UserRouter.get(
  "/user-details",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.send({
        message: "Successfully fetch User",
        data: user,
      });
    } else {
      res.send({
        message: "Failed to fetch!",
      });
    }
  })
);

UserRouter.get(
  "/income",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const income = await UserVerification.findOne({ user_id: req.user._id });

    if (income) {
      res.send({
        message: "Successfully fetch User",
        data: income,
      });
    } else {
      res.send({
        message: "Failed to fetch!",
      });
    }
  })
);

UserRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const body = req.body;

    let userVerification = await UserVerification.findOne({
      first_name: body.first_name,
      last_name: body.last_name,
      birthdate: body.birthdate,
      address: body.address,
    });

    if (
      userVerification &&
      userVerification.secret_code == body.secret_code &&
      userVerification.verified
    ) {
      let user = await User.findById(userVerification.user_id);
      user.password = bcrypt.hashSync(body.password, 8);
      user.username = body.username;

      let updated_user = await user.save();

      res.send({
        message: "User Updated Successfully!",
        userToken: generateUserToken(updated_user),
      });
    } else {
      res.status(404).send({
        message: "Cannot find the correct user please, double check!",
      });
    }
  })
);

UserRouter.post(
  "/create-owner",
  expressAsyncHandler(async (req, res) => {
    let check_if_ancestor_exist = await User.findOne({ is_ancestor: true });
    if (check_if_ancestor_exist) {
      res
        .status(409)
        .send({ message: "Oppss don't try to create a new owner!" });
    } else {
      let body = req.body;
      let ancestor = await new User({
        account_number: body.account_number,
        password: bcrypt.hashSync(body.password, 8),

        first_name: body.first_name,
        last_name: body.last_name,
        address: body.address,
        birthdate: body.birthdate,
        contact_number: body.contact_number,
        secret_code_suffix: body.secret_code_suffix,
        is_admin: true,
        is_owner: true,
      });
      const ancestorCreated = await ancestor.save();

      let ancestorVerification = await new UserVerification({
        user_id: ancestorCreated._id,
        first_name: body.first_name,
        last_name: body.last_name,
        address: body.address,
        birthdate: body.birthdate,
        verified: true,
      });

      await ancestorVerification.save();
      res.send({ message: "Successfully created an Owner!" });
    }
  })
);

UserRouter.post(
  "/update-user",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const update_info = req.body.update_info;

    const existing_user = await User.findById(user._id);

    if (existing_user) {
      if (update_info.new_password) {
        if (
          bcrypt.compareSync(update_info.old_password, existing_user.password)
        ) {
          existing_user.password = bcrypt.hashSync(update_info.new_password, 8);

          const updated_user = await updateUserAuthentication(
            update_info,
            existing_user
          );

          // if (existing_user.free_account_leader == 31) {
          //   for (let i = 1; i <= 30; i++) {
          //     const user_to_verify = await User.findOne({
          //       account_number:
          //         existing_user.secret_code_suffix.substring(2) + i.toString(),
          //     });

          //     await updateUserAuthentication(update_info, user_to_verify);
          //   }
          // } else if (existing_user.free_account_leader == 15) {
          //   const code = existing_user.secret_code_suffix.substring(2);
          //   const leader_number = parseInt(
          //     existing_user.account_number.substring(code.length)
          //   );

          //   const first_level = leader_number * 2 + 1;

          //   for (let i = first_level; i <= first_level + 1; i++) {
          //     const user_to_verify = await User.findOne({
          //       account_number: code + i.toString(),
          //     });
          //     await updateUserAuthentication(update_info, user_to_verify);
          //   }

          //   const second_level = first_level * 2 + 1;

          //   for (let i = second_level; i <= second_level + 3; i++) {
          //     const user_to_verify = await User.findOne({
          //       account_number: code + i.toString(),
          //     });
          //     await updateUserAuthentication(update_info, user_to_verify);
          //   }

          //   const third_level = second_level * 2 + 1;

          //   for (let i = third_level; i <= third_level + 7; i++) {
          //     const user_to_verify = await User.findOne({
          //       account_number: code + i.toString(),
          //     });
          //     await updateUserAuthentication(update_info, user_to_verify);
          //   }
          // } else if (existing_user.free_account_leader == 7) {
          //   const code = existing_user.secret_code_suffix.substring(2);

          //   const leader_number = parseInt(
          //     existing_user.account_number.substring(code.length)
          //   );

          //   const first_level = leader_number * 2 + 1;

          //   for (let i = first_level; i <= first_level + 1; i++) {
          //     const user_to_verify = await User.findOne({
          //       account_number: code + i.toString(),
          //     });
          //     await updateUserAuthentication(update_info, user_to_verify);
          //   }

          //   const second_level = first_level * 2 + 1;

          //   for (let i = second_level; i <= second_level + 3; i++) {
          //     const user_to_verify = await User.findOne({
          //       account_number: code + i.toString(),
          //     });
          //     await updateUserAuthentication(update_info, user_to_verify);
          //   }
          // } else if (existing_user.free_account_leader == 3) {
          //   const code = existing_user.secret_code_suffix.substring(2);

          //   const leader_number = parseInt(
          //     existing_user.account_number.substring(code.length)
          //   );

          //   const first_level = leader_number * 2 + 1;

          //   for (let i = first_level; i <= first_level + 1; i++) {
          //     const user_to_verify = await User.findOne({
          //       account_number: code + i.toString(),
          //     });
          //     await updateUserAuthentication(update_info, user_to_verify);
          //   }
          // }

          res.send({
            message: "Successfully Updated the User",
            userToken: generateUserToken(updated_user),
          });
        } else {
          res.status(404).send({ message: "Old password doesn't match" });
        }
      } else {
        const updated_user = await updateUserAuthentication(
          update_info,
          existing_user
        );

        // if (existing_user.free_account_leader == 31) {
        //   for (let i = 1; i <= 30; i++) {
        //     const user_to_verify = await User.findOne({
        //       account_number:
        //         existing_user.secret_code_suffix.substring(2) + i.toString(),
        //     });

        //     await updateUserAuthentication(update_info, user_to_verify);
        //   }
        // } else if (existing_user.free_account_leader == 15) {
        //   const code = existing_user.secret_code_suffix.substring(2);
        //   const leader_number = parseInt(
        //     existing_user.account_number.substring(code.length)
        //   );

        //   const first_level = leader_number * 2 + 1;

        //   for (let i = first_level; i <= first_level + 1; i++) {
        //     const user_to_verify = await User.findOne({
        //       account_number: code + i.toString(),
        //     });
        //     await updateUserAuthentication(update_info, user_to_verify);
        //   }

        //   const second_level = first_level * 2 + 1;

        //   for (let i = second_level; i <= second_level + 3; i++) {
        //     const user_to_verify = await User.findOne({
        //       account_number: code + i.toString(),
        //     });
        //     await updateUserAuthentication(update_info, user_to_verify);
        //   }

        //   const third_level = second_level * 2 + 1;

        //   for (let i = third_level; i <= third_level + 7; i++) {
        //     const user_to_verify = await User.findOne({
        //       account_number: code + i.toString(),
        //     });
        //     await updateUserAuthentication(update_info, user_to_verify);
        //   }
        // } else if (existing_user.free_account_leader == 7) {
        //   const code = existing_user.secret_code_suffix.substring(2);

        //   const leader_number = parseInt(
        //     existing_user.account_number.substring(code.length)
        //   );

        //   const first_level = leader_number * 2 + 1;

        //   for (let i = first_level; i <= first_level + 1; i++) {
        //     const user_to_verify = await User.findOne({
        //       account_number: code + i.toString(),
        //     });
        //     await updateUserAuthentication(update_info, user_to_verify);
        //   }

        //   const second_level = first_level * 2 + 1;

        //   for (let i = second_level; i <= second_level + 3; i++) {
        //     const user_to_verify = await User.findOne({
        //       account_number: code + i.toString(),
        //     });
        //     await updateUserAuthentication(update_info, user_to_verify);
        //   }
        // } else if (existing_user.free_account_leader == 3) {
        //   const code = existing_user.secret_code_suffix.substring(2);

        //   const leader_number = parseInt(
        //     existing_user.account_number.substring(code.length)
        //   );

        //   const first_level = leader_number * 2 + 1;

        //   for (let i = first_level; i <= first_level + 1; i++) {
        //     const user_to_verify = await User.findOne({
        //       account_number: code + i.toString(),
        //     });
        //     await updateUserAuthentication(update_info, user_to_verify);
        //   }
        // }

        res.send({
          message: "Successfully Updated the User",
          userToken: generateUserToken(updated_user),
        });
      }
    } else {
      res.status(404).send({ message: "Cannot Find user" });
    }
  })
);

export default UserRouter;
