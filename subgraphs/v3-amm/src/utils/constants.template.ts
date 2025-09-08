import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { Factory as FactoryContract } from "../../generated/templates/Pool/Factory";

export const FACTORY_ADDRESS = Address.fromString(
	"{{contracts.factory.address}}",
);
export const NETWORK = "{{network}}";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);

export const factoryContract = FactoryContract.bind(FACTORY_ADDRESS);

export const WHITELISTED_TOKEN_ADDRESSES: string[] =
	"{{ whitelistedTokenAddresses }}".split(",");

export const NATIVE_ADDRESS = "{{ nativeAddress }}";

export const STABLE_TOKEN_ADDRESSES: string[] =
	"{{ stableTokenAddresses }}".split(",");

export const MINIMUM_ETH_LOCKED = BigDecimal.fromString(
	"{{ minimumEthLocked }}",
);

export const NATIVE_PRICE_POOL = Address.fromString("{{ nativePricePool }}")
	.toHex()
	.toLowerCase();

	