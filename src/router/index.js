import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'
Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const s404 = r => require.ensure([], () => r(require('@/page/common/404')), '404');
const certFound = r => require.ensure([], () => r(require('@/page/certFound')), 'certFound');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const myWallet = r => require.ensure([], () => r(require('@/page/myWallet')), 'myWallet');
const recharge = r => require.ensure([], () => r(require('@/page/recharge')), 'recharge');
const record = r => require.ensure([], () => r(require('@/page/record')), 'record');
const transfer = r => require.ensure([], () => r(require('@/page/transfer')), 'transfer');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const evaluate = r => require.ensure([], () => r(require('@/page/customer/evaluate')), 'evaluate');
const zd = r => require.ensure([], () => r(require('@/page/myCommon/zd')), 'zd');
const globalRoutes = [
    {
        path: '/',
        component: login
    },{
        path: '/register',
        component: register,
    },{
        path: '*',
        component: s404,
    },{
        path: '/certFound',
        component: certFound,
    }
]

const routes = [{
    path: '/manage',
    component: manage,
    name: '',
    children: [{
        path: '',
        component: home,
        meta: [],
    },{
        path: '/myWallet',
        component: myWallet,
        meta: ['数据管理','我的钱包'],
    },{
        path: '/record',
        component: record,
        meta: ['数据管理','交易记录'],
    },{
        path: '/recharge',
        component: recharge,
        meta: ['交易','充值'],
    },{
        path: '/transfer',
        component: transfer,
        meta: ['交易','转账'],
    },{
        path: '/evaluate',
        component: evaluate,
        meta: ['顾客操作','评价'],
    },{
        path: '/zd',
        component: zd,
        meta: ['顾客操作','评价'],
    }]
}]

const router =  new Router({
    routes: globalRoutes.concat(routes),
    strict: process.env.NODE_ENV !== 'production',
})

router.beforeEach((to, from, next)=>{
    if(VueCookies.get('userInfo') || fnCurrentRouteType(to,globalRoutes) === 'global'){
        next()
    }else{
        router.push("/")
    }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
    var temp = []
    for (var i = 0; i < globalRoutes.length; i++) {
        if (route.path === globalRoutes[i].path) {
            return 'global'
        } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
            temp = temp.concat(globalRoutes[i].children)
        }
    }
    return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

export default router
