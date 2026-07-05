
import type { BybitDataShell, BybitRawTrade, Trade } from './types.js';


const socket = new WebSocket('wss://stream.bybit.com/v5/public/spot');

socket.addEventListener('open', () => {
    console.log('WebSocket connection opened');
    socket.send(JSON.stringify({
        op: 'subscribe',
        args: ['publicTrade.BTCUSDT']
    }));

});
socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');

});

socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});

socket.addEventListener('message', (event) => {
    const message: BybitDataShell = JSON.parse(event.data);
    if (!message.topic) {
        return;
    }
    const convertedMessage: Trade[] = message.data.map(convertToTrade)
    console.log('Received data:', convertedMessage);
});

function convertToTrade(rawTrade: BybitRawTrade): Trade {
    const trade: Trade = {
        symbol: rawTrade.s,
        price: Number(rawTrade.p),
        amount: Number(rawTrade.v),
        side: rawTrade.S === 'Buy' ? 'buy' : 'sell',
        id: rawTrade.i
    }
    return trade;
}