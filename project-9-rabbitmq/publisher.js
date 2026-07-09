const amqp = require("amqplib");
const orders = [
    {id: "order1", side: "bid", price: 96, qty: 5},
    {id: "order2", side: "ask", price: 97, qty: 10},
    {id: "order3", side: "bid", price: 98, qty: 15},
    {id: "order4", side: "ask", price: 99, qty: 20},
    {id: "order5", side: "ask", price: 100, qty: 25},
    {id: "order6", side: "bid", price: 101, qty: 30},
    {id: "order7", side: "ask", price: 102, qty: 35},
    {id: "order8", side: "bid", price: 103, qty: 40},
    {id: "order9", side: "bid", price: 104, qty: 45},
    {id: "order10", side: "ask", price: 105, qty: 50},
];

async function main() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    console.log("Connected");
    const queue = 'orders';
    await channel.assertQueue('orders.dlq', {durable: true})
    await channel.assertQueue(queue, {
        durable: true,
        deadLetterExchange: '',
        deadLetterRoutingKey: 'orders.dlq'
    });
    for (const order of orders) {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)), {persistent: true});
    }
    await new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
    console.log("Orders sent:", orders.length);

    await channel.close();
    await connection.close();

}

main().catch((err) => {
    console.log(err)
});
