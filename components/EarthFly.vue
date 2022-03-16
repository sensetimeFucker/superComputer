<template>
  <section>
    <div id="earth" class="earth" :style="{width: '100vw', height:'100vh'}"></div>
    <!--<div class="loading_bg" :style="{width: '100vw', height:'100vh'}"></div>-->
    <!--<div id='layerCharts' :style="{width: '100vw', height:'100vh'}"></div>-->
  </section>
</template>

<script>
  //  import flights from '../../static/earth/flights.json'
  export default {
    name: 'EarthFly',
    data() {
      return {
        earthChart: '',
        option: '',
        series: ''
      }
    },
    mounted() {
      let img = new Image()
      img.src = '../../static/earth/world-3.jpg'
      img.onload = () => {
        this.initEarthChart(img);
        // setTimeout(() => {
        //   this.option.series = this.series
        //   this.earthChart.setOption(this.option, true);
        // }, 1000);
      }
    },
    // 非响应式的属性
    methods: {
      initEarthChart(img) {
        this.earthChart = this.$echarts.init(document.getElementById('earth'));

        const points = [
          {
            name: '北京',
            id: '0',
            value: [116.604556, 40.180111]
          },
          {
            name: '上海',
            id: '1',
            value: [121.736319, 31.297875]
          },
          {
            name: '深圳',
            id: '2',
            value: [113.427203, 22.407058]
          },
          {
            name: '东京',
            id: '3',
            value: [140.179694, 36.252258]
          },
          {
            name: '香港',
            id: '4',
            value: [114.280397, 21.636592]
          }
        ];

        
  function getPointsWithCenterAndRadiusAndNumber(
                  longitude,
                  latitude,
                  radius,
                  count
                  ) {
      const fix6 = n => parseFloat(n.toFixed(6));
  const genList = (x, y) => [
    [fix6(longitude + x), fix6(latitude + y)],
    [fix6(longitude + x), fix6(latitude - y)],
    [fix6(longitude - x), fix6(latitude + y)],
    [fix6(longitude - x), fix6(latitude - y)]
  ];
  let list = [];
  const unit = 1 / count;
  for (let i = 0; i < count / 8; i += 1) {
    const angle = 2 * Math.PI * unit * i;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    list = [
      ...list,
      ...genList(offsetX, offsetY),
      ...genList(offsetY, offsetX)
    ];
  }
  return list;
}


        let geoCoordMap = [
          [120.16, 30.27],
          [116.41, 39.91],
          [114.07, 22.55],
          [121.48, 31.24],
          [113.27, 23.14],
          [117.21, 39.09],
          [104.08, 30.66],
          [114.17, 22.28],
          [118.77, 32.07],
          [113.63, 34.75],
          [123.44, 41.84],
          [119.30, 26.11],
          [114.31, 30.60],
          [121.52, 25.03],
          [87.63, 43.80],
          [115.86, 28.69],
          [102.84, 24.89],
          [117.29, 31.87],
          [116.76, 36.56],
          [106.56, 29.57],
          [112.95, 28.23],
          [106.27, 38.48],
          [108.95, 34.35],
          [126.67, 45.75],
          [110.21, 20.05],
          [106.71, 26.60],
          [112.56, 37.88],
          [108.37, 22.82],
          [114.52, 38.05],
          [101.79, 36.63],
        ];

        const effect = {
          show: true,
          trailWidth: 2,
          trailLength: 0.15,
          trailOpacity: 1,
          trailColor: 'rgb(30, 30, 60)'

        };
        const lineStyle = {
          width: 1,
          color: 'rgb(50, 50, 150)',
          opacity: 0.1
        };

        this.series = [{
          type: 'scatter3D',
          coordinateSystem: 'globe',
          blendMode: 'lighter',
          symbolSize: 59,
          itemStyle: {
           color: '../../static/earth/guangyun.png',
           opacity: 0,
            // borderWidth:2,
            // borderColor:'rgb(80, 215, 178)'
          },
          data:points
        }];
        const shanghaiCircle = getPointsWithCenterAndRadiusAndNumber(points[1].value[0], points[1].value[1], 1.5, 400);
        const beijinCircle = getPointsWithCenterAndRadiusAndNumber(points[0].value[0], points[0].value[1], 1.5, 400);
        const shenzhenCircle = getPointsWithCenterAndRadiusAndNumber(points[2].value[0], points[2].value[1], 1, 200);
        const tokyoCircle = getPointsWithCenterAndRadiusAndNumber(points[3].value[0], points[3].value[1], 1.5, 300);
        const hongkongCircle = getPointsWithCenterAndRadiusAndNumber(points[4].value[0], points[4].value[1], 1, 200);
        this.series.push(
          {
            type: 'lines3D',
            effect: effect,
            lineStyle: lineStyle,
            blendMode: 'lighter',
            data: shanghaiCircle.map(item => ([
              points[1].value, item
            ]))
          }
        )
        this.series.push(
          {
            type: 'lines3D',
            effect: effect,
            lineStyle: lineStyle,
            blendMode: 'lighter',
            data: beijinCircle.map(item => ([
              points[0].value, item
            ]))
          }
        )
        this.series.push(
          {
            type: 'lines3D',
            effect: effect,
            lineStyle: lineStyle,
            blendMode: 'lighter',
            data: shenzhenCircle.map(item => ([
              points[2].value, item
            ]))
          }
        )
        this.series.push(
          {
            type: 'lines3D',
            effect: effect,
            lineStyle: lineStyle,
            blendMode: 'lighter',
            data: tokyoCircle.map(item => ([
              points[3].value, item
            ]))
          }
        )
        this.series.push(
          {
            type: 'lines3D',
            effect: effect,
            lineStyle: lineStyle,
            blendMode: 'lighter',
            data: hongkongCircle.map(item => ([
              points[4].value, item
            ]))
          }
        )
        // series.push(
        //   {
        //     type: 'lines3D',
        //     effect: effect,
        //     lineStyle: lineStyle,
        //     blendMode: 'lighter',
        //     data: [[[59, 21],[180, 21]]]
        //   }
        // )
       
        const genCrossList = (main, ...others)=>{
          return others.reduce((totalList, list)=>{
            const itemList = list.map((point, idx)=>{
              const sin = idx%2
              return sin?[main[idx], point]:[point, main[idx]]
            })
            return [...totalList, ...itemList]
          },[])
        }
        this.series.push(
          {
            type: 'lines3D',
            effect: effect,
            lineStyle: lineStyle,
            blendMode: 'lighter',
            data:points.reduce((list, point)=>{
              let itemList = []
              if (point.id !== '3') {
                itemList = geoCoordMap.map(item=>([
                  point.value, item
                ]))
              }
              return [...list, ...itemList]
            },[])
          }
        )
        // 红线轨迹
        this.series.push(
          {
            type: 'lines3D',
            effect: {
              show: true,
              trailWidth: 3,
              trailLength: 0.15,
              trailOpacity: 1,
              trailColor: '#ee3f49'
            },

            lineStyle: {
              width: 2,
              color: '#ee3f49',
              opacity: 0.2
            },

            blendMode: 'lighter',
            data: [
              [points[1].value, points[2].value],
              // [points[1].value, points[3].value],
              [points[1].value, points[4].value],
              [points[1].value, points[0].value],
              [points[0].value, points[2].value],
              // [points[0].value, points[3].value],
              [points[0].value, points[4].value],
              [points[0].value, points[1].value],
              [points[2].value, points[0].value],
              [points[2].value, points[1].value],
              // [points[2].value, points[3].value],
              [points[2].value, points[4].value],
              // [points[3].value, points[0].value],
              // [points[3].value, points[1].value],
              // [points[3].value, points[2].value],
              // [points[3].value, points[4].value],
              [points[4].value, points[0].value],
              [points[4].value, points[1].value],
              [points[4].value, points[2].value],
              // [points[4].value, points[3].value],
            ]
            //data:totalList
          }
        )

        this.option = {
          legend: {
            selectedMode: 'single',
            left: 'left',
            data: [],
            orient: 'vertical',
            textStyle: {
              color: '#fff'
            },
            show: false
          },
          globe: {
            show: true,
            baseTexture: img,
            environment: '../../static/earth/earth_bg.jpg',
            //displacementScale: 0.5,
            shading: 'color',
            globeRadius: 300,
            light: {
              ambient: {
                intensity: 0
              },
              main: {
                intensity: 0.1,
                shadow: false
              }
            },
            left: '15%',
            // top: '5%',
            viewControl: {
              autoRotate: false,
              targetCoord: [121.080397, 30.436592],
              center: [0, 0, 0],

            },
            // layers:[
            //   {
            //     show: true,
            //     type: 'blend',
            //     texture: layerChart
            //   }
            // ],
          },
          series: this.series
        };
        if (this.option && typeof this.option === "object") {
          console.log('绑定事件')
          this.earthChart.setOption(this.option, true);
          this.earthChart.on('click', (params) => {
            // if (params.data.id < 3) this.$router.push({name: 'city', query: {id: params.data.id}});
            console.log('跳转城市页')
            if (params.data.id < 3) this.$router.push(`city/${params.data.id}`);
          });
        }
      }
    }
  }
</script>

<style scoped>
.loading_bg {
  position: absolute;
  background: black;
  top: 0;
  opacity: 1;
  display: block;
  z-index: 0;

  /*animation: fy-animation 4s;*/
  /*animation-iteration-count: 1;*/
  /*animation-fill-mode: forwards;*/
  /*-webkit-animation: fy-animation 4s;*/
  /*-webkit-animation-iteration-count: 1;*/
  /*-webkit-animation-fill-mode: forwards;*/
}

@keyframes fy-animation {
  0% {
    opacity: 1;
    z-index: 0;
  }
  25% {
    opacity: 1;
    z-index: 0;
  }
  50% {
    opacity: 1;
    z-index: 0;
  }
  75% {
    opacity: 0.5;
    z-index: 0;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}

@-webkit-keyframes fy-animation {
  0% {
    opacity: 1;
    z-index: 0;
  }
  25% {
    opacity: 1;
    z-index: 0;
  }
  50% {
    opacity: 1;
    z-index: 0;
  }
  75% {
    opacity: 0.5;
    z-index: 0;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
</style>
