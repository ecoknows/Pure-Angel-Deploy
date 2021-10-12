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

    const heads_info = [
      {
        array: [1, 2, 4, 8],
        name: "( 31 Heads )",
        username: "_31_heads",
      },
      {
        array: [1, 2, 4],
        name: "( 15 Heads )",
        username: "_15_heads",
      },
      {
        array: [1, 2],
        name: "( 7 Heads )",
        username: "_7_heads",
      },
      {
        array: [1],
        name: "( 3 Heads )",
        username: "_3_heads",
      },
    ];

    const mega_centers = await User.find({
      is_mega_center: true,
    });

    for (let i = 0; i < mega_centers.length; i++) {
      await createHeads(mega_centers[i], mega_centers[i], heads_info, 0);
    }

    res.send({ message: "Sucessfully Seed 31 Heads!" });
  })
);

export default SeedRouter;
