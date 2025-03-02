import { useCallback, useEffect } from "react";
import { Table } from "react-bootstrap";

import { AddTicketContainer } from "./add-ticket.container";
import {
  ticketActions,
  useAppDispatch,
  useTypedSelector,
} from "../redux/store";

export const TicketContainer = () => {
  const dispatch = useAppDispatch();
  const { tickets } = useTypedSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(ticketActions.getTickets());
  }, [dispatch]);

  const renderTableContent = useCallback(() => {
    if (tickets.loading) {
      return <div className="flex items-center justify-center py-4">Loading ....</div>;
    }
    if (tickets.payload.length === 0) {
      return <div className="flex items-center justify-center py-4">No tickets found</div>;
    }
    return (
      <tbody>
        {tickets.payload.map((ticket, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{ticket.title}</td>
            <td>{ticket.description}</td>
            <td>{ticket.status}</td>
          </tr>
        ))}
      </tbody>
    );
  }, [tickets.loading, tickets.payload]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-end">
        <AddTicketContainer />
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        {renderTableContent()}
      </Table>
    </div>
  );
};
