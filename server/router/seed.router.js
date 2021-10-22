import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import Genealogy from "../models/genealogy.model.js";
import {
  modifyAdmin,
  createAdminUser,
  createOwner,
  payBonuses,
  createMegaCenters,
  createHeads,
} from "../utils/seed.js";

let SeedRouter = express.Router();

async function SeedStructure(req, res) {
  const owner = await createOwner();

  const left_admin = await createAdminUser(owner, "left", 1);
  const right_admin = await createAdminUser(owner, "right", 2);

  await modifyAdmin(owner, left_admin, right_admin);

  await payBonuses(left_admin);
  await payBonuses(right_admin);

  await createMegaCenters(left_admin, right_admin);

  const heads_info = [
    {
      array: [1, 2, 4, 8, 16],
    },
  ];

  const mega_centers = await User.find({
    is_mega_center: true,
  });

  for (let i = 0; i < mega_centers.length; i++) {
    await createHeads(
      mega_centers[i],
      mega_centers[i],
      heads_info,
      0,
      15,
      2,
      32
    );
  }
}

SeedRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    SeedStructure(req, res);
    res.send({ message: "Sucessfully Seed 31 Heads!" });
  })
);

async function FifteenHeads(req, res) {
  const body = req.body;

  const mega_center = await User.findOne({
    account_number: body.account_number,
    is_mega_center: true,
  });

  let ending_code = req.body.ending_code;

  for (let i = req.body.leader; i <= req.body.last_leader; i += 15) {
    const current_head = await User.findOne({
      account_number: mega_center.secret_code_suffix + "0" + i.toString(),
    });

    const heads_info = [
      {
        array: [1, 2, 4, 8],
      },
    ];

    await createHeads(
      mega_center,
      current_head,
      heads_info,
      0,
      7,
      i + 1,
      ending_code
    );
    ending_code += 112;
  }
}

SeedRouter.post(
  "/fifteen-heads",
  expressAsyncHandler(async (req, res) => {
    FifteenHeads(req, res);
    res.send({ message: "Sucessfully Seed 15 Heads!" });
  })
);

async function SevenHeads(req, res) {
  const body = req.body;

  const mega_center = await User.findOne({
    account_number: body.account_number,
    is_mega_center: true,
  });

  let ending_code = req.body.ending_code;

  for (let i = req.body.leader; i <= req.body.last_leader; i += 7) {
    const current_head = await User.findOne({
      account_number: mega_center.secret_code_suffix + "0" + i.toString(),
    });

    const heads_info = [
      {
        array: [1, 2, 4],
      },
    ];

    await createHeads(
      mega_center,
      current_head,
      heads_info,
      0,
      3,
      i + 1,
      ending_code
    );
    ending_code += 24;
  }
}

SeedRouter.post(
  "/seven-heads",
  expressAsyncHandler(async (req, res) => {
    SevenHeads(req, res);
    res.send({ message: "Sucessfully Seed 31 Heads!" });
  })
);

async function ThreeHeads(req, res) {
  const body = req.body;

  const mega_center = await User.findOne({
    account_number: body.account_number,
    is_mega_center: true,
  });

  for (let root = body.start; root <= body.end; root++) {
    for (let i = 7; i <= 14; i++) {
      for (let x = 3; x <= 6; x++) {
        const current_head = await User.findOne({
          account_number: mega_center.secret_code_suffix + "0" + i.toString(),
        });

        const heads_info = [
          {
            array: [1],
          },
        ];

        await createHeads(mega_center, current_head, heads_info, 0, 1);
      }
    }
  }
}

SeedRouter.post(
  "/three-heads",
  expressAsyncHandler(async (req, res) => {
    ThreeHeads(req, res);
    res.send({
      message:
        "Sucessfully " +
        "Start : " +
        req.body.start.toString() +
        " End: " +
        req.body.end.toString(),
    });
  })
);

async function ModifySevenHeads(req, res, number) {
  const users = await User.find({
    last_name: "Tijada " + number.toString() + " ( 7 Heads )",
  });
  let count = 7;
  let roots = 15;
  for (let x = 0; x < users.length; x++) {
    const user = await User.findById(users[x]._id);

    user.username =
      "analee-" +
      number.toString() +
      "-" +
      count.toString() +
      "-root-" +
      roots.toString() +
      "-root-7-heads";

    await user.save();

    if (count == 14) {
      count = 7;
      roots++;
    } else {
      count++;
    }
  }
}

SeedRouter.post(
  "/modify-seven-heads",
  expressAsyncHandler(async (req, res) => {
    await ModifySevenHeads(req, res, 1);
    await ModifySevenHeads(req, res, 2);
    await ModifySevenHeads(req, res, 3);
    await ModifySevenHeads(req, res, 4);
    await ModifySevenHeads(req, res, 5);
    await ModifySevenHeads(req, res, 6);
    res.send({ message: "Sucessfully Modify 7 Heads" });
  })
);

SeedRouter.post(
  "/clear-unpaid",
  expressAsyncHandler(async (req, res) => {
    const users = await UserVerification.find({});

    for (let i = 0; i < users.length; i++) {
      const user = await UserVerification.findById(users[i]._id);

      user.unpaid_income = 0;

      await user.save();
    }

    res.send({ message: "Sucessfully Clear Unpaid" });
  })
);

SeedRouter.post(
  "/account-number",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({ first_name: req.body.first_name }).sort({
      createdAt: 1,
    });
    await User.updateMany(
      { first_name: req.body.first_name },
      { $unset: { username: 1 } }
    );

    for (let i = 0; i < users.length; i++) {
      const user = await User.findById(users[i]._id);

      user.account_number = req.body.code + i.toString();
      user.secret_code_suffix = req.body.code;

      await user.save();
    }

    res.send({ message: "Sucessfully Updated Username" });
  })
);
SeedRouter.post(
  "/genealogy-account-number",
  expressAsyncHandler(async (req, res) => {
    const genealogies = await Genealogy.find({
      first_name: req.body.first_name,
    });

    for (let i = 0; i < genealogies.length; i++) {
      const genealogy = await Genealogy.findById(genealogies[i]._id);

      const user = await User.findById(genealogy.user_id);
      const leader_number = parseInt(
        user.account_number.substring(req.body.code.length)
      );

      genealogy.account_number = user.account_number;

      const left_count = leader_number * 2 + 1;
      const right_count = leader_number * 2 + 2;

      genealogy.left_branch.account_number =
        req.body.code + left_count.toString();
      genealogy.right_branch.account_number =
        req.body.code + right_count.toString();

      if (genealogy.left_count > 0) {
        const child_count = (genealogy.left_count + 1) / 2;

        genealogy.left_branch.left_count = child_count - 1;
        genealogy.left_branch.right_count = child_count - 1;

        genealogy.right_branch.left_count = child_count - 1;
        genealogy.right_branch.right_count = child_count - 1;
      }

      await genealogy.save();
    }

    res.send({ message: "Sucessfully Updated Genealogy" });
  })
);

SeedRouter.post(
  "/leaders",
  expressAsyncHandler(async (req, res) => {
    const main_user = await User.findOne({
      account_number: req.body.account_number,
    });

    main_user.free_account_leader = 31;

    await main_user.save();

    // 15 Heads
    for (let i = 15; i <= 31; i++) {
      const user = await User.findOne({
        account_number: req.body.code + i.toString(),
      });

      user.free_account_leader = 15;

      await user.save();
    }

    // 7 Heads
    for (let i = 127; i <= 254; i++) {
      const user = await User.findOne({
        account_number: req.body.code + i.toString(),
      });

      user.free_account_leader = 7;

      await user.save();
    }

    // 3 Heads
    for (let i = 511; i <= 1022; i++) {
      const user = await User.findOne({
        account_number: req.body.code + i.toString(),
      });

      user.free_account_leader = 3;

      await user.save();
    }

    res.send({ message: "Sucessfully Updated Username" });
  })
);

export default SeedRouter;
