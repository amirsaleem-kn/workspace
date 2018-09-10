const node_env = process.env.NODE_ENV;

switch(node_env) {
    case 'production': 
     module.exports = require('./production-keys'); break;
    default: 
     module.exports = require('./development-keys');
}