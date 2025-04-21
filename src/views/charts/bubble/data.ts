import type { ApexChartType } from '@/types'

function generateData(baseval: number, count: number, yrange: any): number[] {
  let i = 0
  const series: any = []
  while (i < count) {
    const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

    series.push([x, y, z])
    baseval += 86400000
    i++
  }
  return series
}

function generateData1(baseval1: number, count: number, yrange: any): number[] {
  let i = 0
  const series: any = []
  while (i < count) {
    //let x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

    series.push([baseval1, y, z])
    baseval1 += 86400000
    i++
  }
  return series
}

export const simpleChart: ApexChartType = {
  height: 380,
  type: 'bubble',
  series: [
    {
      name: 'Bubble 1',
      data: generateData(new Date('23 Oct 2023 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'Bubble 2',
      data: generateData(new Date('23 Oct 2023 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    },
    {
      name: 'Bubble 3',
      data: generateData(new Date('23 Oct 2023 GMT').getTime(), 20, {
        min: 10,
        max: 60
      })
    }
  ],
  options: {
    chart: {
      height: 380,
      type: 'bubble',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 0.8,
      gradient: {
        type: 'none'
      }
    },
    colors: ["#1e84c4", "#7f56da", "#1bb394"],
    xaxis: {
      tickAmount: 12,
      type: 'category'
    },
    yaxis: {
      max: 70
    },
    grid: {
      borderColor: '#f1f3fa',
      padding: {
        bottom: 5
      }
    },
    legend: {
      offsetY: 7
    }
  }
}

export const bubbleChart3D: ApexChartType = {
  height: 380,
  type: 'bubble',
  series: [
    {
      name: 'Product 1',
      data: generateData1(new Date('23 Oct 2023 GMT').getTime(), 20, {
        min: 10,
        max: 80
      })
    },
    {
      name: 'Product 2',
      data: generateData1(new Date('23 Oct 2023 GMT').getTime(), 20, {
        min: 10,
        max: 80
      })
    },
    {
      name: 'Product 3',
      data: generateData1(new Date('23 Oct 2023 GMT').getTime(), 20, {
        min: 10,
        max: 80
      })
    },
    {
      name: 'Product 4',
      data: generateData1(new Date('23 Oct 2023 GMT').getTime(), 20, {
        min: 10,
        max: 80
      })
    }
  ],
  options: {
    chart: {
      height: 380,
      type: 'bubble',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient'
    },
    colors: ["#1e84c4", "#7f56da", "#ed5565", "#1bb394"],
    xaxis: {
      tickAmount: 12,
      type: 'datetime',

      labels: {
        rotate: 0
      }
    },
    yaxis: {
      max: 70
    },
    legend: {
      offsetY: 7
    },
    grid: {
      borderColor: '#f1f3fa',
      padding: {
        bottom: 5
      }
    }
  }
}
