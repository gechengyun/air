<template>
  <div class='dataAnalysis'>
    <el-row type="flex" justify="space-around">
      <el-col :span="12">
        <div id="drawPic" :style="{width: '600px', height: '400px'}"></div>
      </el-col>
      <el-col :span="12">
        <div id="drawBar" :style="{width: '600px', height: '400px'}"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="drawLine" :style="{width: '1600px', height: '400px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'dataAnalysis',
    data() {
      return {

      }
    },
    methods: {
      drawBar() {
        let drawBar = this.$echarts.init(document.getElementById('drawBar'))
        drawBar.setOption({
          title: {
            text: 'XXXXX公司空调报警数量统计',
            textStyle: {
              align: 'center'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
              name: '空调报警数量',
              stack: '空调报警数量',
              type: 'bar',
              data: [2, 3, 1, 5, 7, 4, 2]
            },
            {
              name: '空调正常数量',
              stack: '空调正常数量',
              type: 'bar',
              data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
              name: '空调断线数量',
              stack: '空调断线数量',
              type: 'bar',
              data: [60, 72, 71, 74, 190, 130, 110]
            },
            {
              name: '其它',
              stack: '其它',
              type: 'bar',
              data: [62, 82, 91, 84, 109, 110, 120]
            }
          ]
        })
      },
      drawPic() {
        let drawPic = this.$echarts.init(document.getElementById('drawPic'))
        drawPic.setOption({
          title: {
            text: '空调型号比例图',
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          series: [{
            name: '数量',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            data: [{
                value: 10,
                name: '空调型号1'
              },
              {
                value: 5,
                name: '空调型号2'
              },
              {
                value: 15,
                name: '空调型号3'
              },
              {
                value: 25,
                name: '空调型号4'
              },
              {
                value: 20,
                name: '空调型号5'
              },
              {
                value: 35,
                name: '空调型号6'
              },
              {
                value: 30,
                name: '空调型号7'
              },
              {
                value: 40,
                name: '空调型号8'
              }
            ]
          }]
        })
      },
      drawLine() {
        let drawLine = this.$echarts.init(document.getElementById('drawLine'))
        drawLine.setOption({
          title: {
            text: '全年空调监控情况区域图'
          },
          legend: {
            data: ['报警', '正常', '断线', '轻微', '其它']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
              name: '报警',
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {}
              },
              data: [120, 132, 101, 134, 90, 230, 210, 220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '正常',
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {}
              },
              data: [220, 182, 191, 234, 290, 330, 310, 150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '断线',
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {}
              },
              data: [150, 232, 201, 154, 190, 330, 410, 320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '轻微',
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {}
              },
              data: [320, 332, 301, 334, 390, 330, 320, 820, 932, 901, 934, 1290, 1330, 1320]
            },
            {
              name: '其它',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {
                normal: {}
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320, 150, 232, 201, 154, 190, 330, 410]
            }
          ]
        })
      }
    },
    mounted() {
      this.drawBar()
      this.drawPic()
      this.drawLine()
    }
  }

</script>
