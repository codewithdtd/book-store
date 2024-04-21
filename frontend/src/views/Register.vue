<template>
    <div class="register">
        <form action="" method="" @submit.prevent="handleSubmit" >
            <div v-if="register" class="alert alert-success">
                Thành công
            </div>
            <h1>Đăng Ký</h1>
            <div class="register__info ">
                <div class="register__info__item">
                    <label for="" class="">Họ:</label>
                    <input required type="text" v-model="ho">
                </div>
                <div class="register__info__item">
                    <label for="" class="">Tên:</label>
                    <input required type="text" v-model="ten">
                </div>
            </div>
            <div class="register__info ">
                <div class="register__info__item">
                    <label for="" class="">Số điện thoại:</label>
                    <input required maxlength="10" minlength="10" type="text" v-model="sodienthoai">
                </div>
                <div class="register__info__item">
                    <label for="" class="">Giới tính:</label>
                    <select name="" id="" v-model="gioitinh">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
            </div>
            <div class="register__info register__info__item">
                <label for="">Ngày sinh:</label>
                <input required type="date" v-model="ngaysinh" max="2018-12-31">
            </div>
            <div class="register__info ">
                <div class="register__info__item">
                    <label for="" class="">Mật khẩu:</label>
                    <input required type="password" v-model="password">
                </div>
                <div class="register__info__item">
                    <label for="" class="">Xác nhận mật khẩu:</label>
                    <input required type="password" v-model="password_comfirm">
                </div>
            </div>
            <div class="register__info register__info__item">    
                <label for="">Địa chỉ:</label>
                <textarea name="" id="" cols="30" rows="3" v-model="diachi"></textarea>
            </div>
          
            <p class="m-1">
                Bạn đã có tài khoản?
                <router-link to="/login">Đăng nhập</router-link>
            </p>
            
          
            <button class="m-1 btn btn-outline-danger">Đăng ký</button>
        </form>
    </div>
</template>

<script>
import userService from '@/services/user.service'

export default {
    methods: {
        async handleSubmit() {
            const data = {
                ho: this.ho,
                ten: this.ten,
                ngaysinh: this.ngaysinh,
                diachi: this.diachi,
                sodienthoai: this.sodienthoai,
                gioitinh: this.gioitinh,
                password: this.password
            }
            try {
                this.register = await userService.register(data);
                this.message = "thành công.";
            } catch (error) {
                console.log(error);
            }

        }
    },
    data() {
        return {
            ho: '',
            ten: '',
            sodienthoai: '',
            password: '',
            password_comfirm: '',
            email: '',
            diachi:'',
            ngaysinh:'',
            gioitinh: '',
            register: null,
        }
    }
}
</script>

<style>
.register {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background: url('https://www.housedigest.com/img/gallery/how-to-make-custom-wallpaper-using-old-book-pages/l-intro-1660552487.jpg');
}

.register h1{
    font-weight: 700;
    color: var(--color-main);
    font-size: 2.5rem;
    
}

.register form {
    backdrop-filter: blur(8px);
    border-radius: 40px;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid #6a6a6a;
    color: #fff;
}

.register__info {
    display: flex;
    margin-bottom: 10px;
}

.register__info__item {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0 10px;
    color: #fff;
    flex: 1;
}

.register__info__item input, textarea {
    width: 100%;
    border-radius: 15px;
    border: none;
    background-color: rgb(255, 255, 255);
    font-size: 1.2rem;
    padding-left: 10px;
}

.register__info__item select {
    height: 100%;
    border-radius: 15px;
    border: none;
    background-color: rgb(255, 255, 255);
    font-size: 1.2rem;
    padding-left: 10px;
    min-width: 100%;
}

.register form a {
    color: var(--color-main);
}

</style>
