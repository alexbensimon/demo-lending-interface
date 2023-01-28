import { FC } from "react";
import { pools } from "../data";
import { PoolCard } from "./PoolCard";

type Props = {
  tokenBalance: number;
  updateBalance: () => void;
};

export const PoolList: FC<Props> = ({ tokenBalance, updateBalance }) => {
  return (
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pools.map((pool) => (
          <PoolCard
            key={pool.id}
            poolData={pool}
            tokenBalance={tokenBalance}
            updateBalance={updateBalance}
          />
        ))}
      </div>
    </div>
  );
};
