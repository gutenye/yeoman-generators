### Development

```
$ psql -c 'create database <%=project%>'
$ cp ../deploy/rcExample.js  src/rc.js
$ ./ake seeds-dev

$ Register application in Github
  > Callback: https://HOST/auth/github/callback
```
