const fetch = require('node-fetch');

async function buscarCotacaoAtual(codigoAtivo) {
  try {
    const url = `https://b3api.vercel.app/api/quote/${codigoAtivo}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Erro HTTP: ${response.status}`);
      return null;
    }

    const data = await response.json();
    
    if (!data || !data.price) {
      console.error('Resposta da API inválida:', data);
      return null;
    }

    return {
      codigo: data.symbol,
      preco: data.price,
      variacao: data.change_percent,
      horario: data.time,
    };
  } catch (error) {
    console.error('Erro ao buscar cotação:', error.message);
    return null;
  }
}

module.exports = { buscarCotacaoAtual };
