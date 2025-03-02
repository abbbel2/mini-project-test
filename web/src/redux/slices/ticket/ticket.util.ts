import { ApiState } from "../../redux.util";
import { User } from "../auth/auth.util";

export type Ticket = {
  _id: string;
  title: string;
  description: string;
  status: TicketStatus;
  user: User
};

export enum TicketStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  CLOSED = "Closed",
}

export type TicketStateTypes = {
  tickets: ApiState<Ticket[]>;
  sortedTickets: ApiState<SortedTicketType | null>;
  ticketCount: ApiState<TicketCountType | null>
  addTicket: ApiState<AddTicketResponse | null>;
  updateTicket: ApiState<Ticket | null>;
};

export type AddTicketResponse = {
  message: string;
  ticket: Ticket;
};

export type TicketCountType = {
  Open: number,
  "In Progress": number,
  Closed: number
}

export type SortedTicketType = {
  Open: Ticket[],
  "In Progress": Ticket[],
  Closed: Ticket[]
}

export const InitialTicketCount = {
  Open: 0,
  "In Progress": 0,
  Closed: 0
}