# FlyTogether

FlyTogether is a group flight search app that finds the cheapest flights when your crew is flying in from different cities.

The idea: one person creates a trip, shares a link, and everyone fills in their home city and available dates. Once the group is locked in, FlyTogether searches for destinations that everyone can reach — and ranks them by total combined price across all origins.

**Built for situations like:** Erasmus reunions, friend groups scattered across Europe, remote teams planning offsites.

---

## How it works

1. Someone creates a party and shares the invite link
2. Each friend opens the link and enters their city + available dates (no account needed)
3. The party creator locks the group and triggers the search
4. Everyone sees a ranked list of destinations they can all fly to, sorted by total price

---

## Features

- Multi-origin flight search — searches from every member's city simultaneously
- "Anywhere" mode — finds the cheapest destinations without a fixed target
- Results filtered to only show destinations everyone can reach
- Sorted by total combined price across all origins
- 24h Redis caching so repeat searches are instant
- Dark / light theme

---

## Tech stack

**Backend**
- Node.js + Express + TypeScript
- PostgreSQL via Prisma ORM
- Redis for flight search caching
- Kiwi.com API for real-time flight data

**Frontend**
- React 19 + Vite
- Mantine UI + Framer Motion

---

## In progress

### AI-powered packing suggestions
Based on the destination's weather forecast and the type of trip, an AI assistant will suggest what to pack — including things you might not think of. For example:
- A rain jacket even if the forecast looks sunny
- Thermal base layers and hiking boots for destinations near mountains
- Light layers for destinations with high daily temperature swings

### Trip advisor
Key points of interest for the chosen destination, with Google Maps integration so you can explore and plan before you even book.

