import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const GrowthChart = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(10, 0, 21, 0.9)',
                borderColor: 'rgba(236, 72, 153, 0.3)',
                borderWidth: 1,
                titleColor: '#ec4899',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 10,
                titleFont: { family: 'Outfit', weight: '600' },
                bodyFont: { family: 'Outfit' }
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(236, 72, 153, 0.04)' },
                ticks: { color: 'rgba(255,255,255,0.3)', font: { family: 'Outfit' } }
            },
            x: {
                grid: { display: false },
                ticks: { color: 'rgba(255,255,255,0.3)', font: { family: 'Outfit' } }
            }
        }
    };

    const chartData = {
        labels: data.map(d => `Month ${d.month}`),
        datasets: [
            {
                fill: true,
                label: 'Net Worth',
                data: data.map(d => d.netWorth),
                borderColor: '#ec4899',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
                    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.2)');
                    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.02)');
                    return gradient;
                },
                pointBackgroundColor: '#ec4899',
                pointBorderColor: '#0a0015',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 7,
                tension: 0.4,
                borderWidth: 2
            }
        ]
    };

    return (
        <div className="h-64">
            <Line options={options} data={chartData} />
        </div>
    );
};

export default GrowthChart;
