import User from "../models/user.model.js";
import Genealogy from "../models/genealogy.model.js";
import {
  DIRECT_REFERRAL_PAYMENT,
  INDIRECT_REFERRAL_LIMIT,
  INDIRECT_REFERRAL_PAYMENT,
  PAIRING_BONUS_PAYMENT,
} from "../constants.js";
import UserVerification from "../models/user.verification.model.js";
import Transaction from "../models/transaction.model.js";

export async function payDirectReferral(user_to_verify) {
  const user_that_invite = await User.findById(
    user_to_verify.id_of_the_user_that_invite
  );

  if (user_that_invite) {
    user_that_invite.direct_referral = user_to_verify.verified
      ? user_that_invite.direct_referral + DIRECT_REFERRAL_PAYMENT
      : user_that_invite.direct_referral - DIRECT_REFERRAL_PAYMENT;
    await user_that_invite.save();
  }
}

export async function payIndirectReferral(user_to_verify) {
  const id_of_the_user_that_invite = user_to_verify.id_of_the_user_that_invite;
  const id_of_the_indirect_referral =
    user_to_verify.id_of_the_indirect_referral;

  const direct_referral_user = await UserVerification.findOne({
    user_id: id_of_the_user_that_invite,
  });

  if (
    direct_referral_user &&
    user_to_verify.indirect_referral_count < INDIRECT_REFERRAL_LIMIT
  ) {
    const indirect_referra_user = await User.findById(
      id_of_the_indirect_referral
    );

    if (user_to_verify.verified) {
      indirect_referra_user.indirect_referral =
        indirect_referra_user.indirect_referral + INDIRECT_REFERRAL_PAYMENT;

      user_to_verify.indirect_referral_count =
        user_to_verify.indirect_referral_count + 1;

      user_to_verify.income_indirect_referral = INDIRECT_REFERRAL_PAYMENT;
    } else {
      indirect_referra_user.indirect_referral =
        indirect_referra_user.indirect_referral - INDIRECT_REFERRAL_PAYMENT;

      user_to_verify.indirect_referral_count =
        user_to_verify.indirect_referral_count - 1;

      user_to_verify.income_indirect_referral = 0;
    }

    await user_to_verify.save();
    await indirect_referra_user.save();
    await direct_referral_user.save();
  }
}

export async function checkIfThereIsPairingBonus(user_to_verify, checked) {
  const id_of_the_user_that_invite = user_to_verify.id_of_the_user_that_invite;

  const genealogy_of_user_that_invite = await Genealogy.findOne({
    user_id: user_to_verify.id_of_the_root_user_genealogy,
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
      const user_that_invite = await User.findById(id_of_the_user_that_invite);

      if (left_branch_user.verified && right_branch_user.verified) {
        user_that_invite.pairing_bonus =
          user_that_invite.pairing_bonus + PAIRING_BONUS_PAYMENT;

        user_to_verify.income_pairing_bonus = PAIRING_BONUS_PAYMENT;

        const newTransaction = new Transaction({
          user_id: user_that_invite._id,

          first_name: user_that_invite.first_name,
          last_name: user_that_invite.first_name,

          pairing_bonus_info: {
            root_id: genealogy_of_user_that_invite.user_id,
            root_first_name: genealogy_of_user_that_invite.first_name,
            root_last_name: genealogy_of_user_that_invite.last_name,

            right_id: right_branch_user.user_id,
            right_first_name: right_branch_user.first_name,
            right_last_name: right_branch_user.last_name,

            left_id: left_branch_user.user_id,
            left_first_name: left_branch_user.first_name,
            left_last_name: left_branch_user.last_name,
          },
          income_pairing_bonus: PAIRING_BONUS_PAYMENT,
        });

        await user_to_verify.save();
        await user_that_invite.save();
        await newTransaction.save();
      } else if (
        (left_branch_user.verified || right_branch_user.verified) &&
        checked == false
      ) {
        user_that_invite.pairing_bonus =
          user_that_invite.pairing_bonus - PAIRING_BONUS_PAYMENT;

        user_to_verify.income_pairing_bonus = 0;

        await Transaction.deleteOne({
          user_id: user_that_invite._id,
          root_id: genealogy_of_user_that_invite.user_id,
          right_id: right_branch_user.user_id,
          left_id: left_branch_user.user_id,
        });

        await user_to_verify.save();
        await user_that_invite.save();
      }
    }
  }
}
