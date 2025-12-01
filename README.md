# discord-pokernow-integration
This project integrates the PokerNow.club application into Discord, enabling members to create and join poker tables directly within the server. Players can practice and improve their poker skills for free, while enjoying a community‑driven experience with leaderboards, chip management, and customizable game settings.

# Discord PokerNow Integration

This project integrates the [PokerNow.club](https://pokernow.club) application into Discord, enabling members to create and join poker tables directly within the server.  
Players can practice and improve their poker skills for free, while enjoying a community‑driven experience with leaderboards, chip management, and customizable game settings.

---

## Features
- Create poker tables directly from Discord using bot commands.
- Manage chips and balances with simple commands.
- Leaderboards to track player performance.
- Configurable game settings (blinds, seats, etc.).
- Community‑friendly integration with Discord channels.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/discord-pokernow-integration.git
   cd discord-pokernow-integration
Install dependencies:

bash
npm install
(or pip install -r requirements.txt if you use Python)

Configure environment variables:

Create a .env file in the project root.

Add your Discord Bot Token and any required API keys:

Код
DISCORD_TOKEN=your_token_here
POKERNOW_API_KEY=optional_if_used
Usage
Start the bot:

bash
npm start
(or python bot.py depending on your implementation)

In Discord, use commands:

/new-game → creates a new PokerNow table.

/chips check → shows your chip balance.

/chips transfer @user amount → transfers chips (if enabled).

/leaderboard → displays player rankings.

Configuration
Edit config.json or environment variables to adjust:

Default blinds

Starting chips

https://youtu.be/a-1Mg0hwe-c
Permissions (who can create tables)

Logging channel
