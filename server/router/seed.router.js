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

async function SevenHeads(req, res, codigs) {
  const body = req.body;

  const mega_center = await User.findOne({
    account_number: body.account_number,
    is_mega_center: true,
  });

  let number = req.body.number;

  let ending_code = codigs[number].ending_code;

  for (let i = codigs[number].leader; i <= codigs[number].last_leader; i += 7) {
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
    const codigs = [
      {
        leader: 512,
        last_leader: 729,
        ending_code: 4096,
        expected_total_number: 448,
      },
      {
        leader: 736,
        last_leader: 953,
        ending_code: 4864,
        expected_total_number: 896,
      },
      {
        leader: 960,
        last_leader: 1177,
        ending_code: 5632,
        expected_total_number: 1344,
      },
      {
        leader: 1184,
        last_leader: 1401,
        ending_code: 6400,
        expected_total_number: 1792,
      },
      {
        leader: 1408,
        last_leader: 1625,
        ending_code: 7168,
        expected_total_number: 2240,
      },
      {
        leader: 1632,
        last_leader: 1849,
        ending_code: 7936,
        expected_total_number: 2688,
      },
      {
        leader: 1856,
        last_leader: 2073,
        ending_code: 8704,
        expected_total_number: 3136,
      },
      {
        leader: 2080,
        last_leader: 2297,
        ending_code: 9472,
        expected_total_number: 3584,
      },
      {
        leader: 2304,
        last_leader: 2521,
        ending_code: 10240,
        expected_total_number: 4032,
      },
      {
        leader: 2528,
        last_leader: 2745,
        ending_code: 11008,
        expected_total_number: 4480,
      },
      {
        leader: 2752,
        last_leader: 2969,
        ending_code: 11776,
        expected_total_number: 4928,
      },
      {
        leader: 2976,
        last_leader: 3193,
        ending_code: 12544,
        expected_total_number: 5376,
      },
      {
        leader: 3200,
        last_leader: 3417,
        ending_code: 13312,
        expected_total_number: 5824,
      },
      {
        leader: 3424,
        last_leader: 3641,
        ending_code: 14080,
        expected_total_number: 6272,
      },
      {
        leader: 3648,
        last_leader: 3865,
        ending_code: 14848,
        expected_total_number: 6720,
      },
      {
        leader: 3872,
        last_leader: 4089,
        ending_code: 15616,
        expected_total_number: 7168,
      },
    ];

    SevenHeads(req, res, codigs);
    res.send({
      message: "Sucessfully Seed 7 Heads!",
      expected_total_number:
        codigs[req.body.number].expected_total_number +
        req.body.last_total_ending,
    });
  })
);

async function ThreeHeads(req, res, codigs) {
  const body = req.body;

  const mega_center = await User.findOne({
    account_number: body.account_number,
    is_mega_center: true,
  });

  let number = req.body.number;

  for (let i = codigs[number].leader; i <= codigs[number].last_leader; i += 3) {
    const current_head = await User.findOne({
      account_number: mega_center.secret_code_suffix + "0" + i.toString(),
    });

    const heads_info = [
      {
        array: [1],
      },
    ];

    await createHeads(
      mega_center,
      current_head,
      heads_info,
      0,
      undefined,
      null,
      i + 1,
      null
    );
  }
}

SeedRouter.post(
  "/three-heads",
  expressAsyncHandler(async (req, res) => {
    const codigs = [
      {
        leader: 4096,
        last_leader: 4912,
        ending_code: 4096,
        expected_total_number: 546,
      },
      {
        leader: 4915,
        last_leader: 5731,
        ending_code: 10648,
        expected_total_number: 1092,
      },
      {
        leader: 5734,
        last_leader: 6550,
        ending_code: 17200,
        expected_total_number: 1638,
      },
      {
        leader: 6553,
        last_leader: 7369,
        ending_code: 23752,
        expected_total_number: 2184,
      },
      {
        leader: 7372,
        last_leader: 8188,
        ending_code: 30304,
        expected_total_number: 2730,
      },
      {
        leader: 8191,
        last_leader: 9007,
        ending_code: 36856,
        expected_total_number: 3276,
      },
      {
        leader: 9010,
        last_leader: 9826,
        ending_code: 43408,
        expected_total_number: 3822,
      },
      {
        leader: 9829,
        last_leader: 10645,
        ending_code: 49960,
        expected_total_number: 4368,
      },
      {
        leader: 10648,
        last_leader: 11464,
        ending_code: 56512,
        expected_total_number: 4914,
      },
      {
        leader: 11467,
        last_leader: 12283,
        ending_code: 63064,
        expected_total_number: 5460,
      },
      {
        leader: 12286,
        last_leader: 13102,
        ending_code: 69616,
        expected_total_number: 6006,
      },
      {
        leader: 13105,
        last_leader: 13921,
        ending_code: 76168,
        expected_total_number: 6552,
      },
      {
        leader: 13924,
        last_leader: 14740,
        ending_code: 82720,
        expected_total_number: 7098,
      },
      {
        leader: 14743,
        last_leader: 15559,
        ending_code: 89272,
        expected_total_number: 7644,
      },
      {
        leader: 15562,
        last_leader: 16381,
        ending_code: 95824,
        expected_total_number: 8190,
      },
    ];

    ThreeHeads(req, res, codigs);

    res.send({
      message: "Sucessfully Seed 3 Heads!",
      expected_total_number:
        codigs[req.body.number].expected_total_number +
        req.body.last_total_ending,
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
    for (let i = req.body.start; i <= req.body.end; i += req.body.count) {
      const user = await User.findOne({
        account_number: req.body.code + "0" + i.toString(),
      });

      console.log("not null : ", !(user == null), " number: ", i);
      // user.free_account_leader = req.body.free_account_leader;

      // await user.save();
    }

    res.send({ message: "Sucessfully Put leaders!" });
  })
);

export default SeedRouter;
