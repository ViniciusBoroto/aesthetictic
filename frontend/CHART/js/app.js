// Função para criar o gráfico de vendas ao longo do ano
async function criarGraficoVendasAno() {
    const ctx = document.getElementById('grafico_vendas_ano').getContext('2d');

    try {
        // Faz uma requisição para a API de vendas mensais
        const response = await fetch('http://localhost:8000/TotalSales/month');
        const data = await response.json();

        // Transforma o objeto retornado em dois arrays: meses e vendas
        const meses = Object.keys(data); // ["2025-04"]
        const vendas = Object.values(data); // [10.0]

        // Define as cores dinamicamente com base nos valores de vendas
        const cores = vendas.map(valor => {
            return valor >= 200 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: meses, // Usa os meses retornados pela API
                datasets: [{
                    label: 'Vendas realizadas (em unidades)',
                    data: vendas,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: cores,
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    tension: 0.4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Quantidade de Vendas',
                        font: { size: 16 },
                        padding: { top: 10, bottom: 20 }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: { font: { size: 12 } }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: { size: 14 },
                        bodyFont: { size: 12 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Quantidade de Vendas',
                            font: { size: 14 }
                        },
                        grid: { color: 'rgba(200, 200, 200, 0.2)' }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Meses do Ano',
                            font: { size: 14 }
                        },
                        grid: { color: 'rgba(200, 200, 200, 0.2)' }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao buscar dados de vendas mensais:', error);
    }
}

// Função para criar o gráfico de produtos mais vendidos
function criarGraficoProdutosMaisVendidos() {
    const ctx = document.getElementById('grafico_produtos_mais_vendidos').getContext('2d');

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

    const configProdutosMaisVendidos = {
        type: 'bar',
        data: dataProdutosMaisVendidos,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Produtos Mais Vendidos'
                }
            }
        }
    };

    new Chart(ctx, configProdutosMaisVendidos);
}

// Chama as funções para renderizar os gráficos
criarGraficoVendasAno();
criarGraficoProdutosMaisVendidos();