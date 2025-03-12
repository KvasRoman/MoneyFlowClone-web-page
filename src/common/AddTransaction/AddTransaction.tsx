import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createTransaction, deleteTransaction, editTransaction } from "@/store/slices/transactionsSlice";
function EditTransaction({transaction, isOpen, onClose}: {transaction: any | null, isOpen: boolean, onClose: () => void}) {
    const dispatch = useAppDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    useEffect(() => {
        setIsDrawerOpen(isOpen);
    }, [isOpen])
    const handleDelete = async () => {
        const result = await dispatch(deleteTransaction(transaction.id))
        console.log(result, "handle delete");
        if (deleteTransaction.fulfilled.match(result)) {
            console.log("done");
            setIsDrawerOpen(false);
            onClose();
        }
    }
    const handleSubmit = async (dateTime: Date, amount: number, currency: string, description: string) => {
        console.log("submited");
        const result = await dispatch(editTransaction({
            id: transaction.id,
            amount,
            description,
            currency,
            transactionDate: dateTime
        }))
        console.log(result, "handle edit");
        if (createTransaction.fulfilled.match(result)) {
            console.log("done");
            setIsDrawerOpen(false);
        }
    }
    return (
        <>
            <Drawer open={isDrawerOpen} onClose={onClose} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Edit transaction</DrawerTitle>
                        <DrawerDescription>This action edits transaction.</DrawerDescription>
                    </DrawerHeader>
                    {transaction 
                    ? <TransactionForm 
                    includeDelete = {true}
                    onDelete={handleDelete}
                    dateTime={new Date(transaction?.transactionDate)}
                    amount={transaction?.amount}
                    description ={transaction?.description}
                    currency={transaction?.currency} 
                    onSubmit={handleSubmit} /> 
                    : <></>}
                    
                </DrawerContent>
            </Drawer>
        </>
    )
}
function AddTransaction() {
    const dispatch = useAppDispatch();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const handleSubmit = async (dateTime: Date, amount: number, currency: string, description: string) => {
        console.log("submited");
        const result = await dispatch(createTransaction({
            amount,
            description,
            currency,
            transactionDate: dateTime
        }))
        console.log(result, "handle submit");
        if (createTransaction.fulfilled.match(result)) {
            console.log("done");
            setIsDrawerOpen(false);
        }
    }

    return (
        <>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Create transaction</DrawerTitle>
                        <DrawerDescription>This action creates new transaction.</DrawerDescription>
                    </DrawerHeader>
                    <TransactionForm onSubmit={handleSubmit}/>
                </DrawerContent>
            </Drawer>
        </>
    )
}
interface TransactionFormProps {
    dateTime?: Date;
    amount?: number;
    description?: string
    currency? :string;
    includeDelete?: boolean;
    onDelete?: () => void;
    onSubmit: (dateTime: Date, amount: number, currency: string, description: string) => void;
}
const TransactionForm: React.FC<TransactionFormProps> = ({ dateTime = new Date(), amount = 0, currency = 'UAH',description = "", onSubmit, includeDelete = false, onDelete }) => {
    const [_dateTime, setDateTime] = useState(dateTime);
    const [_amount, setAmount] = useState(amount);
    const [_currency, setCurrency] = useState(currency);
    const [_description, setDescription] = useState(description);
    const [time, setTime] = useState(dateTime.toISOString().substring(11, 16));
    const [date, setDate] = useState(dateTime.toISOString().split("T")[0]);

    
    useEffect(() => {
        const fullDateString = `${date}T${time}:00.000Z`; 
        setDateTime(new Date(fullDateString));
    },
[time,date])
    const deleteClick = (e: any) => {
        e.stopPropagation()
        onDelete!();
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(_dateTime);
        console.log(amount);
        console.log(currency);
        onSubmit(_dateTime, _amount, _currency, _description);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label className="block text-sm font-medium">Amount</Label>
                    <div>
                    <Input
                        type="nubmer"
                        inputMode="numeric"
                        value={_amount}
                        onChange={(e: any) => setAmount(e.target.value)}
                        required
                        className="mt-1"
                    />
                    <Select value={_currency} onValueChange={(value) => setCurrency(value)}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="UAH"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Currency</SelectLabel>
                                <SelectItem defaultChecked value="UAH">UAH</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    </div>
                </div>
                <div>
                    <Label className="block text-sm font-medium">Description</Label>
                    <Input
                        type="text"
                        value={_description}
                        onChange={(e: any) => setDescription(e.target.value)}
                        required
                        className="w-full mt-1"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium">Time</Label>
                    <Input
                        type="time"
                        value={time}
                        onChange={(e: any) => setTime(e.target.value)}
                        required
                        className="w-full mt-1"
                    />
                </div>
                <div>
                    <Label className="block text-sm font-medium">Date</Label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e: any) => setDate(e.target.value)}
                        required
                        className="w-full mt-1"
                    />
                </div>
                <DrawerFooter>
                    <div className="w-full">
                    <Button type="submit" className="text-gray-950">Submit</Button>
                    {includeDelete ? <Button className="text-gray-950" onClick={deleteClick}>Delete</Button> : <></>}
                    </div>
                </DrawerFooter>
            </form>
        </>);
}
export {AddTransaction, EditTransaction};
