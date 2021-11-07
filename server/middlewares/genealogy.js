import Genealogy from "../models/genealogy.model.js";

export async function updateBranches(root) {
  if (root.left_branch) {
    const branch = root.left_branch;
    const newBranch = await Genealogy.findOne({ user_id: branch.user_id });
    if (newBranch) {
      root.left_branch = newBranch;
    }
  }

  if (root.right_branch) {
    const branch = root.right_branch;
    const newBranch = await Genealogy.findOne({ user_id: branch.user_id });
    if (newBranch) {
      root.right_branch = newBranch;
    }
  }
}
