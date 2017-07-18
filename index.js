require("babel-register");

const args = process.argv.slice(2);

require('./app/main').default(args);


