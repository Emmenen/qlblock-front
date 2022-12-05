<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>钱包管理</template>
						<el-menu-item index="myWallet">我的钱包</el-menu-item>
						<el-menu-item index="record">交易记录</el-menu-item>
                        <el-menu-item index="recharge">钱包充值</el-menu-item>
                        <el-menu-item index="transfer">转账</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>

    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},

    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
