This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the project and its stack, take a look at the following resources:

- [Project Repository](https://github.com/movahedan/officeday)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub Repository](https://github.com/vercel/next.js/)
- [Prisma Documentation](https://www.prisma.io/)
- [Next Swagger Doc Repository](https://github.com/jellydn/next-swagger-doc)
- [SWR Documentation](https://swr.vercel.app/)
- [Orval Documentation](https://orval.dev/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## Prisma Schema Generation

Our project utilizes Prisma as an ORM (Object-Relational Mapping) tool to facilitate database operations. To ensure that Prisma's client is correctly configured and up-to-date with our schema definition, we use the `yarn prisma generate` command. This section explains how to run this command and what it does.

### Prerequisites

- Node.js installed (version 12 or later recommended)
- Yarn package manager
- Prisma CLI installed (can be installed globally via `npm install -g prisma` or `yarn global add prisma`)
- Database URL configured in your `.env` file

### Running the Command

1. **Navigate to Your Project Directory**: Open your terminal and navigate to the root directory of your project.

2. **Run the Prisma Generate Command**: Execute the following command:

    ```
    yarn prisma generate --schema src/libs/data/prisma/schema.prisma
    ```

   This command tells Prisma to generate the necessary client files based on the schema located at `src/libs/data/prisma/schema.prisma`.

### What Happens When You Run This Command?

- **Schema Validation**: Prisma validates the schema file for any syntax or structural errors.

- **Client Generation**: Prisma generates or updates the Prisma client in the `node_modules/@prisma/client` directory. This client is tailored to the schema defined in `schema.prisma`.

- **Type Safety**: The generated Prisma client includes TypeScript types, ensuring type-safe database queries.

### Troubleshooting

- If you encounter any errors related to the Prisma schema, ensure that the schema file is correctly formatted and all models are defined properly.
- For issues related to the database connection, verify that your database is running and the connection URL in your `.env` file is correct.

### Further Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema)


## API Documentation and Linting

This section of the README guides you through the process of generating API documentation, creating client code based on the OpenAPI specification, and linting the codebase. The command `yarn next-swagger-doc-cli next-swagger-doc.json && yarn orval && yarn lint --fix` accomplishes these tasks.

### Prerequisites

- Node.js (version 12 or later recommended)
- Yarn package manager
- `next-swagger-doc-cli` installed in the project
- `orval` installed in the project
- A proper ESLint configuration

### Running the Command

1. **Navigate to Your Project Directory**: 
   Make sure you are in the root directory of your project in your terminal.

2. **Execute the Combined Command**:
   Run the following command in your terminal:

    ```bash
    yarn next-swagger-doc-cli next-swagger-doc.json && yarn orval && yarn lint --fix
    ```

   This command sequence performs three main actions:

   - `yarn next-swagger-doc-cli next-swagger-doc.json`: Generates the Swagger documentation for your Next.js application based on the configuration in `next-swagger-doc.json`.

   - `yarn orval`: Generates client code based on your OpenAPI specification. Ensure you have an OpenAPI spec file in your project.

   - `yarn lint --fix`: Lints and automatically fixes formatting issues in your codebase using ESLint.

### Understanding Each Step

- **Swagger Documentation Generation**: Generates documentation from your Next.js routes, aiding in API visualization and testing.

- **Orval Client Generation**: Orval reads your OpenAPI specification and generates client code, making API integration more seamless.

- **Linting**: ESLint checks your code for stylistic and programming errors, improving code quality and consistency.

### Troubleshooting

- If you face issues with documentation generation, check your `next-swagger-doc.json` for correct configurations.
- For problems with `orval`, ensure your OpenAPI specification is valid and correctly placed in your project.
- Linting errors can be due to misconfigurations in ESLint. Verify your `.eslintrc` file for proper rules and settings.

### Further Resources

- [Next Swagger Doc CLI Documentation](https://github.com/your-next-swagger-doc-cli-repo)
- [Orval Documentation](https://orval.dev/)
- [ESLint Documentation](https://eslint.org/)


## Deploy on Vercel

This project has been deployed on vercel, here's [the domain](https://officeday.vercel.app).

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
