#!/usr/bin/env bash

# ./test.sh back server


forward() {
  mkdir -p ~/tmp/generator-guten
  rm -rf ~/tmp/generator-guten/.
  cd ~/tmp/generator-guten
  yo guten --project __gutenproject --username __gutenusername
  mkdir server && cd server && yo guten:server
}

back() {
  if [[ $1 != "server" && $1 != "web" ]]; then
    return
  fi
  rsync -avhP --exclude node_modules --exclude flow-typed --exclude .git --exclude db.sqlite --exclude yarn.lock --exclude guserver ~/tmp/generator-guten/$1/ $1/templates/
  files=$(grep -r -l guten $1)
  sed -i 's/__gutenproject/<%=project%>/g' $files
  sed -i 's/__gutenusername/<%=username%>/g' $files
  sed -i 's/"\^[^"]\+"/"^0.0.0"/g' $1/templates/package.json
}

case $1 in
  forward ) forward ;;
  back ) shift; back "$@" ;;
esac
