Setup

```
$ yarn
$ psql -c 'create database <%=project%>'
$ ./ake seeds:dev
$ ./ake
$ open .graphqlconfig with GraphQL Playground   // brew-cask(graphql-playground)

$ Test: http post -v :3001/graphql query='{hello}'
```
