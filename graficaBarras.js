// URL del JSON
const url = 'https://raw.githubusercontent.com/AS-Garcia/mirepositorio/main/imdb_top_1000.json';

// Fetch API para obtener el JSON
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Filtrar películas por año y calcular las ganancias en millones de dólares
        const filteredData = {};
        data.forEach(movie => {
            const year = movie.Released_Year;
            const gross = parseFloat(movie.Gross.replace(/\$|,/g, '')) / 1000000; // Convertir a millones de dólares
            if (!isNaN(gross)) {
                if (!filteredData[year]) {
                    filteredData[year] = [];
                }
                filteredData[year].push(gross);
            }
        });

        // Calcular la media de ganancias por año
        const years = Object.keys(filteredData);
        const grossMean = years.map(year => {
            const yearData = filteredData[year];
            const sum = yearData.reduce((acc, val) => acc + val, 0);
            const mean = sum / yearData.length;
            return parseFloat(mean.toFixed(2)); // Redondear a dos decimales
        });

        // Definir colores para ganancias altas, medias y bajas
        const colors = grossMean.map(mean => {
            if (mean >= 50) {
                return '#FF4500'; // Ganancias altas (naranja)
            } else if (mean >= 20) {
                return '#32CD32'; // Ganancias medias (verde)
            } else {
                return '#4169E1'; // Ganancias bajas (azul)
            }
        });

        // Crear la gráfica de barras
        const barChart = echarts.init(document.getElementById('bar-chart'));
        barChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: years
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} M$' // Formato para los valores del eje Y
                }
            },
            series: [{
                name: 'Ganancias',
                data: grossMean,
                type: 'bar',
                itemStyle: {
                    color: function(params) {
                        return colors[params.dataIndex]; // Asignar colores según el rango de ganancias
                    }
                }
            }]
        });
    })
    .catch(error => console.error('Error:', error));
