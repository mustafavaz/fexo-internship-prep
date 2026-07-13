CREATE TABLE users (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name  text NOT NULL
);
CREATE TABLE balances (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id bigint REFERENCES users(id) NOT NULL,
    asset text NOT NULL,
    available numeric(20, 8) check (available >= 0) NOT NULL default 0,
    reserved numeric(20, 8) check (reserved >= 0) NOT NULL default 0,
    UNIQUE (user_id, asset)

);
CREATE TABLE orders (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id bigint REFERENCES users(id) NOT NULL,
    symbol text NOT NULL,
    side text NOT NULL CHECK (side IN ('bid', 'ask')),
    price numeric(20, 8) NOT NULL CHECK (price > 0),
    qty numeric(20, 8) NOT NULL CHECK (qty > 0),
    remaining_qty numeric(20, 8) NOT NULL,
    status text NOT NULL CHECK (status IN ('open', 'filled', 'partially_filled', 'canceled')) default 'open',
    created_at timestamptz NOT NULL DEFAULT NOW()
);
CREATE TABLE trades (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    price numeric(20, 8) not null check (price > 0),
    qty numeric(20, 8) not null check (qty > 0),
    bid_id bigint REFERENCES orders(id) NOT NULL,
    ask_id bigint REFERENCES orders(id) NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW()

);
INSERT INTO users (name) VALUES ('Mustafa');
INSERT INTO users (name) VALUES ('Berat');
INSERT INTO balances (user_id, asset, available) VALUES (1, 'BTC', 1);
INSERT INTO balances (user_id, asset, available) VALUES (1, 'USD', 10000);
INSERT INTO balances (user_id, asset, available) VALUES (2, 'BTC', 2);
INSERT INTO balances (user_id, asset, available) VALUES (2, 'USD', 5000);