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
		// user.burnCount = ZERO_BI;
		// user.collectCount = ZERO_BI;
		// user.decreaseCount = ZERO_BI;

		user.totalSwapVolumeUSD = ZERO_BD;
		user.totalMintVolumeUSD = ZERO_BD;
		// user.totalBurnVolumeUSD = ZERO_BD;
		// user.totalCollectVolumeUSD = ZERO_BD;
		// user.totalPositionVolumeUSD = ZERO_BD;
		// user.totalFeesCollectedUSD = ZERO_BD;
		// user.totalFeesEarnedUSD = ZERO_BD;

		// user.activePositionCount = ZERO_BI;
		// user.totalLiquidityUSD = ZERO_BD;
		// user.totalVolumeUSD = ZERO_BD;

		// user.firstTransactionTimestamp = ZERO_BI;
		// user.lastTransactionTimestamp = ZERO_BI;

		// user.rewardPoints = ZERO_BD;
		// user.lastRewardUpdate = ZERO_BI;

		// user.uniquePoolsInteracted = ZERO_BI;
		// user.uniqueTokensTraded = ZERO_BI;

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
