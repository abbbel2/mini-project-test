import { useEffect } from "react";
import { ticketActions, useAppDispatch, useTypedSelector } from "../redux/store";

export const DashboardContainer = () => {
  const dispatch = useAppDispatch();
  const { ticketCount } = useTypedSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(ticketActions.getTicketCount())
  }, [dispatch])

  return (
    <div className="flex flex-row space-x-4 w-full">
      <div className="card w-4/12 text-white bg-secondary shadow">
        <div className="card-body text-center">
          <h5 className="card-title">Open tickets</h5>
          <h2 className="card-text">{ticketCount.payload?.Open}</h2>
        </div>
      </div>
      <div className="card w-4/12 text-white bg-secondary shadow">
        <div className="card-body text-center">
          <h5 className="card-title">Pending tickets</h5>
          <h2 className="card-text">{ticketCount.payload?.["In Progress"]}</h2>
        </div>
      </div>
      <div className="card w-4/12 text-white bg-secondary shadow">
        <div className="card-body text-center">
          <h5 className="card-title">Closed tickets</h5>
          <h2 className="card-text">{ticketCount.payload?.Closed}</h2>
        </div>
      </div>
    </div>
  );
};
