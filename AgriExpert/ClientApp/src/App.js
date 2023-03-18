import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Plans from "./routes/Plans";
import Sign from "./routes/SignUp";
import Admin from "./routes/admin";
import DashboardAdmin from "./DashboardAdmin/Dashboard";
import UnSolved from "./DashboardAdmin/RoutesAdmin/UnsolQues";
import Solved from "./DashboardAdmin/RoutesAdmin/SolQues";
import RmvExperts from "./DashboardAdmin/RoutesAdmin/RmvExperts";
import Customers from "./DashboardAdmin/RoutesAdmin/Customers";
import AddExperts from "./DashboardAdmin/RoutesAdmin/AddExperts";
import DashboardCus from "./DashboardCustomer/DashboardCus";
import AskQuesCus from "./DashboardCustomer/RoutesCus/askquescus";
import SolQuesCus from "./DashboardCustomer/RoutesCus/solquescus";
import Subscription from "./DashboardCustomer/RoutesCus/subscription";
import UnSolQuesCus from "./DashboardCustomer/RoutesCus/unsolquescus";
import SignInExpert from "./Experts/ExpertSignIn";
import DashboardExpert from "./Experts/DashboardExpert";
import ExpertUnsolvedQuestions from "./Experts/ExpertUnsolvedQuestions";

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/signup" element={<Sign />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboardadmin" element={<DashboardAdmin />} />
                <Route path="/unsolved" element={<UnSolved />} />
                <Route path="/solved" element={<Solved />} />
                <Route path="/rmvexpert" element={<RmvExperts />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/addexperts" element={<AddExperts />} />
                <Route path="/dashboardcustomer" element={<DashboardCus />} />
                <Route path="/askquescus" element={<AskQuesCus />} />
                <Route path="/solquescus" element={<SolQuesCus />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/unsolquescus" element={<UnSolQuesCus />} />
                <Route path="/expertsignin" element={<SignInExpert />} />
                <Route path="/dashboardexpert" element={<DashboardExpert />} />
                <Route path="/expertunsolved" element={<ExpertUnsolvedQuestions />} />
            </Routes>
        </div>
    );
}