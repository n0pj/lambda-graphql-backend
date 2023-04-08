cd amplify/backend/function/lambdaGraphqlBackend/src/

npm install &&
yarn prisma:generate &&
yarn graphql:codegen &&
npx tsc
