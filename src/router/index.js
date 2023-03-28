import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

// Async Components
const TaskPage = defineAsyncComponent(() =>
  import('../components/pages/TaskPage.vue')
);
const DocsDetail = defineAsyncComponent(() =>
  import('../components/pages/Docs/DocsDetail.vue')
);
const Login = defineAsyncComponent(() =>
  import('../components/pages/auth/TheLogin.vue')
);
const Register = defineAsyncComponent(() =>
  import('@/components/pages/auth/TheRegister.vue')
);

const router = createRouter({
    mode:history,
    history: createWebHistory(),

    routes: [
        {
        path: '/',
        name: 'Home',
        component: TaskPage
        },
        {
          path: '/docs',
          name: 'docs',
          component: DocsDetail
        },
        // {
        //   path: '/lists',
        //   name: 'list-detail',
        //   component: () => import('@/components/Tasks/Task')
        // },
        // {
        //   path: '/lists/:id',
        //   name: 'list-single',
        //   component: () => import('../components/pages/ListDetail.vue'),
        //   children: [
        //     {
        //       path: '/lists',
        //       name: 'list-detail',
        //       component: () => import('../components/pages/ListDetail.vue')
        //     }
        //   ]
        // },
        {
            path: '/register',
            name: 'register',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: Login
        },
        {
            path: '/:notFound(.*)',
            name: '404',
            component: () => import('@/components/pages/NotFound.vue')
        }
    ]


})

router.beforeEach((to, _from, next) => {
    const isAuthenticated = localStorage.getItem('accessToken')
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            if (!isAuthenticated) {
                next('/register')
            } else {
                next()
            }
        } else {
        next()
        }
})

export default router