<template>
   <div class="header row">
        <div class="header__logo col-auto">
            <router-link to="/" class="header__logo__title">
                Books Store
            </router-link>
        </div>
        <div class="header__button col-auto">
            <div class="header__function__item header__function__cart">
                <router-link to="/cart">
                    <i class="fa-solid fa-bag-shopping header__icon__cart"></i>
                </router-link>
            </div>
            <div class="header__function__item header__function__bar" @click="handleNav">
                <i class="fa-solid fa-bars "></i>
            </div>
        </div>

        <div class="header__menu col-md-10 col-sm-5 row" :class="{ 'header__menu--active': showNav}">
            <div class="header__navbar col-md-6">
                <router-link to="/" class="header__navbar__link">Trang chủ</router-link>
                <router-link to="/product" class="header__navbar__link">Sách</router-link>
                <router-link to="/about" class="header__navbar__link">Giới thiệu</router-link>
            </div>
                
            <div class="header__function col-md-6 justify-content-end">
                <Search />
                <div class="header__function__item header__function__cart">
                    <router-link to="/cart">
                        <i class="fa-solid fa-bag-shopping header__icon__cart"></i>
                    </router-link>
                </div>
                
                <div v-if="!userStore.login" class="header__function__item header__function__info">
                    <router-link to="/register">
                        <button class="btn btn-outline-info">Đăng ký</button>
                    </router-link>
                    <router-link to="/login">
                        <button class="btn btn-info">Đăng nhập</button>
                    </router-link>
                </div>
                <div v-else class="header__function__item header__function__info header__function__info--auth">
                    <p><i class="fa-regular fa-user"></i>{{ userStore.user.ho +' '+ userStore.user.ten }}</p>
                    <div class="header__function__info__nav">
                        <router-link to="/order">Đơn hàng</router-link>
                        <button class="btn btn-outline-info" @click="userStore.logout()"><i class="fa-solid fa-right-from-bracket"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import Search from './Search.vue';
import { useUserStore } from '@/stores/userStore';

export default {
    components: { Search },
    created() {
        this.getUser();
    },
    data() {
        return {
            showNav: false,
            userStore: useUserStore(),
            user: {},
            search: '',
        };
    },
    methods: {
        handleNav() {
            this.showNav = !this.showNav;
        },
        async getUser() {
            if(this.userStore.login) {
                this.user = await userService.get(this.userStore.user.id);
            }
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

.header {
    background-color: var(--color-background);
    align-items: center;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 8px 0px;
    z-index: 1;
    width: calc(100% + 12px);
    /* height: 100px; */
}
.header__logo {
    padding: 15px;
    margin-left: 10px;
}
.header__logo__title {
    font-family: "Satisfy", cursive;
    font-size: 1.8rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-main);
}

.header__navbar {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 0 100px; */
}

.header__navbar a {
    font-size: 1rem;
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-weight: 600;
    padding: 5px;
    position: relative;
}

.header__navbar a::before {
    height: 3px;
    background: var(--color-main);
    content: " ";
    width: 0%;
    left: 1px;
    bottom: 3px;
    position: absolute;
    transition: ease 0.2s;
}
.header__navbar a:hover::before{
    width: 100%;
    /* background-color: #fff; */
}
.header__navbar a:hover {
    color: var(--color-main);
}

.header__navbar .router-link-exact-active {
    color: var(--color-main);
}
.header__navbar .router-link-exact-active::before {
    color: var(--color-main);
    width: 100%;
} 



.header__icon__cart {
    text-decoration: none;
    color: #222;
    font-size: 1.5rem;
    border-radius: 50%;
    margin-right: 15px;
}

.header__icon__cart:hover {
    color: var(--color-main);
}

.header__function {
    display: flex;
    justify-content: end;
    align-items: center;
}
.header__menu {
    flex-grow: 1;
}

.header__function__info--auth {
    display: flex;
    color: #222;
    align-items: center;
    padding-right: 10px;
    position: relative;
}
.header__function__info p{
    margin: auto;
    margin-right: 10px;
    padding: 5px;
    border-radius: 10px;
}

.header__function__info button {
    /* background-color: var(--color-main); */
    border-radius: 20px;
    margin-right: 8px;
}


.header__function__info .header__function__info__nav {
    position: absolute;
    top: 100%;
    background-color: var(--color-background);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 80%;
    display: none;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.header__function__info:hover .header__function__info__nav {
    display: block;
}

.header__function__info .header__function__info__nav a {
    display: block;
    width: 80%;
    color: #222;
    margin: 5px 10px;
    text-decoration: none;
}

.header__function__info .header__function__info__nav a:hover {
    background-color: #d3d3d3;
}
.header .header__button {
    display: none;
}
.fa-regular {
    border: 2px solid #222;
    margin-right: 5px;
    padding: 5px;
    border-radius: 50%;
}

@media only screen and (max-width: 790px) {
    .header {
        position: sticky;
    }
    .header .header__menu {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: var(--color-background);
        flex-direction: column;
        align-items: end;
        padding: 20px;
        box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
        display: none;
    }
    .header__navbar, .header__function {
        flex-direction: column;
        align-items: start;
    }
    .header__navbar {
        justify-content: center;
    }

    .header__function__cart {
        display: none;
    }

    .header__function{
        align-items: center;
    }

    .header__function__item {
        padding-top: 15px;
        text-align: center;
    }
    
    .header .header__button {
        /* margin-right: 20px; */
        color: #222;
        font-size: 1.4rem;
        cursor: pointer;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header__button .header__function__item {
        padding: 0;
        margin-left: 10px;
        display: block;
    }

    .header__button .header__function__item.header__function__bar {
        padding: 4px 11px;
        border-radius: 7px;
    }

    .header .header__button .header__function__bar:hover {
        background-color: #c7deff;
    } 

    .header__navbar a {
        padding-bottom: 20px;
        width: 100%;
    }

    .header__navbar a:hover {
        background-color: #e3edfb;
    }

    .header .header__menu--active {
        display: block;
        z-index: 1;
    }
    .header__function__search {
        min-width: 100%;
    }

}

</style>