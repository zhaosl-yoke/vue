<template>
	<div class="seller" ref="seller">
		<div class="seller_content">
			<div class="sell_overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<v-star :size="36" :score="seller.score" class="star"></v-star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite($event)">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text" >{{favoriteText}}</span>
				</div>
			</div>
			<v-split></v-split>
			<div class="sell_bulletin">
				<div class="title">公告与活动</div>
				<div class="content_wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="sell_supports">
					<li class="support_item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<v-split></v-split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic_wrapper" ref="picWrapper">
					<ul class="pic_list" ref="picList">
						<li class="pic_item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="120">
						</li>
					</ul>
				</div>
			</div>
			<v-split></v-split>
		    <div class="info">
		        <div class="title">商家信息</div>
		        <ul>
		          	<li class="info_item" v-for="info in seller.infos">{{info}}</li>
		        </ul>
		    </div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import vStar from '@/components/star/star';
	import vSplit from '@/components/split/split';
	import {savaToLocal, loadFromlLocal} from '../../common/js/store';
	export default{
		props:{
			seller:{
				type: Object
			}
		},
		data() {
			return {
		        favorite: (() => {
		          	return loadFromlLocal(this.seller.id, 'favorite', false);
		        })()
		    }
		},
		computed:{
			favoriteText() {
				return this.favorite ? '已收藏' : '收藏'; 
			}
		},
		created() {
			if (!this.picScroll) {
		        if (this.seller.pics) {
		          	this.$nextTick(function() {
			            let picWidth = 120;
			            let margin = 6;
			            let width = (picWidth + margin) * this.seller.pics.length - margin;
			            this.$refs.picList.style.width = width + 'px';
			            this.picScroll = new BScroll(this.$refs.picWrapper, {
				            scrollX: true,
				            eventPassthrough: 'vertical'
			            });
		          	});
		        }
		    } else {
		        this.picScroll.refresh();
		    }
			if (!this.scroll) {
		        this.$nextTick(function() {
		          	this.scroll = new BScroll(this.$refs.seller, {
		          		probeType: 3,
					    click: true
		          	});
		        });
		    } else {
		    	console.log(2)
		        this.scroll.refresh();
		    }
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		methods:{
			_initScroll() {
				
			},
			toggleFavorite(event) {
		        if (!event._constructed) {
		          	return;
		        }
		        this.favorite = !this.favorite;
		        savaToLocal(this.seller.id, 'favorite', this.favorite);
		    }
		},
		components:{
			vStar,
			vSplit
		}
	}
</script>

<style>
	.seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	.seller .sell_overview{
		padding: 18px;
	}
  	.sell_overview .title{
  		margin-bottom: 8px;
      	line-height: 14px;
      	color: rgb(7, 17, 27);
      	font-size: 14px;
  	}
  	.sell_overview .desc{
  		padding-bottom: 18px;
      	font-size: 0;
      	border-bottom: solid 1px rgba(7, 17, 27, 0.1);
  	}
  	.sell_overview .desc .star{
  		display: inline-block;
        vertical-align: top;
        margin-right: 8px;
  	}
  	.sell_overview .desc .text{
  		display: inline-block;
        vertical-align: top;
        margin-right: 12px;
        line-height: 18px;
        font-size: 10px;
        color: rgb(77, 85, 93);
  	}
  	.sell_overview .remark{
  		display: flex;
      	padding-top: 18px;
  	}
  	.sell_overview .remark .block{
  		flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
  	} 
  	.sell_overview .remark .block:nth-last-child(1) {
  		border: none;
  	}
  	.sell_overview .remark .block h2{
  		margin-bottom: 4px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 149);
  	} 
  	.sell_overview .remark .block .content{
  		line-height: 24px;
        font-size: 10px;
        color: rgb(7, 17, 27);
  	} 
 	.block .content .stress{
 		font-size: 24px;
 	}
 	.sell_overview .favorite{
 		position: absolute;
      	right: 11px;
      	top: 18px;
      	width: 50px;
      	text-align: center;
 	}        
 	.favorite .icon-favorite{
 		display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        width: 50px;
        color: #d4d6d9;
 	}
 	.favorite .icon-favorite.active{
 		color: rgb(240,20,20);
 	} 
 	.favorite .text{
 		line-height: 10px;
        font-size: 10px;
        color: rgb(77,85,93);
 	}
 	.sell_bulletin{
 		padding: 18px 18px 0 18px;
 	}
 	.sell_bulletin .title{
 		margin-bottom: 8px;
      	line-height: 14px;
      	color: rgb(7, 17, 27);
      	font-size: 14px;
 	}
 	.sell_bulletin .content_wrapper{
 		padding: 0 12px 16px 1px;
      	border-bottom: solid 1px rgba(7, 17, 27, 0.1);
 	}
 	.sell_bulletin .content_wrapper .content{
 		line-height: 24px;
        font-size: 12px; 
        color: rgb(240, 20, 20);
 	}
 	.sell_supports .support_item{
 		padding: 16px 12px;
 		border-bottom: solid 1px rgba(7, 17, 27, 0.1);
 		font-size: 0;
 	}
 	.sell_supports .support_item:nth-last-child(1) {
 		border: none;
 	}
 	.sell_supports .support_item .icon{
		display: inline-block;
		vertical-align: top;
		width: 16px;
		height: 16px;
		margin-right: 6px;
		background-size: 16px 16px;
	}
	.sell_supports .support_item .decrease{
		background: url(decrease_4@2x.png) no-repeat;
		background-size: 16px 16px;
	}
	.sell_supports .support_item .discount{
		background: url(discount_4@2x.png) no-repeat;
			background-size: 16px 16px;
	}
	.sell_supports .support_item .guarantee{
		background: url(guarantee_4@2x.png) no-repeat;
			background-size: 16px 16px;
	}
	.sell_supports .support_item .invoice{
		background: url(invoice_4@2x.png) no-repeat;
			background-size: 16px 16px;
	}
	.sell_supports .support_item .special{
		background: url(special_4@2x.png) no-repeat;
			background-size: 16px 16px;
	}
	.sell_supports .text{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7,17,27);
	}
	.pics {
		padding: 18px;
	}
	.pics .title{
		margin-bottom: 12px;
      	line-height: 14px;
      	color: rgb(7, 17, 27);
      	font-size: 14px;
	}
	.pics .pic_wrapper{
		width: 100%;
	    overflow: hidden;
	    white-space: nowrap; /*不换行*/
	}
	.pic_wrapper .pic_list{
		font-size: 0;
	}
	.pic_list .pic_item{
		display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
	}
	.pic_item:nth-last-child(1){
		margin: 0;
	}
	.info{
		padding: 18px 18px 0 18px;
    	color: rgb(7, 17, 27);
	}
    .info .title{
    	padding-bottom: 12px;
      	line-height: 14px;
      	border-bottom: solid 1px rgba(7, 17, 27, 0.1);
      	font-size: 14px;
    }
    .info .info_item{
    	padding: 16px 12px;
      	line-height: 16px;
      	border-bottom: solid 1px rgba(7, 17, 27, 0.1);
      	font-size: 12px;
    }
    .info .info_item:nth-last-child(1) {
    	border: none;
    }
</style>