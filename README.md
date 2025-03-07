# CashFlow API

## Description

This is the backend API for the CashFlow application. It provides endpoints for managing transactions and other financial data.

## Features

* **Entities:**
    * Create a new entity
    * Update an entity
    * Get all entities
    * Get entity by ID
    * ...

* **Expenses:**
    * Create a new expense
    * Update an expense
    * Get all expenses
    * Get expenses by entity
    * ...

* **Motives:**
    * Create a new motive
    * Update a motive
    * Get all motives
    * Get motive by expense
    * ...

* **Transactions:**
    * Create a new transaction
    * Update an existing transaction
    * Get all transactions
    * Get transaction by ID
    * Get transaction by entity
    * Delete a transaction
    * Create a new account
    * Get current account by entity
    * Update an account
    * ...

## Technologies Used

* Node.js
* Express.js
* PostgreSQL
* pg (PostgreSQL client for Node.js)
* dotenv
* cors

## Getting Started

### Prerequisites

* Node.js and npm installed
* PostgreSQL database set up

### Installation

1. Clone the repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Create a `.env` file based on the `.env.template` and fill in the required values:
    * the process of creating the .env file should be automatic upon the instalation. The user will be prompeted to input theparameters.
    DB_USER=<your_db_user>
    DB_PASSWORD=<your_db_password>
4. Start the server: `npm start` (or `node index.js`)

## API Endpoints
* --- EXAMPLES --- *

* **Transactions:**
 * `GET /transactions`: Get all transactions
 * `GET /transactions/:id`: Get transaction by ID
 * `POST /transactions`: Create a new transaction
 * `PUT /transactions/:id`: Update an existing transaction
 * `DELETE /transactions/:id`: Delete a transaction
 * ...

* **Entities:** (If applicable)
 * `GET /entities`: Get all entities
 * ...

* **Motives:** (If applicable)
 * `GET /motives`: Get all motives
 * ...