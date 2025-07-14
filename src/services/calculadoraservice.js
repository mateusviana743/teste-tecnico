function calcularResumo(operacoes) {
    const resumo = {};
    let corretagemTotal = 0;
  
    operacoes.forEach((op) => {
      const { ativo_id, tipo_operacao, preco_unitario, quantidade, corretagem } = op;
      if (!resumo[ativo_id]) {
        resumo[ativo_id] = {
          totalInvestido: 0,
          quantidadeTotal: 0,
          precoMedio: 0,
        };
      }
  
      if (tipo_operacao === 'COMPRA') {
        const total = preco_unitario * quantidade;
        resumo[ativo_id].totalInvestido += total;
        resumo[ativo_id].quantidadeTotal += quantidade;
      }
  
      corretagemTotal += corretagem;
    });
  
    for (const ativo in resumo) {
      const r = resumo[ativo];
      r.precoMedio = r.totalInvestido / r.quantidadeTotal;
    }
  
    return { resumoPorAtivo: resumo, corretagemTotal };
  }
  
  module.exports = { calcularResumo };
  