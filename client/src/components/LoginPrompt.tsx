
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

export default function LoginPrompt() {
  const [name, setName] = useState("");
  const { setUser } = useApp();

  const handleLogin = () => {
    if (name.trim()) {
      const words = name.trim().split(" ");
      const initials = words.length === 1 
        ? words[0].substring(0, 2).toUpperCase()
        : words.map(w => w[0]).join("").substring(0, 2).toUpperCase();
      
      const userData = { name: name.trim(), initials };
      setUser(userData);
      localStorage.setItem('scamshield-user', JSON.stringify(userData));
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to ScamShield+</h1>
          <p className="text-muted-foreground">Enter your name to get started</p>
        </div>
        
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="text-lg h-12"
            autoFocus
          />
          
          <Button 
            onClick={handleLogin}
            disabled={!name.trim()}
            className="w-full h-12 text-lg"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
