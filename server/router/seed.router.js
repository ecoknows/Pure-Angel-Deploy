import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import {
  modifyAdmin,
  createAdminUser,
  createOwner,
  payBonuses,
  createMegaCenters,
  createHeads,
} from "../utils/seed.js";

let SeedRouter = express.Router();

SeedRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const owner = await createOwner();

    const left_admin = await createAdminUser(owner, "left", 1);
    const right_admin = await createAdminUser(owner, "right", 2);

    await modifyAdmin(owner, left_admin, right_admin);

    await payBonuses(left_admin);
    await payBonuses(right_admin);

    await createMegaCenters(left_admin, right_admin);

    const mega_centers = await User.find({
      is_mega_center: true,
    });

    for (let i = 0; i < mega_centers.length; i++) {
      await createHeads(mega_centers[i]);
    }

    res.send({ message: "Sucessfully Seed 31 Heads!" });
  })
);

export default SeedRouter;
