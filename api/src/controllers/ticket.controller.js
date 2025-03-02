"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = exports.getTickets = exports.countTicketsByStatus = exports.createTicket = void 0;
const ticket_1 = __importDefault(require("../models/ticket"));
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description } = req.body;
    const ticket = new ticket_1.default({ title, description, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    yield ticket.save();
    res.status(201).json({ message: "Ticket created", ticket });
});
exports.createTicket = createTicket;
const countTicketsByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const tickets = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin" ? yield ticket_1.default.find() : yield ticket_1.default.find({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
    const ticketCount = {
        Open: 0,
        "In Progress": 0,
        Closed: 0
    };
    tickets.forEach((ticket) => {
        ticketCount[ticket.status] = ticketCount[ticket.status] + 1;
    });
    res.json(ticketCount);
});
exports.countTicketsByStatus = countTicketsByStatus;
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const tickets = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin" ? yield ticket_1.default.find().populate("user") : yield ticket_1.default.find({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
    res.json(tickets);
});
exports.getTickets = getTickets;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    const ticket = yield ticket_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(ticket);
});
exports.updateTicket = updateTicket;
