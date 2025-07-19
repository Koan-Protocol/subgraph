import {
  Collect,
  DecreaseLiquidity,
  IncreaseLiquidity,
  NonfungiblePositionManager,
  Transfer,
} from "../../generated/NonfungiblePositionManager/NonfungiblePositionManager";
import {
  Bundle,
  DecreaseEvent,
  IncreaseEvent,
  Position,
  PositionSnapshot,
  Token,
} from "../../generated/schema";
import {
  ADDRESS_ZERO,
  factoryContract,
  ZERO_BD,
  ZERO_BI,
} from "../utils/constants";
import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { convertTokenToDecimal, loadTransaction } from "../utils";
