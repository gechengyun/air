import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'


import dashboard from '@/components/dashboard/dashboard'
import operation from '@/components/operation/operation'
import distance from '@/components/operation/distance'

//报警管理
import alarmInf from '@/components/alarm/alarmInf'
import alarmRule from '@/components/alarm/alarmRule'
import alarmTrack from '@/components/alarm/alarmTrack'
import alarmLevel from '@/components/alarm/alarmLevel'

//数据分析
import dataAnalysis from '@/components/dataAnalysis/dataAnalysis'

//报表管理
import report from '@/components/report/report'

//客户管理
import customer from '@/components/customer/customer'
import customerInfo from '@/components/customer/customerInfo'
import checks from '@/components/customer/checks'
import uncertified from '@/components/customer/uncertified'
import infoInput from '@/components/customer/infoInput'

//项目管理
import project from '@/components/project/project'
import changeProject from '@/components/project/changeProject'

//配置管理
import equipment from '@/components/configuration/equipment'
import addequipment from '@/components/configuration/addequipment'
import points from '@/components/configuration/points'
import addpoints from '@/components/configuration/addpoints'
import station from '@/components/configuration/station'
import addStation from '@/components/configuration/addStation'
import stationPic from '@/components/configuration/stationPic'

//系统管理
import user from '@/components/system/user'
import addUser from '@/components/system/addUser'
import role from '@/components/system/role'
import addRole from '@/components/system/addRole'
import dictionarie from '@/components/system/dictionarie'
import dictionarieValue from '@/components/system/dictionarieValue'
import updatepwd from '@/components/system/updatepwd'

// 用户登录注册
import login from '@/components/login/login'
import register from '@/components/login/register'
import forget from '@/components/login/forget'

// 404
import page404 from '@/components/page404/page404'

Vue.use(Router)
export default new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/index', redirect: '/' },
        { path: '/login', name: 'login', component: login },
        { path: '/register', name: 'register', component: register },
        { path: '/forget', name: 'forget', component: forget },
        { path: '*', redirect: '/page404' },
        { path: '/page404', name: 'page404', component: page404 },
        {
            path: '/',
            meta: {
                keepAlive: true
            },
            component: index,
            beforeEnter: (to, form, next) => {
                if (localStorage.getItem('user'))
                    next()
                else
                    next({ path: '/login' })
            },
            children: [{
                    path: '/',
                    name: 'dashboard',
                    component: dashboard,
                    meta: {
                        folder: ['首页']
                    }
                },
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: dashboard,
                    meta: {
                        folder: ['首页']
                    }
                },
                {
                    path: 'operation',
                    name: 'operation',
                    component: operation,
                    meta: {
                        folder: ['运行监控']
                    }
                },
                {
                    path: 'operation/distance/:id',
                    name: 'distance',
                    component: distance,
                    meta: {
                        folder: ['运行监控', '远程控制']
                    }
                },
                {
                    path: 'alarmInf',
                    name: 'alarmInf',
                    component: alarmInf,
                    meta: {
                        folder: ['报警管理', '报警信息']
                    }
                },
                {
                    path: 'alarmRule',
                    name: 'alarmRule',
                    component: alarmRule,
                    meta: {
                        folder: ['报警管理', '报警规则']
                    }
                },
                {
                    path: 'alarmTrack',
                    name: 'alarmTrack',
                    component: alarmTrack,
                    meta: {
                        folder: ['报警管理', '报警跟踪']
                    }
                },
                {
                    path: 'alarmLevel',
                    name: 'alarmLevel',
                    component: alarmLevel,
                    meta: {
                        folder: ['报警管理', '报警级别']
                    }
                },
                {
                    path: 'dataAnalysis',
                    name: 'dataAnalysis',
                    component: dataAnalysis,
                    meta: {
                        folder: ['数据分析']
                    }
                },
                {
                    path: 'report',
                    name: 'report',
                    component: report,
                    meta: {
                        folder: ['报表管理']
                    }
                },
                {
                    path: 'customer',
                    name: 'customer',
                    component: customer,
                    meta: {
                        folder: ['客户管理']
                    },
                },
                {
                    path: 'customer/uncertified/:id',
                    name: 'uncertified',
                    component: uncertified,
                    meta: {
                        folder: ['客户管理', '未认证']
                    },
                },
                {
                    path: 'customer/customerInfo/:id',
                    name: 'customerInfo',
                    component: customerInfo,
                    meta: {
                        folder: ['客户管理', '企业资料']
                    }
                },
                {
                    path: 'customer/infoInput/:id',
                    name: 'infoInput',
                    component: infoInput,
                    meta: {
                        folder: ['客户管理', '企业录入']
                    }
                },
                {
                    path: 'checks',
                    name: 'checks',
                    component: checks,
                    meta: {
                        folder: ['客户管理', '资质审核']
                    }
                },
                {
                    path: 'project',
                    name: 'project',
                    component: project,
                    meta: {
                        folder: ['项目管理']
                    }
                },
                {
                    path: 'project/changeProject/:id',
                    name: 'changeProject',
                    component: changeProject,
                    meta: {
                        folder: ['项目管理']
                    }
                },
                {
                    path: 'station',
                    name: 'station',
                    component: station,
                    meta: {
                        folder: ['配置管理', '空调站点管理']
                    }
                },
                {
                    path: 'station/addStation/:id',
                    name: 'addStation',
                    component: addStation,
                    meta: {
                        folder: ['配置管理', '空调站点管理']
                    }
                },
                {
                    path: 'station/stationPic/:id',
                    name: 'stationPic',
                    component: stationPic,
                    meta: {
                        folder: ['配置管理', '工艺图配置']
                    }
                },
                {
                    path: 'equipment',
                    name: 'equipment',
                    component: equipment,
                    meta: {
                        folder: ['配置管理', '设备管理']
                    },
                },
                {
                    path: 'equipment/addequipment',
                    name: 'addequipment',
                    component: addequipment,
                    meta: {
                        folder: ['配置管理', '设备管理']
                    }
                },
                {
                    path: 'equipment/addequipment/:id',
                    name: 'addequipment',
                    component: addequipment,
                    meta: {
                        folder: ['配置管理', '设备管理']
                    }
                },
                {
                    path: 'points',
                    name: 'points',
                    component: points,
                    meta: {
                        folder: ['配置管理', '测点管理']
                    }
                },
                {
                    path: 'points/addpoints',
                    name: 'addpoints',
                    component: addpoints,
                    meta: {
                        folder: ['配置管理', '测点管理']
                    }
                },
                {
                    path: 'points/addpoints/:id',
                    name: 'addpoints',
                    component: addpoints,
                    meta: {
                        folder: ['配置管理', '测点管理']
                    }
                },
                {
                    path: 'user',
                    name: 'user',
                    component: user,
                    meta: {
                        folder: ['系统管理', '用户管理']
                    }
                },
                {
                    path: 'user/addUser/:id',
                    name: 'addUser',
                    component: addUser,
                    meta: {
                        folder: ['系统管理', '用户管理']
                    }
                },
                {
                    path: 'role',
                    name: 'role',
                    component: role,
                    meta: {
                        folder: ['系统管理', '角色管理']
                    }
                },
                {
                    path: 'role/addRole/:id',
                    name: 'addRole',
                    component: addRole,
                    meta: {
                        folder: ['系统管理', '角色管理']
                    }
                },
                {
                    path: 'dictionarie',
                    name: 'dictionarie',
                    component: dictionarie,
                    meta: {
                        folder: ['系统管理', '字典管理']
                    }
                },
                {
                    path: 'dictionarie/dictionarieValue/:id',
                    name: 'dictionarieValue',
                    component: dictionarieValue,
                    meta: {
                        folder: ['系统管理', '字典值管理']
                    }
                },
                {
                    path: 'updatepwd',
                    name: 'updatepwd',
                    component: updatepwd,
                    meta: {
                        folder: ['系统管理', '修改密码']
                    }
                }

            ],
        },

    ]
})