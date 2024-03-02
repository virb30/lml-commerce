# LML Commerce 

An eCommerce project to practice and study concepts like, but not limited to:

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

## Contents

This repo is composed by all lml-commerce components, including but not limited to:

- backend - NestJs API
- frontend - React SPA
- database - Mysql

## How to develop

1. clone/fork this repository
1. install dependencies
1. rename .env.example and set your environment variables
1. start database container
1. run tests
1. start application

```console
git clone https://github.com/virb30/lml-commerce.git
cd lml-commerce
npm install
mv backend/.env.example backend/.env
docker compose up -d
npm run test:backend
npm run dev
```

This will start all packages of the project (backend and frontend)


### Instructions about dependencies install

If you want to install a dependency that will be only available in one workspace (backend or frontend)
and not globally use the `--prefix` option, eg:

```console
npm install --prefix frontend date-fns 
```

This command will install the `date-fns` library just for the frontend workspace.