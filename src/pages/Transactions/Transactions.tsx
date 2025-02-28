import { getTransactions, selectTransactions } from "@/store/slices/transactionsSlice";
import { AppDispatch } from "@/store/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function Transactions() {
    const dispatch = useDispatch<AppDispatch>();
    const transactions = useSelector(selectTransactions);

    const didMount = useRef(false);
    
    useEffect(() => {
        if (didMount.current) return;
        didMount.current = true;
        
        dispatch(getTransactions(1));
    }, []);
    useEffect(() => {
        console.log(transactions);
    }, [transactions])
    return (
        <>

            <h1>hello</h1>
            <ul>
                {transactions.map((t) => (
                    <li key={t.id}>
                        {t.description}: ${t.amount} : ${t.currency}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Transactions;