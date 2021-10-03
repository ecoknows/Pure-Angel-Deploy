import User from "../models/user.model.js";
import Genealogy from "../models/genealogy.model.js";
import {
  DIRECT_REFERRAL_PAYMENT,
  INDIRECT_REFERRAL_LIMIT,
  INDIRECT_REFERRAL_PAYMENT,
  PAIRING_BONUS_PAYMENT,
} from "../constants.js";
import UserVerification from "../models/user.verification.model.js";
import DirectReferral from "../models/direct-referral.model.js";
import IndirectReferral from "../models/indirect-referral.model.js";
import PairingBonus from "../models/pairing-bonus.model.js";

export async function payDirectReferral(user_to_verify) {
  const user_that_invite = await UserVerification.findOne({
    user_id: user_to_verify.user_that_invite.user_id,
  });

  if (user_that_invite) {
    if (user_to_verify.verified) {
      const updateDirectReferral = await DirectReferral.findOne({
        user_id: user_that_invite.user_id,
        "user.user_id": user_to_verify.user_id,
      });

      if (updateDirectReferral) {
        user_that_invite.direct_referral =
          user_that_invite.direct_referral + DIRECT_REFERRAL_PAYMENT;

        updateDirectReferral.income = DIRECT_REFERRAL_PAYMENT;

        await updateDirectReferral.save();
      }
    } else {
      const updateDirectReferral = await DirectReferral.findOne({
        user_id: user_that_invite.user_id,
        "user.user_id": user_to_verify.user_id,
      });

      if (updateDirectReferral) {
        user_that_invite.direct_referral =
          user_that_invite.direct_referral - DIRECT_REFERRAL_PAYMENT;

        updateDirectReferral.income = 0;

        await updateDirectReferral.save();
      }
    }
    await user_that_invite.save();
  }
}

async function indirectReferralRecursion(
  user_to_verify,
  id_of_the_indirect_referral,
  count
) {
  const indirect_referral_user = await UserVerification.findOne({
    user_id: id_of_the_indirect_referral,
  });

  if (indirect_referral_user && count < 5) {
    if (user_to_verify.verified) {
      indirect_referral_user.indirect_referral =
        indirect_referral_user.indirect_referral + INDIRECT_REFERRAL_PAYMENT;

      const updateIndirectReferral = await IndirectReferral.findOne({
        user_id: indirect_referral_user.user_id,
        "user_that_invite.user_id": user_to_verify.user_that_invite.user_id,
        "user.user_id": user_to_verify.user_id,
      });

      if (updateIndirectReferral) {
        updateIndirectReferral.income = INDIRECT_REFERRAL_PAYMENT;
        await updateIndirectReferral.save();
      }
    } else {
      indirect_referral_user.indirect_referral =
        indirect_referral_user.indirect_referral - INDIRECT_REFERRAL_PAYMENT;

      const updateIndirectReferral = await IndirectReferral.findOne({
        user_id: indirect_referral_user.user_id,
        "user_that_invite.user_id": user_to_verify.user_that_invite.user_id,
        "user.user_id": user_to_verify.user_id,
      });
      if (updateIndirectReferral) {
        updateIndirectReferral.income = 0;
        await updateIndirectReferral.save();
      }
    }

    const indirect_user = await indirect_referral_user.save();
    await indirectReferralRecursion(
      user_to_verify,
      indirect_user.user_that_invite.user_id,
      count + 1
    );
  }
}

export async function payIndirectReferral(user_to_verify) {
  const id_of_the_indirect_referral =
    user_to_verify.indirect_referral_user.user_id;
  indirectReferralRecursion(user_to_verify, id_of_the_indirect_referral, 0);
}

export async function checkIfThereIsPairingBonus(user_to_verify, checked) {
  const pairingBonuses = await PairingBonus.find({
    $or: [
      {
        "left.user_id": user_to_verify.user_id,
        right: { $exists: true },
      },
      {
        "right.user_id": user_to_verify.user_id,
        left: { $exists: true },
      },
    ],
  });

  if (pairingBonuses) {
    for (let i = 0; i < pairingBonuses.length; i++) {
      const pairingBonus = await PairingBonus.findById(pairingBonuses[i]._id);

      const user = await UserVerification.findOne({
        user_id: pairingBonus.user_id,
      });

      const left = await UserVerification.findOne({
        user_id: pairingBonus.left.user_id,
      });
      const right = await UserVerification.findOne({
        user_id: pairingBonus.right.user_id,
      });

      if (left.verified && right.verified) {
        user.pairing_bonus = user.pairing_bonus + PAIRING_BONUS_PAYMENT;
        pairingBonus.income = PAIRING_BONUS_PAYMENT;
        await pairingBonus.save();
        await user.save();
      } else if (checked == false && (left.verified || right.verified)) {
        user.pairing_bonus = user.pairing_bonus - PAIRING_BONUS_PAYMENT;
        await user.save();
        pairingBonus.income = 0;
        await pairingBonus.save();
      }
    }
  }
}

export async function roleUpdater(role, schema, secret_code_suffix) {
  switch (role) {
    case "admin":
      schema.is_admin = true;
      schema.is_stockist = undefined;
      schema.is_mega_center = undefined;

      break;
    case "mega center":
      schema.is_mega_center = true;
      schema.is_stockist = undefined;
      schema.is_admin = undefined;

      if (secret_code_suffix) schema.secret_code_suffix = secret_code_suffix;

      break;
    case "stockist":
      schema.is_stockist = true;
      schema.is_mega_center = undefined;
      schema.is_admin = undefined;
      break;
    case "member":
      schema.is_admin = undefined;
      schema.is_mega_center = undefined;
      schema.is_stockist = undefined;
      break;
  }
}

export async function updateGenealogyRole(role, user_id) {
  const genealogy = await Genealogy.findOne({
    user_id: user_id,
  });

  const left_genealogy = await Genealogy.findOne({
    "left_branch.user_id": user_id,
  });

  const right_genealogy = await Genealogy.findOne({
    "right_branch.user_id": user_id,
  });

  if (genealogy) {
    await roleUpdater(role, genealogy, undefined);
    await genealogy.save();
  }

  if (left_genealogy) {
    await roleUpdater(role, left_genealogy.left_branch, undefined);
    await left_genealogy.save();
  }

  if (right_genealogy) {
    await roleUpdater(role, right_genealogy.right_branch, undefined);
    await right_genealogy.save();
  }
}
