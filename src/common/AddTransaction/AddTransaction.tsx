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
import React from "react";
import { useState } from "react";

function AddTransaction() {

    return (
        <>
            <Drawer>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <TransactionForm />
                </DrawerContent>
            </Drawer>
        </>
    )
}
interface TransactionFormProps {
    dateTime?: Date;
    amount?: number;

}
const TransactionForm: React.FC<TransactionFormProps> = ({ dateTime = new Date(), amount = 0, currency = 'UAH' }) => {
    const [_dateTime, setDateTime] = useState(dateTime);
    const [_amount, setAmount] = useState(amount);

    const [time, setTime] = useState(dateTime.toISOString().substring(11, 16));
    const [date, setDate] = useState(dateTime.toISOString().split("T")[0]);


    const handleSubmit = () => {
        console.log(dateTime);
        console.log(amount)
    }
    return (
        <>
            <form className="space-y-4">
                <div>
                    <Label className="block text-sm font-medium">Amount</Label>
                    <Input
                        type="nubmer"
                        value={_amount}
                        onChange={(e: any) => setAmount(e.target.value)}
                        required
                        className="w-full mt-1"
                    />
                    <Select>
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
                    <Button type="submit">Submit</Button>
                </DrawerFooter>
            </form>
        </>);
}
export default AddTransaction;