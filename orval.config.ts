const orvalConfig = {
  groupEvent: {
    input: {
      target: "./public/swagger.json",
    },
    output: {
      mode: "tags",
      client: "swr",
      target: "./src/libs/data/index.ts",
      schemas: "./src/libs/data/schema",
      override: {
        mutator: {
          name: "fetcher",
          path: "./src/libs/data/fetcher.ts",
        },
      },
    },
  },
};

export default orvalConfig;
