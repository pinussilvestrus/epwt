# epwt

[![CI](https://github.com/pinussilvestrus/epwt/workflows/CI/badge.svg)](https://github.com/pinussilvestrus/epwt/actions?query=workflow%3ACI)

Roller coaster mining with [Camunda Cloud](https://camunda.com/products/cloud/) - Example: Europa Park (Rust).

## Installation

```sh
git clone https://github.com/pinussilvestrus/epwt.git
cd epwt
npm install
```

## Start workers

Make sure to configure your [Camunda Cloud](https://camunda.com/products/cloud/) connection credentials. Have a look at the [example](https://github.com/pinussilvestrus/epwt/blob/main/.env.example) to get further information.

```sh
npm run start:worker
```

The workers will create a database file `db/rides.json`. This is required to make the `client` run.

## Start client

```sh
npm run start:client
```

## License

MIT
