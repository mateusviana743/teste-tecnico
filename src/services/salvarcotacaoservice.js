const db = require('../db');
const { buscarCotacaoAtual } = require('./cotacaoservice');

/**
 * isso consulta de um ativo na API pública e salva no banco MySQL.
 * @param {string} codigoAtivo Ex: 'ITSA4'
 */
async function salvarCotacao(codigoAtivo) {
  const cotacao = await buscarCotacaoAtual(codigoAtivo);
  if (!cotacao) {
    console.error('Cotação não encontrada.');
    return;
  }

  const [ativoRow] = await db.query('SELECT id FROM ativos WHERE codigo = ?', [codigoAtivo]);
  if (ativoRow.length === 0) {
    console.error('Ativo não encontrado no banco.');
    return;
  }

  const ativoId = ativoRow[0].id;

  await db.query(`
    INSERT INTO cotacoes (ativo_id, preco_unitario, data_hora)
    VALUES (?, ?, NOW())
  `, [ativoId, cotacao.preco]);

  console.log(`Cotação de ${codigoAtivo} salva com sucesso: R$ ${cotacao.preco}`);
}

module.exports = { salvarCotacao };
