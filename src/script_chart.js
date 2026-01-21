const labelInput = document.getElementById('labelInput');
const valueInput = document.getElementById('valueInput');
const colorInput = document.getElementById('colorInput');
const chartType = document.getElementById('chartType');
const zeroCheckbox = document.getElementById('zero');
const items = document.getElementById('items');

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

function createChart(type) {
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type,
    data: chartData,
    options: {
      scales: ['pie','doughnut','polarArea'].includes(type) ? {} : { y: { beginAtZero: zeroCheckbox.checked } }
    }
  });
}

createChart('bar');

// добавление данных
document.getElementById('addBtn').addEventListener('click', () => {
  const label = labelInput.value.trim();
  if (!label) return;

  let value = valueInput.value.trim();

  if (!value) {
    value = getRandomValue();
  } else {
    value = Number(value);
    if (isNaN(value)) {;
      return;
    }
  }

  chartData.labels.push(label);
  chartData.datasets[0].data.push(value);
  chartData.datasets[0].backgroundColor.push(colorInput.value);

  renderList();
  chart.update();

  labelInput.value = '';
  valueInput.value = '';
});

// смена типа диаграммы
chartType.addEventListener('change', e => createChart(e.target.value));

// beginAtZero
zeroCheckbox.addEventListener('change', () => createChart(chartType.value));

// список с выбором цветов
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

// изменение цвета
items.addEventListener('input', e => {
  if (e.target.type === 'color') {
    const index = e.target.dataset.index;
    chartData.datasets[0].backgroundColor[index] = e.target.value;
    chart.update();
  }
});
