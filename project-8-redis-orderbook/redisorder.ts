import { createClient } from "redis";


const client = createClient();

const subscriber = client.duplicate();
await subscriber.connect();
subscriber.on('error', err => console.log('Subscriber Redis Client Error', err));
await subscriber.subscribe("orderbook", (message) => {
    console.log("Message received:", JSON.parse(message));
})

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.DEL("bids")
await client.DEL("asks")
await client.DEL("orders")
await client.DEL("rate_limit:order1")
console.log("Connected to Redis");

const orders = [
    {id: "order1" ,side: "bid", price: 96, qty: 5},
    {id: "order2" ,side: "ask", price: 97, qty: 10},
    {id: "order3" ,side: "bid", price: 98, qty: 15},
    {id: "order4" ,side: "ask", price: 99, qty: 20},
    {id: "order5" ,side: "ask", price: 100, qty: 25},
    {id: "order6" ,side: "bid", price: 101, qty: 30},
    {id: "order7" ,side: "ask", price: 102, qty: 35},
    {id: "order8" ,side: "bid", price: 103, qty: 40},
    {id: "order9" ,side: "bid", price: 104, qty: 45},
    {id: "order10" ,side: "ask", price: 105, qty: 50},
];
for (const order of orders) {
    const key = order.side === 'bid' ? 'bids' : 'asks';
    await client.zAdd(key,{ score: order.price, value: order.id} )
    await client.hSet("orders", order.id, JSON.stringify({price: order.price, qty: order.qty}) )
}
async function cancelOrder(id: string) {
    const matchingOrder = orders.find(order => order.id === id);
    if(!matchingOrder) {
      return;
    }
    const key = matchingOrder.side === 'bid' ? 'bids' : 'asks';
    await client.zRem(key, id);
    await client.hDel("orders", id);
}

//REDİS z FUNCS
await cancelOrder("order3");
const bids = await client.zRange('bids', 0, 4,{REV: true})
const hm = await client.hmGet("orders", bids);
hm.forEach((order) => order === null ?  console.log("Data is null") : console.log(JSON.parse(order)));
const asks = await client.zRange('asks', 0, 4)

const bidsWithScore = await client.zRangeWithScores('bids', 0, 4, {REV: true})
const asksWithScore = await client.zRangeWithScores('asks', 0, 4)
console.log(asksWithScore);
console.log(bidsWithScore);

// PUB / SUB ASYNC
await client.publish("orderbook", JSON.stringify({bids, asks}));
console.log("Waiting for 5 seconds...");
await new Promise(resolve => setTimeout(resolve, 5000));

await client.publish("orderbook", JSON.stringify({bids, asks}));

// RATE LIMIT
async function checkRateLimit(id: string) {
    const rateLimit = 5;
    const key = `rate_limit:${id}`;
    const count = await client.incr(key);
    if (count === 1) {
        await client.expire(key, 60);
    }
    if (count > rateLimit) {
        throw new Error("Rate limit exceeded");
    } else {
        return true;
    }

}

for (let i = 0; i < 8; i++) {
    try {

        await checkRateLimit("order1");
        console.log("Request N:  ", i + 1, " Granted")
    }catch (error) {
        console.log("Request:N: ", i + 1, "Denied");
    }
}

await subscriber.quit();
await client.quit();


