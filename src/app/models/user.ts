import { List } from "./list";

export interface User {
  id?: string;
  name: string;
  email: string;
  lists?: string[]; // IDs
  savedLists?: string[]; // IDs
}
