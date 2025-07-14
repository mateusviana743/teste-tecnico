const { salvarCotacao } = require('./services/salvarcotacaoservice');

const ativos = [
  'PETR4',
  'VALE3',
  'BOVA11',
  'WEGE3',
  'BBAS3',
  'ITUB4',
  'BBDC4',
  'MGLU3'
];

(async () => {
  console.log('🔄 Iniciando salvamento de cotações...\n');

  for (const codigo of ativos) {
    try {
      await salvarCotacao(codigo);
    } catch (err) {
      console.error(`❌ Erro ao salvar ${codigo}: ${err.message}`);
    }
  }

  console.log('\n✅ Finalizado.');
})();
