interface BinancePrice {
    symbol: string;
    price: string;}


async function getLivePrice (symbol: string ): Promise<number | undefined> {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        if (!response.ok) {
            throw new Error(response.statusText);            
        }
   const data = await response.json() as BinancePrice;
   const price = Number(data.price);
   return price;

    } catch (error) {
        console.error(error)
        return undefined;
    }
}
async function getPrice(){
const results =Promise.all([
    getLivePrice('BTCUSDT'),
    getLivePrice('ETHUSDT'),]);
    console.log(await results);
};
setInterval(getPrice, 3000);
