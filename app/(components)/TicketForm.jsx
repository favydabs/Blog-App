"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
  const EditMode = ticket._id === "new" ? false : true;

  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (EditMode) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("failed to update Ticket.");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });

      if (!res.ok) {
        throw new Error("failed to create Ticket.");
      }
    }

    router.refresh();
    router.push("/");
    setLoading(false);
  };

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware problem",
  };

  if (EditMode) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2 "
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EditMode ? "Update your Ticket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />{" "}
        <label>Desription</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          rows={5}
          value={formData.description}
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware problem">Hardware problem</option>
          <option value="Software problem">Software problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div>
        {[1, 2, 3, 4, 5].map((level) => (
            <React.Fragment key={level}>
              <input
                id={`priority-${level}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={level}
                checked={formData.priority == level}
              />
              <label>{level}</label>
            </React.Fragment>
          ))}
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started"> Not started</option>
          <option value=" started"> Started</option>
          <option value="done"> Done</option>
        </select>
        <input
          type="submit"
          className="btn"
          value={
            loading
              ? EditMode
                ? "Updating..."
                : "Creating..."
              : EditMode
              ? "Update Your Ticket"
              : "Create Ticket"
          }
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default TicketForm;
