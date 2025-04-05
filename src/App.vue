<script setup>
import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';
const route = useRoute();
const routeName = computed(() => route.name);
let transitionName = 'slide-from-left';
watch(routeName, (newRouteName) => {
    transitionName = newRouteName === 'Home' ? 'fade' : 'slide-from-left';
});
</script>

<template>
    <router-view v-slot="{ Component }">
        <template v-if="Component">
            <transition :name="transitionName" mode="out-in">
                <Suspense timeout="0">
                    <component :key="$route.path" :is="Component" />
                    <template #fallback
                        ><div class="container">
                            <p>Bezig met laden...</p>
                        </div></template
                    >
                </Suspense>
            </transition>
        </template>
    </router-view>
</template>

<style lang="scss">
#app {
    display: flex;
    flex: 1;
}

.overlay {
    width: 100%;
    height: 100%;
    background: $primary-color;
}

.slide-from-left-enter-active,
.slide-from-left-leave-active {
    position: relative;
    transition-property: all;
    transition-duration: 0.2s;
}

.slide-from-left-leave-active {
    left: 0;
}

.slide-from-left-leave-to {
    left: -50%;
}

.slide-from-left-enter-active {
    right: -100%;
}

.slide-from-left-enter-to {
    right: 0;
}

.slide-from-left-enter,
.slide-from-left-leave-active {
    opacity: 0;
}

.slide-from-right-enter-active,
.slide-from-right-leave-active {
    position: relative;
    transition-property: all;
    transition-duration: 0.4s;
}

.slide-from-right-leave-active {
    right: 0;
}

.slide-from-right-leave-to {
    right: -50%;
}

.slide-from-right-enter-active {
    left: -50%;
}

.slide-from-right-enter-to {
    left: 0;
}

.slide-from-right-enter,
.slide-from-right-leave-active {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
