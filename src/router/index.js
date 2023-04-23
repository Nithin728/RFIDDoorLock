// import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Keycodes from '../components/Keycodes.vue'
import Log from '../components/Log.vue'
import Home from '../components/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/keycodes',
        name: 'keycodes',
        component: Keycodes
    },
    {
        path: '/log',
        name: 'log',
        component: Log
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { router }