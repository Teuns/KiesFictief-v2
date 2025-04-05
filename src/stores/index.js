import { defineStore } from 'pinia';
import axios from 'axios';

// On develop:
const apiRoot = 'http://localhost:3000/api';
// const apiRoot = '/api';

export const useStore = defineStore('store', {
    state: () => {
        return {
            parties: [],
            quizzes: [],
            quiz: [],
            votes: [],
        };
    },
    getters: {
        getParties: async (state) => {
            await axios({
                url: `${apiRoot}/quiz/parties`,
                method: 'GET',
            }).then((res) => {
                state.parties = res.data;
            });
            return state.parties;
        },
        getQuizzes: async (state) => {
            await axios({
                url: `${apiRoot}/quiz/quizzes`,
                method: 'GET',
            }).then((res) => {
                state.quizzes = res.data;
            });
            return state.quizzes;
        },
        getQuiz: (state) => {
            return async (id) => {
                await axios({
                    url: `${apiRoot}/quiz/` + id,
                    method: 'GET',
                }).then((res) => {
                    state.quiz = res.data;
                });
                return state.quiz;
            };
        },
        getVotes: (state) => {
            return state.votes;
        },
    },
    actions: {
        reset() {
            this.votes = [];
        },
    },
});
