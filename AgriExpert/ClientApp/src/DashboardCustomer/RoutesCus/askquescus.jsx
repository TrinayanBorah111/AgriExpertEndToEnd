import "../ComponentsCustomer/askquescus.css";
import SidebarCus from "../SidebarCustomer/SidebarCus";
import QuestionForm from "./askquestion";

const AskQuesCus = () => {
  return (
    <div className="Dashboard">
      <div className="AppGlass">
        <SidebarCus />
        <QuestionForm />
        <div></div>
      </div>
    </div>
  );
};

export default AskQuesCus;
