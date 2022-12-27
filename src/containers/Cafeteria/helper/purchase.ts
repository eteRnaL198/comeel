import { Ticket, User } from "common/types";
import { getJst } from "common/helper";
import {
  addDocument,
  getDocRef,
  addElementToArrayinDocument,
} from "service/firebase";

export const purchase = async (user: User, ticket: Ticket) => {
  // 購入されたチケットを登録
  const purchasedTicket: Ticket = {
    ...ticket,
    user: getDocRef("users", user?.id as string),
    used: false,
    createdAt: getJst(),
  };
  const ticketRef = await addDocument("tickets", purchasedTicket);

  // 食堂のチケットリストに購入されたチケットを追加
  await addElementToArrayinDocument(
    "cafeterias",
    ticket.cafeteria.id,
    "tickets",
    ticketRef
  );
};
