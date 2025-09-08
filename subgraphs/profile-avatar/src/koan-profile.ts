import {
	PFUpdated as PFUpdatedEvent,
	Transfer as TransferEvent,
} from "../generated/KoanProfile/KoanProfile";
import { PFUpdated, Transfer, User, Token } from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handlePFUpdated(event: PFUpdatedEvent): void {
	// Update user's current PFP
	let user = getOrCreateUser(event.params.user, event.block.timestamp);
	let token = getOrCreateToken(event.params.tokenId, event.block.timestamp);
	
	user.currentPFP = token.id;
	user.updatedAt = event.block.timestamp;
	user.save();

	// Save event
	let entity = new PFUpdated(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.user = event.params.user;
	entity.tokenId = event.params.tokenId;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

export function handleTransfer(event: TransferEvent): void {
	let token = getOrCreateToken(event.params.tokenId, event.block.timestamp);
	
	// Handle mint (from zero address)
	if (event.params.from == Address.zero()) {
		let toUser = getOrCreateUser(event.params.to, event.block.timestamp);
		token.owner = toUser.id;
		token.createdAt = event.block.timestamp;
		toUser.tokenCount = toUser.tokenCount.plus(BigInt.fromI32(1));
		toUser.save();
	} else {
		// Handle regular transfer
		let fromUser = getOrCreateUser(event.params.from, event.block.timestamp);
		let toUser = getOrCreateUser(event.params.to, event.block.timestamp);
		
		token.owner = toUser.id;
		fromUser.tokenCount = fromUser.tokenCount.minus(BigInt.fromI32(1));
		toUser.tokenCount = toUser.tokenCount.plus(BigInt.fromI32(1));
		
		fromUser.updatedAt = event.block.timestamp;
		toUser.updatedAt = event.block.timestamp;
		fromUser.save();
		toUser.save();
	}
	
	token.updatedAt = event.block.timestamp;
	token.transferCount = token.transferCount.plus(BigInt.fromI32(1));
	token.save();

	// Save event
	let entity = new Transfer(
		event.transaction.hash.concatI32(event.logIndex.toI32()),
	);
	entity.from = event.params.from;
	entity.to = event.params.to;
	entity.tokenId = event.params.tokenId;
	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;
	entity.save();
}

function getOrCreateUser(address: Address, timestamp: BigInt): User {
	let user = User.load(address.toHexString());
	if (!user) {
		user = new User(address.toHexString());
		user.tokenCount = BigInt.zero();
		user.createdAt = timestamp;
		user.updatedAt = timestamp;
	}
	return user;
}

function getOrCreateToken(tokenId: BigInt, timestamp: BigInt): Token {
	let token = Token.load(tokenId.toString());
	if (!token) {
		token = new Token(tokenId.toString());
		token.transferCount = BigInt.zero();
		token.createdAt = timestamp;
		token.updatedAt = timestamp;
	}
	return token;
}
