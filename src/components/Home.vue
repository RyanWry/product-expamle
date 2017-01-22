<template>
    <div>
        <div id="swiper" class="swiper">
            <div class="swiper-slides"></div>
        </div>

        <div class="products" v-cloak>
            <div v-for="item in products" class="product">
                <img :src="item.Picture" class="product-pic">
                <div class="product-info">
                    <div>{{item.Title}}</div>
                    <div class="product-btn">
                        <div class="button">详情</div>
                        <div class="button">购买</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import Swiper from  '../lib/swiper';

    export default{
        name: 'Home',
        data(){
            return {
                products: []
            }
        },
        created(){
            this.$http.get('/banners').then(response => {
                new Swiper(response.data);
            }, err=> {
                new Swiper(['http://jiepai-1.img-cn-hangzhou.aliyuncs.com//media/6crSw7KA2nM5ntYatDaFipT2bdxSf8EP1484711324833.jpg',
                    'http://image.jiepaiapp.com/media/EDw42zMRniykMiP4tCNGPTpkz3rBQhWZ1484711172824.jpg',
                    'http://image.jiepaiapp.com/media/fJHiyC2YhatSSS3P5jsMcjjHCiybHJBC1483928809304.jpg']);
            });

            this.$http.get('/products').then(response=> {
                this.products = response.data;
            }, err=> {
                this.products = []
            })
        }
    }
</script>
<style>

    .swiper {
        position: relative;
        overflow: hidden;
    }

    .swiper > .swiper-slides {
        position: relative;
        height: 100%;
        overflow: hidden;
    }

    .swiper > .swiper-slides > .swiper-slide {
        position: relative;
        float: left;
        height: 100%;
        text-align: center;
    }

    .swiper > .swiper-slides > .swiper-slide > .swiper-slide-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
    }

    .products {
        margin-top: 20px;
    }

    .products > .product {
        background: white;
        margin: 10px 0;
        padding: 10px;
    }

    .products > .product > .product-pic {
        display: inline-block;
        width: 20%;
        vertical-align: middle;
    }

    .products > .product > .product-info {
        width: 77%;
        display: inline-block;
        vertical-align: middle;
    }

    .products > .product > .product-info > .product-btn {
        float: right;
        margin-top: 10px;
    }

    .button {
        background: rgba(0, 0, 0, 0.5);
        height: 27px;
        line-height: 27px;
        font-size: 12px;
        padding: 0 10px;
        border-radius: 4px;
        color: white;
        display: inline-block;
        cursor: pointer;
    }
</style>