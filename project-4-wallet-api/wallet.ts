import express from "express";
const app = express();
app.use(express.json())
const wallet: Record<string, number> = {
    USDT: 1000, BTC: 0, ETH: 0
}

app.get('/wallet', (req, res) => {
    res.json(wallet)
})
app.post('/deposit', (req, res) => {
    const { currency, amount } = req.body;
    if (!amount || amount <= 0 || typeof amount !== 'number') {
        return res.status(400).json({ message: "Invalid amount" })
    }
    wallet[currency] = (wallet[currency] ?? 0) + amount;
    res.json({ message: `Deposited ${amount} ${currency}` })

})
app.post('/withdraw', (req, res) => {
    const { currency, amount } = req.body;
    if ((wallet[currency] ?? 0) < amount) {
        return res.status(400).json({ message: `Insufficient funds in ${currency}` })
    } else {
        wallet[currency] = (wallet[currency] ?? 0) - amount;
        res.json({ message: `Withdrew ${amount} ${currency}` })
    }
});

app.listen(3000, () => {
    console.log("Server live.");
});
