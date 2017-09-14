## USAGE

```
$ mkdir APP; cd APP
$ yo guapp:base
$ mkdir web; cd web
$ yo guapp:web
$ mkdir server; cd server
$ yo guapp:server
```

## Hack

1. change this.destinationRoot(dir) in web will affect all generators
2. so in web, can not get right cwd for install, git commands.
3. one way is use: cwd in all commands, makes it very complex.


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
