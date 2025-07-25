import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Factory as FactoryContract } from "../../generated/templates/Pool/Factory";

export const FACTORY_ADDRESS = Address.fromString(
  "0x4E02A5e71197fAE4925b23CEdc35D987a4409DB0"
);
export const NETWORK = "base-sepolia";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);

export const factoryContract = FactoryContract.bind(FACTORY_ADDRESS);
