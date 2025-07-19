import {
  Address,
  BigDecimal,
  BigInt,
  dataSource,
} from "@graphprotocol/graph-ts";

import { OPTIMISM_POOL_MAPPINGS } from "../backfill/poolMappings";
import { StaticTokenDefinition } from "./staticTokenDefinition";

export enum ChainId {
  BASE_SEPOLIA = 84532,
  LISK_SEPOLIA = 4202,
}

// subgraph does not support string enums, hence these constants

const BASE_SEPOLIA_NETWORK_NAME = "base-sepolia";
const LISK_SEPOLIA_NETWORK_NAME = "lisk-sepolia-testnet";

// Note: All token and pool addresses should be lowercased!
export class SubgraphConfig {
  // deployment address
  // e.g. https://docs.uniswap.org/contracts/v3/reference/deployments/ethereum-deployments
  factoryAddress: string;

  // the address of a pool where one token is a stablecoin and the other is a
  // token that tracks the price of the native token use this to calculate the
  // price of the native token, so prefer a pool with highest liquidity
  stablecoinWrappedNativePoolAddress: string;

  // true is stablecoin is token0, false if stablecoin is token1
  stablecoinIsToken0: boolean;

  // the address of a token that tracks the price of the native token, most of
  // the time, this is a wrapped asset but could also be the native token itself
  // for some chains
  wrappedNativeAddress: string;

  // the mimimum liquidity in a pool needed for it to be used to help calculate
  // token prices. for new chains, this should be initialized to ~4000 USD
  minimumNativeLocked: BigDecimal;

  // list of stablecoin addresses
  stablecoinAddresses: string[];

  // a token must be in a pool with one of these tokens in order to derive a
  // price (in addition to passing the minimumEthLocked check). This is also
  // used to determine whether volume is tracked or not.
  whitelistTokens: string[];

  // token overrides are used to override RPC calls for the symbol, name, and
  // decimals for tokens. for new chains this is typically empty.
  tokenOverrides: StaticTokenDefinition[];

  // skip the creation of these pools in handlePoolCreated. for new chains this is typically empty.
  poolsToSkip: string[];

  // initialize this list of pools and token addresses on factory creation. for new chains this is typically empty.
  poolMappings: Array<Address[]>;
}

export function getSubgraphConfig(): SubgraphConfig {
  // Update this value to the corresponding chain you want to deploy
  const selectedNetwork = dataSource.network();

  // subgraph does not support case switch with strings, hence this if else block
  if (selectedNetwork == LISK_SEPOLIA_NETWORK_NAME) {
    return {
      factoryAddress: "0xbdf65e7100B459d402b714c25CbeAB5b4CB4dDc2",
      stablecoinWrappedNativePoolAddress:
        "0xd38601418112E4C39EBFC8d083B330a7964F803F", // WETH-USDC 0.3% pool
      stablecoinIsToken0: false,
      wrappedNativeAddress: "0x4200000000000000000000000000000000000006", // WETH
      minimumNativeLocked: BigDecimal.fromString("20"),
      stablecoinAddresses: [
        "0x27eaAf3FD3b508f0E0261F274B2574f15B92c38e", // USDC
        "0x26F653f8b51FA2F6c39eD6adf1A9401B8DBA8819", // DAI
      ],
      whitelistTokens: [
        "0x4200000000000000000000000000000000000006", // WETH
        "0x27eaAf3FD3b508f0E0261F274B2574f15B92c38e", // USDC
        "0x26F653f8b51FA2F6c39eD6adf1A9401B8DBA8819", // DAI
      ],
      tokenOverrides: [
        // {
        //   address: Address.fromString(
        //     "0x4200000000000000000000000000000000000006"
        //   ),
        //   symbol: "WETH",
        //   name: "Wrapped Ethereum",
        //   decimals: BigInt.fromI32(18),
        // },
        // {
        //   address: Address.fromString(
        //     "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
        //   ),
        //   symbol: "USDC",
        //   name: "USD Coin",
        //   decimals: BigInt.fromI32(6),
        // },
      ],
      poolsToSkip: [],
      poolMappings: [],
    };
  } else if (selectedNetwork == BASE_SEPOLIA_NETWORK_NAME) {
    return {
      factoryAddress: "0x4E02A5e71197fAE4925b23CEdc35D987a4409DB0",
      stablecoinWrappedNativePoolAddress:
        "0x2CA52156682e4A80AEF0500dE2fF41a43B98Bccd.",
      stablecoinIsToken0: true,
      wrappedNativeAddress: "0x4200000000000000000000000000000000000006",
      minimumNativeLocked: BigDecimal.fromString("1"),
      stablecoinAddresses: [
        "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        "0x27eaAf3FD3b508f0E0261F274B2574f15B92c38e",
      ],
      whitelistTokens: [
        "0x4200000000000000000000000000000000000006", // WETH
        "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
      ],

      tokenOverrides: [],
      poolsToSkip: [],
      poolMappings: [],
    };
  } else {
    throw new Error("Unsupported Network");
  }
}
