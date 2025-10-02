document.getElementById('loadDataBtn').addEventListener('click', async () => {
  const dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = '<p>Carregando...</p>';

  try {
    // Agora usamos apenas a rota relativa, sem URL completa
    const response = await fetch('/ipca');
    const data = await response.json();

    if (Array.isArray(data)) {
      dataContainer.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-item');
        div.innerHTML = `
          <h3>${item.mes} / ${item.ano}</h3>
          <p><strong>IPCA:</strong> ${item.valor}</p>
        `;
        dataContainer.appendChild(div);
      });
    } else {
      dataContainer.innerHTML = '<p>Dados não encontrados.</p>';
    }
  } catch (error) {
    dataContainer.innerHTML = '<p>Erro ao carregar os dados.</p>';
    console.error(error);
  }
});
