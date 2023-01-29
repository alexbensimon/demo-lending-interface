import { ethers } from "ethers";
import { FC, useEffect } from "react";
import { useWaitForTransaction } from "wagmi";
import { contractInfo } from "../contractInfo";
import { useFakeTokenMint, usePrepareFakeTokenMint } from "../generated";
import { Spinner } from "./Spinner";

type Props = {
  updateBalance: () => void;
};

export const MintButton: FC<Props> = ({ updateBalance }) => {
  const { config } = usePrepareFakeTokenMint({
    address: contractInfo.address,
    args: [ethers.utils.parseEther("1000")],
  });
  const { write, data } = useFakeTokenMint(config);
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
      className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Mint tokens
    </button>
  );
};
