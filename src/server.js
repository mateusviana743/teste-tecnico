const express = require('express');
const db = require('./db');
const { calcularPrecoMedio } = require('./services/precomedioservice');
const { buscarCotacaoAtual } = require('./services/cotacaoService');
const { salvarCotacao } = require('./services/salvarcotacaoservice');

(async () => {
  await salvarCotacao('ITSA4');
})();

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/api/ativos/:codigo/cotacao', async (req, res) => {
  const { codigo } = req.params;
  const cotacao = await buscarCotacaoAtual(codigo);
  if (!cotacao) return res.status(404).json({ erro: 'Cotação não encontrada' });
  res.json({ ativo: cotacao.codigo, preco: cotacao.preco, data: cotacao.horario });
});

app.get('/api/usuarios/:id/preco-medio/:codigo', async (req, res) => {
  const { id, codigo } = req.params;
  const [rows] = await db.query(`
    SELECT * FROM operacoes o
    JOIN ativos a ON o.ativo_id = a.id
    WHERE o.usuario_id = ? AND a.codigo = ? AND o.tipo_operacao = 'COMPRA'
  `, [id, codigo]);

  if (rows.length === 0) return res.status(404).json({ erro: 'Sem compras para esse ativo' });

  try {
    const precoMedio = calcularPrecoMedio(rows);
    res.json({ usuario_id: Number(id), ativo: codigo, preco_medio: precoMedio });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.get('/api/usuarios/:id/posicao', async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query(`
    SELECT a.codigo AS ativo, p.quantidade, p.preco_medio, p.pl
    FROM posicoes p
    JOIN ativos a ON p.ativo_id = a.id
    WHERE p.usuario_id = ?
  `, [id]);

  res.json(rows);
});

app.get('/api/corretagens/total', async (req, res) => {
  const [rows] = await db.query(`
    SELECT SUM(corretagem) AS total_corretagem
    FROM operacoes
  `);
  res.json(rows[0]);
});

app.get('/api/usuarios/top-posicao', async (req, res) => {
  const [rows] = await db.query(`
    SELECT u.id AS usuario_id, u.nome, SUM(p.quantidade * p.preco_medio) AS valor_total
    FROM posicoes p
    JOIN usuarios u ON p.usuario_id = u.id
    GROUP BY u.id
    ORDER BY valor_total DESC
    LIMIT 10
  `);
  res.json(rows);
});

app.get('/api/usuarios/top-corretagem', async (req, res) => {
  const [rows] = await db.query(`
    SELECT u.id AS usuario_id, u.nome, SUM(o.corretagem) AS total_corretagem
    FROM operacoes o
    JOIN usuarios u ON o.usuario_id = u.id
    GROUP BY u.id
    ORDER BY total_corretagem DESC
    LIMIT 10
  `);
  res.json(rows);
});

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
