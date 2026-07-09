const amqp = require("amqplib");

async function main() {
    const connection = await amqp.connect('amqp://localhost');
    console.log("Connected");

    const channel = await connection.createChannel();
    const queue = "orders";
    await channel.assertQueue('orders.dlq', {durable: true})
    await channel.assertQueue(queue, {
        durable: true,
        deadLetterExchange: '',
        deadLetterRoutingKey: 'orders.dlq'
    });
    await channel.prefetch(1);
    await channel.consume(queue, (msg) => {
        if (msg === null) {
            return msg;
        }
        const rule = JSON.parse(msg.content.toString())
        if (rule.price < 100) {
            console.log('Recieved prices under 100', rule);
            channel.ack(msg)
        } else {
            channel.nack(msg, false, false);
        }

    });


}

main().catch((err) => {
    console.log(err)
});