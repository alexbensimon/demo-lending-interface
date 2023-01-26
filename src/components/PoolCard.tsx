import { FC } from "react";
import { Pool } from "../../types";
import { PoolCardActions } from "./PoolCardActions";

type Props = {
  poolData: Pool;
};

export const PoolCard: FC<Props> = ({
  poolData: { id, token, yieldProvider, apy, tvl },
}) => {
  return (
    <div
      key={id}
      className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow-md sm:px-6 sm:pt-6"
    >
      <div className="flex justify-between">
        <div className="space-y-4">
          <div className="flex space-x-1">
            <img alt="token icon" src={token.imgUrl} className="h-6 w-6" />
            <span className="font-medium text-gray-600">{token.name}</span>
          </div>
          <div className="flex items-baseline space-x-0.5">
            <span className="text-4xl font-extrabold text-indigo-600">
              {apy.toFixed(1)}
            </span>
            <div className="relative flex flex-col justify-end">
              <span className="absolute bottom-3.5 font-extrabold text-indigo-600">
                %
              </span>
              <span className="text-sm font-medium text-gray-600">APY</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-4">
          <div>
            <span className="text-sm text-gray-600">provided by</span>{" "}
            <span className="text-xl font-semibold text-gray-800">
              {yieldProvider}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-800">
              {new Intl.NumberFormat("en", {
                style: "currency",
                currency: "USD",
              }).format(tvl)}
            </span>{" "}
            <span className="text-sm font-medium text-gray-600">TVL</span>
          </div>
        </div>
      </div>
      <PoolCardActions tokenName={token.name} />
    </div>
  );
};
