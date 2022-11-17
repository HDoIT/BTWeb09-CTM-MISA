<template>
      <div class="sidebar" :class="{active: isActiveSidebar}">

        <ul class="menu">
            <li><div class="mi mi-icon-dashboard"></div><span class="tooltip">Tổng quan</span></li>
            <li><div class="mi mi-icon-cash"></div><span class="tooltip"> Tiền mặt</span></li>
            <li><div class="mi mi-icon-bank"></div>  <span class="tooltip">Tiền gửi</span></li>
            <li><div class="mi mi-icon-purchase"></div> <span class="tooltip">Mua hàng</span></li>
            <li><div class="mi mi-icon-sale"></div> <span class="tooltip">Bán hàng</span></li>
            <li><div class="mi mi-icon-invoice"></div> <span class="tooltip">Quản lý đơn</span></li>
            <li><div class="mi mi-icon-stock"></div> <span class="tooltip">Kho</span></li>
            <li><div class="mi mi-icon-tool"></div> <span class="tooltip">Công cụ dụng cụ</span></li>
            <li><div class="mi mi-icon-fixed-assets"></div> <span class="tooltip">Tài sản cố định</span></li>
            <li><div class="mi mi-icon-salary"></div> <span class="tooltip">Tiền Lương</span></li>
            <li><div class="mi mi-icon-tax"></div> <span class="tooltip">Thuế</span></li>
            <li><div class="mi mi-icon-price"></div> <span class="tooltip">Giá thành</span></li>
            <li><div class="mi mi-icon-synthetic"></div> <span class="tooltip">Tổng hợp</span></li>
            <li><div class="mi mi-icon-budget"></div> <span class="tooltip">Ngân sách</span></li>
            <li><div class="mi mi-icon-report"></div> <span class="tooltip">Báo cáo</span></li>
            <li><div class="mi mi-icon-analysis"></div> <span class="tooltip">Phân tích tài chính</span></li>
            <li></li>
        </ul>

    </div>
</template>

<script>
export default {
    props:["isActiveSidebar"]
}
</script>

<style>

@import url('../../style/layout/SideBar.css');
@import url('../../style/components/Icon.css');
</style>