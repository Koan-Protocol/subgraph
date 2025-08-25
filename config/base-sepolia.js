// chain.config.js

module.exports = {
	network: "base-sepolia",
	contracts: {
		factory: {
			address: "0x4E02A5e71197fAE4925b23CEdc35D987a4409DB0",
			startBlock: 20333760,
		},
		nonFungiblePositionManager: {
			address: "0xf5Ad5f275a8cdBFe5fc19A8Cb334f63Eb7c4212d",
			startBlock: 20333760,
		},
		whitelistedTokenAddresses: [],
		stableTokenAddresses: [],
		nativePricePool: "",
		minimumEthLocked: 1,
	},
};
