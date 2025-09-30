import express from "express";
import {
  buscarPorAno,
  buscarPorMesEAno,
  buscarTodos,
  buscarMediaPorAno,
  buscarUltimoDado
} from "./Servicos/servico.js";
const PORT = process.env.PORT || 8080;

const app = express();

app.get('/ipca', (req, res) => {
  const { ano, mes, media, ultimo } = req.query;

  if (ultimo === 'true') {
    const dado = buscarUltimoDado();
    return res.json(dado);
  }

  if (media && ano) {
    const mediaAno = buscarMediaPorAno(ano);
    if (mediaAno) {
      return res.json({ ano: Number(ano), media: Number(mediaAno) });
    } else {
      return res.status(404).json({ erro: `Nenhum dado encontrado para o ano ${ano}` });
    }
  }

  if (ano && mes) {
    const dado = buscarPorMesEAno(mes, ano);
    if (dado) {
      return res.json(dado);
    } else {
      return res.status(404).json({ erro: `Nenhum dado encontrado para ${mes} de ${ano}` });
    }
  }

  if (ano) {
    const dadosAno = buscarPorAno(ano);
    if (dadosAno.length > 0) {
      return res.json(dadosAno);
    } else {
      return res.status(404).json({ erro: `Nenhum dado encontrado para o ano ${ano}` });
    }
  }

  // Se não passou nada, retorna tudo
  return res.json(buscarTodos());
});


app.listen(PORT, () => {
  const data = new Date();
  console.log(`Servidor rodando na porta ${PORT} - ${data.toLocaleString()}`);
});
