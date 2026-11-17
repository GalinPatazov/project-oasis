const ctx = document.getElementById('myChart');

  // AQI levels: upper limit + band color (last 2 digits = transparency)
  const levels = [
    { max: 50,  color: '#00e40040' }, // Good
    { max: 100, color: '#ffff0040' }, // Moderate
    { max: 150, color: '#ff7e0040' }, // Unhealthy for sensitive groups
    { max: 200, color: '#ff000040' }, // Unhealthy
    { max: 300, color: '#8f3f9760' }, // Very unhealthy
    { max: 500, color: '#7e002360' }  // Hazardous
  ];

  // Plugin that paints the colored bands behind the line
  const aqiBands = {
    id: 'aqiBands',
    beforeDatasetsDraw(chart) {
      const { ctx, chartArea, scales: { y } } = chart;
      let previousMax = 0;
      levels.forEach(level => {
        const top = y.getPixelForValue(level.max);
        const bottom = y.getPixelForValue(previousMax);
        ctx.fillStyle = level.color;
        ctx.fillRect(chartArea.left, top, chartArea.right - chartArea.left, bottom - top);
        previousMax = level.max;
      });
    }
  };

  // Sample data: 24 hourly values (replace with your real data)
  const data = [70, 95, 82, 110, 125, 108, 140, 118, 135, 112, 150, 128, 138, 120, 145, 130, 125, 140, 115, 132, 128, 138, 126, 135];
  const labels = data.map((_, i) => i);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        borderColor: 'white',
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { color: 'white' },
          ticks: {
            color: 'white',
            autoSkip: false,
            maxRotation: 0,
            // only show the first and last label
            callback: (value, index, ticks) =>
              index === 0 ? '24 h ago' : index === ticks.length - 1 ? 'now' : ''
          }
        },
        y: {
          min: 0,
          max: 500,
          grid: { display: false },
          border: { color: 'white' },
          ticks: { color: 'white' },
          // show ticks only at the level boundaries
          afterBuildTicks: scale => {
            scale.ticks = [0, 50, 100, 150, 200, 300, 500].map(v => ({ value: v }));
          }
        }
      }
    },
    plugins: [aqiBands]
  });