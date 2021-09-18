export interface INode {
  first_name: string;
  last_name: string;
  address: string;
  cssClass?: string;
  image?: string;
  title?: string;
  branch?: INode[];
}
