<template>
    <div>
        <div>
            <el-row>
                <el-col :span="12">
                    <el-timeline>
                        <div v-for="item in dataList">
                            <el-timeline-item  :timestamp="item.timestamp" placement="top">
                                <el-card>
                                    <h4>{{item.message}}</h4>
                                    <p>{{item.author}} 提交于 {{item.timestamp}}</p>
                                </el-card>
                            </el-timeline-item>
                        </div>
                    </el-timeline>

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-button type="primary" @click="start">开始</el-button>
                    <el-button type="warning" @click="pause">暂停</el-button>
                    <el-button type="info" @click="end">结束</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dataList:[
            ]
        }
    },
    methods: {
      start(){
          var myDate = new Date()
          var data = {
              timestamp: myDate,
              author: "齐拢",
              message: "开始操作"
          }
          this.dataList.push(data)
      }, pause(){
          var myDate = new Date()
          var data = {
              timestamp: myDate,
              author: "齐拢",
              message: "暂停操作"
          }
          this.dataList.push(data)
      },end(){
          var myDate = new Date()
          var data = {
              timestamp: myDate,
              author: "齐拢",
              message: "结束操作"
          }
          this.dataList.push(data)
      }
    }
}
</script>

<style lang="less">

</style>
