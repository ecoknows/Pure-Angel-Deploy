import bcrypt from "bcryptjs";
import UserVerification from "../models/user.verification.model.js";
import User from "../models/user.model.js";
import Genealogy from "../models/genealogy.model.js";
import { nanoid } from "nanoid";
import {
  payIndirectReferral,
  payDirectReferral,
  checkIfThereIsPairingBonus,
} from "../utils/admin.js";

import {
  addDirectReferral,
  addIndirectReferral,
  addPairingBonus,
  modifyBranchCountOfRoot,
} from "./genealogy.js";

export async function createOwner() {
  let check_if_ancestor_exist = await User.findOne({ is_ancestor: true });

  if (check_if_ancestor_exist == undefined) {
    let ancestor = await new User({
      username: "teresita",
      password: bcrypt.hashSync("pureangelcoffee", 8),

      first_name: "Teresita",
      last_name: "Negrido Owner",
      address: "Philippines",
      birthdate: "12/02/99",
      contact_number: "09084741500",
      secret_code_suffix: "OWN",
      is_admin: true,
      is_owner: true,
    });

    const ancestorCreated = await ancestor.save();

    let ancestorVerification = await new UserVerification({
      user_id: ancestorCreated._id,
      first_name: "Teresita",
      last_name: "Negrido",
      address: "Philippines",
      birthdate: "12/02/99",
      verified: true,
    });

    await ancestorVerification.save();

    return ancestor;
  }
  return undefined;
}

export async function createAdminUser(owner, position, index) {
  let child_user = new User({
    username: "adminteresita" + index,
    password: bcrypt.hashSync("pureangelcoffee", 8),
    first_name: "Teresita",
    last_name: "Negrido Admin " + index,
    address: "Philippines",
    birthdate: "12/02/99",
    contact_number: "09084741500",
    secret_code_suffix: "OWN",
    is_admin: true,

    root_user_genealogy: {
      user_id: owner._id,
      first_name: owner.first_name,
      last_name: owner.last_name,
      address: owner.address,
      position: position,
    },

    user_that_invite: {
      user_id: owner._id,
      first_name: owner.first_name,
      last_name: owner.last_name,
      address: owner.address,
    },
  });

  child_user = await child_user.save();

  let child_user_verification = new UserVerification({
    user_id: child_user._id,
    first_name: child_user.first_name,
    last_name: child_user.last_name,
    address: child_user.address,
    birthdate: child_user.birthdate,
    secret_code: owner.secret_code_suffix + "-" + nanoid(10),

    user_that_invite: {
      user_id: owner._id,
      first_name: owner.first_name,
      last_name: owner.last_name,
      address: owner.address,
    },
    root_user_genealogy: {
      user_id: owner._id,
      first_name: owner.first_name,
      last_name: owner.last_name,
      address: owner.address,
      position: position,
    },
  });

  if (owner) {
    child_user_verification.indirect_referral_user.user_id =
      owner.user_that_invite.user_id;

    child_user_verification.indirect_referral_user.first_name =
      owner.user_that_invite.first_name;

    child_user_verification.indirect_referral_user.last_name =
      owner.user_that_invite.last_name;

    child_user_verification.indirect_referral_user.address =
      owner.user_that_invite.address;
  }

  await child_user_verification.save();

  return child_user;
}

async function createMegaCenterUser(user_info, admin, position) {
  let child_user = new User({
    username: user_info.username,
    password: bcrypt.hashSync("pureangelcoffee", 8),
    first_name: user_info.first_name,
    last_name: user_info.last_name,
    address: user_info.address,
    birthdate: user_info.birthdate,
    contact_number: user_info.contact_number,
    secret_code_suffix: user_info.secret_code_suffix,
    is_mega_center: true,

    root_user_genealogy: {
      user_id: admin._id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      address: admin.address,
      position: position,
    },

    user_that_invite: {
      user_id: admin._id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      address: admin.address,
    },
  });

  child_user = await child_user.save();

  let child_user_verification = new UserVerification({
    user_id: child_user._id,
    first_name: child_user.first_name,
    last_name: child_user.last_name,
    address: child_user.address,
    birthdate: child_user.birthdate,
    secret_code: admin.secret_code_suffix + "-" + nanoid(10),

    user_that_invite: {
      user_id: admin._id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      address: admin.address,
    },
    root_user_genealogy: {
      user_id: admin._id,
      first_name: admin.first_name,
      last_name: admin.last_name,
      address: admin.address,
      position: position,
    },
  });

  if (admin) {
    child_user_verification.indirect_referral_user.user_id =
      admin.user_that_invite.user_id;

    child_user_verification.indirect_referral_user.first_name =
      admin.user_that_invite.first_name;

    child_user_verification.indirect_referral_user.last_name =
      admin.user_that_invite.last_name;

    child_user_verification.indirect_referral_user.address =
      admin.user_that_invite.address;
  }

  await child_user_verification.save();

  return child_user;
}

export async function modifyAdmin(owner, left_admin, right_admin) {
  await addOwnerGenealogy(owner, left_admin, right_admin);

  await addDirectReferral(owner, left_admin);
  await addDirectReferral(owner, right_admin);

  await addPairingBonus(left_admin, left_admin);
  await addPairingBonus(right_admin, right_admin);

  await modifyBranchCountOfRoot(owner._id, "left");
  await modifyBranchCountOfRoot(owner._id, "right");
}

async function addOwnerGenealogy(owner, left_admin, right_admin) {
  const genealogy = new Genealogy({
    user_id: owner._id,

    is_owner: true,

    first_name: owner.first_name,
    last_name: owner.last_name,
    address: owner.address,

    left_branch: {
      user_id: left_admin._id,
      user_that_invite: {
        user_id: owner._id,
        first_name: owner.first_name,
        last_name: owner.last_name,
        address: owner.address,
      },
      first_name: left_admin.first_name,
      last_name: left_admin.last_name,
      address: left_admin.address,

      is_stockist: left_admin.is_stockist,
      is_admin: left_admin.is_admin,
      is_mega_center: left_admin.is_mega_center,
    },

    right_branch: {
      user_id: right_admin._id,
      user_that_invite: {
        user_id: owner._id,
        first_name: owner.first_name,
        last_name: owner.last_name,
        address: owner.address,
      },
      first_name: right_admin.first_name,
      last_name: right_admin.last_name,
      address: right_admin.address,

      is_stockist: right_admin.is_stockist,
      is_admin: right_admin.is_admin,
      is_mega_center: right_admin.is_mega_center,
    },
  });
  return await genealogy.save();
}

async function modifyMegaCenter(admin, left_mega_center, right_mega_center) {
  await addAdminGenealogy(admin, left_mega_center, right_mega_center);

  await addDirectReferral(admin, left_mega_center);
  await addDirectReferral(admin, right_mega_center);

  await addIndirectReferral(
    admin.user_that_invite.user_id,
    admin,
    left_mega_center,
    admin,
    0
  );
  await addIndirectReferral(
    admin.user_that_invite.user_id,
    admin,
    right_mega_center,
    admin,
    0
  );

  await addPairingBonus(left_mega_center, left_mega_center);
  await addPairingBonus(right_mega_center, right_mega_center);

  await modifyBranchCountOfRoot(admin._id, "left");
  await modifyBranchCountOfRoot(admin._id, "right");
}

async function addAdminGenealogy(admin, left_mega_center, right_mega_center) {
  const genealogy = new Genealogy({
    user_id: admin._id,

    is_admin: true,

    first_name: admin.first_name,
    last_name: admin.last_name,
    address: admin.address,

    user_that_invite: {
      user_id: admin.user_that_invite._id,
      first_name: admin.user_that_invite.first_name,
      last_name: admin.user_that_invite.last_name,
      address: admin.user_that_invite.address,
    },

    left_branch: {
      user_id: left_mega_center._id,

      user_that_invite: {
        user_id: admin._id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        address: admin.address,
      },

      first_name: left_mega_center.first_name,
      last_name: left_mega_center.last_name,
      address: left_mega_center.address,

      is_mega_center: true,
    },

    right_branch: {
      user_id: right_mega_center._id,

      user_that_invite: {
        user_id: admin._id,
        first_name: admin.first_name,
        last_name: admin.last_name,
        address: admin.address,
      },

      first_name: right_mega_center.first_name,
      last_name: right_mega_center.last_name,
      address: right_mega_center.address,

      is_mega_center: true,
    },
  });
  return await genealogy.save();
}

export async function payBonuses(user) {
  const user_to_verify = await UserVerification.findOne({ user_id: user._id });

  user_to_verify.verified = true;

  const update_user_to_verify = await user_to_verify.save();

  await payDirectReferral(update_user_to_verify);

  await payIndirectReferral(update_user_to_verify);

  await checkIfThereIsPairingBonus(update_user_to_verify, true);
}

export async function createMegaCenters(left_admin, right_admin) {
  const teresita_mega_center = await createMegaCenterUser(
    {
      username: "teresita",
      first_name: "Teresita",
      last_name: "Negrido",
      address: "311 D Lakandula St Tondo Manila",
      birthdate: "12/09/99",
      contact_number: "09169644560",
      secret_code_suffix: "NSPAC",
    },
    left_admin,
    "left"
  );

  const reggie_mega_center = await createMegaCenterUser(
    {
      username: "reggie",
      first_name: "Reggie",
      last_name: "Villaraza",
      address: "311 D Lakandula St Tondo Manila",
      birthdate: "12/09/99",
      contact_number: "09176345974",
      secret_code_suffix: "NSMLA",
    },
    left_admin,
    "right"
  );
  await modifyMegaCenter(left_admin, teresita_mega_center, reggie_mega_center);

  await payBonuses(teresita_mega_center);
  await payBonuses(reggie_mega_center);

  const marcelo_mega_center = await createMegaCenterUser(
    {
      username: "marcelo",
      first_name: "Marcelo",
      last_name: "Loterte",
      address: "311 D Lakandula St Tondo Manila",
      birthdate: "12/09/99",
      contact_number: "09474133884",
      secret_code_suffix: "NSCAL",
    },
    right_admin,
    "left"
  );

  const analee_mega_center = await createMegaCenterUser(
    {
      username: "analee",
      first_name: "Analee",
      last_name: "Tijada",
      address: "311 D Lakandula St Tondo Manila",
      birthdate: "12/09/99",
      contact_number: "09187145091",
      secret_code_suffix: "NSAKL",
    },
    right_admin,
    "right"
  );

  await modifyMegaCenter(right_admin, marcelo_mega_center, analee_mega_center);

  await payBonuses(marcelo_mega_center);
  await payBonuses(analee_mega_center);
}

async function modifyBranch(root, left_branch, right_branch) {
  await addDirectReferral(root, left_branch);
  await addDirectReferral(root, right_branch);

  await addIndirectReferral(
    root.user_that_invite.user_id,
    root,
    left_branch,
    root,
    0
  );
  await addIndirectReferral(
    root.user_that_invite.user_id,
    root,
    right_branch,
    root,
    0
  );

  await addPairingBonus(left_branch, left_branch);
  await addPairingBonus(right_branch, right_branch);

  await modifyBranchCountOfRoot(root._id, "left");
  await modifyBranchCountOfRoot(root._id, "right");
}

export async function createHeads(mega_center) {
  let root_container = [mega_center];
  let array_leaves = [1, 2, 4, 8];
  let code = 1;

  for (let i = 0; i < 4; i++) {
    let new_root_container = [];
    let root_container_counter = 0;
    for (let y = 0; y < array_leaves[i]; y++) {
      const current_root = root_container[root_container_counter];

      const left_new_user = await branchesAction(
        current_root,
        "left",
        mega_center,
        code
      );
      code++;
      const right_new_user = await branchesAction(
        current_root,
        "right",
        mega_center,
        code
      );
      code++;

      await addHeadsGenealogy(current_root, left_new_user, right_new_user);
      await modifyBranch(current_root, left_new_user, right_new_user);

      await payBonuses(left_new_user);
      await payBonuses(right_new_user);

      new_root_container.push(left_new_user);
      new_root_container.push(right_new_user);
      root_container_counter++;
    }
    root_container = new_root_container;
  }
}

async function branchesAction(current_root, position, mega_center, code) {
  let child_user = new User({
    username: mega_center.username + code,
    password: bcrypt.hashSync("pureangelcoffee", 8),
    first_name: current_root.first_name,
    last_name: mega_center.last_name + " " + code,
    address: current_root.address,
    birthdate: current_root.birthdate,
    contact_number: current_root.contact_number,
    secret_code_suffix: current_root.secret_code_suffix,

    root_user_genealogy: {
      user_id: current_root._id,
      first_name: current_root.first_name,
      last_name: current_root.last_name,
      address: current_root.address,
      position: position,
    },

    user_that_invite: {
      user_id: current_root._id,
      first_name: current_root.first_name,
      last_name: current_root.last_name,
      address: current_root.address,
    },
  });

  child_user = await child_user.save();

  let child_user_verification = new UserVerification({
    user_id: child_user._id,
    first_name: child_user.first_name,
    last_name: mega_center.last_name + " " + code,
    address: child_user.address,
    birthdate: child_user.birthdate,
    secret_code: current_root.secret_code_suffix + "-" + nanoid(10),

    user_that_invite: {
      user_id: current_root._id,
      first_name: current_root.first_name,
      last_name: current_root.last_name,
      address: current_root.address,
    },
    root_user_genealogy: {
      user_id: current_root._id,
      first_name: current_root.first_name,
      last_name: current_root.last_name,
      address: current_root.address,
      position: position,
    },
  });

  if (current_root) {
    child_user_verification.indirect_referral_user.user_id =
      current_root.user_that_invite.user_id;

    child_user_verification.indirect_referral_user.first_name =
      current_root.user_that_invite.first_name;

    child_user_verification.indirect_referral_user.last_name =
      current_root.user_that_invite.last_name;

    child_user_verification.indirect_referral_user.address =
      current_root.user_that_invite.address;
  }

  await child_user_verification.save();

  return child_user;
}

async function addHeadsGenealogy(current_root, left_branch, right_branch) {
  const genealogy = new Genealogy({
    user_id: current_root._id,

    first_name: current_root.first_name,
    last_name: current_root.last_name,
    address: current_root.address,
    is_mega_center: current_root.is_mega_center,

    user_that_invite: {
      user_id: current_root.user_that_invite._id,
      first_name: current_root.user_that_invite.first_name,
      last_name: current_root.user_that_invite.last_name,
      address: current_root.user_that_invite.address,
    },

    left_branch: {
      user_id: left_branch._id,

      user_that_invite: {
        user_id: current_root._id,
        first_name: current_root.first_name,
        last_name: current_root.last_name,
        address: current_root.address,
      },

      first_name: left_branch.first_name,
      last_name: left_branch.last_name,
      address: left_branch.address,
    },

    right_branch: {
      user_id: right_branch._id,

      user_that_invite: {
        user_id: current_root._id,
        first_name: current_root.first_name,
        last_name: current_root.last_name,
        address: current_root.address,
      },

      first_name: right_branch.first_name,
      last_name: right_branch.last_name,
      address: right_branch.address,
    },
  });
  return await genealogy.save();
}
