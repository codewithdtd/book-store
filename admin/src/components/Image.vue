<template>
    <div class="image">
        <img :src="`http://localhost:3000/static/`+src" alt="">
    </div>
</template>
<script>
export default {
    props: [ "src" ],
}
</script>
<style scoped>
.image {
    width: 80px;
    height: 80px;
    background: none;
    margin: auto;
}

.image img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
}

</style>
