import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

export default function Ticket() {
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    //   display error message (if there is one)
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
  }, [dispatch, isError, message, ticketId]);

  //   if loading is occuring
  if (isLoading) return <Spinner />;

  //   if error occurs
  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
}
