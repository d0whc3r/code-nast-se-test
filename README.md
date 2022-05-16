# Code nast project
Technical test for code-nast. This repository is a monorepo with [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) it contains a `server` and a `client`

## Server
Node with express

Run server (development):
```bash
yarn server:dev
```

Run server (production):
```bash
yarn server:start
```

Testing:
```bash
yarn server:test
```

## Client
React 18

Run client (development):
```bash
yarn client:dev
```

Run client (production):
```bash
yarn client:start
```

Testing:
```bash
yarn client:test
```

## Multi-run
Start server + client in development:
```bash
yarn dev
```

Start server + client in production:
```bash
yarn start
```

Testing:
```bash
yarn test
```
