
### Development

```
$ psql -c 'create database <%=project%>'
$ cp ../deploy/rcExample.js  src/rc.js
$ ./ake seeds-dev

$ Register application in Github
  > Callback: https://HOST/auth/github/callback
`+

### Deploy

```
(server)
$ docker-compose run ./ake setup
$ docker-compose run ./ake create-user
`````
