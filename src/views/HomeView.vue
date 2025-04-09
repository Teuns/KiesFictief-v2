<script setup>
import { useStore } from '@/stores';
const store = useStore();
const parties = await store.getParties;
const quizzes = await store.getQuizzes;
const quiz = quizzes.find((quiz) => quiz.published === 1);
</script>

<template>
    <main>
        <div class="blur"></div>
        <div class="wrapper container">
            <div class="box-left">
                <div class="box overlay">
                    <div class="box-header">
                        <h3 class="title">
                            {{ quiz.title }}
                        </h3>
                        <p class="subtitle">
                            Test je politieke voorkeur aan de hand van
                            {{ quiz.statements.length }}
                            stellingen
                        </p>
                    </div>
                    <div class="box-footer">
                        <router-link
                            :to="{
                                name: 'Quiz',
                                params: { qid: quiz.id, step: 1 },
                            }"
                            class="button"
                            >Start</router-link
                        >
                    </div>
                </div>
                <div class="box disclaimer">
                    <p>
                        Bij KiesFictief nemen we privacy en het kiesrecht zeer
                        serieus. Je krijgt straks eerst alle stellingen te zien.
                        Daarna vragen we je toestemming om bepaalde gegevens te
                        delen. Dat is niet verplicht. Ook zonder akkoord te
                        gaan, kun je de uitslag bekijken. Verder gebruiken we
                        Google Analytics om KiesFictief te verbeteren. We hebben
                        Google Analytics op een privacyvriendelijke manier
                        ingesteld.
                    </p>
                    <p>&copy; KiesFictief</p>
                </div>
            </div>
            <div class="box-right">
                <div class="box">
                    <b>Deze partijen doen mee</b>
                    <div class="parties">
                        <img
                            :src="party.logo"
                            :alt="party.title"
                            :key="party.id"
                            v-for="party in parties"
                        />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
main {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../assets/img/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
}

.blur {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
}

.wrapper {
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    z-index: 1000;
}

.box {
    display: flex;
    flex-direction: column;
    padding: var(--space-md);
    background-color: $box-bg-color;
    color: $box-text-color;
    border-radius: 8px;

    &-header .title {
        font-size: 1.75rem;
        margin-bottom: 0;
    }

    &-header .subtitle {
        margin: var(--space-xxs) 0;
    }

    &-footer {
        margin-top: auto;
    }

    &.overlay {
        background-color: $box-overlay-bg-color;
        color: $box-overlay-text-color;
        margin-top: -10%;
        z-index: 1000;
    }

    &.disclaimer {
        margin-top: -8px;
        margin-left: 10%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        p {
            font-size: 12px;
            margin: var(--space-xxs) 0;
        }
    }
}

.box-left {
    display: flex;
    flex-direction: column;
    width: 75%;
    height: 600px;
}

.box-right {
    display: flex;

    .box {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}

.parties {
    margin-top: var(--space-xs);
    display: flex;
    flex-wrap: wrap;

    img {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 100px;
        margin-top: var(--space-xs);
        margin-right: var(--space-xs);
        cursor: pointer;
        transition: 0.2s transform;

        &:hover {
            transform: scale(150%);
        }
    }
}

.button {
    display: inline-block;
    padding: var(--space-xs) var(--space-md);
    color: #ffffff;
    background-color: $secondary-color;
    font-size: 24px;
    font-weight: 600;
    border-radius: 24px;
    text-decoration: none;
    transition: 0.2s background-color;

    &:hover {
        background-color: darken($secondary-color, 10%);
    }
}

@media screen and (max-width: 800px) {
    .wrapper {
        flex-direction: column;
        margin: var(--space-lg) 0;
    }

    .box {
        border-radius: 0;
    }

    .box-left {
        width: 100%;
    }

    .box.disclaimer {
        margin-left: 0;
    }
}
</style>
