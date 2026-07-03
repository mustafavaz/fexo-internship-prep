interface Trade {
    id: number;
    symbol: string;
    side: 'buy' | 'sell';
    price: number;
    amount: number;
    timestamp: number;
}
const trades: Trade[] = [{id: 1, symbol: 'BTC', side: 'buy', price: 1293, amount: 1234, timestamp: 1203},
     {id: 2, symbol: 'ETH', side: 'sell', price: 3456, amount: 5678, timestamp: 1204},
      {id: 3, symbol: 'XRP', side: 'buy', price: 7890, amount: 9101, timestamp: 1205},
      {id: 4, symbol: 'LTC', side: 'sell', price: 2345, amount: 6789, timestamp: 1206},
       {id: 5, symbol: 'ADA', side: 'buy', price: 4567, amount: 8901, timestamp: 1207},
       {id: 6, symbol: 'DOT', side: 'sell', price: 5678, amount: 1234, timestamp: 1208},
        {id: 7, symbol: 'SOL', side: 'buy', price: 6789, amount: 5678, timestamp: 1209},
         {id: 8, symbol: 'DOGE', side: 'sell', price: 7890, amount: 9101, timestamp: 1210},
          {id: 9, symbol: 'BNB', side: 'buy', price: 8901, amount: 2345, timestamp: 1211},
           {id: 10, symbol: 'AVAX', side: 'sell', price: 9012, amount: 6789, timestamp: 1212}];

const buyTrades = trades.filter(trade => trade.side === 'buy');
console.log(buyTrades);

const mappedTrades = trades.map(trade => trade.price);
console.log(mappedTrades);

const totalVolume = trades.reduce((sum, trade) => sum + (trade.price * trade.amount), 0);
console.log(totalVolume);

const averagePrice = trades.reduce((sum,trade) => sum + trade.price, 0) / trades.length;
console.log(averagePrice);

const counter = trades.reduce((acc, trade) => {
    acc[trade.side]++;
    return acc;
}, { buy: 0, sell: 0 });
console.log(counter);

        