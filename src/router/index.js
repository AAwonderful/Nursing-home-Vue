import Router from 'vue-router'
import  Vue from 'vue'
import Login from '../components/login/Login'
import Main from '../components/admin/Main'
import Portal from  '../components/portal/Portal'
import Checkin from '../components/register/Checkin'
import CheckinAdd from '../components/register/CheckinAdd'
import CheckinUpdate from '../components/register/CheckinUpdate'
import Checkout from '../components/register/Checkout'
import CheckoutAdd from '../components/register/CheckoutAdd'
import CheckoutUpdate from '../components/register/CheckoutUpdate'
import Outgoing from '../components/register/Outgoing'
import OutgoingAdd from '../components/register/OutgoingAdd'
import OutgoingUpdate from '../components/register/OutgoingUpdate'
import Bed from '../components/bed/Bed'
import BedAdd from '../components/bed/BedAdd'
import BedUpdate from '../components/bed/BedUpdate'
import Nurse from '../components/nurse/Nurse'
import NurseAdd from '../components/nurse/NurseAdd'
import NurseUpdate from '../components/nurse/NurseUpdate'
import Huli from '../components/huli/Huli'
import HuliAdd from '../components/huli/HuliAdd'
import HuliUpdate from '../components/huli/HuliUpdate'
import HlWork from '../components/huli/HlWork'
import HlWorkAdd from '../components/huli/HlWorkAdd'
import HlWorkUpdate from '../components/huli/HlWorkUpdate'
import food from '../components/food/food'
import foodUpdate from  '../components/food/foodUpdate'
import foodAdd from  '../components/food/foodAdd'
import calendar from '../components/foodCalendar/calendar'
Vue.use(Router)

const router=new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/main',
            component: Main,
            children:[
                {
                path: '/',
                component: Portal
                },
                {
                    path: '/nurse',
                    component: Nurse
                },
                {
                    path: '/nurseAdd',
                    component: NurseAdd
                },
                {
                    path: '/nurseUpdate/:id',
                    component: NurseUpdate
                },
                {
                    path: '/huli',
                    component: Huli
                },
                {
                    path: '/huliAdd',
                    component: HuliAdd
                },
                {
                    path: '/huliUpdate/:id',
                    component: HuliUpdate
                },
                {
                    path: '/hlWork',
                    component: HlWork
                },
                {
                    path: '/hlWorkAdd',
                    component: HlWorkAdd
                },
                {
                    path: '/hlWorkUpdate/:id',
                    component: HlWorkUpdate
                },
                {
                    path: '/bed',
                    component: Bed
                },
                {
                    path: '/bedAdd',
                    component: BedAdd
                },
                {
                    path: '/bedUpdate/:id',
                    component: BedUpdate
                },
                {
                    path: '/checkin',
                    component: Checkin
                },
                {
                    path: '/checkinAdd',
                    component: CheckinAdd
                },
                {
                    path: '/checkinUpdate/:id',
                    component: CheckinUpdate
                },
                {
                    path: '/checkout',
                    component: Checkout
                },
                {
                    path: '/checkoutAdd',
                    component: CheckoutAdd
                },
                {
                    path: '/checkoutUpdate/:id',
                    component: CheckoutUpdate
                },
                {
                    path: '/Outgoing',
                    component: Outgoing
                },
               {
                    path: '/outgoingAdd',
                    component: OutgoingAdd
                },
                 {
                    path: '/outgoingUpdate/:id',
                    component: OutgoingUpdate
                },
                {
                    path:'/food',
                    component: food
                },
                {
                    path:'/foodUpdate/:id',
                    component: foodUpdate
                },
                {
                    path:'/foodAdd/',
                    component: foodAdd
                },
                {
                    path:'/calendar/:id',
                    component: calendar
                },

            ]
        },
    ]
})

export  default  router