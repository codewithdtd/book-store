<template>
    <div @keyup.enter="searchBook" class="header__function__search col-sm-5">
        <button>
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" class="search__input" placeholder="tìm kiếm" v-model="search" @keyup="searchBook">
        <span v-if="search" @click="this.search = ''">x</span>
        <div class="search__response" v-if="this.search">
            <p v-for="item in filteredProducts" :key="item">
                <router-link @click="this.search = ''" :to="{name: 'DetailProduct', params: { id: item._id }}">{{ item.ten }}</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import ProductService from '@/services/book.service';
import router from '@/router';
export default {
    async mounted() {
        this.book = await ProductService.getAll();
    },
    computed: {
        productStrings() {
            return this.book.map((product) => {
                const { ten, tacgia, mota, nhaxuatban } = product;
                return [ten, tacgia, mota, nhaxuatban].join(" ").toUpperCase();
            });
        },
        filteredProducts() {
            if (!this.search) return this.book;
            return this.book.filter((_book, index) =>
                    this.productStrings[index].includes(this.search.toUpperCase())
            // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
            );
        },
    },
    methods: {
        searchBook(event) {
            if(event.key === 'Enter')
                router.push('/product?search='+this.search)
            // if(this.search == '')
        },
    },
    data() {
        return {
            book: [],
            search_res: '', 
            search: '',
        }
    },
}
</script>

<style> 
.header__function__search input {
    width: 70%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-left: 10px;
    border: none;
    height: 35px;
    background-color: #d2d2d2;
    outline: none;
    padding-right: 18%;
}

.header__function__search span {
    /* background-color: #d2d2d2; */
    font-size: 1.4rem;
    font-weight: 300;
    right: 11%;
    position: absolute;
    /* background-color: aqua; */
    color: #5a5959;
    width: 30px;
    text-align: center;
}

.header__function__search span:hover {
    background-color: #9b9b9b;
    border-radius: 50%;
    cursor: pointer;
}

.header__function__search button {
    width: 20%;
    height: 35px;
    border: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: #d2d2d2;
    padding: 0;
}
.header__function__search {
    position: relative;
}

.search__response {
    max-height: 200px;
    width: 90%;
    background-color: #fff;
    position: absolute;
    z-index: 1;
    margin: 0;
    border-radius: 10px;
}

.search__response p {
    margin: 5px;
}

.search__response a {
    text-decoration: none;
    color: #333;
    display: block;
}
.search__response a:hover {
    background-color: rgb(220, 220, 220);
}

</style>