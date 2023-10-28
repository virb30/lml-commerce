# LML Commerce

An E-commerce project to practice and study concepts like, but not limited to:

* Domain-Driven Design
* Clean Architecture
* Design Patterns
* Ports and adapters
* TDD
* TypeScript/Node.js

## Requirements

* [Docker](https://docs.docker.com/engine/install/)
* [Docker compose](https://docs.docker.com/compose/install/#installation-scenarios)
* Node 20.x

## How to use

1. clone/fork this project
1. install dependencies
1. rename .env.example and set your environment variables
1. start database container
1. run tests
1. start application

```console
git clone https://github.com/virb30/lml-commerce.git
npm install
mv .env.example .env
docker compose up -d
npm test
npm start
```

Check if the server is running by accessing `http://localhost:<PORT>/health-check`