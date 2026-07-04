import { BehaviorSubject, filter, map, scan } from 'rxjs';

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
const tradeSubject = new BehaviorSubject<Trade>(generateTrade());
tradeSubject.subscribe((trade) => { console.log(`Trade executed: ${trade.side} ${trade.amount} ${trade.symbol} at ${trade.price}`); });
const idSub = tradeSubject.subscribe((trade) => { console.log(`Trade ID: ${trade.id}`); });
tradeSubject.subscribe((trade) => { console.log(`Trade Symbol: ${trade.symbol}`); });


const buyVolume = tradeSubject.pipe(
    filter(trade => trade.side === 'buy'),
    map(trade => trade.amount * trade.price),
    scan((acc, value) => acc + value, 0));
buyVolume.subscribe(totalVolume => {
    console.log(`Total Buy Volume: ${totalVolume}`);
});

setInterval(() => {
    const trade = generateTrade();
    tradeSubject.next(trade);
}, 1000);
setTimeout(() => {
    tradeSubject.subscribe(trade => { console.log(`Late trade subscription: ${trade.id},`); });
}, 5000);
setTimeout(() => {
    idSub.unsubscribe();
    console.log("Unsubscribed from trade ID updates.");
}, 10000);