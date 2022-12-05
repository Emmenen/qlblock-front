<template>
    <div>
        <head-top title="首页"></head-top>
        <section class="data_section">
            <el-row style="margin-bottom: 20px;">
                <el-col :span="15" :offset="4">
                    <el-input
                        placeholder="搜索店铺"
                        v-model="input"
                        :disabled="false"
                        :clearable="true">
                    </el-input>
                </el-col>
            </el-row>

            <el-row style="margin-bottom: 20px;"  >
                <el-col style="margin-bottom: 20px;" v-for=" (item,index) in dataList " :key="index"  :offset="index%3==0 ? 0 : 2" :span="6">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <img :src="item.img" class="image">
                        <div style="padding: 14px;">
                            <span>{{item.storeName}}</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="evaluate(item)">评价</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </section>
    </div>
</template>

<script>
import headTop from '../components/headTop'
import tendency from '../components/tendency'
import dtime from 'time-formater'
import {userCount, orderCount, getUserCount, getOrderCount, adminDayCount, adminCount} from '@/api/getData'
export default {
    data(){
        return {
            dataList: [{
                storeId:1,
                img: "https://img2.baidu.com/it/u=2647339234,3606345512&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
                name:"店铺1"
            },{
                storeId:2,
                img: "https://img2.baidu.com/it/u=2647339234,3606345512&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
                name:"店铺2"
            },{
                storeId:3,
                img: "https://img2.baidu.com/it/u=2647339234,3606345512&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
                name:"店铺3"
            },{
                storeId:4,
                img: "https://img2.baidu.com/it/u=2647339234,3606345512&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
                name:"店铺4"
            }],
            input: "",
            userCount: null,
            orderCount: null,
            adminCount: null,
            allUserCount: null,
            allOrderCount: null,
            allAdminCount: null,
            sevenDay: [],
            sevenDate: [[],[],[]],
        }
    },
    components: {
        headTop,
        tendency,
    },
    mounted(){
        this.initData();
        for (let i = 6; i > -1; i--) {
            const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
            this.sevenDay.push(date)
        }
        this.getSevenData();
    },
    computed: {

    },
    methods: {
        async initData(){
            this.$http({
                url: this.$http.adornUrl("/getStore"),
                method: "GET"
                }
            ).then((res)=>{
                console.log(res)
                this.dataList = res.data
            })
            const today = dtime().format('YYYY-MM-DD')
            Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
                .then(res => {
                    this.userCount = res[0].count;
                    this.orderCount = res[1].count;
                    this.adminCount = res[2].count;
                    this.allUserCount = res[3].count;
                    this.allOrderCount = res[4].count;
                    this.allAdminCount = res[5].count;
                }).catch(err => {
                console.log(err)
            })
        },
        async getSevenData(){
            const apiArr = [[],[],[]];
            this.sevenDay.forEach(item => {
                apiArr[0].push(userCount(item))
                apiArr[1].push(orderCount(item))
                apiArr[2].push(adminDayCount(item))
            })
            const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
            Promise.all(promiseArr).then(res => {
                const resArr = [[],[],[]];
                res.forEach((item, index) => {
                    if (item.status == 1) {
                        resArr[Math.floor(index/7)].push(item.count)
                    }
                })
                this.sevenDate = resArr;
            }).catch(err => {
                console.log(err)
            })
        },
        evaluate(store){
            this.$router.push({
                path: "/evaluate",
                store: store
             }
            )
        }
    }
}
</script>

<style lang="less">
@import '../style/mixin';
.data_section{
    padding: 20px;
    margin-bottom: 40px;
    .section_title{
        text-align: center;
        font-size: 30px;
        margin-bottom: 10px;
    }
    .data_list{
        text-align: center;
        font-size: 14px;
        color: #666;
        border-radius: 6px;
        background: #E5E9F2;
        .data_num{
            color: #333;
            font-size: 26px;

        }
        .head{
            border-radius: 6px;
            font-size: 22px;
            padding: 4px 0;
            color: #fff;
            display: inline-block;
        }
    }
    .today_head{
        background: #FF9800;
    }
    .all_head{
        background: #20A0FF;
    }
}
.wan{
    .sc(16px, #333)
}
</style>
