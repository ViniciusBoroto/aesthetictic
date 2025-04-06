const ctx = document.getElementById('grafico_vendas_ano').getContext('2d');

// Valores fictícios de vendas
const vendas = [120, 150, 180, 200, 170, 190, 220, 210, 230, 250, 240, 260];

// Define as cores dinamicamente com base nos valores de vendas
const cores = vendas.map(valor => {
  if (valor >= 200) {
    return 'rgba(75, 192, 192, 1)'; // Cor para vendas altas (verde)
  } else {
    return 'rgba(255, 99, 132, 1)'; // Cor para vendas baixas (vermelho)
  }
});

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [{
      label: 'Vendas realizadas (em unidades)',
      data: vendas,
      borderColor: 'rgba(75, 192, 192, 1)', // Cor da linha
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de preenchimento abaixo da linha
      borderWidth: 2, // Espessura da linha
      pointBackgroundColor: cores, // Cores dos pontos baseadas nos valores
      pointBorderColor: '#fff', // Cor da borda dos pontos
      pointRadius: 5, // Tamanho dos pontos
      tension: 0.4 // Suaviza as curvas da linha
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Quantidade de Vendas', // Título acima do gráfico
        font: {
          size: 16 // Tamanho da fonte do título
        },
        padding: {
          top: 10,
          bottom: 20 // Espaçamento entre o título e o gráfico
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo do tooltip
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantidade de Vendas',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)' // Cor das linhas de grade
        }
      },
      x: {
        title: {
          display: true,
          text: 'Meses do Ano',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.2)' // Cor das linhas de grade
        }
      }
    }
  }
});

// Dados para o gráfico de produtos mais vendidos
const ctxProdutosMaisVendidos = document.getElementById('grafico_produtos_mais_vendidos').getContext('2d');
const dataProdutosMaisVendidos = {
    labels: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E'], // Substitua pelos produtos reais
    datasets: [{
        label: 'Produtos Mais Vendidos',
        data: [120, 90, 70, 50, 30], // Substitua pelos dados reais
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
    }]
};

// Configuração do gráfico
const configProdutosMaisVendidos = {
    type: 'bar', // Tipo do gráfico (pode ser 'bar', 'line', 'pie', etc.)
    data: dataProdutosMaisVendidos,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Produtos Mais Vendidos'
            }
        }
    }
};

// Renderizar o gráfico
new Chart(ctxProdutosMaisVendidos, configProdutosMaisVendidos);