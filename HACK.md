  SIMPLIFY

$ mkdir PROJECT; cd PROJECT
* yo guapp          // base + web + server
* yo guapp:web      // another web, based on folder name


* yo gunode:lib        // compose eslint, jest, ...
* yo gunode:eslint     // standalone eslint.
* yo gunode:jest


ROOT/
  init       // prompting

# app/index.js

  writing() {
    this.composeWith(require.resolve('../init'))
    this.composeWith(require.resolve('../base'))
    this.composeWith(require.resolve('../web'))
    this.composeWith(require.resolve('../server'))
  }

# init

  prompting





