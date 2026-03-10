# Pocket Professor

Pocket Professor is a front-end concept prototype for an AI-powered study companion app. It is designed to demonstrate the user interface, interaction flow, and overall product concept rather than provide a production-ready system.

## Overview

This project showcases a mobile-style study assistant interface built with React. Users can:

* customise a hologram-style professor
* view notes pages
* explore quiz entry points
* try a simple exam flow
* view a leaderboard screen

The purpose of this prototype is to present the product idea, UI direction, and interaction logic.

## Important Note

This is a **concept product / front-end prototype only**.

It does **not** include a real back-end or production data pipeline.

That means the current version does **not** provide:

* real user authentication
* database storage
* actual note upload handling
* live leaderboard data
* persistent user settings
* AI model integration
* server-side quiz generation

All current data shown in the interface is static demo content for concept demonstration.

## Tech Stack

* React
* Vite
* JavaScript
* Inline CSS styling

## Run Locally

### 1. Clone the repository

```bash
git clone <your-github-repo-link>
cd pocket-professor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

After running the command above, Vite will provide a local address, usually:

```bash
http://localhost:5173/
```

Open that address in your browser to view the prototype.

## Project Structure

```bash
pocket-professor/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Current Scope

This prototype currently focuses on:

* interface design
* interaction flow
* concept validation
* visual presentation

It is intended for demonstration, coursework, pitching, or design exploration.

## Future Development Possibilities

Potential future improvements could include:

* connecting to a real back-end service
* storing notes in a database
* supporting file uploads
* generating quizzes dynamically
* adding user accounts and saved progress
* integrating AI tutoring features

## Disclaimer

This repository is for concept demonstration purposes. It should not be treated as a complete production application.

---

## How to Upload This Project to GitHub

### 1. Go into your project folder

```bash
cd ~/Desktop/pocket-professor
```

### 2. Initialise Git

```bash
git init
```

### 3. Add files

```bash
git add .
```

### 4. Commit

```bash
git commit -m "Initial commit"
```

### 5. Create a new repository on GitHub

Create a new empty repository on GitHub, for example:

`pocket-professor`

### 6. Connect local project to GitHub

Replace the link below with your own repository link:

```bash
git remote add origin https://github.com/your-username/pocket-professor.git
```

### 7. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Suggested Repository Description

A front-end concept prototype for an AI study companion app, built with React and Vite.
