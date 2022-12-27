import { DocumentReference } from "firebase/firestore";

export type User = {
  id: string;
  name: string;
};

export type Ticket = {
  name: string;
  price: number;
  cafeteria: DocumentReference;
  id?: string;
  user?: DocumentReference;
  used?: boolean;
  createdAt?: Date;
};

export type Cafeteria = {
  id: string;
  name: string;
  prefecture: string;
  city: string;
  address: string;
  img: string;
  menu: Ticket[];
  tickets?: DocumentReference[];
};

export type PageName = "top" | "cafeteriaList" | "login" | "userInformation";
