
import {Observable, share, bufferTime, map, distinctUntilChanged, retry,} from 'rxjs';
import { convertToTrade } from './types.js';
import type { BybitDataShell, BybitRawTrade, Trade } from './types.js';

const stream = new Observable<Trade>((subscriber) => {
    const socket = new WebSocket('wss://stream.bybit.com/v5/public/spot');
    socket.addEventListener('open', () => {
        console.log('WebSocket connection opened');
        socket.send(JSON.stringify({
            op: 'subscribe',
            args: ['publicTrade.BTCUSDT']
        }));

    });
    socket.addEventListener('close', (error) => {
        console.log('WebSocket connection closed');
        subscriber.error(error);

    });

    socket.addEventListener('error', (error) => {
        subscriber.error(error);
    });

    socket.addEventListener('message', (event) => {
        const message: BybitDataShell = JSON.parse(event.data);
        if (!message.topic) {
            return;
        }
        message.data.forEach((trade) => {subscriber.next(convertToTrade(trade))})
    });
return () => {socket.close()};
})

const sharedStream = stream.pipe(retry({ delay: 4000 }),share());
const candle = sharedStream.pipe(bufferTime(5000))
const candleSub = candle.subscribe(trades => {console.log(trades.length,"Trade, ", "Notional volume: ", trades.reduce((acc, trade) => acc + (trade.price * trade.amount), 0))});
const ticker = sharedStream.pipe(
    map(trade => (trade.price)),
    distinctUntilChanged()
)
    const tickerSub = ticker.subscribe(price => {console.log("BTC fiyat oynadı: ", price)})

setTimeout( () => tickerSub.unsubscribe(), 60000);
setTimeout( () => candleSub.unsubscribe(), 60000);