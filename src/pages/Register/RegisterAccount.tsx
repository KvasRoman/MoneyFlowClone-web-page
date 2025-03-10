import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerAccount } from '@/store/slices/authSlice';

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';




function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useAppSelector((state: any) => state.auth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await dispatch(registerAccount({ email, password }));
    if (registerAccount.fulfilled.match(result)) {
      console.log(user);
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Card className="w-96 shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl">Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
                className="w-full mt-1"
              />
            </div>
            <div>
              <Label className="block text-sm font-medium">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                required
                className="w-full mt-1"
              />
            </div>
            <Button type="submit" className="w-full text-gray-950">Login</Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
    
}

export default Register