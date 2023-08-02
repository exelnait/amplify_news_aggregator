import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['graphql/schema.graphql', 'graphql/scalars.graphql'],
  documents: 'data/**/*.graphql',
  generates: {
    'graphql/schema.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        scalars: {
          AWSDateTime: 'Date',
          AWSJSON: 'string',
          AWSTimestamp: 'string',
        },
        withHooks: true,
      },
    },
  },
};

export default config;
