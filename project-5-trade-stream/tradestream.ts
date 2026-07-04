interface Trade {
    id: number;
    symbol: string;
    side: 'buy' | 'sell';
    price: number;
    amount: number;
}
function generateTrade(): Trade {
    const id = Math.floor(Math.random() * 1000);
    const symbols = ["BTC", "ETH", "USD",]
    const index = Math.floor(Math.random() * symbols.length);
    const side = Math.random() > 0.5 ? 'buy' : 'sell';
    const price = Math.random() * 10000;
    const amount = Math.random() * 10;
    return { id, symbol: symbols[index] ?? 'BTC', side, price, amount }
}


function createTradeStream() {
    let subscribers: ((trade: Trade) => void)[] = [];


    return {
        subscribe: (callback: (trade: Trade) => void) => {
            subscribers.push(callback);

            return () => {
                subscribers = subscribers.filter(sub => sub !== callback);
            };

        },
        emit: (trade: Trade) => {
            subscribers.forEach(callback => callback(trade))

        }
    }
}


const stream = createTradeStream();
stream.subscribe((trade) => { console.log(`Trade executed: ${trade.side} ${trade.amount} ${trade.symbol} at ${trade.price}`); });
const unsub = stream.subscribe((trade) => { console.log(`Trade ID: ${trade.id}`); });
stream.subscribe((trade) => { console.log(`Trade Symbol: ${trade.symbol}`); });
setInterval(() => {
    const trade = generateTrade();
    stream.emit(trade);
}, 1000);

setTimeout(() => {
    unsub();
    console.log("Unsubscribed from trade ID updates.");
}, 5000);




