module.exports = {
  groupEvent: {
    input: {
      target: "./public/swagger.json",
    },
    output: {
      mode: "tags",
      target: "src/libs/data/index.ts",
      schemas: "src/libs/data/schema",
      client: "swr",
      override: {
        mutator: {
          path: "src/libs/utilities/fetcher-instance.ts",
          name: "fetcherInstance",
        },
      },
    },
  },
};
