export type User = {
  id: string;
  name: string;
};

export type Ticket = {
  name: string;
  price: number;
  cafeteriaRef?: string;
  user?: User;
  used?: boolean;
  createdAt?: Date;
};

export type Cafeteria = {
  name: string;
  prefecture: string;
  city: string;
  address: string;
  img: string;
  menu: Ticket[];
  ticketRefs?: string[];
};

export type PageName = "top" | "cafeteriaList" | "login";
