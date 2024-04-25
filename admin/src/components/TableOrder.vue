<template>
    <div class="header__search">
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Tìm kiếm" v-model="search" @keyup="getAllProduct">
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-3">MÃ PHIẾU</div>
            <div class="table__title__item col-sm-2">
                TÊN KHÁCH HÀNG
            </div>
            <div class="table__title__item col-sm-1">TỔNG TIỀN
               
            </div>
            <div class="table__title__item col-sm-1">NGÀY MƯỢN</div>
            <div class="table__title__item col-sm-1">NGÀY TRẢ</div>
            <div class="table__title__item col-sm-2">TRẠNG THÁI</div>
            <div class="table__title__item col-sm-1"></div>

        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-3">{{ item._id }}</div>
            <div class="table__list__item col-sm-2">
                {{ item.docgia.ho+' '+item.docgia.ten }}
            </div>
            <div class="table__list__item col-sm-1">{{ item.tongtien.toLocaleString() }}</div>
            <div class="table__list__item col-sm-1">{{ item.ngaymuon }}</div>
            <div class="table__list__item col-sm-1">{{ item.ngaytra }}</div>
            <div v-if="item.trangthai == 'Đã trả'" class="table__list__item col-sm-2 text-success">
                {{ item.trangthai }}
            </div>
            <div v-else-if="item.trangthai == 'Quá hạn'" class="table__list__item col-sm-2 text-danger">
                {{ item.trangthai }}
            </div>
            <div v-else class="table__list__item col-sm-2 text-primary">
                {{ item.trangthai }}
            </div>
            <div class="table__list__item col-sm-1">
                <i class="ri-pencil-line" @click="handleEmit(item)"></i>
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
            this.getAllOrder();
        }
    },
    mounted() {
        this.getAllOrder()
    },
    computed: {
        productStrings() {
            return this.list.map((product) => {
                const { ho, ten, diachi, sodienthoai } = product.docgia;
                const { ngaymuon, ngaytra, trangthai, _id } = product;
                return [ten, ho,diachi, _id, sodienthoai, trangthai, ngaymuon, ngaytra ].join(" ").toUpperCase();
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
        async getAllOrder() {
            this.list = await StaffService.getAllOrder();
            if(this.search != '') {
                this.list = this.filteredProducts;
            }
        },
        handleEmit(product) {
            this.$emit('edit', product);
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
<style scoped>
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
    font-size: 0.9rem;
    text-wrap: wrap;
}

.table__list__item i {
    color: #161eff;
    font-size: 1.3rem;
    padding: 7px;
    border-radius: 50%;
}

.table__list__item i:hover {
    background-color: #c0c0c0;
    cursor: pointer;
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



</style>

  