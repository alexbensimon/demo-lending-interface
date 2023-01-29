import { FC, useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import { contractInfo } from "../contractInfo";
import {
  useFakeTokenWithdraw,
  usePrepareFakeTokenWithdraw,
} from "../generated";
import { Token } from "../types";
import { Spinner } from "./Spinner";

type Props = {
  poolId: string;
  tokenName: Token["name"];
  deposited: number;
  updateBalance: () => void;
};

export const PoolCardWithdraw: FC<Props> = ({
  poolId,
  tokenName,
  deposited,
  updateBalance,
}) => {
  const { config } = usePrepareFakeTokenWithdraw({
    address: contractInfo.address,
    args: [poolId],
  });
  const { write, data } = useFakeTokenWithdraw(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) updateBalance();
  }, [isSuccess, updateBalance]);

  return (
    <div className="flex h-8 items-center justify-between">
      <div>
        <span className="font-semibold text-gray-800">{deposited}</span>{" "}
        <span className="text-sm font-medium text-gray-600">
          {tokenName} locked
        </span>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <button
          type="button"
          disabled={!write}
          onClick={() => write?.()}
          className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-500"
        >
          Withdraw
        </button>
      )}
    </div>
  );
};
