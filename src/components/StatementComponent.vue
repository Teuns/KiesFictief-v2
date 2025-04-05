<script setup>
import { toRefs } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    party_statements: {
        type: Array,
        required: true,
    },
});
const { party_statements } = toRefs(props);
const parties_agree = party_statements.value.filter(
    (party_statement) =>
        party_statement.is_neither !== true && party_statement.is_false !== true
);
const parties_neither = party_statements.value.filter(
    (party_statement) =>
        party_statement.is_neither === true && party_statement.is_false !== true
);
const parties_disagree = party_statements.value.filter(
    (party_statement) =>
        party_statement.is_neither !== false &&
        party_statement.is_false === true
);
</script>

<template>
    <div>
        <div class="question">
            <h1 class="title">
                {{ title }}
            </h1>
            <h1>
                {{ description }}
            </h1>
            <button
                class="button"
                @click="$refs.explanations.classList.toggle('show')"
            >
                Wat vinden de partijen?
            </button>
            <div ref="explanations" class="box explanations">
                <div class="box-header">
                    <h3 class="title">Wat vinden de partijen?</h3>
                </div>
                <div class="box-content">
                    <div class="parties-grid">
                        <div class="agree">
                            <h3>Deze partijen zijn het eens met de stelling</h3>
                            <ul>
                                <li
                                    v-for="statement in parties_agree"
                                    :key="statement.id"
                                >
                                    <div
                                        class="dropdown"
                                        @click="
                                            $event.currentTarget.classList.toggle(
                                                'show'
                                            )
                                        "
                                    >
                                        <div class="dropdown-title">
                                            <img
                                                :src="statement.party.logo"
                                                :alt="statement.party.title"
                                            />
                                            <span>{{
                                                statement.party.title
                                            }}</span>
                                        </div>
                                        <div class="dropdown-content">
                                            {{
                                                statement.description ||
                                                'Geen toelichting opgegeven'
                                            }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="neither">
                            <h3>Deze partijen hebben geen mening</h3>
                            <ul>
                                <li
                                    v-for="statement in parties_neither"
                                    :key="statement.id"
                                >
                                    <div
                                        class="dropdown"
                                        @click="
                                            $event.currentTarget.classList.toggle(
                                                'show'
                                            )
                                        "
                                    >
                                        <div class="dropdown-title">
                                            <img
                                                :src="statement.party.logo"
                                                :alt="statement.party.title"
                                            />
                                            <span>{{
                                                statement.party.title
                                            }}</span>
                                        </div>
                                        <div class="dropdown-content">
                                            {{
                                                statement.description ||
                                                'Geen toelichting opgegeven'
                                            }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="disagree">
                            <h3>
                                Deze partijen zijn het oneens met de stelling
                            </h3>
                            <ul>
                                <li
                                    v-for="statement in parties_disagree"
                                    :key="statement.id"
                                >
                                    <div
                                        class="dropdown"
                                        @click="
                                            $event.currentTarget.classList.toggle(
                                                'show'
                                            )
                                        "
                                    >
                                        <div class="dropdown-title">
                                            <img
                                                :src="statement.party.logo"
                                                :alt="statement.party.title"
                                            />
                                            <span>{{
                                                statement.party.title
                                            }}</span>
                                        </div>
                                        <div class="dropdown-content">
                                            {{
                                                statement.description ||
                                                'Geen toelichting opgegeven'
                                            }}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
/* colors */
$box-text-color: #000000;
$box-bg-color: #ffffff;

.box.explanations {
    display: none;
    color: $box-text-color;
    background-color: $box-bg-color;
    border: 1px solid $border-secondary-color;

    &.show {
        display: block;
    }
}

.quiz .question {
    margin: var(--space-md) 0;

    h1 {
        margin: var(--space-xs) 0;
        font-size: 2em;
        font-weight: 500;
    }

    .title {
        color: $secondary-color;
    }

    .button {
        border: 0;
        cursor: pointer;
        margin-left: 5%;
    }
}

.parties-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-md);

    ul {
        list-style: none;
        padding: 0;

        li {
            border: 1px solid $border-color;

            &:not(:last-child) {
                border-bottom: 0;
            }
        }
    }

    .dropdown {
        padding: var(--space-xs);
        cursor: pointer;

        &-title {
            display: flex;
            align-items: center;

            img {
                width: 24px;
                height: 24px;
                object-fit: cover;
                margin-right: var(--space-xxs);
            }

            &:after {
                margin-left: auto;
                content: '\25B6 \FE0E';
            }
        }

        &-content {
            margin-top: var(--space-md);
            display: none;
        }

        &.show .dropdown-title:after {
            content: '\25BC';
        }

        &.show .dropdown-content {
            display: block;
        }
    }
}

@media screen and (max-width: 800px) {
    .quiz .question h1 {
        font-size: 22px;
    }

    .quiz .button {
        font-size: 20px;
    }

    .parties-grid {
        grid-template-columns: 1fr;
    }
}
</style>
