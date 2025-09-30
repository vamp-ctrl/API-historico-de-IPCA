// servico.js
import dadosIPCA from './Dados/dados.js';

export function buscarPorAno(ano) {
  return dadosIPCA.filter(item => item.ano === Number(ano));
}

export function buscarPorMesEAno(mes, ano) {
  return dadosIPCA.find(item => item.mes.toLowerCase() === mes.toLowerCase() && item.ano === Number(ano));
}

export function buscarTodos() {
  return dadosIPCA;
}

export function buscarMediaPorAno(ano) {
  const dadosAno = buscarPorAno(ano);
  if (dadosAno.length === 0) return null;

  const soma = dadosAno.reduce((acc, item) => acc + item.valor, 0);
  return (soma / dadosAno.length).toFixed(2);
}

export function buscarUltimoDado() {
  return dadosIPCA[dadosIPCA.length - 1];
}
