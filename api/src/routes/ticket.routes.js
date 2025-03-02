"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_controller_1 = require("../controllers/ticket.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/tickets", auth_middleware_1.authMiddleware, ticket_controller_1.createTicket);
router.get("/tickets", auth_middleware_1.authMiddleware, ticket_controller_1.getTickets);
router.get("/tickets/count", auth_middleware_1.authMiddleware, ticket_controller_1.countTicketsByStatus);
router.put("/tickets/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, ticket_controller_1.updateTicket);
exports.default = router;
