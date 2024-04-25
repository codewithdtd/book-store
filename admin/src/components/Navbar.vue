<template>
    <div class="navigation">
        <h1 class="navigation__title">Book</h1>
        <ul class="navigation__link">
            <li class="navigation__link__items">
                <router-link class="navigation__link__items__route" to="/"><i class="ri-dashboard-line"></i> <span>Nhà xuất bản</span></router-link>
            </li>
            <li class="navigation__link__items"><router-link to="/products" class="navigation__link__items__route"><i class="ri-book-line"></i> <span>Sản phẩm</span></router-link></li>
            <li class="navigation__link__items">
                <router-link class="navigation__link__items__route" to="/orders">
                    <i class="ri-bill-line"></i> 
                    <span>Phiếu theo dõi</span>
                </router-link>
            </li>
            <li class="navigation__link__items" @click="userStore.logout()"><a class="navigation__link__items__route"><i class="ri-logout-box-r-line"></i> <span>Đăng xuất</span></a></li>
        </ul>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
export default {
    methods: {
        handleNav() {
            this.active = !this.active;
        }
    },
    data() {
        return {
            active: false,
            userStore: useUserStore(),
        }
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

.navigation {
    height: 97vh;
    /* background: #065038 ; */
    /* background: linear-gradient(to left, #000000, #00432a); */
    background-color: #13407f;
    width: 200px;
    position: sticky;
    top: 0;
    left: 0;
    /* border-radius: 20px; */
    margin-right: 10px;
    transition: 0.5s ease-out;
}

.navigation__title {
    /* font-family: "Satisfy", cursive; */
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
    color: #fff;
    text-align: center;
    padding-top: 10px;
}

.navigation__link {
    list-style: none;
    padding-left: 0;
}
.navigation__link__items {
    margin: 25px 10px;
    border-radius: 15px;
    color: #fff;
}

.navigation__link__items .navigation__link__items__route {
    color: #ffffff;
    display: block;
    margin-left: 0;
    font-size: 1rem;
    padding: 5px;
    font-weight: 400;
    border-radius: 15px;
    border: solid 3px #00000000;
    width: 100%;
    text-decoration: none;
}
.navigation__link__items .navigation__link__items__route i {
    font-size: 1.2rem;
    margin-right: 5px;
}

.navigation__link__items--active {
    /* background-color: #25954e; */
}
.navigation__link__items--active .navigation__link__items__route {
    color: #ffffff;
}

.navigation__link__items .navigation__link__items__route:hover {
    background-color: #4b8be4;
}

.navigation__link__items .router-link-exact-active {
    background-color: #4b8be4;
}


@media screen and (max-width: 815px) {
    .navigation {
        width: 60px;
    }
    .navigation__link__items .navigation__link__items__route span{
        display: none;
    }
    .navigation__link__items i{
        margin-left: 2px;
    }
    .navigation__title {
        font-size: 1.5rem;
    }

    .navigation:hover {
        width: 200px;
    }
    .navigation:hover .navigation__link__items .navigation__link__items__route span{
        display: inline;
    }
}
</style>