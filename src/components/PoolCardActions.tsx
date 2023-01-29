import { ethers } from "ethers";
import { FC } from "react";
import { useAccount } from "wagmi";
import { contractInfo } from "../contractInfo";
import { useFakeTokenDeposits } from "../generated";
import { Token } from "../types";
import { PoolCardAvailable } from "./PoolCardAvailable";
import { PoolCardWithdraw } from "./PoolCardWithdraw";

type Props = {
  poolId: string;
  tokenName: Token["name"];
  tokenBalance: number;
  updateBalance: () => void;
};

export const PoolCardActions: FC<Props> = ({
  poolId,
  tokenName,
  tokenBalance,
  updateBalance,
}) => {
  const { address } = useAccount();
  const { data, refetch } = useFakeTokenDeposits({
    address: contractInfo.address,
    args: [address as `0x${string}`, poolId],
  });
  const deposited = data ? Number(ethers.utils.formatEther(data)) : 0;

  const updateDeposits = () => {
    refetch();
    updateBalance();
  };

  return (
    <div className="ml-16 flex items-baseline pb-6 sm:pb-7">
      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
        {deposited > 0 ? (
          <PoolCardWithdraw
            poolId={poolId}
            tokenName={tokenName}
            deposited={deposited}
            updateBalance={updateDeposits}
          />
        ) : (
          <PoolCardAvailable
            tokenName={tokenName}
            poolId={poolId}
            tokenBalance={tokenBalance}
            updateBalance={updateDeposits}
          />
        )}
      </div>
    </div>
  );
};
