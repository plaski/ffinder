import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Games from '@/components/Game/Games'
import CreateGame from '@/components/Game/CreateGame'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Game from '@/components/Game/Game'
import AuthGuard from './auth-guard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/newgame',
      name: 'CreateGame',
      component: CreateGame,
      beforeEnter: AuthGuard
    },
    {
      path: '/games/:gameId',
      name: 'Game',
      props: true,
      component: Game
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})

export default router
