/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect } from "react";
import {
  ticketActions,
  useAppDispatch,
  useTypedSelector,
} from "../redux/store";
import { Badge } from "react-bootstrap";
import { Ticket } from "../redux/slices/ticket/ticket.util";

export const KanbanContainer = () => {
  const dispatch = useAppDispatch();
  const { sortedTickets } = useTypedSelector((state) => state.ticket);


  useEffect(() => {
    dispatch(ticketActions.getSortedTickets());
  }, [dispatch]);

  const handleDragStart = (event: any, task: any, category: any) => {
    event.dataTransfer.setData("ticket", JSON.stringify(task));
    event.dataTransfer.setData("category", category);
  };

  const handleDrop = (event: any, newCategory: any) => {
    event.preventDefault();
    const ticket = JSON.parse(event.dataTransfer.getData("ticket")) as Ticket;
    const oldCategory = event.dataTransfer.getData("category");

    dispatch(ticketActions.updateTicketStatus({previous: oldCategory, to: newCategory, ticketId: ticket._id}))
    dispatch(ticketActions.updateTicket({id: ticket._id, status: newCategory}))

  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const renderKanban = useCallback(() => {
    if (sortedTickets.loading) {
      return <div className="text-center py-4">Loading ....</div>;
    }
    if (!sortedTickets.payload) {
      return <div className="text-center py-4">No tickets found</div>;
    }
    return (
      <div className="row">
        {Object.entries(sortedTickets.payload).map(([category, ticketList]) => (
          <div key={category} className="col-md-4">
            <h4 className="text-center text-capitalize">{category}</h4>
            <div
              className="kanban-column p-3 border rounded bg-light"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, category)}
              style={{ minHeight: "250px" }}
            >
              {ticketList.map((ticket, index) => (
                <div
                  key={index}
                  className="kanban-card p-2 mb-2 bg-white shadow-sm rounded"
                  draggable
                  onDragStart={(event) =>
                    handleDragStart(event, ticket, category)
                  }
                  style={{ cursor: "grab" }}
                >
                  <div>{ticket.title}</div>
                  <hr />
                  <Badge bg="secondary">{ticket.user?.username}</Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }, [sortedTickets.loading, sortedTickets.payload]);

  return (
    <div>
      <div className="text-center mb-4">
        <h2>Kanban Board</h2>
        <p>Use this board to update statuses</p>
      </div>
      {renderKanban()}
    </div>
  );
};
