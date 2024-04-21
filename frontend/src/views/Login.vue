<template>
    <div class="login">
        <form action="" method="" @submit.prevent="handleSubmit">
            <p class="alert alert-danger" v-if="error">Tài khoản hoặc mật khẩu không đúng</p>
            <h1>Đăng nhập</h1>
         
            <div class="login__info__item">
                <label for="" class="">Số điện thoại:</label>
                <input required type="text" v-model="phone">
            </div>
            <div class="login__info__item">
                <label for="" class="">Mật khẩu:</label>
                <input required type="password" v-model="password">
            </div>
         
            <p class="m-1">
                Bạn đã có tài khoản?
                <router-link to="/register">Đăng ký</router-link>
            </p>
          
            <button class="m-1 btn btn-danger">Đăng nhập</button>
        </form>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const phone = ref('');
        const password = ref('');
        const user = ref(null)
        const error = ref('');
        const router = useRouter();
        const userStore = useUserStore();


        const handleSubmit = async() => {
            const data = {
                sodienthoai: phone.value,
                password: password.value,
            }
            try {
                user.value = await userService.login(data);
                const { accessToken, ...orther } = user.value;
                userStore.setUser(orther)
                userStore.cart = await userService.getCart();
                router.push('/')
            } catch (e) {
                error.value = 'Sai';
                console.log(e);
            }

        }
        return {
            phone,
            password,
            handleSubmit,
            userStore,
            error,
        }
    }
    
}
</script>

<style>
.login {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background: url('https://www.housedigest.com/img/gallery/how-to-make-custom-wallpaper-using-old-book-pages/l-intro-1660552487.jpg');
}

.login h1{
    font-weight: 700;
    color: var(--color-main);
    font-size: 2.5rem;
    padding: 0 100px;
    
}

.login form {
    /* background-color: rgba(0, 0, 0, 0.589); */
    backdrop-filter: blur(8px);
    border-radius: 40px;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid #6a6a6a;
    color: #fff;
}

.login__info {
    display: flex;
    margin-bottom: 10px;
}

.login__info__item {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 20px;
    color: #fff;
}

.login__info__item input, textarea {
    width: 100%;
    border-radius: 15px;
    border: none;
    background-color: rgb(255, 255, 255);
    font-size: 1.2rem;
    padding-left: 10px;
}
.login form a {
    color: var(--color-main);
}

</style>
