import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _3f38c7af = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _7e35fb0a = () => interopDefault(import('../pages/changeCity.vue' /* webpackChunkName: "pages/changeCity" */))
const _3fa47ac0 = () => interopDefault(import('../pages/detail.vue' /* webpackChunkName: "pages/detail" */))
const _7f6252a6 = () => interopDefault(import('../pages/exit.vue' /* webpackChunkName: "pages/exit" */))
const _3753da6a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _f3121062 = () => interopDefault(import('../pages/order.vue' /* webpackChunkName: "pages/order" */))
const _2e94ef1a = () => interopDefault(import('../pages/products.vue' /* webpackChunkName: "pages/products" */))
const _45672e32 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _6dac3753 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/cart",
      component: _3f38c7af,
      name: "cart"
    }, {
      path: "/changeCity",
      component: _7e35fb0a,
      name: "changeCity"
    }, {
      path: "/detail",
      component: _3fa47ac0,
      name: "detail"
    }, {
      path: "/exit",
      component: _7f6252a6,
      name: "exit"
    }, {
      path: "/login",
      component: _3753da6a,
      name: "login"
    }, {
      path: "/order",
      component: _f3121062,
      name: "order"
    }, {
      path: "/products",
      component: _2e94ef1a,
      name: "products"
    }, {
      path: "/register",
      component: _45672e32,
      name: "register"
    }, {
      path: "/",
      component: _6dac3753,
      name: "index"
    }],

    fallback: false
  })
}
