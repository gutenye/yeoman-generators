Why use three commands: yo guapp:base; yo guapp:web; yo guapp:server instead of one

  1. change this.destinationRoot(dir) in web will affect all generators
  2. so in web, can not get right cwd for install, git commands.
  3. one way is use: cwd in all commands, makes it very complex.
