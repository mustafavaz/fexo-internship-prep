interface Order {
    id: number;
    price: number;
    amount: number;
    side: 'bid' | 'ask';
}



function createOrderBook(){
let orders: Order[] = [
    {id: 1, price: 100, amount: 10, side: 'bid'},
    {id: 2, price: 101, amount: 5, side: 'ask'},
    {id: 3, price: 99, amount: 20, side: 'bid'},
    {id: 4, price: 102, amount: 15, side: 'ask'},
    {id: 5, price: 98, amount: 25, side: 'bid'},
    
];
return {
    addOrder: (order: Order) => {
        orders.push(order);
    },
    getOrders: () => {
    
        return orders;
    },
    getBids: () => {
       const bids =  orders.filter(order => order.side === 'bid')
        bids.sort((a,b) => b.price - a.price)
        return bids; 
    },
    getAsks: () => {
        const asks = orders.filter(order => order.side === 'ask')
        asks.sort((a,b) => a.price - b.price) 
        return asks;
    }
};
}
const book = createOrderBook();
console.log(book.getOrders());
book.addOrder({id: 6, price: 103, amount: 30, side: 'ask'});
console.log(book.getOrders());
console.log(book.getBids())
console.log(book.getAsks())
