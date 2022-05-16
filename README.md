# Code nast project
Technical test for code-nast. This repository is a monorepo with [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) it contains a `server` and a `client`

## Server
Node with express (and jest)

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
React 18 with vite (and vitest) + tailwindcss

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

# Future work

- Add e2e tests
- Add linting
- Improve pipeline with coverage upload and code quality tools
- Add tests for client context
- Add typescript
- Add husky to check linting before commit/push
- Pipeline for auto deploy in dev/pre/uat environment
