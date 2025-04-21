import type { ApexChartType } from '@/types'
import small2 from '@/assets/images/small/img-2.jpg'

export const basicRadialBarChart: ApexChartType = {
  height: 320,
  type: 'radialBar',
  series: [70],
  options: {
    chart: {
      height: 320,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%'
        },
        track: {
          background: 'rgba(170,184,197, 0.4)'
        }
      }
    },
    colors: ['#7f56da'],
    labels: ['Cricket']
  }
}

export const multipleRadialBarsChart: ApexChartType = {
  height: 320,
  type: 'radialBar',
  series: [44, 55, 67, 83],
  options: {
    chart: {
      height: 320,
      type: 'radialBar'
    },
    plotOptions: {
      // circle: {
      //     dataLabels: {
      //         showOn: 'hover'
      //     }
      // },
      radialBar: {
        track: {
          background: 'rgba(170,184,197, 0.2)'
        }
      }
    },
    colors: ["#1e84c4", "#7f56da", "#ed5565", "#1bb394"],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    responsive: [
      {
        breakpoint: 380,
        options: {
          chart: {
            height: 260
          }
        }
      }
    ]
  }
}

export const customAngleChart: ApexChartType = {
  height: 380,
  type: 'radialBar',
  series: [76, 67, 61, 90],
  options: {
    chart: {
      height: 380,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        offsetY: -30,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined
        },
        track: {
          background: 'rgba(170,184,197, 0.2)'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false
          }
        }
      }
    },
    colors: ['#1e84c4', '#7f56da', '#ed5565', '#1bb394'],
    labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
    legend: {
      show: true,
      floating: true,
      fontSize: '13px',
      position: 'left',
      offsetX: 10,
      offsetY: 10,
      labels: {
        useSeriesColors: true
      },
      formatter: function (seriesName, opts) {
        return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
      },
      itemMargin: {
        horizontal: 1
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  }
}

export const circleWithImageChart: ApexChartType = {
  height: 360,
  type: 'radialBar',
  series: [70],
  options: {
    chart: {
      height: 360,
      type: 'radialBar'
    },
    fill: {
      type: 'image',
      image: {
        src: [small2]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%'
        }
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Volatility'],
    responsive: [
      {
        breakpoint: 380,
        options: {
          chart: {
            height: 280
          }
        }
      }
    ]
  }
}

export const strokedCircularGuageChart: ApexChartType = {
  height: 380,
  type: 'radialBar',
  series: [67],
  options: {
    chart: {
      height: 380,
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + '%'
            }
          }
        },
        track: {
          background: 'rgba(170,184,197, 0.2)',
          margin: 0
        }
      }
    },
    fill: {
      gradient: {
        // enabled: true,
        shade: 'dark',
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    },
    stroke: {
      dashArray: 4
    },
    colors: ['#ed5565'],
    labels: ['Median Ratio'],
    responsive: [
      {
        breakpoint: 380,
        options: {
          chart: {
            height: 280
          }
        }
      }
    ]
  }
}

export const gradientCircularChart: ApexChartType = {
  height: 330,
  type: 'radialBar',
  series: [75],
  options: {
    chart: {
      height: 330,
      type: 'radialBar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: 'rgba(170,184,197, 0.2)',
          strokeWidth: '67%',
          margin: 0
        },

        dataLabels: {
          // showOn: 'always',
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function (val: number) {
              return val.toString()
            },
            color: '#111',
            fontSize: '36px',
            show: true
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#8f75da', '#727cf5'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Percent']
  }
}

export const semiCircleGaugeChart: ApexChartType = {
  height: 400,
  type: 'radialBar',
  series: [76],
  options: {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      height: 400,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: 'rgba(170,184,197, 0.2)',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            top: 2,
            left: 0,
            color: '#eef2f7',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '22px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    colors: ['#1c84ee'],
    labels: ['Average Results']
  }
}
