import { createRouter, createWebHistory } from 'vue-router';
import { useUtilsStore, NavigationStatus } from '../stores/utils';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/simulator',
            name: 'Simulator',
            component: () => import('../views/SimulatorView.vue'),
        },
        {
            path: '/about-intel-8086',
            name: 'AboutIntel8086',
            component: () => import('../views/AboutIntel8086View.vue'),
        },
    ],
});

router.beforeEach(() => {
    const utilsStore = useUtilsStore();
    utilsStore.$patch({
        navigationStatus: NavigationStatus.inProgress,
    });

    return true;
});

router.afterEach((_to, _from, failure) => {
    const utilsStore = useUtilsStore();

    if (failure) {
        utilsStore.$patch({
            navigationStatus: NavigationStatus.failed,
        });
    } else {
        utilsStore.$patch({
            navigationStatus: NavigationStatus.success,
        });
    }
});

export default router;
