import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { YearlyResult } from '../../types'
import { Card } from '../common'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface CompoundInterestChartProps {
  results: YearlyResult[]
}

function CompoundInterestChart({ results }: CompoundInterestChartProps) {
  const data = {
    labels: results.map((r) => `Year ${r.year}`),
    datasets: [
      {
        label: 'Total Invested',
        data: results.map((r) => r.totalInvested),
        borderColor: '#FF9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FF9800',
        pointBorderColor: '#FF9800',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Total Amount',
        data: results.map((r) => r.totalAmount),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#4CAF50',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            const value = context.parsed.y ?? 0
            label += 'RM ' + value.toLocaleString('en-MY', { maximumFractionDigits: 0 })
            return label
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            const numValue = typeof value === 'string' ? parseFloat(value) : value
            if (numValue >= 1000000) {
              return 'RM ' + (numValue / 1000000).toFixed(1) + 'M'
            }
            return 'RM ' + (numValue / 1000).toFixed(0) + 'K'
          },
          font: {
            size: 11,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 11,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  }

  return (
    <Card className="h-[400px]">
      <Line data={data} options={options} />
    </Card>
  )
}

export default CompoundInterestChart
