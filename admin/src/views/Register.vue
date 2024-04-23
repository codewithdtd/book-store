<template>
    <div class="login">
        <h1 class="login__title">Book Store - Trang quản lý</h1>
        <div class="image">
            <!-- <img src="" alt=""> -->
        </div>
        <div class="form">
            <form action="" method="" @submit.prevent="handleSubmit">
                <h1>ĐĂNG KÝ</h1>
                <div class="login__info__item">
                    <i class="ri-user-line"></i>
                    <input type="text" v-model="sodienthoai" placeholder="Họ tên">
                </div>
                <div class="login__info__item">
                    <i class="ri-briefcase-line"></i>
                    <input type="text" v-model="sodienthoai" placeholder="Chức vụ">
                </div>
                <div class="login__info__item">
                    <i class="ri-home-4-line"></i>
                    <input type="text" v-model="sodienthoai" placeholder="Điạ chỉ">
                </div>
                <div class="login__info__item">
                    <i class="ri-phone-line"></i>
                    <input type="text" v-model="sodienthoai" placeholder="Số điện thoại">
                </div>
                <div class="login__info__item">
                    <i class="ri-lock-line"></i>
                    <input type="password" v-model="password" placeholder="Mật khẩu">
                </div>
                <div class="login__info__item">
                    <i class="ri-lock-line"></i>
                    <input type="password" v-model="password" placeholder="Xác nhận mật khẩu">
                </div>
                <p>Đã có tài khoản? <router-link to="/login" class="">Đăng nhập</router-link></p>
                <button class="m-1 btn btn-info">Đăng ký</button>
            </form>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/staff.service';

export default {
    methods: {
        async handleSubmit() {
            const data = {
                sodienthoai: this.sodienthoai,
                password: this.password,
            }
            try {
                const user = await userService.login(data);
                const { accessToken, ...orther } = user;
                this.userStore.setUser(orther)
                router.push('/')
            } catch (e) {
                error.value = 'Sai';
                console.log(e);
            }

        }
    },
    data() {
        return {
            userStore: useUserStore(),
            sodienthoai: '',
            password: '',
        }
    },
}
</script>

<style scoped>
.login {
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: center;
    width: 100vw;
    color: #000000;
}
.login__title {
    position: fixed;
    top: 20px;
    left: 20px;
    /* font-family: "Satisfy", cursive; */
    font-size: 2.5rem;
    font-weight: 500;
    text-decoration: none;
    color: var(--color-main);
    z-index: 1;
}
.login .image {
    min-width: 50vw;
    height: 100vh;
    display: flex;
    position: relative;
    background: url('../assets/login.jpg');
    background-color: var(--color-main);
    background-size: cover;
}


.login .form h1{
    font-weight: 500;
    font-size: 2.5rem;  
    color: #002f7a;

}

.login .form {
    padding: 10px 20px;
    color: #000000;
    min-width: 50%;
    height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ecfbff;
}

.login .form form {
    position: relative;
    background-color: #7dc2ffb4;
    border-radius: 10px;
    padding: 20px 20px;
    width: fit-content;
    backdrop-filter: blur(4px);
}

@media screen and (max-width: 820px ) {
    .login .form form {
        right: 50%;
    }
}

.login__info {
    display: flex;
    margin-bottom: 10px;
}

.login__info__item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    /* flex-direction: column; */
}

.login__info__item i {
    font-size: 1.5rem;
    margin-right: 15px;
    font-weight: 100;
    /* color: var(--color-main); */
    color: #002f7a;
}

.login__info__item input, textarea {
    width: 200px;
    border-radius: 10px;
    border-color: var(--color-main);
    background-color: rgb(228, 234, 255);
    height: 40px;
    padding-left: 10px;
}
.login form a {
    color: var(--color-main);
}

.login button{
    max-width: 200px;
    align-self: center;
}

.login p {
   color: #333;
   margin: 0 10px;
}
</style>
