import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['app/graphql/schema.graphql', 'app/graphql/scalars.graphql'],
  documents: 'app/data/**/*.graphql',
  generates: {
    'app/graphql/schema.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        scalars: {
          AWSDateTime: "Date",
          AWSJSON: "string",
          AWSTimestamp: "string",
        },
        withHooks: true,
      },
    }
  },
};

export default config;
