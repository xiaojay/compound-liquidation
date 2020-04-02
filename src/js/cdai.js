"use strict";
const cDAIABI = [
  {
    inputs: [
      { internalType: "address", name: "underlying_", type: "address" },
      {
        internalType: "contract ComptrollerInterface",
        name: "comptroller_",
        type: "address"
      },
      {
        internalType: "contract InterestRateModel",
        name: "interestRateModel_",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "initialExchangeRateMantissa_",
        type: "uint256"
      },
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
      { internalType: "uint8", name: "decimals_", type: "uint8" },
      { internalType: "address payable", name: "admin_", type: "address" },
      { internalType: "address", name: "implementation_", type: "address" },
      { internalType: "bytes", name: "becomeImplementationData", type: "bytes" }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "cashPrior",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "interestAccumulated",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "borrowIndex",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalBorrows",
        type: "uint256"
      }
    ],
    name: "AccrueInterest",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "borrowAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accountBorrows",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalBorrows",
        type: "uint256"
      }
    ],
    name: "Borrow",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "error",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "info",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "detail",
        type: "uint256"
      }
    ],
    name: "Failure",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "liquidator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "repayAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "cTokenCollateral",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "seizeTokens",
        type: "uint256"
      }
    ],
    name: "LiquidateBorrow",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mintAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mintTokens",
        type: "uint256"
      }
    ],
    name: "Mint",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "NewAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract ComptrollerInterface",
        name: "oldComptroller",
        type: "address"
      },
      {
        indexed: false,
        internalType: "contract ComptrollerInterface",
        name: "newComptroller",
        type: "address"
      }
    ],
    name: "NewComptroller",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldImplementation",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newImplementation",
        type: "address"
      }
    ],
    name: "NewImplementation",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract InterestRateModel",
        name: "oldInterestRateModel",
        type: "address"
      },
      {
        indexed: false,
        internalType: "contract InterestRateModel",
        name: "newInterestRateModel",
        type: "address"
      }
    ],
    name: "NewMarketInterestRateModel",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldPendingAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newPendingAdmin",
        type: "address"
      }
    ],
    name: "NewPendingAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldReserveFactorMantissa",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newReserveFactorMantissa",
        type: "uint256"
      }
    ],
    name: "NewReserveFactor",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "redeemer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "redeemAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "redeemTokens",
        type: "uint256"
      }
    ],
    name: "Redeem",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "payer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "repayAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "accountBorrows",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalBorrows",
        type: "uint256"
      }
    ],
    name: "RepayBorrow",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "benefactor",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "addAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newTotalReserves",
        type: "uint256"
      }
    ],
    name: "ReservesAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reduceAmount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newTotalReserves",
        type: "uint256"
      }
    ],
    name: "ReservesReduced",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    constant: false,
    inputs: [],
    name: "_acceptAdmin",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "addAmount", type: "uint256" }],
    name: "_addReserves",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "reduceAmount", type: "uint256" }
    ],
    name: "_reduceReserves",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract ComptrollerInterface",
        name: "newComptroller",
        type: "address"
      }
    ],
    name: "_setComptroller",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "implementation_", type: "address" },
      { internalType: "bool", name: "allowResign", type: "bool" },
      { internalType: "bytes", name: "becomeImplementationData", type: "bytes" }
    ],
    name: "_setImplementation",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "contract InterestRateModel",
        name: "newInterestRateModel",
        type: "address"
      }
    ],
    name: "_setInterestRateModel",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address payable",
        name: "newPendingAdmin",
        type: "address"
      }
    ],
    name: "_setPendingAdmin",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "newReserveFactorMantissa",
        type: "uint256"
      }
    ],
    name: "_setReserveFactor",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "accrualBlockNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "accrueInterest",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOfUnderlying",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "borrowAmount", type: "uint256" }
    ],
    name: "borrow",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "borrowBalanceCurrent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "borrowBalanceStored",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "borrowIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "borrowRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "comptroller",
    outputs: [
      {
        internalType: "contract ComptrollerInterface",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "delegateToImplementation",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "delegateToViewImplementation",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "exchangeRateCurrent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "exchangeRateStored",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "getAccountSnapshot",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getCash",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "implementation",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "interestRateModel",
    outputs: [
      { internalType: "contract InterestRateModel", name: "", type: "address" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "isCToken",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "uint256", name: "repayAmount", type: "uint256" },
      {
        internalType: "contract CTokenInterface",
        name: "cTokenCollateral",
        type: "address"
      }
    ],
    name: "liquidateBorrow",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "mintAmount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "pendingAdmin",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "redeemTokens", type: "uint256" }
    ],
    name: "redeem",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "uint256", name: "redeemAmount", type: "uint256" }
    ],
    name: "redeemUnderlying",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "repayAmount", type: "uint256" }],
    name: "repayBorrow",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "uint256", name: "repayAmount", type: "uint256" }
    ],
    name: "repayBorrowBehalf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "reserveFactorMantissa",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "liquidator", type: "address" },
      { internalType: "address", name: "borrower", type: "address" },
      { internalType: "uint256", name: "seizeTokens", type: "uint256" }
    ],
    name: "seize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "supplyRatePerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalBorrows",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "totalBorrowsCurrent",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalReserves",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "src", type: "address" },
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "underlying",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
const cDAI = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643";
const cBAT = "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E";
const cETH = "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5";
const cREP = "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1";
const cSAI = "0xf5dce57282a584d2746faf1593d3121fcac444dc";
const cUSDC = "0x39AA39c021dfbaE8faC545936693aC917d5E7563";
const cWBTC = "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4";
const cZRX = "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407";
const token2Address = new Map([
  ["cDAI", "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"],
  ["cBAT", "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E"],
  ["cETH", "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5"],
  ["cREP", "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1"],
  ["cSAI", "0xf5dce57282a584d2746faf1593d3121fcac444dc"],
  ["cUSDC", "0x39AA39c021dfbaE8faC545936693aC917d5E7563"],
  ["cWBTC", "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4"],
  ["cZRX", "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407"]
]);
function getCTokenName(address) {
  for (let [t, a] of token2Address) {
    if (a === address) return t;
  }
}

var web3;
var usingRemoteProvider = true;
if (
  typeof window.ethereum !== "undefined" &&
  window.ethereum.networkVersion &&
  window.ethereum.networkVersion === "1" &&
  window.ethereum.isMetaMask
) {
  try {
    web3 = new Web3(window.ethereum);
    let subscription = web3.eth.subscribe("newBlockHeaders");
    subscription.unsubscribe();
    console.log("Using local web3 provider");
    usingRemoteProvider = false;
  } catch (e) {
    usingRemoteProvider = true;
  }
}
if (usingRemoteProvider) {
  var infura = "wss://mainnet.infura.io/ws/v3/37b7ea53f2a04bda90f1faf9587190cc";
  var provider = new Web3.providers.WebsocketProvider(infura);
  web3 = new Web3(provider);
  console.log("Using remote web3 provider");
}

// Get instance of contracts
const cDaiContract = new web3.eth.Contract(cDAIABI, cDAI);

// Get new events and populate last events global variable
var events = [];
var getliquidationEvents = function getliquidationEvents(fromBlockNumber) {
  console.log(`获取清算事件的区块: ${fromBlockNumber}`);
  events = [];
  return cDaiContract.getPastEvents(
    "LiquidateBorrow",
    {
      fromBlock: fromBlockNumber,
      toBlock: "latest"
    },
    function(err, result) {
      if (!err) {
        console.log("已接收到的事件:", result.length);
        events = result;
      } else {
        console.log(err);
      }
    }
  );
};

// Show last events received
var eventsLoaded = false;
var showEvents = async function showEvents(someID) {
  // Iterate over events
  if (events) {
    document.getElementById("loading").innerHTML = "";
  }
  if (!events) return;
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    let values = "";
    let blockDate = new Date();
    await web3.eth.getBlock(event.blockNumber).then(function(block) {
      if (block) {
        let blockTime = block.timestamp;
        blockDate = new Date(blockTime * 1000);
        values = blockDate.toLocaleString() + " | ";
      } else {
        values = new Date().toLocaleString() + " | ";
      }
    });
    var data = event.returnValues;
    var cToken = getCTokenName(data.cTokenCollateral);
    values += "抵押品: <b>" + cToken + "</b> | ";
    var cTokenQuatity = parseInt(data.seizeTokens) / 10 ** 8;
    values += "数量: " + cTokenQuatity.toFixed(4) + " | ";
    var debtQuatity = parseInt(data.repayAmount) / 10 ** 18;
    values += "债务: " + debtQuatity.toFixed(4) + " cDai | ";
    var liquidator = data.liquidator;
    values +=
      "清算人: " +
      liquidator.slice(0, 6) +
      "..." +
      liquidator.slice(-4) +
      " | ";

    await web3.eth.getTransaction(event.transactionHash).then(function(tx) {
      let txHref = `https://etherscan.io/tx/${event.transactionHash}`;
      let txLink = `<a target="_blank" href="${txHref}">Tx:..${event.transactionHash.slice(
        -3
      )} Info</a>`;
      values += `${txLink} >>`;
    });

    // Get old page and Render new line in app
    let oldPage = document.getElementById("app").innerHTML;
    let newLine = "";
    if (someID === 0) {
      newLine = '<div class="row">' + values + "</div>";
    }
    document.getElementById("app").innerHTML = newLine + oldPage;
  }
  eventsLoaded = true;
};

// Fetch old events to populate list at initial load
var lastBlockfetch = 0;
var fetchLiquidations = async function fetchLiquidations(someID) {
  lastBlockfetch = await web3.eth.getBlockNumber();
  console.log("last block:" + lastBlockfetch);
  let fromBlock = lastBlockfetch - 4 * 60 * 24 * 7; // -> 3.14 / 8 days blocks count
  await getliquidationEvents(fromBlock);
  await showEvents(someID);
};

// New block event handler
async function newBlock(error, result) {
  if (result) {
    let newBlockNumber = result.number;
    if (!eventsLoaded) return;

    // Clear events and fetch new ones
    eventsLoaded = false;
    await getliquidationEvents(newBlockNumber);
    await showEvents(0);
    showLastUpdate();
  } else {
    console.log(error);
  }
}

function showLastUpdate() {
  let lastUpdateTag = document.getElementById("last-update");
  let now = new Date().toLocaleString();
  lastUpdateTag.innerHTML = `- 更新时间: ${now}`;
}

// ## Start Main function
fetchLiquidations(0);

// Only in DEV version (comment this line before minimize it)
//console.log('Loaded not optimized file');

// Subscribe to new blocks
setTimeout(function() {
  console.log("正在从链上获取新数据...");
  web3.eth.subscribe("newBlockHeaders", newBlock);
}, 5000);
