const db = require('../db');

async function getOperacoesPorUsuario(usuarioId) {
  const [rows] = await db.query(
    'SELECT * FROM operacoes WHERE usuario_id = ?',
    [usuarioId]
  );
  return rows;
}

module.exports = { getOperacoesPorUsuario };
