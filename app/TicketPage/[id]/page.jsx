import TicketForm from "@/app/(components)/TicketForm";

const TicketPage = ({ params }) => {
  const EditMode = params.id === "new" ? false : true;

  

  return <TicketForm />;
};

export default TicketPage;
