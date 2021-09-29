export interface Genealogy {
  _id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  right_branch?: Genealogy;
  left_branch?: Genealogy;
  user_that_invite?: {
    user_id?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
  };
  cssClass?: string;
  image?: string;
  title?: string;
}
