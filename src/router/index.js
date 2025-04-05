import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import QuizView from '@/views/QuizView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
        },
        {
            path: '/quiz/:qid/:step',
            name: 'Quiz',
            component: QuizView,
            props: true,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: {
                template:
                    '<div class="container"><p>Niet gevonden</p><router-link to="/">Ga terug naar de beginpagina</router-link></div>',
            },
        },
    ],
});

export default router;
