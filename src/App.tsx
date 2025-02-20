import { useState } from 'react'
import './App.css'
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from 'axios';
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post('http://localhost:3000/auth/login', {email: email, password: password})
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    console.log("Email:", email, "Password:", password);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login</CardTitle>
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
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
