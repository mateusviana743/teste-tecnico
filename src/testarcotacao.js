const { salvarCotacao } = require('./services/salvarcotacaoservice');

(async () => {
  try {
    await salvarCotacao('ITSA4');  
    await salvarCotacao('PETR4');
    await salvarCotacao('BOVA11');
  } catch (err) {
    console.error('Erro ao executar salvarCotacao:', err.message);
  }
})();
