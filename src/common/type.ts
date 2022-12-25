export type User = {
  id: string;
  name: string;
};

export type Ticket = {
  name: string;
  price: number;
  cafeteria: string;
  user: User;
  used: boolean;
  createdAt: Date;
};

export type Cafeteria = {
  name: string;
  prefecture: string;
  city: string;
  address: string;
  img: string;
  menu: { name: string; price: number }[];
  tickets?: string[];
};
