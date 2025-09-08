import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Factory as FactoryContract } from "../../generated/templates/Pool/Factory";

export const FACTORY_ADDRESS = Address.fromString(
	"0xbdf65e7100B459d402b714c25CbeAB5b4CB4dDc2",
);
export const NETWORK = "lisk-sepolia-testnet";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);

export const factoryContract = FactoryContract.bind(FACTORY_ADDRESS);

export const WHITELISTED_TOKEN_ADDRESSES: string[] =
	"0x4200000000000000000000000000000000000006,0x26F653f8b51FA2F6c39eD6adf1A9401B8DBA8819,0x27eaAf3FD3b508f0E0261F274B2574f15B92c38e,0x0a281E2193FFfb4EFD50B198DA25494A2644f43E".split(",");

export const NATIVE_ADDRESS = "0x4200000000000000000000000000000000000006";

export const STABLE_TOKEN_ADDRESSES: string[] =
	"0x27eaAf3FD3b508f0E0261F274B2574f15B92c38e,0x26F653f8b51FA2F6c39eD6adf1A9401B8DBA8819".split(",");

export const MINIMUM_ETH_LOCKED = BigDecimal.fromString(
	"1",
);

export const NATIVE_PRICE_POOL = Address.fromString("0xaa308b9759f4b3fb18e9e48863772ee97f86ad69")
	.toHex()
	.toLowerCase();

	