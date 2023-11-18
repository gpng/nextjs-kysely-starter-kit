# NextJS Kysely Starter Kit

This starter kit sets up some default configurations for Next.JS with Typescript and Kysely.

It assumes that you will be relying on React Server Actions, so no backend API is required.

# Table of Contents

1. [Setup](#setup)
1. [Databse](#database)
1. [Component Library](#component-library)

# Setup

## Pre-requisites

1. [Docker Compose](https://docs.docker.com/compose/)
1. [pnpm](https://pnpm.io/)

## Run databse

```sh
docker-compose up -d
```

## Run dev server

```sh
pnpm run dev
```

# Database

Database dialect is PostgreSQL, using [Kysely](https://kysely.dev/) as a query builder and migration tool.

[kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen) is used to automatically generate type definitions for Kysely from the database schema.

## Migrations

Note: You might need to restart your IDE for Typescript to correct infer the updated types.

### Create Migration

```sh
pnpm run db:migrate:create MigrationName
```

Refer to https://kysely.dev/docs/migrations for migration examples

### Migrate

```sh
pnpm run db:migrate:up
```

This also generates the types after migration.

### Rollback

```sh
pnpm run db:migrate:down
```

This also generates the types after migration rollback.

## Generate schema for Kysely

This ran automatically if you migrate or rollback using the above commands.

```sh
pnpm run db:schema:generate
```

# Component Library

Components are generated from [shadcn/ui](https://ui.shadcn.com/).

## Adding components

All components can be found in in the [shadcn/ui components documentation](https://ui.shadcn.com/docs/components/accordion).

Components will be installed using the shadcn/ui cli, which will look like

```sh
pnpm dlx shadcn-ui@latest add accordion
```

The component will be created in the `src/app/(main)/components/ui` folder.
