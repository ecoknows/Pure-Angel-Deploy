export interface Genealogy {
  _id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  right_branch?: Genealogy;
  left_branch?: Genealogy;
  id_of_the_user_that_invite?: string;
  cssClass?: string;
  image?: string;
  title?: string;
}
