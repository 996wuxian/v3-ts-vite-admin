<template>
  <div class="container">
    <div id="myEcharts" :style="{ width: '700px', height: '400px' }"></div>
    <div id="myEcharts1" :style="{ width: '700px', height: '300px' }"></div>
    <div id="myEcharts2" :style="{ width: '700px', height: '500px' }"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

onMounted(() => {
  const dom = document.getElementById('myEcharts')
  const dom1 = document.getElementById('myEcharts1')
  const dom2 = document.getElementById('myEcharts2')
  const myChart = echarts.init(dom) // 初始化echarts实例
  const myChart1 = echarts.init(dom1) // 初始化echarts实例
  const myChart2 = echarts.init(dom2) // 初始化echarts实例
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  }

  const option1 = {
    title: {
      text: 'World Population'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    },
    series: [
      {
        name: '2011',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '2012',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ]
  }

  const option2 = {
    title: {
      text: 'Nightingale Chart',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Radius Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['25%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 33, name: 'rose 2' },
          { value: 28, name: 'rose 3' },
          { value: 22, name: 'rose 4' },
          { value: 20, name: 'rose 5' },
          { value: 15, name: 'rose 6' },
          { value: 12, name: 'rose 7' },
          { value: 10, name: 'rose 8' }
        ]
      },
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: [
          { value: 30, name: 'rose 1' },
          { value: 28, name: 'rose 2' },
          { value: 26, name: 'rose 3' },
          { value: 24, name: 'rose 4' },
          { value: 22, name: 'rose 5' },
          { value: 20, name: 'rose 6' },
          { value: 18, name: 'rose 7' },
          { value: 16, name: 'rose 8' }
        ]
      }
    ]
  }
  // 设置实例参数
  myChart.setOption(option)
  myChart1.setOption(option1)
  myChart2.setOption(option2)
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
