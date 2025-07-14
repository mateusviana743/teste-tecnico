function calcularPrecoMedio(operacoes) {
    if (!Array.isArray(operacoes) || operacoes.length === 0) {
      throw new Error('Lista de operações inválida ou vazia');
    }
  
    let totalQuantidade = 0;
    let totalInvestido = 0;
  
    for (const op of operacoes) {
      const { quantidade, preco_unitario, tipo_operacao } = op;
  
      if (tipo_operacao !== 'COMPRA') continue;
      if (quantidade <= 0 || preco_unitario <= 0) {
        throw new Error('Valores inválidos na operação');
      }
  
      totalQuantidade += quantidade;
      totalInvestido += quantidade * preco_unitario;
    }
  
    if (totalQuantidade === 0) {
      throw new Error('Quantidade total zero. Não é possível calcular preço médio.');
    }
  
    return totalInvestido / totalQuantidade;
  }
  
  module.exports = { calcularPrecoMedio };
  