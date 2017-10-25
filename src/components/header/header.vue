<template>
	<div class='loading'>
		<div class="content_wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<!--v-if="seller.supports"判断一下可以不报错-->
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support_count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin_wrapper" @click="showDetail">
			<span class="bulletin_title"></span><span class="bulletin_text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%" />
		</div>
		<transition name="slide-fade">
			<div v-show="detailShow" class="detail">
				<div class="detail_wrapper clearfix">
					<div class="detail_main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star_wrapper">
							<!--star组件-->
							<v-star :size="48" :score="seller.score"></v-star>
						</div>
						<!--title-->
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports2">
							<li class="support_item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin2">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail_close" @click="hideDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	import vStar from '@/components/star/star'
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false
			}
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hideDetail() {
				this.detailShow = false;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		},
		components: {
			vStar
		}
	}
</script>
<style type="text/css" scoped>
	/*.slide-fade-enter-active{
		transition: all .3s ease;
		opacity: 1;
		background: rgba(7,17,27,0.8);
	}
	.slide-fade-enter-active,.slide-fade-leave-active{
		opacity: 0;
		background: rgba(7,17,27,0);
	}*/
	
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	
	.slide-fade-leave-active {
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	
	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateX(10px);
		opacity: 0;
	}
	
	.loading {
		position: relative;
		color: #fff;
		background: rgba(7, 17, 27, 0.5);
		overflow: hidden;
	}
	
	.content_wrapper {
		position: relative;
		padding: 24px 12px 18px 24px;
		font-size: 0;
		/*inline-block两个元素之间的缝隙用父元素font-size:0解决*/
	}
	
	.avatar {
		display: inline-block;
		vertical-align: top;
	}
	
	.avatar img {
		border-radius: 2px;
	}
	
	.content {
		display: inline-block;
		margin-left: 16px;
	}
	
	.title {
		margin: 2px 0 8px 0;
	}
	
	.brand {
		display: inline-block;
		vertical-align: top;
		width: 30px;
		height: 18px;
		background: url(brand@2x.png) no-repeat;
		background-size: 30px 18px;
	}
	
	.name {
		font-size: 16px;
		margin-left: 6px;
		line-height: 18px;
		font-weight: bold;
	}
	
	.star_wrapper {
		margin-top: 18px;
		padding: 2px 0;
		text-align: center;
	}
	
	.detail_main .title {
		display: flex;
		width: 80%;
		margin: 28px auto 24px auto;
	}
	
	.detail_main .title .line {
		flex: 1;
		position: relative;
		top: -6px;
		border-bottom: solid 1px rgba(255, 255, 255, 0.2);
	}
	
	.detail_main .title .text {
		padding: 0 12px;
		font-weight: 700;
		font-size: 14px;
	}
	
	.detail_main .supports {
		width: 80%;
		margin: 0 auto;
	}
	
	.detail_main .supports .support_item {
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	
	.detail_main .supports .support_item:last-child(1) {
		margin-bottom: 0;
	}
	
	.supports2 .icon {
		display: inline-block;
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
	}
	
	.description {
		margin-bottom: 10px;
		line-height: 12px;
		font-size: 12px;
	}
	
	.supports .icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size: 12px 12px;
		vertical-align: top;
	}
	
	.supports2 {
		width: 80%;
		margin: 0 auto;
	}
	
	.supports2 .support_item {
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;
	}
	
	.supports2 .support_item:last-child(1) {
		margin-bottom: 0;
	}
	
	.supports2 .support_item .icon {
		width: 16px;
		height: 16px;
		vertical-align: top;
		margin-right: 6px;
		background-size: 16px 16px;
	}
	
	.supports2 .support_item .text {
		line-height: 16px;
		font-size: 12px;
	}
	
	.supports2 .support_item .decrease {
		background: url(decrease_2@2x.png) no-repeat;
		background-size: 16px 16px;
	}
	
	.supports2 .support_item .discount {
		background: url(discount_2@2x.png) no-repeat;
		background-size: 16px 16px;
	}
	
	.supports2 .support_item .guarantee {
		background: url(guarantee_2@2x.png) no-repeat;
		background-size: 16px 16px;
	}
	
	.supports2 .support_item .invoice {
		background: url(invoice_2@2x.png) no-repeat;
		background-size: 16px 16px;
	}
	
	.supports2 .support_item .special {
		background: url(special_2@2x.png) no-repeat;
		background-size: 16px 16px;
	}
	
	.bulletin2 {
		width: 80%;
		margin: 0 auto;
	}
	
	.bulletin2 .content {
		padding: 0 12px;
		line-height: 24px;
		font-size: 12px;
	}
	
	.supports .decrease {
		background: url(decrease_1@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	
	.supports .discount {
		background: url(discount_1@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	
	.supports .guarantee {
		background: url(guarantee_1@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	
	.supports .invoice {
		background: url(invoice_1@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	
	.supports .special {
		background: url(special_1@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	
	.supports .text {
		line-height: 12px;
		font-size: 10px;
	}
	
	.support_count {
		position: absolute;
		right: 12px;
		bottom: 16px;
		padding: 0 8px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background: rgba(0, 0, 0, 0.2);
		text-align: center;
	}
	
	.support_count .count {
		vertical-align: top;
		font-size: 10px;
	}
	
	.support_count .icon-keyboard_arrow_right {
		margin-left: 2px;
		line-height: 24px;
		font-size: 10px;
	}
	
	.bulletin_wrapper {
		position: relative;
		/*font-size: 0;*/
		/*此处这种方法影响了省略号的显示*/
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background: rgba(7, 17, 27, 0.2);
	}
	
	.bulletin_title {
		margin-top: 8px;
		display: inline-block;
		vertical-align: top;
		width: 22px;
		height: 12px;
		background: url(bulletin@2x.png) no-repeat;
		background-size: 22px 12px;
	}
	
	.bulletin_text {
		vertical-align: top;
		font-size: 10px;
		margin: 0 4px;
	}
	
	.bulletin_wrapper .icon-keyboard_arrow_right {
		position: absolute;
		font-size: 10px;
		right: 12px;
		top: 8px;
	}
	
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
	
	.detail {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		background: rgba(7, 17, 27, 0.8);
		backdrop-filter: blur(10px);
	}
	
	.detail_wrapper {
		min-height: 100%;
		width: 100%;
	}
	
	.detail_wrapper .detail_main {
		margin-top: 64px;
		padding-bottom: 64px;
		/*底部的高度（必须设置）*/
	}
	
	.detail_main .name {
		text-align: center;
		line-height: 16px;
		font-weight: 700;
	}
	
	.detail_close {
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		clear: both;
		font-size: 32px;
	}
	
	.clearfix {
		display: inline-block;
	}
	
	.clearfix:after {
		display: block;
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	}
</style>