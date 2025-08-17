// This file is a placeholder for Netlify Functions
// Your main server logic should be in the main server file
// This is just an entry point for Netlify

const { createServer } = require('@netlify/functions');
const server = require('../../../dist/index.js');

exports.handler = createServer({
  // Configurações específicas do servidor, se necessário
});
