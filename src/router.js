import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/modifyAbout',
            name: 'modifyAbout',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/modifyAbout.vue')
        },
        {
            path: '/index',
            name: 'index',
            redirect: '/index/new',
            component: () =>
                import ('./views/Index.vue'),
            children: [{
                    path: 'new',
                    name: 'new',
                    component: () =>
                        import ('./views/New.vue'),
                },
                {
                    path: 'history',
                    name: 'history',
                    component: () =>
                        import ('./views/History.vue'),
                    children: [{
                            path: '/salary1',
                            name: 'salary1',
                            component: () =>
                                import ('./views/Salary1')
                        },
                        {
                            path: '/salary2',
                            name: 'salary2',
                            component: () =>
                                import ('./views/Salary2')
                        },
                        {
                            path: '/salary3',
                            name: 'salary3',
                            component: () =>
                                import ('./views/Salary3')
                        }, {
                            path: '/salary4',
                            name: 'salary4',
                            component: () =>
                                import ('./views/Salary4')
                        }, {
                            path: '/salary5',
                            name: 'salary5',
                            component: () =>
                                import ('./views/Salary5')
                        }, {
                            path: '/salary6',
                            name: 'salary6',
                            component: () =>
                                import ('./views/Salary6')
                        },
                    ]
                },
                {
                    path: 'help',
                    name: 'help',
                    component: () =>
                        import ('./views/Help.vue'),
                },
                {
                    path: 'provid',
                    name: 'provid',
                    component: () =>
                        import ('./views/Provid.vue'),
                },
                {
                    path: 'setting',
                    name: 'setting',
                    component: () =>
                        import ('./views/Setting.vue'),
                },
            ]
        },
        {
            path: '*',
            redirect: '/login',
        }
    ]
})