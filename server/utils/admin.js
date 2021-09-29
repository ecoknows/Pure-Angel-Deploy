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

export async function payDirectReferral(user_to_verify) {
  const user_that_invite = await User.findById(
    user_to_verify.user_that_invite.user_id
  );

  if (user_that_invite) {
    if (user_to_verify.verified) {
      const updateDirectReferral = await DirectReferral.findOne({
        user_id: user_that_invite._id,
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
        user_id: user_that_invite._id,
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
  const indirect_referral_user = await User.findById(
    id_of_the_indirect_referral
  );

  if (indirect_referral_user && count < 5) {
    if (user_to_verify.verified) {
      indirect_referral_user.indirect_referral =
        indirect_referral_user.indirect_referral + INDIRECT_REFERRAL_PAYMENT;

      user_to_verify.income_indirect_referral =
        user_to_verify.income_indirect_referral + INDIRECT_REFERRAL_PAYMENT;

      await user_to_verify.save();

      const updateIndirectReferral = await IndirectReferral.findOne({
        user_id: indirect_referral_user._id,
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

      user_to_verify.income_indirect_referral =
        user_to_verify.income_indirect_referral - INDIRECT_REFERRAL_PAYMENT;

      await user_to_verify.save();

      const updateIndirectReferral = await IndirectReferral.findOne({
        user_id: indirect_referral_user._id,
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
  const id_of_the_indirect_referral = user_to_verify.indirect_referral.user_id;
  indirectReferralRecursion(user_to_verify, id_of_the_indirect_referral, 0);
}

export async function checkIfThereIsPairingBonus(user_to_verify, checked) {
  const id_of_the_root_user_genealogy =
    user_to_verify.root_user_genealogy.user_id;

  const genealogy_of_user_that_invite = await Genealogy.findOne({
    user_id: id_of_the_root_user_genealogy,
  });

  if (
    genealogy_of_user_that_invite &&
    genealogy_of_user_that_invite.right_branch &&
    genealogy_of_user_that_invite.left_branch
  ) {
    const right_branch_user = await UserVerification.findOne({
      user_id: genealogy_of_user_that_invite.right_branch.user_id,
    });
    const left_branch_user = await UserVerification.findOne({
      user_id: genealogy_of_user_that_invite.left_branch.user_id,
    });

    if (left_branch_user && right_branch_user) {
      const root_user_genealogy = await User.findById(
        id_of_the_root_user_genealogy
      );

      if (left_branch_user.verified && right_branch_user.verified) {
        root_user_genealogy.pairing_bonus =
          root_user_genealogy.pairing_bonus + PAIRING_BONUS_PAYMENT;

        user_to_verify.income_pairing_bonus = PAIRING_BONUS_PAYMENT;

        // const newTransaction = new Transaction({
        //   user_id: root_user_genealogy._id,

        //   first_name: root_user_genealogy.first_name,
        //   last_name: root_user_genealogy.first_name,

        //   pairing_bonus_info: {
        //     root_user_id: genealogy_of_user_that_invite.user_id,
        //     root_first_name: genealogy_of_user_that_invite.first_name,
        //     root_last_name: genealogy_of_user_that_invite.last_name,

        //     right_user_id: right_branch_user.user_id,
        //     right_first_name: right_branch_user.first_name,
        //     right_last_name: right_branch_user.last_name,

        //     left_user_id: left_branch_user.user_id,
        //     left_first_name: left_branch_user.first_name,
        //     left_last_name: left_branch_user.last_name,
        //   },
        //   income_pairing_bonus: PAIRING_BONUS_PAYMENT,
        // });
        // await newTransaction.save();

        await user_to_verify.save();
        await root_user_genealogy.save();
      } else if (
        (left_branch_user.verified || right_branch_user.verified) &&
        checked == false
      ) {
        root_user_genealogy.pairing_bonus =
          root_user_genealogy.pairing_bonus - PAIRING_BONUS_PAYMENT;

        if (user_to_verify.income_pairing_bonus == undefined) {
          user_to_verify.income_pairing_bonus = 0;
        } else {
          if (right_branch_user.user_id == user_to_verify.user_id) {
            left_branch_user.income_pairing_bonus = 0;
            await left_branch_user.save();
          } else if (left_branch_user.user_id == user_to_verify.user_id) {
            right_branch_user.income_pairing_bonus = 0;
            await right_branch_user.save();
          }
        }

        // await Transaction.deleteOne({
        //   user_id: root_user_genealogy._id,
        //   root_id: genealogy_of_user_that_invite.user_id,
        //   right_id: right_branch_user.user_id,
        //   left_id: left_branch_user.user_id,
        // });

        await user_to_verify.save();
        await root_user_genealogy.save();
      }
    }
  }
}
