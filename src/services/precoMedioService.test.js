const { calcularPrecoMedio } = require('./precomedioservice');

describe('calcularPrecoMedio', () => {

  it('calcula corretamente o preço médio ponderado', () => {
    const operacoes = [
      { quantidade: 100, preco_unitario: 10, tipo_operacao: 'COMPRA' },
      { quantidade: 50, preco_unitario: 12, tipo_operacao: 'COMPRA' },
    ];

    const resultado = calcularPrecoMedio(operacoes);
    expect(resultado).toBeCloseTo(10.67, 2);
  });

  it('ignora operações do tipo VENDA', () => {
    const operacoes = [
      { quantidade: 100, preco_unitario: 10, tipo_operacao: 'VENDA' },
      { quantidade: 50, preco_unitario: 12, tipo_operacao: 'VENDA' },
    ];

    expect(() => calcularPrecoMedio(operacoes)).toThrow('Quantidade total zero');
  });

  it('lança erro para lista vazia', () => {
    expect(() => calcularPrecoMedio([])).toThrow('Lista de operações inválida ou vazia');
  });

  it('lança erro para valores inválidos (quantidade zero)', () => {
    const operacoes = [
      { quantidade: 0, preco_unitario: 10, tipo_operacao: 'COMPRA' },
    ];
    expect(() => calcularPrecoMedio(operacoes)).toThrow('Valores inválidos');
  });

  it('lança erro para valores inválidos (preço negativo)', () => {
    const operacoes = [
      { quantidade: 10, preco_unitario: -5, tipo_operacao: 'COMPRA' },
    ];
    expect(() => calcularPrecoMedio(operacoes)).toThrow('Valores inválidos');
  });

});
