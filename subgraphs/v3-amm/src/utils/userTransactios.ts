import { Address, ethereum } from "@graphprotocol/graph-ts";

import {
	Bundle,
	Factory,
	Pool,
	PoolDayData,
	PoolHourData,
	Token,
	TokenDayData,
	TokenHourData,
	UniswapDayData,
	User,
	Collect,
} from "../../generated/schema";
import { ONE_BI, ZERO_BD, ZERO_BI } from "./constants";

export function getOrCreateUser(address: Address): User {
	let id = address.toHexString();
	let user = User.load(id);
	if (user == null) {
		user = new User(id);
		user.swapCount = ZERO_BI;
		user.totalSwapVolumeUSD = ZERO_BD;
		user.mintCount = ZERO_BI;
		user.increaseCount = ZERO_BI;
	}
	return user as User;
}
