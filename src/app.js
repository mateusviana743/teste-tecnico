const { getOperacoesPorUsuario } = require('./models/operacoes');
const { calcularResumo } = require('./services/calculadoraservice');

async function main() {
  const usuarioId = 1; 
  const operacoes = await getOperacoesPorUsuario(usuarioId);
  const { resumoPorAtivo, corretagemTotal } = calcularResumo(operacoes);

  console.log(`Resumo do Usuário ${usuarioId}:`);
  for (const ativo in resumoPorAtivo) {
    const { totalInvestido, quantidadeTotal, precoMedio } = resumoPorAtivo[ativo];
    console.log(`Ativo ${ativo}:`);
    console.log(` - Total Investido: R$ ${totalInvestido.toFixed(2)}`);
    console.log(` - Quantidade: ${quantidadeTotal}`);
    console.log(` - Preço Médio: R$ ${precoMedio.toFixed(2)}`);
  }

  console.log(`Total de corretagem: R$ ${corretagemTotal.toFixed(2)}`);
}

main();