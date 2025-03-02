import express from "express";

import { countTicketsByStatus, createTicket, getTickets, updateTicket } from "../controllers/ticket.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/tickets", authMiddleware, createTicket);
router.get("/tickets", authMiddleware, getTickets);
router.get("/tickets/count", authMiddleware, countTicketsByStatus);
router.put("/tickets/:id", authMiddleware, adminMiddleware, updateTicket);

export default router;
