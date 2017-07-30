### Web

```
$ cd web
$ ln -s ../shared node_modules
$ yarn
$ ./ake
```


### Server

```
$ cd server
$ ln -s ../shared node_modules
$ yarn

$ cp ../deploy/rcExample.js src/rc.js
$ mkdir -p uploads

$ createdb erp
$ ./ake seeds-dev

$ ./ake
```
