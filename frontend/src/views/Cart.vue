<template>
    <Notification :message="message" />
    <h1 class="cart__title" id="cart__title">GIỎ HÀNG</h1>
    <div class="cart row col-12">
        <div class="cart__body col-lg-8" v-if="userStore.cart.length > 0">
            <div v-for="item in userStore.cart" :key="item._id" class="cart__body__item row col-sm-11">
                <div class="cart__body__item__image col-sm-2">
                    <img :src="'http://localhost:3000/static/'+item.sach.hinhanh" alt="">
                </div>
                <div class="cart__body__item__name col-sm-3">
                    <p>{{ item.sach.ten }}</p>
                </div>
                <div class="cart__body__item__quanlity col-sm-2">
                    <input type="number" min="1" @focusout="update(item)" v-model="item.soluong">
                    <p v-if="message">{{ message }}</p>
                </div>
                <div class="cart__body__item__price col-sm-3 text-center">{{ item.gia.toLocaleString() }}</div>
                <div class="cart__body__item__action col-sm-2">
                    <!-- <button class="btn btn-outline-warning" @click="update(item)">Cập nhật</button> -->
                    <i class="fa-solid fa-x btn btn-danger" @click="deleteCart(item)"></i>
                </div>
            </div>
        </div>
        <div v-else class="cart__body__item row col-md-8">Chưa có sản phẩm nào trong giỏ hàng</div>
        <Payment :total="total" @showNotify="showNotify"/>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';
import Payment from '../components/Payment.vue';
import Notification from '../components/Notification.vue'
export default {
    components: {
        Payment, Notification
    },
    created() {
        this.getCart();
    },
    methods: {
        async getCart() {
            if(this.userStore.login) {
                this.userStore.cart = await userService.getCart()
                this.cart =  this.userStore.cart.map(item => item.dongia)
                this.total = this.cart.reduce((acc, price) => {
                    return acc+price;
                },0);
            }
        },
        async update(payload) {
            const updated = await userService.updateCart(payload)
            if(!updated.message)
                this.getCart()
            else 
                this.message = updated.message
        },
        async deleteCart(data) {
            const deleted = await userService.deleteCart(data._id)
            if(deleted)
                this.getCart()
            else 
                this.message = "Không thể xóa"
        },
        showNotify(message) {
            this.message = message
        }
    },
    data() {
        return {
            total: 0,
            message: '',
            cart: [],
            userStore: useUserStore(),
        }
    }
}
</script>

<style>
.cart {
    height: fit-content;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    color: #000000;
    /* position: relative; */

}
#cart__title {
    text-align: center;
    color: var(--color-main);

    height: fit-content;
    font-size: 2.5rem;
    padding: 10px; 
    margin: 0;
}

.cart .cart__body__item {
    height: 25vh;
    align-items: center;
    border-bottom: 3px solid #00000092 ;
    border-top: 3px solid #00000092 ;
    margin: 0 auto;
    /* border-radius: 5px; */
    /* margin-bottom: 10px; */
}
.cart .cart__body__item__image {
    height: 90%;
    overflow: hidden;
    margin: auto;
    display: flex;
}

.cart .cart__body__item__image img {
    width: 100%;
    align-self: center;
}

.cart__body__item__quanlity {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.cart__body__item__quanlity p {
    margin: 0;
}

.cart__body__item__quanlity input {
    max-width: 40px;
}

.cart__body__item__quanlity button {
    border: none;
    border-radius: 4px;
}

.cart__body__item__action {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

</style>