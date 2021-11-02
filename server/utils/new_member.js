import UserVerification from "../models/user.verification.model.js";
import {
  payIndirectReferral,
  payDirectReferral,
  checkIfThereIsPairingBonus,
} from "../utils/admin.js";

export async function verifyUser(req, child_user, checked) {
  const user = req.user;

  const user_to_verify = await UserVerification.findOne({
    user_id: child_user._id,
  });

  if (
    user_to_verify &&
    (user.is_owner || user.is_admin || user.is_mega_center || user.is_stockist)
  ) {
    user_to_verify.verified = checked;

    const update_user_to_verify = await user_to_verify.save();

    await payDirectReferral(update_user_to_verify);

    await payIndirectReferral(update_user_to_verify);

    await checkIfThereIsPairingBonus(update_user_to_verify, checked);
  }
}
