import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import DirectReferral from "../models/direct-referral.model.js";
import IndirectReferral from "../models/indirect-referral.model.js";
import PairingBonus from "../models/pairing-bonus.model.js";

export async function modifyBranchCountOfRoot(
  root_user_verification_id,
  direction
) {
  const root_genealogy = await Genealogy.findOne({
    user_id: root_user_verification_id,
  });

  if (root_genealogy) {
    if (direction == "left") {
      root_genealogy.left_count = root_genealogy.left_count + 1;
    } else if (direction == "right") {
      root_genealogy.right_count = root_genealogy.right_count + 1;
    }
    await root_genealogy.save();

    const root_user_verification = await UserVerification.findOne({
      user_id: root_user_verification_id,
    });

    if (root_user_verification) {
      await modifyBranchCountOfRoot(
        root_user_verification.root_user_genealogy.user_id,
        root_user_verification.root_user_genealogy.position
      );
    }
  }
}

export async function addPairingBonus(child_user, new_root_user) {
  const new_user_genealogy = new_root_user.root_user_genealogy;

  const rootUserVerification = await UserVerification.findOne({
    user_id: new_user_genealogy.user_id,
  });

  if (rootUserVerification) {
    if (new_user_genealogy.position == "left") {
      const checkIfThereIsLeft = await PairingBonus.findOne({
        user_id: rootUserVerification.user_id,
        left: undefined,
      });

      if (checkIfThereIsLeft) {
        checkIfThereIsLeft.left = {
          user_id: child_user._id,
          first_name: child_user.first_name,
          last_name: child_user.last_name,
          address: child_user.address,
        };

        await checkIfThereIsLeft.save();
      } else {
        const newPairing = new PairingBonus({
          user_id: rootUserVerification.user_id,
          first_name: rootUserVerification.first_name,
          last_name: rootUserVerification.last_name,
          address: rootUserVerification.address,

          left: {
            user_id: child_user._id,
            first_name: child_user.first_name,
            last_name: child_user.last_name,
            address: child_user.address,
          },
        });

        await newPairing.save();
      }

      const newRootUser = await rootUserVerification.save();
      await addPairingBonus(child_user, newRootUser);
    } else if (new_user_genealogy.position == "right") {
      const checkIfThereIsRight = await PairingBonus.findOne({
        user_id: rootUserVerification.user_id,
        right: undefined,
      });

      if (checkIfThereIsRight) {
        checkIfThereIsRight.right = {
          user_id: child_user._id,
          first_name: child_user.first_name,
          last_name: child_user.last_name,
          address: child_user.address,
        };

        await checkIfThereIsRight.save();
      } else {
        const newPairing = new PairingBonus({
          user_id: rootUserVerification.user_id,
          first_name: rootUserVerification.first_name,
          last_name: rootUserVerification.last_name,
          address: rootUserVerification.address,

          right: {
            user_id: child_user._id,
            first_name: child_user.first_name,
            last_name: child_user.last_name,
            address: child_user.address,
          },
        });

        await newPairing.save();
      }

      const newRootUser = await rootUserVerification.save();
      await addPairingBonus(child_user, newRootUser);
    }
  }
}

export async function addDirectReferral(direct_referral_user, child_user) {
  const newDirectReferral = new DirectReferral({
    user_id: direct_referral_user._id,
    first_name: direct_referral_user.first_name,
    last_name: direct_referral_user.last_name,
    address: direct_referral_user.address,

    root_user: {
      user_id: child_user.root_user_genealogy.user_id,
      first_name: child_user.root_user_genealogy.first_name,
      last_name: child_user.root_user_genealogy.last_name,
      address: child_user.root_user_genealogy.address,
    },

    user: {
      user_id: child_user._id,
      first_name: child_user.first_name,
      last_name: child_user.last_name,
      address: child_user.address,
    },
  });

  await newDirectReferral.save();
}

export async function addIndirectReferral(
  id_indirect_referral,
  current_user,
  child_user,
  user_that_invite,
  count
) {
  const indirect_referral_user = await User.findById(id_indirect_referral);

  if (
    indirect_referral_user &&
    count < 5 &&
    user_that_invite._id != indirect_referral_user._id
  ) {
    const newIndirectReferral = await new IndirectReferral({
      user_id: indirect_referral_user._id,
      first_name: indirect_referral_user.first_name,
      last_name: indirect_referral_user.last_name,
      address: indirect_referral_user.address,

      user_that_invite: {
        user_id: current_user._id,
        first_name: current_user.first_name,
        last_name: current_user.last_name,
        address: current_user.address,
      },

      user: {
        user_id: child_user._id,
        first_name: child_user.first_name,
        last_name: child_user.last_name,
        address: child_user.address,
      },

      income: 0,
    });

    await newIndirectReferral.save();

    await addIndirectReferral(
      indirect_referral_user.user_that_invite.user_id,
      current_user,
      child_user,
      user_that_invite,
      count + 1
    );
  }
}

export async function updateGenealogy(genealogy, child_user, req) {
  const position = req.body.position;
  const id_of_the_user_that_invite = req.user._id;

  if (position == "left") {
    genealogy.left_branch = {
      user_id: child_user._id,

      user_that_invite: {
        user_id: id_of_the_user_that_invite,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        address: req.user.address,
      },

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

      user_that_invite: {
        user_id: id_of_the_user_that_invite,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        address: req.user.address,
      },
      first_name: child_user.first_name,
      last_name: child_user.last_name,
      address: child_user.address,
    };
    await genealogy.save();
  }
}

export async function addNewGenealogy(
  genealogy,
  child_user,
  current_user,
  req
) {
  const position = req.body.position;
  const id_of_the_user_that_invite = req.user._id;
  const user_that_invite = await UserVerification.findOne({
    user_id: current_user._id,
  });

  if (position == "left") {
    genealogy = new Genealogy({
      user_id: current_user._id,

      user_that_invite: user_that_invite?.id_of_the_user_that_invite
        ? {
            user_id: user_that_invite.id_of_the_user_that_invite,
            first_name: user_that_invite.first_name,
            last_name: user_that_invite.last_name,
            address: user_that_invite.address,
          }
        : undefined,

      first_name: current_user.first_name,
      last_name: current_user.last_name,
      address: current_user.address,
      left_branch: {
        user_id: child_user._id,
        user_that_invite: {
          user_id: id_of_the_user_that_invite,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          address: req.user.address,
        },
        first_name: child_user.first_name,
        last_name: child_user.last_name,
        address: child_user.address,
      },
    });
    await genealogy.save();
  } else if (position == "right") {
    genealogy = new Genealogy({
      user_id: current_user._id,
      first_name: current_user.first_name,
      user_that_invite: user_that_invite?.id_of_the_user_that_invite
        ? {
            user_id: user_that_invite.id_of_the_user_that_invite,
            first_name: user_that_invite.first_name,
            last_name: user_that_invite.last_name,
            address: user_that_invite.address,
          }
        : undefined,
      last_name: current_user.last_name,
      address: current_user.address,
      right_branch: {
        user_id: child_user._id,
        user_that_invite: {
          user_id: id_of_the_user_that_invite,
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          address: req.user.address,
        },
        first_name: child_user.first_name,
        last_name: child_user.last_name,
        address: child_user.address,
      },
    });
    await genealogy.save();
  }
}

export async function createChildUser(req, current_user, user_that_invite) {
  const body = req.body;

  const position = body.position;

  let child_user = new User({
    first_name: body.first_name,
    last_name: body.last_name,
    address: body.address,
    birthdate: body.birthdate,
    contact_number: body.contact_number,

    root_user_genealogy: {
      user_id: current_user._id,
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      address: current_user.address,
      position: position,
    },
    user_that_invite: {
      user_id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      address: req.user.address,
    },
  });

  child_user = await child_user.save();

  let child_user_verification = new UserVerification({
    user_id: child_user._id,
    first_name: child_user.first_name,
    last_name: child_user.last_name,
    address: child_user.address,
    birthdate: child_user.birthdate,

    user_that_invite: {
      user_id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      address: req.user.address,
    },
    root_user_genealogy: {
      user_id: current_user._id,
      first_name: current_user.first_name,
      last_name: current_user.last_name,
      address: current_user.address,
      position: position,
    },
  });

  if (user_that_invite) {
    child_user_verification.indirect_referral_user.user_id =
      user_that_invite.user_that_invite.user_id;

    child_user_verification.indirect_referral_user.first_name =
      user_that_invite.user_that_invite.first_name;

    child_user_verification.indirect_referral_user.last_name =
      user_that_invite.user_that_invite.last_name;

    child_user_verification.indirect_referral_user.address =
      user_that_invite.user_that_invite.address;
  }

  await child_user_verification.save();

  return child_user;
}

export async function updateBranches(root) {
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
