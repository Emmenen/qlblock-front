<template>
    <div class="recharge">
        <head-top title="交易/转账"></head-top>
        <el-form v-loading="loading" ref="form" :model="dataForm" label-width="120px">
            <el-form-item label="转账金额">
              <el-col :span = "8">
                  <el-input
                  @change="inputchange"
                  v-model="dataForm.amount"
                  placeholder="Please input amount"
                  :maxlength="6"
                  show-word-limit></el-input>
              </el-col>
              <el-col :span = "24">
              </el-col>
              <el-col :span = "9">
              </el-col>
            </el-form-item>
            <el-form-item label="转账目标地址">
              <el-col :span = "12">
                  <el-input
                  @change="inputAddress"
                  v-model="dataForm.serialNumberB"
                  placeholder="Please input address"
                  :maxlength="48"
                  show-word-limit></el-input>
              </el-col>
              <el-col :span = "24">
              </el-col>
              <el-col :span = "9">
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="confirm">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import headTop from "../components/headTop";
export default {
    data() {
        return {
            dataForm:{
                amount: 0,
                serialNumberB: 0
            },
            loading: false
        }
    },
    methods: {
        confirm(){
            this.loading = true
            if(!this.inputcheck(this.dataForm.amount)){
                this.loading = false
                return
            }
            if(!this.inputcheck(this.dataForm.serialNumberB)){
                this.loading = false
                return
            }
            this.$http({
                url: this.$http.adornUrl("/transfer"),
                method: "post",
                data: this.$http.adornData(this.dataForm)
            }).then((res)=>{
                this.loading = false
                this.$message({
                	type: 'success',
                	message: '转账成功'
                });
            })
        },
        inputchange(value){
            this.inputcheck(value)
        },
        inputAddress(value){
            this.addressCheck(value)
        },
        inputcheck(value){
            var numberExp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/
            if(!numberExp.test(value)){
                    this.$message({
                        type: "error",
                        message: "请输入正确的金额"
                    })
                return false
            }
            if (value === 0){
                this.$message({
                    type: "error",
                    message: "请输入正确的金额"
                })
                return false
            }
            return true

        },
        addressCheck(value){
            var numberExp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/
            if(!numberExp.test(value)||value.length!=48){
                    this.$message({
                        type: "error",
                        message: "请输入正确的地址"
                    })
                return false
            }
            return true
        },
    },
    components: {
        headTop
    }
}
</script>

<style>
</style>
