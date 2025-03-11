import {AddTransaction} from "@/common/AddTransaction/AddTransaction";
import Transactions from "../Transactions/Transactions";

function Dashboard(){
    return (<>
        <h1>hello Dashboard</h1>

        <Transactions/>
        <AddTransaction />
    </>)
}
export default Dashboard;
