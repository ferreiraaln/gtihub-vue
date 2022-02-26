
import Home from '@/pages/home'
const routes = [
    {
        path: '/',
        component: () => import('@/layouts/defaultTemplate'),
        children: [
            {
                path: '/home',
                component: Home,
                name: 'home'
            },
        ]
    },
];

export default routes