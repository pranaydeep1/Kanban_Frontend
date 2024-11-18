import React from "react";
import "./../styles/TicketCard.css";

const TicketCard = ({ ticket }) => {
  const priorities = ["No priority", "Low", "Medium", "High", "Urgent"];
  return (
    <div className="ticket-card">
      <div className="ticket-id">{ticket.id}</div>
      <h5>{ticket.title}</h5>
      <p>{ticket.description}</p>
      <span>{ticket.tag}</span>
      {/* <span>Priority: {priorities[ticket.tag]}</span> */}
    </div>
  );
};
export default TicketCard;
