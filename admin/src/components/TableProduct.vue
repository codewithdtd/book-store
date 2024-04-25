<template>
    <div class="header__search">
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Tìm kiếm" v-model="search" @keyup="getAllProduct">
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-2">HÌNH ẢNH</div>
            <div class="table__title__item col-sm-2">
                TÊN
            </div>
            <div class="table__title__item col-sm-2">GIÁ
                
            </div>
            <div class="table__title__item col-sm-2">SỐ LƯỢNG

            </div>
            <div class="table__title__item col-sm-2"></div>
        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-2"><Image :src="item.hinhanh" /></div>
            <div class="table__list__item col-sm-2">{{ item.ten }} <br> {{ item.category }}</div>
            <div class="table__list__item col-sm-2">{{ item.dongia }}</div>
            <div class="table__list__item col-sm-2">{{ item.soluong }}</div>
            <div class="table__list__item table__list__item--edit col-sm-1">
                <i class="ri-edit-line table__icon" @click="handleEmit(item)"></i>
            </div>
            <div class=" table__list__item table__list__item--delete col-sm-1">
                <i class="ri-delete-bin-2-line table__icon" @click="confirmDelete(item)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import Image from '@/components/Image.vue';
import ProductService from '@/services/product.service.js'
import router from '@/router';
export default {
    props: [
        "nameTable",
    ],
    mounted() {
        this.getAllProduct();
        // this.query = this.$route.query.search;
    },
    components: {
        Image
    },
    watch: {
        list(newValue) {
            this.getAllProduct();
        },
    },
    emits: ['edit'],
    computed: {
        productStrings() {
            return this.list.map((product) => {
                const { ten, tacgia, mota, nhaxuatban } = product;
                return [ten, tacgia, mota, nhaxuatban].join(" ").toUpperCase();
            });
        },
        filteredProducts() {
            if (this.search == '') return this.list;
            return this.list.filter((_products, index) =>
                    this.productStrings[index].includes(this.search.toUpperCase())
            );
        },
    },
    methods: {
        async getAllProduct() {
            this.list = await ProductService.getAll();
            this.list = this.list.filter(item => item.deleted == 0);

            if(this.search != '') {
                this.list = this.filteredProducts;
            }
        },
        handleSort(item) {
            if(item == 'name') {
                this.sort_name = !this.sort_name;
                this.sort_price = false;
                this.sort_quantity = false;
            }
            if(item == 'price') {
                this.sort_price = !this.sort_price;
                this.sort_name = false;
                this.sort_quantity = false;
            }
            if(item == 'quantity') {
                this.sort_quantity = !this.sort_quantity;
                this.sort_price = false;
                this.sort_name = false;
            }
        },
        handleEmit(product) {
            this.$emit('edit', product);
        },
        confirmDelete(product) {
            if (window.confirm('Are you sure you want to delete this product?')) {
                this.deleteProduct(product);
            }
        },
        async handleDelete(product) {
            console.log(product)
            if (await ProductService.deleteProduct(product)) 
                this.getAllProduct();
        },
    },
    data() {
        return {
            list: [],
            sort_name: false,
            sort_price: false,
            sort_quantity: false,
            search: '',
            query: '',
        }
    }
}


</script>
<style>
.tables {
    flex-grow: 1;
    background-color: #ffffff;
    border: 2px solid;
    border-radius: 15px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
    text-align: center;
    margin-top: 40px;
    margin-right: 10px;
}

.table__name {
    background: linear-gradient(to right, #13407f, rgb(72, 105, 187)) ;
    position: relative;
    height: 80px;
    /* width: 90%; */
    margin: 0 5px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    top: -40px;
    text-align: start;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-weight: 600;
    font-size: 1.2rem;
    color: #fff;
}

.table__title {
    font-weight: 700;
    color: #525252;
    font-size: 0.8rem;
    /* border-bottom: 2px solid; */
    padding-bottom: 15px;
}
.table__title__item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.table__list {
    height: 100px;
    color: #000000;
    border-top: 2px solid;
    display: flex;
    align-items: center;
}

.table__list__item i {
    color: var(--color-main);
    font-size: 1.3rem;
    padding: 7px;
    border-radius: 50%;
}

.table__list__item i:hover {
    background-color: #cdd8ff;
    cursor: pointer;
}

.table__list__item--edit i {
    color: var(--color-main);
}

.table__list__item--delete i {
    color: rgb(195, 44, 44);
}

.table .filter {
    display: flex;
    flex-direction: column;
    padding: 0;
}

.table .filter i {
    font-size: 1rem;
    font-weight: 900;
    color: #c4ffba;
    padding-left: 0px;
}

.header__search {
    background-color: white;
    padding: 0 4px;
    border-radius: 7px;
    width: fit-content;
}

.header__search input {
    outline: none;
    border: none;
}


</style>

  