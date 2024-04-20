<template>
    <footer>
        <div class="footer">
            <p>&copy; 2024 - Book Store</p>
            <ul>
                <li>Địa chỉ: thành phố Cần Thơ, Việt Nam</li>
                <li>Email: web@project.com</li>
                <li>Số điện thoại: 0911 222 333</li>
            </ul>
        </div>
    </footer>
</template>
<style>
.footer {
    background-color: var(--color-background);
    align-items: center;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    color: #000000;
    box-shadow: rgba(0, 0, 0, 0.4) 1px 2px 10px 2px;
}

.footer ul {
    list-style: none;
    margin-top: 10px
}
.footer li {
    margin: 10px;
}

</style>