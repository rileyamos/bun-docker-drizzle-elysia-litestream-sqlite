# bun-docker-drizzle-elysia-litestream-sqlite

A starter project for a backend API using Bun, Elysia, Drizzle, SQLite, Litestream, and Docker. A perfect stack for javascript apps deployed to a single server.

# Features

- [Bun](https://bun.sh/) - The Bun JavaScript runtime
- [Elysia](https://elysiajs.com/) - Backend web framework
- [Drizzle](https://orm.drizzle.team/) - Database ORM
- [SQLite](https://www.sqlite.org/) - Database
- [Litestream](https://litestream.io/) - Streaming replication for SQLite with backups and point-in-time-restore
- [Docker](https://www.docker.com/) - Containerization platform

## Development

### Setup

If this is your first time running the project, run the development setup script. This will create the `.env` file and the `dev/data` directory, and an empty `dev/data/sqlite.db` file for you to use in development.

```bash
bun ./dev/scripts/setup.sh
```

The app will fail to startup until you setup your own schema in `src/lib/db/schema.ts`. There is a demo script provided that will generate demo data for you should you need it.

If you don't want to setup the demo, proceed to configure your schema. Then run:

```bash
bunx drizzle-kit generate
```

### Use Demo Data

To seed the database with demo data, run the following command one time:

```bash
bun ./dev/scripts/demo.ts
```

Then start up the app in dev mode:

```bash
bun dev
```

Open http://localhost:3000/ with your browser to see the result.

## Database Schema

The database schema is defined in `src/lib/db/schema.ts`. If you make changes to the schema, for development you will need to run the following command to apply the changes to the database:

```bash
bunx drizzle-kit migrate
```

Note, that in production migrations are applied at startup automatically.

## Production

In production, the application is run as a compiled binary. To build the application, run the following command:

```bash
bun run build
```

This will create the `server` binary file in the root of the project.

To actually run the application, run the following command:

```bash
./server
```

This gets automatically called by Docker in `start.ts`.

## Upgrading

The Dockerfile uses the `oven/bun:1.1.36` image to build the application. To upgrade this, change the `FROM` line in the Dockerfile to the desired version.

## Litestream

Litestream is configured in `litestream.yml`. The `replicate` command is used to start the Litestream process.

The database can be restored from the latest backup or from a specific point in time using the `restore` command. See the [Litestream documentation](https://litestream.io/reference/restore/) for more information.
