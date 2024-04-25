<template>
    <div class="filter">
        <div class="filter__price">
            Sắp xếp giá:
            <select @change="handleSort" v-model="sort">
                <option :value="''">Mặc định</option>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>
        </div>
        <div class="filter__range">
            Mức giá: 0
            <input @change="filterPrice" class="" type="range" v-model="price" min="0" max="100000"> {{ formatPrice }} VNĐ
        </div>
    </div>
</template>
<script>
import menuService from "@/services/book.service";

export default {
    computed: {
        formatPrice() {
            return parseInt(this.price).toLocaleString();
        }
    },
    methods: {
        async handleSort() {
            this.$emit('sort', this.sort);
        },
        async filterPrice() {
            this.$emit('range', this.price);
        }
    },
    data() {
        return {
            sort: '',
            price: 0,
        }
    },
}
</script>
<style>
.filter {
    background-color: rgba(70, 70, 70, 0.737);
    backdrop-filter: blur(10px);
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    border-radius: 5px;
    justify-content: space-around;
    color: #fff;
    text-align: center;
}

.filter select {
    padding: 2px;
    border-radius: 5px;
}

</style>