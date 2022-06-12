export interface ICategory {
  id: string;
  name: string;
  col?: number;
  urlname: string;
}

export interface IMobileProps {
  categories: ICategory[];
}
