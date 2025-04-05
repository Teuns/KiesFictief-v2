<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    results: {
        type: Array,
        required: true,
    },
});
const { results } = toRefs(props);
const resultsSorted = results.value.sort((a, b) => a.percentage < b.percentage);
</script>
<template>
    <div class="content">
        <h1 class="title">Deze partijen kwamen het meeste met jou overeen</h1>
        <div class="block" v-if="results.length">
            <div class="charts-container">
                <div class="pie-wrapper">
                    <div
                        class="single-chart"
                        v-for="vote in resultsSorted.slice(0, 3)"
                        :key="vote.party"
                    >
                        <span class="label">{{ vote.party }}</span>
                        <svg viewBox="0 0 36 36" class="circular-chart primary">
                            <path
                                class="circle-bg"
                                d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                class="circle"
                                :stroke-dasharray="
                                    vote.percentage.toFixed(0) + ', 100'
                                "
                                d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" class="percentage">
                                {{ vote.percentage.toFixed(0) }}%
                            </text>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="charts-container">
                <div
                    class="bar-wrapper"
                    v-for="vote in resultsSorted"
                    :key="vote.party"
                >
                    <div class="bar">
                        <span
                            class="label"
                            :style="{
                                height: vote.percentage.toFixed(0) + '%',
                            }"
                            >{{ vote.percentage.toFixed(0) }}%</span
                        >
                    </div>
                    <span class="label-party">{{ vote.party }}</span>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Helaas, er zijn geen resultaten van je bekend.</p>
        </div>
        <div class="block">
            <router-link
                :to="{ name: 'Quiz', params: { qid: 1, step: 1 } }"
                class="button"
            >
                Probeer het nog een keer!
            </router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.charts-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: var(--space-md) 0;

    .pie-wrapper {
        display: flex;
        flex-wrap: wrap;

        .single-chart {
            display: flex;
            flex-direction: column;
            text-align: center;
            margin-right: var(--space-md);
            margin-bottom: var(--space-md);
        }

        .circular-chart {
            display: block;
            width: 100px;
            height: auto;
        }

        .circle-bg {
            fill: none;
            stroke: $circle-bg-color;
            stroke-width: 3.8;
        }

        .circle {
            fill: none;
            stroke-width: 3.8;
            animation: progress 1s ease-out forwards;
        }

        @keyframes progress {
            0% {
                stroke-dasharray: 0 100;
            }
        }

        .circular-chart.primary .circle {
            stroke: $circle-stroke-color;
        }

        .percentage {
            fill: $circle-text-color;
            font-size: 0.5em;
            text-anchor: middle;
        }

        .label {
            margin: var(--space-xxs) 0;
        }
    }

    .bar-wrapper {
        display: flex;
        flex-direction: column;
        margin-right: var(--space-xs);
        margin-bottom: var(--space-md);
        width: 50px;

        .label-party {
            margin-top: var(--space-xs);
            text-align: center;
            word-break: break-word;
        }

        .bar {
            display: flex;
            flex-direction: column;
            height: 300px;
            background: $bar-bg-color;
            border: 1px solid $bar-border-color;

            .label {
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                width: calc(100% + 2px);
                background: $secondary-color;
                padding: 1.25rem 1rem;
                margin-top: auto;
                margin-left: -1px;
                font-weight: bold;
            }
        }
    }
}
</style>
