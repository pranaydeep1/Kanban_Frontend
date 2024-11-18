import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "./TicketCard";
import Dropdown from "./Dropdown";
import "./../styles/KanbanBoard.css";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(getFromLocalStorage("grouping") || "status");
  const [ordering, setOrdering] = useState(getFromLocalStorage("ordering") || "priority");

  const MANDATORY_STATUSES = ["Backlog", "Todo", "In progress", "Done", "Canceled"];

  // Fetch tickets and users from the API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Save grouping and ordering preferences to local storage
  useEffect(() => {
    saveToLocalStorage("grouping", grouping);
    saveToLocalStorage("ordering", ordering);
  }, [grouping, ordering]);

  // Group tickets dynamically based on the current `grouping` value
  const groupTickets = () => {
    const grouped = {};

    // Initialize all mandatory statuses or groups based on the grouping
    if (grouping === "status") {
      MANDATORY_STATUSES.forEach((status) => {
        grouped[status] = [];
      });
    }

    tickets.forEach((ticket) => {
      let key = ticket[grouping];

      // If grouping by user, use the user's name instead of userId
      if (grouping === "userId") {
        const user = users.find((u) => u.id === ticket.userId);
        key = user ? user.name : "Unknown User";
      }

      // Add ticket to the corresponding group
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(ticket);
    });

    return grouped;
  };

  // Sort tickets dynamically
  const sortTickets = (ticketList) => {
    return ticketList.sort((a, b) => {
      if (ordering === "priority") return b.priority - a.priority;
      if (ordering === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  // Get grouped tickets
  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <Dropdown
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
      />

      {/* Kanban Columns */}
      <div className="columns">
        {Object.entries(groupedTickets).map(([key, ticketList]) => (
          <div key={key} className="column">
            <h2>{key}</h2>
            {ticketList && ticketList.length > 0 ? (
              sortTickets(ticketList).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <p>No tickets</p> // Display placeholder for empty columns
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
