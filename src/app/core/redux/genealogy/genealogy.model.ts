export interface Genealogy {
  _id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  right_branch?: Genealogy;
  left_branch?: Genealogy;

  is_stockist?: boolean;
  is_admin?: boolean;
  is_mega_center?: boolean;
  is_owner?: boolean;

  left_count?: number;
  right_count?: number;
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
