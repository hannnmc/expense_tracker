import Chart from 'chart.js/auto';

document.addEventListener("DOMContentLoaded", e => {
  const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
  ];
  const data = {
  labels: labels,
  datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 205, 86, 0.8)'
      ],
      borderColor: [
        'rgba(255, 205, 86, 0.8)'
      ],
      borderWidth: 1,
      barThickness: 8,
      borderRadius: 10
  }]
  };
  const config = {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: {
          display: false
          }
      }
      },
  };  
  
  const myChart = new Chart(
      document.getElementById('ms-chart'),
      config
  );
  
});

 