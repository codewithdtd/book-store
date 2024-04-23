<template>
    <div class="detail">
        <Notification :message="message" />
       <div v-if="item" class="col-sm-11 row">
        <div class="detail__image col-sm-6">
            <img :src="'http://localhost:3000/static/'+item.hinhanh" alt="">
        </div>
        <div class="detail__info col-sm-6">
            <h3 class="detail__name">{{ item.ten }}</h3>
            <p>{{ item.mota }}</p>
            <p>Giá: {{ item.dongia.toLocaleString() }}</p>
            <p>Số lượng còn lại: {{ item.soluong }}</p>
            <input type="number" min="1" v-model="quanlity">
            <button class="btn btn-info" @click="addToCart(this.item)">Thêm vào giỏ hàng</button>
        </div>
       </div>
       <p v-else>Không có sản phẩm</p>
    </div>
</template>
<script>
import ProductService from '@/services/book.service';
import userService from '@/services/user.service';
import Notification from '@/components/Notification.vue';
import { useUserStore } from '@/stores/userStore';
export default {
    // mounted() {
    //     this.getItem();
    // },
    components: {
        Notification
    },
    watch: {
        '$route.params.id': {
            immediate: true, 
            handler(newId, oldId) {
                this.getItem(); 
            }
        }
    },
    methods: {
        async getItem() {
            this.item = await ProductService.getOne(this.$route.params.id);
        },
         async addToCart(data) {
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                this.$router.push('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
                }
            } else {
                const { _id, dongia, ten, hinhanh } = data;
                const quanlity = {soluong: this.quanlity};
                const filterData = { _id, dongia, ten, hinhanh, ...quanlity};


                const success = await userService.addCart(filterData)
                if(!success.message){
                    this.message = "Thành công"
                }
                else this.message = "Thất bại"
            }
        },
        hideNotify() {
            this.message = ''
        }
    },
    data() {
        return {
            item: '',
            quanlity: 1,
            message: ''
        }
    }
}
</script>

<style>
.detail {
    min-height: 100vh;
    height: fit-content;
    justify-content: center;
    display: flex;
    padding-top: 50px;
    color: #000000;
    background-size: cover;
    background-repeat: no-repeat;
}

.detail__image img {
    max-width: 80%;
    max-height: 70%;
}

.detail__info input{
    max-width: 50px;
}

</style>