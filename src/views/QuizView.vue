<script setup>
import { useStore } from '@/stores';
import QProgress from 'qier-progress';
import { useRouter } from 'vue-router';
import NavComponent from '@/components/NavComponent.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import StatementComponent from '@/components/StatementComponent.vue';
import ResultsComponent from '@/components/ResultsComponent.vue';

const router = useRouter();
const progress = new QProgress({
    height: 5,
    colorful: false,
    color: '#3742fa',
});

const props = defineProps({
    qid: {
        type: String,
        required: true,
    },
    step: {
        type: String,
        required: true,
    },
});

const store = useStore();
const { getQuiz } = storeToRefs(store);
let quiz = await getQuiz.value(props.qid);
let votes = store.getVotes;

const showResults = props.step === 'results';

if (
    (!showResults && !quiz) ||
    (!showResults && !quiz['statements'][props.step - 1])
) {
    router.push('/');
}

let statement = quiz['statements'][props.step - 1];

router.afterEach(() => {
    scroll(0, 0);
});

router.beforeEach(async (to, from, next) => {
    if (to.name !== 'Quiz') {
        progress.finish();
        store.reset();
    } else if (showResults) {
        progress.finish();
    }
    next();
});

progress.set(props.step / quiz['statements'].length - 0.001);

if (showResults) {
    progress.finish();
    progress.set(1);
}

// Get next question, unless we reach the last question - then navigate to results page. Update navigation.
const nextQuestion = function () {
    if (props.step < quiz['statements'].length) {
        statement = quiz['statements'][props.step - 1];
        router.push({
            name: 'Quiz',
            params: {
                qid: props.qid,
                step: parseInt(props.step) + 1,
            },
        });
    } else {
        router.push({
            name: 'Quiz',
            params: {
                qid: props.qid,
                step: 'results',
            },
        });
        progress.finish();
    }
};

// Cast vote.
function castVote(vote) {
    votes[props.step - 1] = {
        stelling: quiz['statements'][props.step - 1].id,
        voted: vote,
    };
    router.push({
        name: 'Quiz',
        params: {
            qid: props.qid,
            step:
                props.step < quiz['statements'].length
                    ? parseInt(props.step) + 1
                    : 'results',
        },
    });
}

// Count the votes.
const filterVotes = computed(() => {
    let parties = [];
    for (let i in votes) {
        const index = quiz['statements']
            .map((e) => e.id)
            .indexOf(votes[i].stelling);
        quiz['statements'][index]['party_statements'].forEach((e) => {
            if (e['party'] === null) return;
            // Push party to array if voter shares the same opinion about a statement
            if (votes[i].voted && !e.is_neither && !e.is_false) {
                parties.push({ party: e['party'].title });
            } else if (votes[i].voted === 'neither' && e.is_neither) {
                parties.push({ party: e['party'].title });
            } else if (!votes[i].voted && e.is_false) {
                parties.push({ party: e['party'].title });
            }
        });
    }
    // Count parties in party array
    let tempResult = {};
    for (let { party } of parties) {
        tempResult[party] = {
            party: party,
            count: tempResult[party] ? tempResult[party].count + 1 : 1,
        };
    }
    // Calculate percentages
    for (let { party } of parties) {
        tempResult[party].percentage =
            (tempResult[party].count / quiz['statements'].length) * 100;
    }
    return Object.values(tempResult);
});
</script>

<template>
    <section class="overlay">
        <nav-component :step="step" :length="quiz['statements'].length" />
        <div class="container">
            <div class="quiz" v-if="quiz['statements'].length && !showResults">
                <statement-component
                    :title="statement.title"
                    :description="statement.description"
                    :party_statements="statement.party_statements"
                />
                <div class="options">
                    <div class="option agree" @click="castVote(true)">
                        <p class="option-title">Eens</p>
                    </div>
                    <div class="option" @click="castVote('neither')">
                        <p class="option-title">Geen van beide</p>
                    </div>
                    <div class="option disagree" @click="castVote(false)">
                        <p class="option-title">Oneens</p>
                    </div>
                    <div class="skip" @click="nextQuestion()">
                        <span>Overslaan</span>
                        <svg
                            width="16"
                            height="16"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                                fill-rule="nonzero"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <results-component :results="filterVotes" v-else />
        </div>
    </section>
</template>

<style scoped lang="scss">
body {
    overflow: hidden;
}

.quiz {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80vh;
}

.quiz .options {
    display: flex;
    align-items: center;
    margin-top: auto;
    padding-bottom: var(--space-md);

    .option {
        border-radius: 12px;
        color: $option-text-color;
        background-color: $option-bg-color;
        font-size: 22px;
        font-weight: 600;
        padding: var(--space-xs) var(--space-lg);
        text-align: center;
        cursor: pointer;
        width: auto;
        margin-right: var(--space-md);

        &.agree {
            color: #ffffff;
            background-color: green;

            &:hover {
                background-color: darken(green, 10%);
            }
        }

        &.disagree {
            color: #ffffff;
            background-color: red;

            &:hover {
                background-color: darken(red, 10%);
            }
        }

        &:hover {
            background-color: darken(#eaeaea, 10%);
        }

        .option-title {
            margin: 0;

            &::first-letter {
                text-transform: capitalize;
            }
        }
    }

    .skip {
        display: flex;
        align-items: center;
        height: max-content;
        color: #999999;
        border: 1px solid #eeeeee;
        background-color: #ffffff;
        padding: var(--space-xxs) var(--space-xs);
        border-radius: 100px;
        margin-left: var(--space-md);
        text-align: center;
        cursor: pointer;
        justify-content: center;

        span {
            margin-right: var(--space-xxs);
            font-weight: 500;
        }

        svg {
            fill: #999999;
        }

        &:hover {
            background-color: darken(#ffffff, 10%);
        }
    }
}

@media screen and (max-width: 800px) {
    #app {
        position: fixed;
        overflow: hidden;
    }

    .quiz {
        display: flex;
        flex-direction: column;
        overflow: scroll;
        height: 100vh;
        padding-bottom: 100%;
    }

    .quiz .options {
        grid-template-columns: 1fr;
    }
}

.content {
    margin-bottom: var(--space-md);
}

@media screen and (max-width: 800px) {
    .quiz .options {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-md);

        .option {
            font-size: 16px;
            margin-right: 0;
        }

        .skip {
            margin-left: 0;
        }
    }

    .bar-wrapper {
        flex-direction: column;
        .label-left {
            margin: 10px 0;
        }
    }
}
</style>
