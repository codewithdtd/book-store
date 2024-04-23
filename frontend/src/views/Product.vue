<template>
    <div class="products">
        <div class="notification" @click="hideNotify" v-if="message"> 
            <div class="notification__message"><i class="fa-solid fa-circle-check"></i>
                <p>{{ message }}</p>
            </div>
        </div>
        <div class="products__product col-lg-10 col-md-9 col-12">
            <Filter @sort="sort" @filter="filter" @range="range" />
            <div class="products__product__list" v-if="products.length>0">
                <div class="products__product__item col-lg-2 col-3" v-for="item in products">
                    <router-link :to="{ path: '/product/' + item._id}" class="products__product__item__image">
                        <img :src="'http://localhost:3000/static/'+item.hinhanh" alt="" class="">
                    </router-link>
                    
                    <div class="products__product__item__information">
                        <p class="products__product__item__name">{{ item.ten }}</p>
                        <p class="products__product__item__price">{{ item.dongia.toLocaleString() }}</p>
                    </div>
                    <div class="products__product__item__button">
                        <button v-if="item.soluong > 0" @click="addToCart(item)">Mua</button>
                        <button v-else class="btn btn-secondary" disabled>Hết hàng</button>
                        <router-link :to="{ path: '/product/' + item._id}">Xem thêm</router-link>
                    </div>
                </div>
            </div>
            <div class="products__product__list row m-2" v-else>Không có sản phẩm nào</div>         
        </div>
    </div>
</template>

<script>
import ProductsService from "@/services/book.service";
import userService from "@/services/user.service";
import { useUserStore } from "@/stores/userStore";
import Filter from "@/components/Filter.vue";
export default {
    components: {
        Filter,
    },
    async mounted() {
        this.products = await ProductsService.getAll();
    },
    data() {
        return {
            products: [],
            message: '',
        }
    },
    methods: {
        async addToCart(data) {
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                this.$router.push('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
                }
            }
            else {
                const { _id, dongia, ten, hinhanh } = data;
                const filterData = { _id, dongia, ten, hinhanh }

                const success = await userService.addCart(filterData)
                if(!success.message){
                    this.message = "Thành công"
                }
                else this.message = "Thất bại"
            }
        },
        hideNotify() {
            this.message = ''
        },
        async sort(data) {
            if (data == 'asc') 
                this.products = this.products.sort((a, b) => a.dongia - b.dongia)
            else if (data == 'desc')
                this.products = this.products.sort((a, b) => b.dongia - a.dongia)
            else 
                this.products = await ProductsService.getAll();
        },   
        async filter(data) {
            // this.products = data != '' ? await productsService.getByCategory(data): await productsService.getAll();    
        },
        async range(data) {
            this.products = await ProductsService.getAll();
            this.products = this.book.filter(item => item.dongia <= data)
        }  
    }
}   
</script>

<style>

.products {
    height: fit-content;
    min-height: 100vh;
    position: relative;
    background: #e6e6e6d7;    
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.products__product__list {
    display: flex;
    flex-wrap: wrap;
}

.products__product__item {
    height: 40vh;
    background-color: rgb(255, 255, 255);
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 10px 4%;
}

.products__product__item:hover {
    background-color: #bde2ff;
    transform: translateY(-5px);
    transition: .4s ease;
}

.products__product__item__image {
    height: 65%;
    overflow: hidden;
}

.products__product__item__image img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.products__product__item__information {
    flex-grow: 1;
    text-align: center;
    margin: 0 5px;
}
.products__product__item__information p {
    margin: 0;
    font-size: 0.9rem;
}

.products__product__item__name {
    font-weight: 600;
    overflow: hidden;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #000000;
    padding: 5px 0;
}

.products__product__item__price {
    color: var(--color-main);
}

.products__product__item__button {
    margin: 5px;
    display: flex;
    justify-content: space-around;
}

.products__product__item__button button {
    background-color: var(--color-main);
    border-radius: 8px;
    width: 50%;
    font-weight: 600;
    color: #ffffff;
    padding: 5px;
    border: none;
}

.products__product__item__button button:hover {
    background-color: #1da6c8;
    /* color: #484848; */
    border: 1px solid #fff;
}
.products__product__item__button a {
    font-size: 0.7rem;
    align-self: end;
    color: var(--color-main);
}

.notification {
    position: absolute;
    background-color: #00000072;
    border: 2px solid #000000;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    color: #00a933;
    display: flex;
    opacity: 1;
    z-index: 1;
    transition: opacity 0.5s ease;;
    top: 0;
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



</style>