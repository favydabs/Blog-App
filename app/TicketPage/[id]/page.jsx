
import TicketForm from "@/app/(components)/TicketForm";


export const dynamic = 'force-dynamic';
// http://localhost:3000
const getTicketById = async (id) => {
  try {
    const res = await fetch(`/api/Tickets/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get ticket");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return { foundTicket: null };
  }
};

const TicketPage = async ({ params }) => {
  const EditMode = params.id === "new";
  let updateTicketData = {
    _id: "new"
  };

  if (EditMode === false) {
    const response = await getTicketById(params.id);
    updateTicketData = response.foundTicket || updateTicketData;
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;