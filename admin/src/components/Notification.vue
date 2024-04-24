<template>
    
    <div class="notification" @click="hideNotify" v-if="message == 'Thành công' && !hide"> 
        <div class="notification__message"><i class="ri-checkbox-circle-fill"></i>
            <p>{{ message }}</p>
        </div>
    </div>
    <div class="notification notification--error" @click="hideNotify" v-if="message != 'Thành công' && message && !hide"> 
        <div class="notification__message"><i class="ri-close-circle-fill"></i>
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: String,
    },
    data() {
        return {
            hide: false,
        }
    },
    methods: {
        hideNotify() {
            this.hide = true;
        },
    }
}
</script>
<style>
.notification {
    position: fixed;
    border-radius: 5px;
    height: 100vh;
    width: 100vw;
    color: #00a933;
    display: flex;
    opacity: 1;
    z-index: 1;
    transition: opacity 0.5s ease;;
}

.notification__message {
    margin: auto;
    margin-top: 15%;
    background-color: #ffffff;
    /* width: 200px;
    height: 120px; */
    padding: 30px 80px;
    text-align: center;
}
.notification__message i {
    font-size: 3rem;
}

.menu__category__button {
    display: none;
}

.notification--error {
    color: rgb(226, 21, 21);
}
</style>