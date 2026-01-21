const labelInput = document.getElementById('labelInput');
const valueInput = document.getElementById('valueInput');
const colorInput = document.getElementById('colorInput');
const chartType = document.getElementById('chartType');
const zeroCheckbox = document.getElementById('zero');

const ctx = document.getElementById('myChart');
let chart;

const chartData = {
  labels: [],
  datasets: [{
    label: 'User data',
    data: [],
    backgroundColor: []
  }]
};

function getRandomValue() {
  return Math.floor(Math.random() * 100) + 1;
}

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 60%)`;
}

function createChart(type) {
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type,
    data: chartData,
    options: {
      scales: type === 'pie' ? {} : {
        y: { beginAtZero: true }
      }
    }
  });
}

createChart('bar');

document.getElementById('addBtn').addEventListener('click', () => {
  const label = labelInput.value.trim();
  if (!label) return;

  const value = valueInput.value
    ? Number(valueInput.value)
    : getRandomValue();

  chartData.labels.push(label);
  chartData.datasets[0].data.push(value);
  chartData.datasets[0].backgroundColor.push(getRandomColor());

  chart.update();

  labelInput.value = '';
  valueInput.value = '';
});

document.getElementById('chartType').addEventListener('change', e => {
  createChart(e.target.value);
});
function renderList() {
  items.innerHTML = '';

  chartData.labels.forEach((label, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${label}
      <input type="color" value="${chartData.datasets[0].backgroundColor[index]}" data-index="${index}">
    `;
    items.appendChild(li);
  });
}


items.addEventListener('input', e => {
  if (e.target.type === 'color') {
    const index = e.target.dataset.index;
    chartData.datasets[0].backgroundColor[index] = e.target.value;
    chart.update();
  }
});