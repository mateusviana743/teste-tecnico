// src/testarCotacao.js
const { salvarCotacao } = require('./services/salvarcotacaoservice');

(async () => {
    await salvarCotacao('BOVA11');
  })();
  
