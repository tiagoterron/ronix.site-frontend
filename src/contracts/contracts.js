import { images } from '../constants';
import { abi } from '../contracts';

const TKAddress = {
    BSC: {
        SLP: process.env.REACT_APP_BSC_TK_SLP,
        AXS:process.env.REACT_APP_BSC_TK_AXS,
        WETH: process.env.REACT_APP_BSC_TK_WETH,
        USDC: process.env.REACT_APP_BSC_TK_USDC,
        RON: process.env.REACT_APP_BSC_TK_RON,
        RNB: process.env.REACT_APP_BSC_TK_RNB,
        MATIC: process.env.REACT_APP_BSC_TK_MATIC,
        AVAX: process.env.REACT_APP_BSC_TK_AVAX,
        BNB: process.env.REACT_APP_BSC_TK_BNB
    },
    ETH: {
        SLP: process.env.REACT_APP_ETHT_TK_SLP,
        AXS:process.env.REACT_APP_ETHT_TK_AXS,
        WETH: process.env.REACT_APP_ETHT_TK_WETH,
        USDC: process.env.REACT_APP_ETHT_TK_USDC,
        RON: process.env.REACT_APP_ETHT_TK_RON,
        RNB: process.env.REACT_APP_ETHT_TK_RNB,
        MATIC: process.env.REACT_APP_ETHT_TK_MATIC,
        AVAX: process.env.REACT_APP_ETHT_TK_AVAX,
        BNB: process.env.REACT_APP_ETHT_TK_BNB
    },
    MATIC: {
        SLP: process.env.REACT_APP_MATICT_TK_SLP,
        AXS:process.env.REACT_APP_MATICT_TK_AXS,
        WETH: process.env.REACT_APP_MATICT_TK_WETH,
        USDC: process.env.REACT_APP_MATICT_TK_USDC,
        RON: process.env.REACT_APP_MATICT_TK_RON,
        RNB: process.env.REACT_APP_MATICT_TK_RNB,
        MATIC: process.env.REACT_APP_MATICT_TK_MATIC,
        AVAX: process.env.REACT_APP_MATICT_TK_AVAX,
        BNB: process.env.REACT_APP_MATICT_TK_BNB
    },
    RON: {
        SLP: process.env.REACT_APP_RON_TK_SLP,
        AXS:process.env.REACT_APP_RON_TK_AXS,
        WETH: process.env.REACT_APP_RON_TK_WETH,
        USDC: process.env.REACT_APP_RON_TK_USDC,
        RON: process.env.REACT_APP_RON_TK_RON,
        RNB: process.env.REACT_APP_RON_TK_RNB,
        MATIC: process.env.REACT_APP_RON_TK_MATIC,
        AVAX: process.env.REACT_APP_RON_TK_AVAX,
        BNB: process.env.REACT_APP_RON_TK_BNB
    },
    AVAX: {
        SLP: process.env.REACT_APP_AVAXT_TK_SLP,
        AXS:process.env.REACT_APP_AVAXT_TK_AXS,
        WETH: process.env.REACT_APP_AVAXT_TK_WETH,
        USDC: process.env.REACT_APP_AVAXT_TK_USDC,
        RON: process.env.REACT_APP_AVAXT_TK_RON,
        RNB: process.env.REACT_APP_AVAXT_TK_RNB,
        MATIC: process.env.REACT_APP_AVAXT_TK_MATIC,
        AVAX: process.env.REACT_APP_AVAXT_TK_AVAX,
        BNB: process.env.REACT_APP_AVAXT_TK_BNB
    }
    
}




const Tokens = {
    RON: {
        Symbol: "RON",
        Title: "RON",
        Logo: images.ron,
        Name: "Ronin Token",
        Decimals: 18,
        Price: null,
        Min: 0.5,
        Max: 100000,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18,
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
    },
    SLP: {
        Symbol: "SLP",
        Title: "SLP",
        Logo: images.slp,
        Name: "Smooth Love Portions",
        Decimals: 0,
        Price: null,
        Min: 50,
        Max: 1000000,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 0
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
    },
    AXS: {
        Symbol: "AXS",
        Title: "AXS",
        Logo: images.axs,
        Name: "Axir Infinity",
        Decimals: 18,
        Price: null,
        Min: 0.05,
        Max: 10000,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18,
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
        
    },
    WETH: {
        Symbol: "WETH",
        Title: "WETH",
        Logo: images.weth,
        Name: "Ethereum",
        Decimals: 18,
        Price: null,
        Min: 0.0002,
        Max: 100,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
    },
    USDC: {
        Symbol: "USDC",
        Title: "USDC",
        Logo: images.usdc,
        Name: "USD Coin",
        Decimals: 6,
        Price: null,
        Min: 5,
        Max: 100000,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 6
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
    },
    MATIC: {
        Symbol: "MATIC",
        Title: "WMATIC",
        Logo: images.matic,
        Name: "Polygon Coin",
        Decimals: 18,
        Price: null,
        Min: 5,
        Max: 10000,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
    },
    AVAX: {
        Symbol: "AVAX",
        Title: "WAVAX",
        Logo: images.avax,
        Name: "Avalanche Coin",
        Decimals: 18,
        Price: null,
        Min: 0.1,
        Max: 10000,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
    },
    BNB: {
        Symbol: "BNB",
        Title: "WBNB",
        Logo: images.bnb,
        Name: "Binance Coin",
        Decimals: 18,
        Price: null,
        Min: 0.01,
        Max: 10000,
        RON: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        MATIC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        AVAX: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        BSC: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        },
        ETH: {
            TotalLiquidity: null,
            MyLiquidity: null,
            MyRewards: null,
            TotalFees: null,
            MyBalance: null,
            Decimals: 18
        }
    }
}

const Networks = {
    BSC: {
        ChainId: 56,
        ChainIdHex: 0x38,
        Name: "Binance Smart Chain",
        Symbol: "BSC",
        Title: "BNB",
        Decimals: 18,
        RpcUrls: "https://bsc-dataseed.binance.org/",
        BlockExplorerUrls: "https://bscscan.com/",
        Logo: images.bnb,
        Status: true
    },
    RON: {
        ChainId: 2020,
        ChainIdHex: 0x7e4,
        Name: "Ronin Chain",
        Symbol: "RON",
        Title: "RON",
        Decimals: 18,
        RpcUrls: "https://api.roninchain.com/rpc",
        BlockExplorerUrls: "https://explorer.roninchain.com/",
        Logo: images.ron,
        Status: true
    },
    ETH: {
        ChainId: 3,
        ChainIdHex: 0x3,
        Name: "Ethereum Network",
        Symbol: "ETH",
        Title: "ETH",
        Decimals: 18,
        RpcUrls: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        BlockExplorerUrls: "https://ropsten.etherscan.io/",
        Logo: images.weth,
        Status: false
    },
    MATIC: {
        ChainId: 80001,
        ChainIdHex: 0x61,
        Name: "Polygon Network",
        Symbol: "MATIC",
        Title: "MATIC",
        Decimals: 18,
        RpcUrls: "https://rpc-mumbai.matic.today",
        BlockExplorerUrls: "https://mumbai.polygonscan.com/",
        Logo: images.matic,
        Status: false
    },
    AVAX: {
        ChainId: 43113,
        ChainIdHex: 0x61,
        Name: "Avalanche Network",
        Symbol: "AVAX",
        Title: "AVAX",
        Decimals: 18,
        RpcUrls: "https://api.avax-test.network/ext/bc/C/rpc",
        BlockExplorerUrls: "https://testnet.snowtrace.io/",
        Logo: images.avax,
        Status: false
    }
}

const contracts = {
    BSC: {
        SLP: {address: TKAddress.BSC.SLP, abi: abi.SLP, Status: true},
        AXS: {address: TKAddress.BSC.AXS, abi: abi.AXS, Status: true},
        WETH: {address: TKAddress.BSC.WETH, abi: abi.WETH, Status: true},
        USDC: {address: TKAddress.BSC.USDC, abi: abi.USDC, Status: true},
        RON: {address: TKAddress.BSC.RON, abi: abi.RON, Status: false},
        RNB: {address: TKAddress.BSC.RNB, abi: abi.RONIX, Status: true},
        MATIC: {address: TKAddress.BSC.MATIC, abi: abi.MATIC, Status: true},
        AVAX: {address: TKAddress.BSC.AVAX, abi: abi.AVAX, Status: true},
        BNB: {address: TKAddress.BSC.BNB, abi: abi.BNB, Status: true}
    },
    ETH: {
        SLP: {address: TKAddress.ETH.SLP, abi: abi.SLP, Status: false},
        AXS: {address: TKAddress.ETH.AXS, abi: abi.AXS, Status: false},
        WETH: {address: TKAddress.ETH.WETH, abi: abi.WETH, Status: false},
        USDC: {address: TKAddress.ETH.USDC, abi: abi.USDC, Status: false},
        RON: {address: TKAddress.ETH.RON, abi: abi.RON, Status: false},
        RNB: {address: TKAddress.ETH.RNB, abi: abi.RONIX, Status: false},
        MATIC: {address: TKAddress.ETH.MATIC, abi: abi.MATIC, Status: false},
        AVAX: {address: TKAddress.ETH.AVAX, abi: abi.AVAX, Status: false},
        BNB: {address: TKAddress.ETH.BNB, abi: abi.BNB, Status: false}
    },
    MATIC: {
        WETH: {address: TKAddress.MATIC.WETH, abi: abi.WETH, Status: true},
        USDC: {address: TKAddress.MATIC.USDC, abi: abi.USDC, Status: true},
        RNB: {address: TKAddress.MATIC.RNB, abi: abi.RONIX, Status: true},
        MATIC: {address: TKAddress.MATIC.MATIC, abi: abi.MATIC, Status: true},
        AVAX: {address: TKAddress.MATIC.AVAX, abi: abi.AVAX, Status: true},
        BNB: {address: TKAddress.MATIC.BNB, abi: abi.BNB, Status: true},
        RON: {address: TKAddress.MATIC.RON, abi: abi.RON, Status: false},
        SLP: {address: TKAddress.MATIC.SLP, abi: abi.SLP, Status: true},
        AXS: {address: TKAddress.MATIC.AXS, abi: abi.AXS, Status: false}
    },
    RON: {
        SLP: {address: TKAddress.RON.SLP, abi: abi.SLP, Status: true},
        AXS: {address: TKAddress.RON.AXS, abi: abi.AXS, Status: true},
        WETH: {address: TKAddress.RON.WETH, abi: abi.WETH, Status: true},
        USDC: {address: TKAddress.RON.USDC, abi: abi.USDC, Status: true},
        RON: {address: TKAddress.RON.RON, abi: abi.RON, Status: true},
        RNB: {address: TKAddress.RON.RNB, abi: abi.RONIX, Status: false},
        MATIC: {address: TKAddress.RON.MATIC, abi: abi.MATIC, Status: false},
        AVAX: {address: TKAddress.RON.AVAX, abi: abi.AVAX, Status: false},
        BNB: {address: TKAddress.RON.BNB, abi: abi.BNB, Status: false}
    },
    AVAX: {
        SLP: {address: TKAddress.AVAX.SLP, abi: abi.SLP, Status: true},
        AXS: {address: TKAddress.AVAX.AXS, abi: abi.AXS, Status: false},
        WETH: {address: TKAddress.AVAX.WETH, abi: abi.WETH, Status: true},
        USDC: {address: TKAddress.AVAX.USDC, abi: abi.USDC, Status: true},
        RON: {address: TKAddress.AVAX.RON, abi: abi.RON, Status: false},
        RNB: {address: TKAddress.AVAX.RNB, abi: abi.RONIX, Status: true},
        MATIC: {address: TKAddress.AVAX.MATIC, abi: abi.MATIC, Status: true},
        AVAX: {address: TKAddress.AVAX.AVAX, abi: abi.AVAX, Status: true},
        BNB: {address: TKAddress.AVAX.BNB, abi: abi.BNB, Status: true}
    }
    
}

export { TKAddress, Tokens, Networks, contracts };