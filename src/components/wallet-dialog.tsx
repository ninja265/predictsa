"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

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
import { cn } from "@/lib/utils";

const walletTabs = ["overview", "deposit", "withdraw"] as const;
const depositMethods = ["Bank transfer", "Crypto", "Card", "Apple Pay"] as const;

type CardFormState = {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  amount: string;
};

type WithdrawFormState = {
  amount: string;
  accountName: string;
  accountNumber: string;
  bank: string;
  branchCode: string;
  asset: string;
  network: string;
  destination: string;
};

export function WalletDialog() {
  const { isWalletOpen, closeWallet } = useUIStore();
  const { user, transactions, adjustBalance, addTransaction } = useAccountStore();
  const [activeTab, setActiveTab] = useState<(typeof walletTabs)[number]>("overview");
  const [selectedDeposit, setSelectedDeposit] =
    useState<(typeof depositMethods)[number]>("Bank transfer");
  const [cryptoAsset, setCryptoAsset] = useState("USDC");
  const [cryptoNetwork, setCryptoNetwork] = useState("Polygon");
  const [cardForm, setCardForm] = useState<CardFormState>({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    amount: "",
  });
  const [withdrawForm, setWithdrawForm] = useState<WithdrawFormState>({
    amount: "",
    accountName: "",
    accountNumber: "",
    bank: "",
    branchCode: "",
    asset: "USDC",
    network: "Polygon",
    destination: "",
  });

  const handleCardDeposit = () => {
    const amount = Number(cardForm.amount);
    if (!amount) return;
    adjustBalance(amount);
    addTransaction({
      type: "Deposit",
      method: "Card",
      amount,
      status: "Completed",
    });
    setCardForm({ name: "", number: "", expiry: "", cvc: "", amount: "" });
  };

  const handleApplePay = () => {
    adjustBalance(500);
    addTransaction({
      type: "Deposit",
      method: "Apple Pay",
      amount: 500,
      status: "Completed",
    });
  };

  const handleBankWithdraw = () => {
    const amount = Number(withdrawForm.amount);
    if (!amount || !user) return;
    adjustBalance(-amount);
    addTransaction({
      type: "Withdraw",
      method: "Bank",
      amount,
      status: "Pending",
    });
    setWithdrawForm((prev) => ({ ...prev, amount: "", accountName: "", accountNumber: "", bank: "", branchCode: "" }));
  };

  const handleCryptoWithdraw = () => {
    const amount = Number(withdrawForm.amount);
    if (!amount || !user) return;
    adjustBalance(-amount);
    addTransaction({
      type: "Withdraw",
      method: `Crypto · ${withdrawForm.asset}`,
      amount,
      status: "Pending",
    });
    setWithdrawForm((prev) => ({ ...prev, amount: "", destination: "" }));
  };

  return (
    <Dialog open={isWalletOpen} onOpenChange={(open) => !open && closeWallet()}>
      <DialogContent className="w-full max-w-[640px] rounded-[6px] border border-white/10 bg-white/95 p-0 text-slate shadow-xl dark:bg-surface">
        <div className="border-b border-black/5 px-6 pb-4 pt-5 dark:border-white/10">
          <DialogTitle className="text-2xl font-heading text-slate">Wallet</DialogTitle>
          <DialogDescription className="text-sm text-slate/70">
            Demo funds for showcase only.
          </DialogDescription>
          <p className="mt-3 text-4xl font-heading text-slate">
            {user ? `R ${user.balance.toLocaleString("en-ZA")}` : "Sign in to view wallet"}
          </p>
        </div>
        <div className="px-6 pt-4">
          <div className="flex flex-wrap gap-2">
            {walletTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-[4px] px-3 py-2 text-sm uppercase tracking-[0.2em]",
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "border border-black/5 text-slate hover:border-primary/40 dark:border-white/15"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6 text-sm text-slate">
          {!user ? (
            <p>Please sign in to access wallet features.</p>
          ) : activeTab === "overview" ? (
            <OverviewTab />
          ) : activeTab === "deposit" ? (
            <DepositTab
              selectedDeposit={selectedDeposit}
              onSelectDeposit={setSelectedDeposit}
              cryptoAsset={cryptoAsset}
              setCryptoAsset={setCryptoAsset}
              cryptoNetwork={cryptoNetwork}
              setCryptoNetwork={setCryptoNetwork}
              cardForm={cardForm}
              setCardForm={setCardForm}
              onCardDeposit={handleCardDeposit}
              onApplePay={handleApplePay}
            />
          ) : (
            <WithdrawTab
              form={withdrawForm}
              setForm={setWithdrawForm}
              onBankWithdraw={handleBankWithdraw}
              onCryptoWithdraw={handleCryptoWithdraw}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OverviewTab() {
  const transactions = useAccountStore((state) => state.transactions);
  const user = useAccountStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Current balance</p>
        <p className="mt-2 text-4xl font-heading text-slate">
          R {user?.balance.toLocaleString("en-ZA")}
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Transactions</p>
        <div className="rounded-[6px] border border-black/5 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5">
          <div className="grid grid-cols-[140px,140px,1fr,100px,90px] border-b border-black/5 pb-2 text-xs font-semibold uppercase tracking-wide text-slate/60 dark:border-white/10">
            <span>Date</span>
            <span>Type</span>
            <span>Method</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Status</span>
          </div>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="grid grid-cols-[140px,140px,1fr,100px,90px] border-b border-black/5 py-2 text-xs text-slate last:border-b-0 dark:border-white/10"
            >
              <span>{tx.date}</span>
              <span>{tx.type}</span>
              <span>{tx.method}</span>
              <span className="text-right">R {tx.amount.toLocaleString("en-ZA")}</span>
              <span className={cn("text-right", tx.status === "Pending" && "text-amber-500")}>
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type DepositTabProps = {
  selectedDeposit: (typeof depositMethods)[number];
  onSelectDeposit: (method: (typeof depositMethods)[number]) => void;
  cryptoAsset: string;
  setCryptoAsset: (asset: string) => void;
  cryptoNetwork: string;
  setCryptoNetwork: (network: string) => void;
  cardForm: CardFormState;
  setCardForm: Dispatch<SetStateAction<CardFormState>>;
  onCardDeposit: () => void;
  onApplePay: () => void;
};

function DepositTab({
  selectedDeposit,
  onSelectDeposit,
  cryptoAsset,
  setCryptoAsset,
  cryptoNetwork,
  setCryptoNetwork,
  cardForm,
  setCardForm,
  onCardDeposit,
  onApplePay,
}: DepositTabProps) {
  return (
    <div className="space-y-4 text-sm">
      <div className="flex flex-wrap gap-2">
        {depositMethods.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => onSelectDeposit(method)}
            className={cn(
              "rounded-[4px] px-3 py-2 text-xs uppercase tracking-[0.2em]",
              selectedDeposit === method
                ? "bg-primary text-white"
                : "border border-black/5 text-slate hover:border-primary/40 dark:border-white/15"
            )}
          >
            {method}
          </button>
        ))}
      </div>
      {selectedDeposit === "Bank transfer" && <BankTransfer />}
      {selectedDeposit === "Crypto" && (
        <CryptoDeposit
          asset={cryptoAsset}
          setAsset={setCryptoAsset}
          network={cryptoNetwork}
          setNetwork={setCryptoNetwork}
        />
      )}
      {selectedDeposit === "Card" && (
        <CardDeposit
          form={cardForm}
          setForm={setCardForm}
          onSubmit={onCardDeposit}
        />
      )}
      {selectedDeposit === "Apple Pay" && <ApplePayDeposit onSubmit={onApplePay} />}
      <p className="text-xs text-slate/60">Processing simulated for demo.</p>
    </div>
  );
}

function BankTransfer() {
  const user = useAccountStore((state) => state.user);
  return (
    <div className="space-y-3 rounded-[6px] border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-sm text-slate">
        Send a transfer to the SA Predicts trust account. Use your reference so we credit you fast.
      </p>
      <dl className="grid gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span>Bank</span>
          <strong>FirstRand</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Account name</span>
          <strong>SA Predicts Demo</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Account number</span>
          <strong>6207 483 119</strong>
        </div>
        <div className="flex items-center justify-between">
          <span>Branch code</span>
          <strong>250 655</strong>
        </div>
        <div className="flex items-center justify-between text-primary">
          <span>Reference</span>
          <strong>{user ? `SAP-${user.id}` : "SAP-XXXXXX"}</strong>
        </div>
      </dl>
      <p className="text-xs text-slate/60">Funds reflect within 1–2 hours in this demo.</p>
    </div>
  );
}

function CryptoDeposit({
  asset,
  setAsset,
  network,
  setNetwork,
}: {
  asset: string;
  setAsset: (value: string) => void;
  network: string;
  setNetwork: (value: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-[6px] border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate/60">Asset</label>
          <select
            value={asset}
            onChange={(event) => setAsset(event.target.value)}
            className="h-11 rounded-[4px] border border-gray-300 bg-transparent px-3"
          >
            <option>BTC</option>
            <option>USDT</option>
            <option>USDC</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.3em] text-slate/60">Network</label>
          <select
            value={network}
            onChange={(event) => setNetwork(event.target.value)}
            className="h-11 rounded-[4px] border border-gray-300 bg-transparent px-3"
          >
            <option>BTC</option>
            <option>Ethereum</option>
            <option>Polygon</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.3em] text-slate/60">Deposit address</label>
        <div className="rounded-[6px] border border-dashed border-gray-300 bg-slate/5 p-4 text-mono text-sm font-semibold">
          0xABCD...1234
        </div>
      </div>
      <div className="flex items-center justify-between rounded-[6px] border border-gray-200 bg-white/50 p-3 text-xs uppercase tracking-[0.3em] text-slate">
        QR CODE
        <span className="text-primary">Scan to deposit</span>
      </div>
      <p className="text-xs text-slate/60">
        Send only {asset} on the {network} network.
      </p>
    </div>
  );
}

function CardDeposit({
  form,
  setForm,
  onSubmit,
}: {
  form: CardFormState;
  setForm: Dispatch<SetStateAction<CardFormState>>;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-3 rounded-[6px] border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          placeholder="Name on card"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
        />
        <Input
          placeholder="Card number"
          value={form.number}
          onChange={(event) => setForm({ ...form, number: event.target.value })}
        />
        <Input
          placeholder="MM/YY"
          value={form.expiry}
          onChange={(event) => setForm({ ...form, expiry: event.target.value })}
        />
        <Input
          placeholder="CVC"
          value={form.cvc}
          onChange={(event) => setForm({ ...form, cvc: event.target.value })}
        />
      </div>
      <Input
        placeholder="Amount (ZAR)"
        value={form.amount}
        onChange={(event) => setForm({ ...form, amount: event.target.value })}
      />
      <Button variant="primary" onClick={onSubmit} className="w-full" disabled={!form.amount}>
        Pay with card
      </Button>
    </div>
  );
}

function ApplePayDeposit({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="space-y-3 rounded-[6px] border border-black/5 bg-white/60 p-4 text-center dark:border-white/10 dark:bg-white/5">
      <p className="text-sm text-slate">
        Apple Pay funding is simulated. Tap below to add a quick R500 demo top-up.
      </p>
      <button
        type="button"
        onClick={onSubmit}
        className="mx-auto flex max-w-[220px] items-center justify-center gap-2 rounded-[6px] bg-black px-6 py-3 text-white"
      >
         Pay
      </button>
    </div>
  );
}

type WithdrawTabProps = {
  form: WithdrawFormState;
  setForm: Dispatch<SetStateAction<WithdrawFormState>>;
  onBankWithdraw: () => void;
  onCryptoWithdraw: () => void;
};

function WithdrawTab({ form, setForm, onBankWithdraw, onCryptoWithdraw }: WithdrawTabProps) {
  return (
    <div className="space-y-6 text-sm">
      <div className="space-y-3 rounded-[6px] border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Bank account</p>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            placeholder="Account name"
            value={form.accountName}
            onChange={(event) => setForm({ ...form, accountName: event.target.value })}
          />
          <Input
            placeholder="Account number"
            value={form.accountNumber}
            onChange={(event) => setForm({ ...form, accountNumber: event.target.value })}
          />
          <Input
            placeholder="Bank"
            value={form.bank}
            onChange={(event) => setForm({ ...form, bank: event.target.value })}
          />
          <Input
            placeholder="Branch code"
            value={form.branchCode}
            onChange={(event) => setForm({ ...form, branchCode: event.target.value })}
          />
        </div>
        <Input
          placeholder="Amount (ZAR)"
          value={form.amount}
          onChange={(event) => setForm({ ...form, amount: event.target.value })}
        />
        <Button variant="primary" onClick={onBankWithdraw} className="w-full" disabled={!form.amount}>
          Request withdrawal
        </Button>
      </div>
      <div className="space-y-3 rounded-[6px] border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-xs uppercase tracking-[0.3em] text-slate/60">Crypto</p>
        <div className="grid gap-3 md:grid-cols-2">
          <select
            value={form.asset}
            onChange={(event) => setForm({ ...form, asset: event.target.value })}
            className="h-11 rounded-[4px] border border-gray-300 bg-transparent px-3"
          >
            <option>USDC</option>
            <option>USDT</option>
            <option>BTC</option>
          </select>
          <select
            value={form.network}
            onChange={(event) => setForm({ ...form, network: event.target.value })}
            className="h-11 rounded-[4px] border border-gray-300 bg-transparent px-3"
          >
            <option>Polygon</option>
            <option>Ethereum</option>
            <option>Bitcoin</option>
          </select>
        </div>
        <Input
          placeholder="Destination address"
          value={form.destination}
          onChange={(event) => setForm({ ...form, destination: event.target.value })}
        />
        <Input
          placeholder="Amount"
          value={form.amount}
          onChange={(event) => setForm({ ...form, amount: event.target.value })}
        />
        <Button variant="primary" onClick={onCryptoWithdraw} className="w-full" disabled={!form.amount}>
          Request crypto withdrawal
        </Button>
      </div>
      <p className="text-xs text-slate/60">Withdrawals are simulated in this environment.</p>
    </div>
  );
}
