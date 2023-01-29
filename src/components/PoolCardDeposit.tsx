import { ethers } from "ethers";
import { FC, useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import { contractInfo } from "../contractInfo";
import { useFakeTokenDeposit, usePrepareFakeTokenDeposit } from "../generated";
import { Token } from "../types";
import { Spinner } from "./Spinner";

type Props = {
  amount: string;
  poolId: string;
  tokenName: Token["name"];
  updateBalance: () => void;
};

export const PoolCardDeposit: FC<Props> = ({
  amount,
  poolId,
  tokenName,
  updateBalance,
}) => {
  const { config } = usePrepareFakeTokenDeposit({
    address: contractInfo.address,
    args: [ethers.utils.parseEther(amount), poolId],
  });
  const { write, data } = useFakeTokenDeposit(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) updateBalance();
  }, [isSuccess, updateBalance]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <button
      type="button"
      disabled={!write}
      onClick={() => write?.()}
      className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-gray-500"
    >
      Deposit {amount} {tokenName}
    </button>
  );
};
