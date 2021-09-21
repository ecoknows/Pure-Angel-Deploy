export interface Genealogy {
  _id?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  right_branch?: Genealogy;
  left_branch?: Genealogy;
  cssClass?: string;
  image?: string;
  title?: string;
}
