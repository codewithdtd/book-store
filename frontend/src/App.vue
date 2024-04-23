<script>
import AppHeader from "@/components/AppHeader.vue";
import Footer from "./components/Footer.vue";
export default {
    components: {
        AppHeader, Footer
    },

}
</script>

<template>
    <div id="app" class="container-fluid">
        <AppHeader />
        <div>
            <router-view />
        </div>

        <Footer />
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&family=Noto+Sans+HK:wght@100..900&family=Oswald:wght@200&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

#app {
    /* font-family: "Noto Sans HK", sans-serif; */
    /* font-family: "Work Sans", sans-serif; */
    /* background: url(./assets/bg.jpg); */
    font-family: "Josefin Sans", sans-serif;
    /* background: url('https://media.architecturaldigest.com/photos/6140c8b1e7f3368a585e1c58/16:9/w_2560%2Cc_limit/_SI_4383-Edit.jpg');     */
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0;
    --color-main: rgb(47, 160, 248);
    --color-background: rgb(255, 255, 255);
}

</style>
