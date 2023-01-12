# Demo Credit

![Zero Issues Shield](https://img.shields.io/badge/issues-0-brightgreen)
[![GitHub stars](https://img.shields.io/github/stars/oseughu/demo-credit.svg)](https://github.com/oseughu/demo-credit)

## About The Project

This an API built for a demo credit wallet for the Lendsqr backend engineer assessment.
Users can deposit, transfer and withdraw funds with a single wallet.

View the docs [here](https://ose-ughu-lendsqr-be-test.fly.dev/api/v1/docs)
View the postman collection [here](https://documenter.getpostman.com/view/16097477/2s8ZDR7QxL)

### Please Note

- Transfers have to be done to another user on demo credit
- To send to users outside demo credit, make a withdrawal of the amount to the users account number

### Built With

[![Node.js Logo](https://nodejs.org/static/images/logo-light.svg)](https://nodejs.org)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

- Node 18.13

### Installation

1. Clone the repo

```sh

git clone https://github.com/oseughu/demo-credit.git

```

2. Install NPM packages

```sh

npm install

```

3. Enter your environment variables in a `.env` file you will create

```env

NODE_ENV=development
SECRET= # FOR SESSIONS AND JWT
PORT=3000
USER_PASSWORD= # FOR HASHING USER PASSWORD WHEN SEEDING
DB_CLIENT= # pg mysql mysql2
DB_URI_DEV=
DB_URI_PROD=
DB_URI_TEST=

```

## Contact

Twitter - [@oseughu](https://twitter.com/oseughu)
Email - oseughu@gmail.com

Project Link: [https://github.com/oseughu/demo-credit](https://github.com/oseughu/demo-credit)
