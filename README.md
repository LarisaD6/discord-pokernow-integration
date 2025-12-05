# discord-pokernow-integration
This project integrates the PokerNow.club application into Discord, enabling members to create and join poker tables directly within the server. Players can practice and improve their poker skills for free, while enjoying a community‑driven experience with leaderboards, chip management, and customizable game settings.

# Discord PokerNow Integration

This project integrates the [PokerNow.club](https://pokernow.club) application into Discord, enabling members to create and join poker tables directly within the server.  
Players can practice and improve their poker skills for free, while enjoying a community‑driven experience with leaderboards, chip management, and customizable game settings.

---

## Project Architecture

1. User Layer (Discord)
Players interact through commands:

/wallet — create a wallet

/balance — check balance

/puzzle create or /poker table — create a game

/daily — receive daily rewards

2. Discord Bot Node
Receives player commands.

Manages game logic (buy-ins, rewards, table creation).

Stores data in a local database (SQLite/Postgres).

Generates transactions for the blockchain.

3. Linera SDK
Connects the bot to the Linera network.

Creates microchains for players.

Manages transactions (buy-ins, rewards).

Connects the signer (MetaMask or Dynamic).

4. MetaMask (or another wallet)
Players connect the wallet.

The wallet signs transactions.

Ensures security and control over private keys.

5. Testnet Conway (Linera Protocol)
Accepts transactions from the SDK.

Stores player balances and game history.

Allows risk-free testing of token mechanics.

🚀 Data Flow
Player → Discord team.

Bot → Checks local database and generates transaction.

Linera SDK → Calls MetaMask for signature.

Signed transaction → Sent to Testnet Conway.

Network updates balance → Bot syncs data back to local database.

---

## Installation


│ Discord Users │
│ (players, teams) │

│
▼

│ Discord Bot Node │
│ - Game Logic │
│ - SQLite Database │
│ - Table Generation │

│
▼

│ Linera SDK │
│ - creating microchains │
│ - transactions │
│ - connecting with wallets │

│
▼

│ MetaMask │
│ - key storage │
│ - transaction signing │

│
▼

│ Conway Testnet │
│ - Linera Network │
│ - Balance Storage │
│ - Game History │


Logging channel

https://www.youtube.com/watch?v=yiLOFDuiWSk
