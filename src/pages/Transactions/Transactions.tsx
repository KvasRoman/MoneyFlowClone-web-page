import { EditTransaction } from "@/common/AddTransaction/AddTransaction";
import { getTransactions, selectTransactions } from "@/store/slices/transactionsSlice";
import { AppDispatch } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Transactions() {
    const dispatch = useDispatch<AppDispatch>();
    const transactions = useSelector(selectTransactions);

    const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const didMount = useRef(false);
    const selectTransaction = (transaction: any) => {
        setSelectedTransaction(transaction);
        setIsEditOpen(true);
    }
    const handleEditClose = () => {
        setIsEditOpen(false);
        setTimeout(() => setSelectedTransaction(null),150);
    };
    useEffect(() => {console.log(isEditOpen)}, [isEditOpen]);
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


            <ul>
                {transactions.map((t) => (
                    <li key={t.id} onClick={() => selectTransaction(t)}>
                        {t.description}: {t.amount} : {t.currency}
                    </li>
                ))}
            </ul>
            <EditTransaction transaction={selectedTransaction} isOpen={isEditOpen} onClose={handleEditClose}/>
        </>
    )
}
export default Transactions;