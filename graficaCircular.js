// URL del JSON
const url = 'https://raw.githubusercontent.com/AS-Garcia/mirepositorio/main/imdb_top_1000.json';

// Fetch API para obtener el JSON
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Procesa los datos para la gráfica de tarta
        const yearsCount = {};
        data.forEach(movie => {
            const year = movie.Released_Year;
            if (!yearsCount[year]) {
                yearsCount[year] = 0;
            }
            yearsCount[year]++;
        });

        // Prepara los datos para la gráfica de tarta
        const pieChartData = Object.entries(yearsCount).map(([year, count]) => ({
            name: year,
            value: count
        }));

        // Crea la gráfica de tarta
        const pieChart = echarts.init(document.getElementById('pie-chart'));
        pieChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    name: 'Año',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: pieChartData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    })
    .catch(error => console.error('Error:', error));
