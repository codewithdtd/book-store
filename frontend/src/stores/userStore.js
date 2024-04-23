import { defineStore } from "pinia";
import userService from "@/services/user.service";
import router from "@/router";
export const useUserStore = defineStore('userStore', {
    state:() => ({
        user: null,
        login: false,
        cart: [],
    }),
    getters: {

    },
    actions: {
        setUser(data) {
            this.user = data 
            this.login = true
            // console.log(this.user)
        },
        async logout() {
            this.user = null;
            this.login = false;
            this.cart = [];
            await userService.logout(); 
            await router.push("/");
            // Xóa dữ liệu trong session storage ở đây
        }
    },
    persist: {
        enabled: true,
    }
})