import { FC, useState } from "react";
import { Token } from "../../types";

type Props = {
  tokenName: Token["name"];
};

export const PoolCardActions: FC<Props> = ({ tokenName }) => {
  const available: number = 0;

  const [selectorDisplayed, displaySelector] = useState(false);
  const [amount, setAmount] = useState(available);

  return (
    <div className="ml-16 flex items-baseline pb-6 sm:pb-7">
      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
        <div className="flex justify-between">
          {selectorDisplayed ? (
            <div>
              <input
                id="default-range"
                type="range"
                max={available}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              />
            </div>
          ) : (
            <div>
              <span className="font-semibold text-gray-800">{available}</span>{" "}
              <span className="text-sm font-medium text-gray-600">
                {tokenName} available
              </span>
            </div>
          )}
          <button
            type="button"
            disabled={available === 0}
            onClick={() => displaySelector(true)}
            className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-500"
          >
            Deposit{" "}
            {selectorDisplayed && (
              <span>
                {amount} {tokenName}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
