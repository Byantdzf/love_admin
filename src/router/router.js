import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/otherRouter',
    name: 'otherRouter',
    component: Main,
    children: [
        // { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        {
            path: 'order/:order_id',
            name: 'order-detail',
            title: '订单详情',
            meta: {
                title: '订单详情'
            },
            component: resolve => {
                require(['@/views/orders/detail.vue'], resolve);
            }
        },
        {
            path: 'user_order/:user_order_id',
            name: 'user_order',
            title: '订单列表',
            meta: {
                title: '订单列表'
            },
            component: resolve => {
                require(['@/views/users/user_order.vue'], resolve);
            }
        },
        {
            path: 'user_gift/:user_gift_id',
            name: 'user_gift',
            title: '礼物列表',
            meta: {
                title: '礼物列表'
            },
            component: resolve => {
                require(['@/views/users/user_gift.vue'], resolve);
            }
        },
        {
            path: 'user_integral/:user_integral_id',
            name: 'user_integral',
            title: '福分记录',
            meta: {
                title: '福分记录'
            },
            component: resolve => {
                require(['@/views/users/user_integral.vue'], resolve);
            }
        },
        {
            path: 'user_detail/:user_detail_id',
            name: 'user_detail',
            title: '用户详情',
            meta: {
                title: '用户详情'
            },
            component: resolve => {
                require(['@/views/users/user_detail.vue'], resolve);
            }
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
     // {
     //     path: '/group',
     //     icon: 'ios-folder',
     //     name: 'group',
     //     title: 'Group',
     //     component: Main,
     //     children: [
     //         {
     //             path: 'page1',
     //             icon: 'ios-paper-outline',
     //             name: 'page1',
     //             title: 'Page1',
     //             component: resolve => { require(['@/views/group/page1/page1.vue'], resolve); }
     //         },
     //         {
     //             path: 'page2',
     //             icon: 'ios-list-outline',
     //             name: 'page2',
     //             title: 'Page2',
     //             component: resolve => { require(['@/views/group/page2/page2.vue'], resolve); }
     //         }
     //     ]
     // },
    {
        path: '/',
        icon: 'ios-paper-outline',
        title: '订单列表',
        name: '',
        component: Main,
        children: [
            { path: '/', title: '订单列表', name: 'list', component: resolve => { require(['@/views/orders/list.vue'], resolve); } }
        ]
    },
    {
        path: '/users',
        icon: 'ios-people',
        name: '用户管理',
        title: '用户管理',
        component: Main,
        children: [
            {
                path: 'list',
                icon: 'ios-paper-outline',
                name: '用户列表',
                title: '用户列表',
                component: resolve => { require(['@/views/users/list.vue'], resolve); }
            },
            {
                path: 'complain',
                icon: 'ios-list-outline',
                name: '投诉列表',
                title: '投诉列表',
                component: resolve => { require(['@/views/users/complain.vue'], resolve); }
            }
        ]
    }
    // {
    //     path: '/profiles',
    //     icon: 'ios-chatboxes',
    //     title: '公众号',
    //     name: 'profiles',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '公众号', name: '公众号', component: resolve => { require(['@/views/page/profiles.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/categories',
    //     icon: 'pricetags',
    //     title: 'categories',
    //     name: 'categories',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '标签', name: '标签', component: resolve => { require(['@/views/page/categories.vue'], resolve); } }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];
