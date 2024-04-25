<template>
    <div class="header__search">
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Tìm kiếm" v-model="search" @keyup="getAllProduct">
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-3">MÃ</div>
            <div class="table__title__item col-sm-3">
                TÊN
            </div>
            <div class="table__title__item col-sm-3">ĐỊA CHỈ
               
            </div>
            <div class="table__title__item col-sm-2"></div>

        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-3">{{ item._id }}</div>
            <div class="table__list__item col-sm-3">
                {{ item.ten }}
            </div>
            <div class="table__list__item col-sm-3">
                {{ item.diachi }}
            </div>

            <div class="table__list__item col-sm-1">
                <i class="ri-pencil-line" @click="handleEmit(item)"></i>
            </div>
            <div class=" table__list__item table__list__item--delete col-sm-1">
                <i class="ri-delete-bin-2-line table__icon" @click="confirmDelete(item)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import StaffService from '@/services/staff.service.js'
export default {
    props: [
        "nameTable"
    ],
    watch: {
        list(newValue) {
            this.getAllPublisher();
        }
    },
    mounted() {
        this.getAllPublisher()
    },
    computed: {
        productStrings() {
            return this.list.map((product) => {
                const { ten, diachi } = product;
                return [ten, diachi].join(" ").toUpperCase();
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
        async getAllPublisher() {
            this.list = await StaffService.getAllPublisher();
            this.list = this.list.filter(item => item.deleted != 1);
            if(this.search != '') {
                this.list = this.filteredProducts;
            }
        },
        handleEmit(publisher) {
            this.$emit('edit', publisher);
        },
        confirmDelete(publisher) {
            if (window.confirm('Are you sure you want to delete this publisher?')) {
                this.handleDelete(publisher);
            }
        },
        async handleDelete(publisher) {
            const data = {
                _id: publisher._id,
                ten: publisher.ten,
                diachi: publisher.diachi
            }
            console.log(data)
            if (await StaffService.deletePublisher(data)) 
                this.getAllPublisher();
        },
    },
    data() {
        return {
            list: [],
            search: ''
        }
    }
}


</script>