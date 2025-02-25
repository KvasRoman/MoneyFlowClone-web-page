import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/slices/authSlice';

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';




function CreateUser(){
    const [firstName, setFirstName] = useState("");
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state: any) => state.auth);

    const handleSubmit =async (e: any) => {
      e.preventDefault();
      const result = await dispatch(registerUser({firstName}));
      if (registerUser.fulfilled.match(result)) {
        alert('signed in');
    }
    };
    return( 
    <>
        <Card className="w-96 shadow-lg p-6">
            <CardHeader>
              <CardTitle className="text-center text-xl">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium">First Name</Label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e: any) => setFirstName(e.target.value)}
                    required
                    className="w-full mt-1"
                  />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
    </>
    )
}

export default CreateUser