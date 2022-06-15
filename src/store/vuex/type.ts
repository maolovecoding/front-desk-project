import { ICategory } from "@/views/main/src/components/navigation/type";

export interface IRootState {}
export interface ICategoryState {
  categories: ICategory[];
}
export interface IRoot {
  category: ICategoryState;
}
