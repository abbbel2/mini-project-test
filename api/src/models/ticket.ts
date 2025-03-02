import mongoose, { Document, Schema } from "mongoose";

export interface ITicket extends Document {
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  user: mongoose.Schema.Types.ObjectId;
}

const TicketSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export default mongoose.model<ITicket>("Ticket", TicketSchema);
