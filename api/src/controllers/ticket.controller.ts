import { Response } from "express";

import Ticket from "../models/ticket";
import { AuthRequest } from "../middleware/auth.middleware";
import ticket from "../models/ticket";

export const createTicket = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;

  const ticket = new Ticket({ title, description, user: req.user?._id });
  await ticket.save();

  res.status(201).json({ message: "Ticket created", ticket });
};

export const countTicketsByStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  const tickets = req.user?.role === "admin" ? await Ticket.find() : await Ticket.find({ user: req.user?._id });
  const ticketCount = {
    Open: 0,
    "In Progress": 0,
    Closed: 0
  }
  tickets.forEach((ticket) => {
    ticketCount[ticket.status] = ticketCount[ticket.status] + 1;
  })
  res.json(ticketCount)
};

export const getTickets = async (req: AuthRequest, res: Response) => {
  const tickets = req.user?.role === "admin" ? await Ticket.find().populate("user") : await Ticket.find({ user: req.user?._id });
  res.json(tickets);
};

export const updateTicket = async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });

  res.json(ticket);
};
