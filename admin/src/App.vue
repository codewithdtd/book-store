<script>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue'
import { useUserStore } from './stores/userStore';
export default {
    components: { Navbar, Header },
    data() {
        return {
            userStore: useUserStore()
        }
    }
}
</script>

<template>
    <div id="app" class="app">
        <!-- <div class="app__nav"> -->
            <Navbar v-if="userStore.login" />
        <!-- </div> -->
        <div class="app__view">
            <Header v-if="userStore.login"></Header>
            <router-view class="view"/>
        </div>
        <!-- <Register /> -->
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&family=Noto+Sans+HK:wght@100..900&family=Oswald:wght@200&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

.app {
    padding: 0;
    font-family: "Josefin Sans", sans-serif;
    background-repeat: no-repeat;
    background-color: #d4e5ff;
    background-size: cover;
    padding: 0;
    --color-main: #13407f;
    --color-background: rgb(255, 255, 255);
    display: flex;
}

.app__view {
    flex-grow: 1;
    /* margin: 10px 20px 10px 10px; */
}

.error {
    background-color: rgb(255, 210, 210) !important;
    border-color: red !important;
}
/* .app-view {
    flex-grow: 1;
} */
</style>
