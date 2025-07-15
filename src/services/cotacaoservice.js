async function buscarCotacaoAtual(codigoAtivo) {
  
  const preco = (Math.random() * 40 + 10).toFixed(2); 

  return {
    codigo: codigoAtivo,
    preco: preco,
    variacao: (Math.random() * 4 - 2).toFixed(2), 
    horario: new Date().toISOString(), 
  };
}

module.exports = { buscarCotacaoAtual };
