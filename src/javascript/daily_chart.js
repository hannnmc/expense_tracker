import Chart from 'chart.js/auto';

const budgitData = [];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

if (!localStorage.getItem('bData')) {
    localStorage.setItem('bData', '[]')
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
  
    return previous;
}

let dailyTotal = 0;

document.addEventListener("DOMContentLoaded", e => {

    const days = [];
    let day = new Date();
    while (days.length < 7) {
        days.unshift(day);
        day = getPreviousDay(day);
    }

    const labels = [
        `${monthNames[days[0].getMonth()]} ${days[0].getDate()}`,
        `${monthNames[days[1].getMonth()]} ${days[1].getDate()}`,
        `${monthNames[days[2].getMonth()]} ${days[2].getDate()}`,
        `${monthNames[days[3].getMonth()]} ${days[3].getDate()}`,
        `${monthNames[days[4].getMonth()]} ${days[4].getDate()}`,
        `${monthNames[days[5].getMonth()]} ${days[5].getDate()}`,
        `${monthNames[days[6].getMonth()]} ${days[6].getDate()}`
    ];

    let today = labels[6];

    const data = {
    labels: labels,
    datasets: [{
        label: 'Daily Spending',
        data: [
            getLSD(days[0]),
            getLSD(days[1]),
            getLSD(days[2]),
            getLSD(days[3]),
            getLSD(days[4]),
            getLSD(days[5]),
            getLSD(days[6])
        ],
        backgroundColor: [
        'rgba(255, 99, 132, .9)',
        'rgba(255, 159, 64, .9)',
        'rgba(255, 205, 86, .9)',
        'rgba(75, 192, 192, .9)',
        'rgba(54, 162, 235, .9)',
        'rgba(153, 102, 255, .9)',
        'rgba(201, 203, 207, .9)'
        ],
        borderRadius: 10
    }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            // maintainAspectRatio: false,
            plugins: {
                legend: {
                display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display:false
                    }
                },
                y: {
                    grid: {
                        display:false
                    }   
                }
            }
        },
    };  
    const myChart = new Chart(
        document.getElementById('daily-spending-chart'),
        config
    );
    
    function insert_Row(i,c,a) {
        let row =document.getElementById('daily-table').insertRow(-1);
        let item = row.insertCell(-1);
        let category = row.insertCell(1);
        let amount = row.insertCell(2);
        item.innerHTML=i;
        item.classList.add("item-col");
        category.innerHTML=c;
        category.classList.add("category-col")
        amount.innerHTML=parseFloat(a).toFixed(2);
        amount.classList.add("amount-col");
    }

    document.getElementById('add-expense').addEventListener("submit", addExpense)

    function addExpense(e) { 
        e.preventDefault();
        const item = (document.getElementById('item').value);
        const category = (document.getElementById('category').value);
        let amount = (document.getElementById('amount').value);
        if (!item || category === 'none' || !amount) {
            let error = document.getElementById("error");
            error.style.display = 'block';
            error.innerHTML = 'Please fill out all fields.';
            setTimeout(() => {
                const error = document.getElementById('error');
                error.style.display = 'none';
              }, 3000); 
        } else {
        insert_Row(item,category,amount);
        updateLS(createEntry(amount));
        parseFloat(getLSD());
        updateValue(getLSD());
        }

    };

    function updateValue(val,label = today) {
        const index = labels.indexOf(label);
        myChart.config.data.datasets[0].data[index] = val;
        myChart.update();
    }

    function createEntry (val,time = new Date()){
        const entry = {};
        let m = monthNames[time.getMonth()];
        let d = time.getDate();
        let y = time.getFullYear();
        entry.y = y;
        entry.m = m;
        entry.d = d;
        entry.amount = val;
        return entry;
    }

    function updateLS(data) {
        let old =  JSON.parse(localStorage.getItem('bData'));
        localStorage.setItem('bData', JSON.stringify([...old, data]));
    }

    function getLSD(time = new Date()){
        const m = monthNames[time.getMonth()];
        const d = time.getDate();
        const y = time.getFullYear();
        const bData = JSON.parse(localStorage.getItem('bData'));
        if (bData){
            const list = 
            bData.filter(obj => obj.y === y && obj.m === m && obj.d === d)
            let sum = parseFloat(0);
            list.forEach( obj => {
                sum += parseFloat(obj.amount);
            })
            return sum;
       }
    }
    
    function getLSM(time = new Date()) {
        const m = monthNames[time.getMonth()];
        const y = time.getFullYear();
        const bData = JSON.parse(localStorage.getItem('bData'));
        if (bData){
            const list = 
            bData.filter(obj => obj.y === y && obj.m === m)
            let sum = parseFloat(0);
            list.forEach( obj => {
                sum += parseFloat(obj.amount);
            })
            return sum;
       }
    }

    window.getLSM = getLSM;
    
});

