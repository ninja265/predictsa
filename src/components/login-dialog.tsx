"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccountStore } from "@/store/account";
import { useUIStore } from "@/store/ui";

export function LoginDialog() {
  const { isLoginOpen, closeLogin } = useUIStore();
  const login = useAccountStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (!email) return;
    setCodeSent(true);
  };

  const handleLogin = () => {
    if (!email) return;
    login(email);
    setEmail("");
    setCode("");
    setCodeSent(false);
    closeLogin();
  };

  return (
    <Dialog open={isLoginOpen} onOpenChange={(open) => !open && closeLogin()}>
      <DialogContent className="w-full max-w-[480px] rounded-[6px] border border-white/10 bg-white/95 p-6 text-slate shadow-xl dark:bg-surface">
        <div className="space-y-2 text-left">
          <DialogTitle className="text-2xl font-heading text-slate">
            Sign in to SA Predicts
          </DialogTitle>
          <DialogDescription className="text-sm text-slate/70">
            Use a one-time code to enter this demo session.
          </DialogDescription>
        </div>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-slate/60">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@fund.co.za"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <Button
            variant="primary"
            className="w-full"
            disabled={!email}
            onClick={handleSendCode}
          >
            {codeSent ? "Code sent" : "Send code"}
          </Button>
          {codeSent && (
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-slate/60">
                Enter code
              </label>
              <Input
                type="text"
                placeholder="000000"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <Button
                variant="primary"
                className="w-full"
                onClick={handleLogin}
                disabled={!code}
              >
                Verify & continue
              </Button>
            </div>
          )}
          <p className="text-xs text-slate/60">
            Authentication is simulated for demo purposes only.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
