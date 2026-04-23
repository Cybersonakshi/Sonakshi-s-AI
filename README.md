# Sonakshi’s AI 

*A simple tool to help students figure out what career might suit them*


## What this project is

This is a basic web app I made to solve a common problem —
a lot of students don’t really know what career to choose.

Instead of guessing or following others, this app gives suggestions based on:

* what you like
* what you’re good at
* how you think

It’s not meant to be perfect, just helpful.

## How it works (in normal words)

### 1. You enter your details

Just basic stuff:

* your name
* your class
* subjects you’re comfortable with
* things you’re interested in


### 2. You answer a short quiz

There are 10 simple questions.

Nothing complicated — just things like:

* do you like solving problems?
* do you prefer creative work?
* do you enjoy working with people?

This helps understand your personality a bit.


### 3. Your data is sent to AI

All your answers + details are sent to the backend.

From there, the app sends it to an AI model.


### 4. AI gives career suggestions

The AI looks at your inputs and returns:

* 3 career options
* why they suit you
* what steps you should take
* exams related to that field


### 5. You see your results

Everything is shown in a simple format so it’s easy to read.


## Tech used (nothing fancy)

### Frontend

* HTML
* CSS
* JavaScript


### Backend

* Node.js
* Express


### AI

* OpenRouter (LLaMA model)


## Project structure

project/
├── index.html   // UI + logic
├── server.js    // backend + AI call
├── .env         // API key
├── package.json


## How to run it

1. Install dependencies

npm install


2. Start server

node server.js

3. Open the website
   (use Live Server or localhost)

## Problems I faced
* API key issues (invalid key, wrong platform, etc.)
* Understanding how frontend and backend connect
* Formatting AI response properly
* Fixing small JS errors (async/await, undefined functions)

## What I learned

* How APIs actually work
* How frontend talks to backend
* How to use AI in a real project
* Debugging real errors (not just theory)


## What can be improved later

* Add login/signup
* Save user history
* Add real college data
* Make UI better
* Turn it into a mobile app

## Final thought

This isn’t a perfect system.
It just gives a direction.

The idea is simple:
 instead of being confused, at least you get a starting point.

## Made for

College project — Sonakshi’s AI
