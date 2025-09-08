import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { User, Pool, Token, Bundle } from "../../generated/schema";
import { ZERO_BD, ZERO_BI, ONE_BI } from "../utils/constants";

export function loadUser(address: Address): User {
	let user = User.load(address.toHexString());
	if (user === null) {
		user = new User(address.toHexString());
		user.swapCount = ZERO_BI;
		user.mintCount = ZERO_BI;
		user.increaseCount = ZERO_BI;
		user.totalVolumeUSD= ZERO_BD
		user.totalSwapVolumeUSD = ZERO_BD;
		user.totalMintVolumeUSD = ZERO_BD;

		user.save();
	}
	return user;
}

export function updateUserSwapActivity(
	userAddress: Address,
	volumeUSD: BigDecimal,
): void {
	const user = loadUser(userAddress);

	user.swapCount = user.swapCount.plus(ONE_BI);
	user.totalSwapVolumeUSD = user.totalSwapVolumeUSD.plus(volumeUSD);

	user.save();
}

export function updateUserMintActivity(
	userAddress: Address,
	amountUSD: BigDecimal,
): void {
	const user = loadUser(userAddress);

	user.mintCount = user.mintCount.plus(ONE_BI);
	user.totalMintVolumeUSD = user.totalMintVolumeUSD.plus(amountUSD);
	// user.totalPositionVolumeUSD = user.totalPositionVolumeUSD.plus(amountUSD);
	user.totalVolumeUSD = user.totalVolumeUSD.plus(amountUSD);
	// user.activePositionCount = user.activePositionCount.plus(ONE_BI);

	
	user.save();
}
