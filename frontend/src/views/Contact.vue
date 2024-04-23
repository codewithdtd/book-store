<template>
    <div class="contact">
        <h1>Liên hệ</h1>
            <p>Nếu có bất kỳ phản hồi hay thắc mắc vui lòng liên hệ với chúng tôi:</p>
            <p><strong>Email:</strong> tdachef@project.com</p>
            <p><strong>Số điện thoại:</strong></p>
            <div>
                <p>0111 222 333 - Quản lý</p>
                <p>0999 222 333 - Phó quản lý</p>
                <p>0999 222 333 - Giám sát nhà hàng</p>
            </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.contact {
    height: 100vh;
    color: #fff;
    text-align: center;
    /* background: url(../assets/bg.jpg); */
    background: #000000d7;    
}

.contact h1 {
    padding-top: 20px;
    font-family: "Dancing Script", cursive;
    color: var(--color-main);
    font-size: 2.7rem;
}

.contact p {
    width: fit-content;
    margin: auto;
    background: #00000040;
}
</style>