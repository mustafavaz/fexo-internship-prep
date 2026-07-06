export interface BybitDataShell {
    topic: string;
    ts: number;
    type: string;
    data: (BybitRawTrade)[];
}

export interface BybitRawTrade {
    i: string;
    T: number;
    p: string;
    v: string;
    S: 'Sell' | 'Buy';
    seq: number;
    s: string;
    BT: boolean;
    RPI: boolean;
}

export interface Trade {
    id: string;
    symbol: string;
    side: 'buy' | 'sell';
    price: number;
    amount: number;
}

export function convertToTrade(rawTrade: BybitRawTrade): Trade {
    const trade: Trade = {
        symbol: rawTrade.s,
        price: Number(rawTrade.p),
        amount: Number(rawTrade.v),
        side: rawTrade.S === 'Buy' ? 'buy' : 'sell',
        id: rawTrade.i
    }
    return trade;
}

