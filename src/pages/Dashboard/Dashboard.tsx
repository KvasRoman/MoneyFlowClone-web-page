import { AddTransaction } from "@/common/AddTransaction/AddTransaction";
import Transactions from "../Transactions/Transactions";

function Dashboard() {
    return (<>
        <div className="h-full">
            <h1>Dashboard</h1>

            <Transactions />
            <AddTransaction />
        </div>
    </>)
}
export default Dashboard;
