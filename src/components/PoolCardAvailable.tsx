import { FC, useEffect, useState } from "react";
import { Token } from "../types";
import { PoolCardDeposit } from "./PoolCardDeposit";

type Props = {
  tokenName: Token["name"];
  poolId: string;
  tokenBalance: number;
  updateBalance: () => void;
};

export const PoolCardAvailable: FC<Props> = ({
  tokenName,
  poolId,
  tokenBalance,
  updateBalance,
}) => {
  const [selectorDisplayed, displaySelector] = useState(false);
  const [amount, setAmount] = useState(String(tokenBalance));

  useEffect(() => {
    setAmount(String(tokenBalance));
  }, [tokenBalance]);

  const handleAmountChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    const value = e.target.value.replace(",", ".");
    if (isNaN(+value) || Number(value) > tokenBalance) return;

    setAmount(value);
  };

  return (
    <div className="flex h-8 items-center justify-between">
      {selectorDisplayed ? (
        <div>
          <label htmlFor="amount" className="sr-only">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            id="amount"
            className="block h-8 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            inputMode="decimal"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder={String(tokenBalance)}
            minLength={1}
            required
            onChange={handleAmountChange}
            value={amount}
          />
        </div>
      ) : (
        <div>
          <span className="font-semibold text-gray-800">{tokenBalance}</span>{" "}
          <span className="text-sm font-medium text-gray-600">
            {tokenName} available
          </span>
        </div>
      )}
      {!selectorDisplayed ? (
        <button
          type="button"
          disabled={tokenBalance === 0}
          onClick={() => displaySelector(true)}
          className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-500"
        >
          Deposit
        </button>
      ) : (
        <PoolCardDeposit
          amount={amount || "0"}
          tokenName={tokenName}
          poolId={poolId}
          updateBalance={updateBalance}
        />
      )}
    </div>
  );
};
