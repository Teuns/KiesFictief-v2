<script setup>
defineProps({
    step: {
        type: String,
    },
    length: {
        type: Number,
    },
});
</script>

<template>
    <div
        class="container"
        :class="{ 'container--quiz': $route.name === 'Quiz' }"
    >
        <nav class="menu">
            <div class="logo">
                <button @click="$router.back()">
                    <svg
                        width="24"
                        height="24"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        stroke-linejoin="round"
                        stroke-miterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z"
                            fill-rule="nonzero"
                        />
                    </svg>
                </button>
                <router-link to="/">
                    <h3><span>Kies</span>Fictief</h3>
                </router-link>
            </div>
            <ul class="nav" v-if="step !== 'results'">
                <li class="nav__item">
                    <span
                        ><b>{{ step }}</b
                        >/{{ length }}</span
                    >
                </li>
                <li class="nav__item">
                    <h4>NetPlaza</h4>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: var(--space-xs);
}

.nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0 0 0 auto;
}

.menu .logo {
    display: flex;
    align-items: center;
    color: $text-color;
    font-size: 1.25em;

    button {
        display: flex;
        align-items: center;
        background: #eeeeee;
        border-radius: 100px;
        border: 1px solid transparent;
        padding: var(--space-xxs) var(--space-xxs);
        margin-right: var(--space-xs);
        cursor: pointer;
        transition: 0.2s background-color;

        &:hover {
            background-color: darken(#eeeeee, 10%);
        }
    }
}

.menu .logo a {
    text-decoration: none;
}

.menu .logo h3 {
    margin: 0;
    font-weight: 500;

    span {
        color: $secondary-color;
    }
}

.nav__item {
    margin-left: var(--space-xs);

    span {
        border-radius: 100px;
        border: 1px solid #eee;
        padding: var(--space-xxs) var(--space-xs);
    }
}

@media screen and (max-width: 800px) {
    .menu {
        margin-top: var(--space-md);
    }

    .menu .logo h3 {
        font-size: 1.5rem;
    }

    .menu .nav__item:last-child {
        display: none;
    }
}
</style>
