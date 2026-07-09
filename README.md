# fexobit-staj-prep

Hands-on practice for a backend internship at **Fexobit**, a crypto exchange (Node.js + RxJS, PostgreSQL, Redis, RabbitMQ, uWebSockets.js — plain JavaScript/CommonJS, no Nest/Express).

Coming from a Java backend background — progressively harder projects, all trading/exchange-themed. Projects 1–8 were written in TypeScript to build fundamentals; from Project 9 on, the repo switches to plain JS/CommonJS to match the real Fexobit stack.

## Projects

| # | Project | Concepts | Status |
|---|---------|----------|--------|
| 1 | [Trade Analysis Module](./project-1-trade-analysis) | interfaces, union types, `map`/`filter`/`reduce`, arrow functions | ✅ done |
| 2 | Mini Order Book | closures, state management, sorting | ✅ done|
| 3 | Live Price Fetcher | `async`/`await`, `Promise`, `fetch`, typing external APIs | ✅ done|
| 4 | Wallet REST API | Node + Express, routing, JSON API, modules | ✅ done |
| 5 | [Live Trade Stream + Subscribers](./project-5-trade-stream) | event-driven, streams, callbacks — the gateway to RxJS | ✅ done |

## Projects 6–10 — from RxJS to the real exchange stack

Built alongside the internship, each on top of the last.

| # | Project | Concepts | Status |
|---|---------|----------|--------|
| 6 | Reactive Trade Stream (RxJS) | `Observable`, `Subject`, `map`/`filter`/`scan`, hot vs cold, unsubscribe | ✅ done |
| 7 | [Live Market Data Pipeline](./project-7-ws-rxjs-stream) | WebSocket → RxJS, `bufferTime`, `retry`, `share` multicasting | ✅ done |
| 8 | [Redis Order Book & Cache](./project-8-redis-orderbook) | ZSET order book, ZSET+hash, pub/sub, `INCR`+TTL rate limiting | ✅ done |
| 9 | [RabbitMQ Service Split](./project-9-rabbitmq) | publish/consume, manual ack/nack, prefetch, DLQ, persistence | ✅ done |
| 10 | Capstone: Mini Exchange | Fexobit-style layered architecture (no framework), PostgreSQL transactions & row locking, Docker Compose, full stack integration | 🚧 in progress |

Project 10 deliberately mirrors the real Fexobit architecture (plain JS, layered services, result-envelope pattern, RxJS-wrapped infra) instead of the originally planned NestJS. It's built as three services — an order intake API, a matching/settlement processor, and a WebSocket stream gateway — on top of PostgreSQL, Redis and RabbitMQ via Docker Compose.

## How this repo works

Every line of code here is written by hand — no AI-generated solutions. Claude Code is used strictly as a **reviewer/mentor** in this repo (see [CLAUDE.md](./CLAUDE.md)): it points out bugs and explains *why*, but never writes or edits the actual exercise code.
