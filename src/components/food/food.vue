<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="foodWrapper">
			<div class="food_content">
				<div class="img_header">
					<img :src="food.image">
					<div class="back" @click="back">
						<i class="icon-arrow_lift"></i>
					</div>					
				</div>
				<div class="con">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell_count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontroll_wrapper2">
						<v-cartcontroll :food="food"></v-cartcontroll>
					</div>
					<transition name="buy">
						<div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
					</transition>
				</div>
				<v-split v-show="food.info"></v-split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<v-split v-show="food.rating"></v-split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<v-ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @increment="incrementTotal"></v-ratingselect>
					<div class="rating_wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-for="rating in food.ratings" class="rating_item" v-show="needShow(rating.rateType,rating.text)" :data="rating.rateType">
								<div class="user">
									<div class="name">{{rating.username}}</div>
									<img :src="rating.avatar" class="avatar" width="12" height="12"/>
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1,}"></span>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no_rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import vCartcontroll from '@/components/cartcontroll/cartcontroll'
	import vRatingselect from '@/components/ratingselect/ratingselect'
	import vSplit from '@/components/split/split'
	import {formatDate} from '../../common/js/date';
	
	
	const POSITIVE = 0;//正面
	const NEGATIVE = 1;//负面
	const ALL = 2;//全部
	
	export default{
		props: {
			food:{
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc:{
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		methods:{
			show() {
				//初始化
				this.showFlag = true,
				this.selectType = ALL,
				this.onlyContent = true,
				this.$nextTick(function() {
					//console.log(this)
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.foodWrapper, {
							probeType: 3,
				            click: true
				        });
					} else {
						this.scroll.refresh();
					}
				})
			},
			incrementTotal(type, data) {
		        this[type] = data;
		        this.$nextTick(function() {
		          	this.scroll.refresh();
		        });
		    },
			back() {
				this.showFlag = false;
			},
			addFirst(event) {
				if (!event._constructed) {
					return;
				}
				Vue.set(this.food,'count',1);
			},
			needShow(type,text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		filters:{
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date,'yyyy-MMM-dd hh:mm');
			}
		},
		components:{
			vCartcontroll,
			vSplit,
			vRatingselect
		}
		
	}
</script>

<style>
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
	}
	.move-enter-active, .move-leave-active {
	    transition: all 0.2s linear
	    transform translate3d(0, 0, 0)
	}
	.move-enter, .move-leave-active {
	    opacity: 0
	    transform translate3d(100%, 0, 0)
	}
	.img_header{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;  /*当padding值设置100%时，表示其高度也是100%*/
	}
	.img_header img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.img_header .back{
		position: absolute;
		top: 10px;
		left: 0;
	}
	.back .icon-arrow_lift{
		display: block;
		padding: 10px;/*使得点击区域变大*/
		font-size: 20px;
		color: #fff;
	}
	.con {
		padding: 18px;
		position: relative;
	}
	.con .title{
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
	}
	.con .detail{
		line-height: 10px;
		margin-bottom: 18px;
		font-size: 0;
		height: 10px;
	}
	.con .detail .sell_count,.con .detail .rating{
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.con .detail .sell_count{
		margin-right: 12px;
	}
	.con .price{
		font-weight: 700;
		line-height: 24px;
	}
	.con .price .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240,20,20);
	}
	.con .price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.cartcontroll_wrapper2{
		position: absolute;
		bottom: 12px;
		right: 12px;
	}
	.buy{
		position: absolute;
		bottom: 18px;
		right: 18px;
		z-index: 10;
		height: 24px;
		line-height: 24px;
		padding: 0 12px;
		box-sizing: border-box;
		font-size: 10px;
		border-radius: 12px;
		background: rgb(0,160,220);
		color: #fff;
	}
	.buy-enter-active, .buy-leave-active {
        transition: all 0.2s;
        opacity: 0;
    }
    .buy-enter, .buy-leave-active {
        opacity: 0;
    }
    .info {
    	padding: 18px;
    }
    .info .title{
    	line-height: 14px;
    	margin-bottom: 6px;
    	font-size: 14px;
    	color: rgb(7,17,27);
    }
    .info .text{
    	line-height: 24px;
    	text-indent: 8px;
    	font-size: 12px;
    	color: rgb(77,85,93);
    }
    .rating{
    	padding-top: 18px;
    }
    .rating .title{
    	line-height: 14px;
    	font-size: 14px;
    	color: rgb(7,17,27);
    	margin-left: 18px;
    }
    .rating_wrapper{
    	padding: 0 18px;
    }
    .rating_wrapper .rating_item{
     	position: relative;
     	padding: 16px 0;
     	border-bottom: solid 1px rgba(7,17,27,0.1);
    }
    .rating_item .user{
    	position: absolute;
    	right: 0;
    	top: 16px;
    	line-height: 12px;
    	font-size: 0;
    }
    .rating_item .user .name{
    	display: inline-block;
    	margin-right: 6px;
    	vertical-align: top;
    	font-size: 10px;
    	color: rgb(147,153,159);
    }
     .rating_item .user .avatar{
     	border-radius: 50%;
    }
    .rating_item .time{
    	margin-bottom: 6px;
    	line-height: 12px;
    	font-size: 10px;
    	color: rgb(147,153,159);    	
    }
    .rating_item .text{    	
    	line-height: 16px;
    	font-size: 12px;  
    	color: rgb(7,17,27);      	
    }
    .rating_item .text .icon-thumb_up,.rating_item .text .icon-thumb_down{
    	line-height: 16px;
    	margin-right: 4px;
    	font-size: 12px;
    }
    .rating_item .text .icon-thumb_down{
    	color: rgb(147,153,159);   
    }
    .rating_item .text .icon-thumb_up{
    	color:rgb(0,160,220);
    }   
    .no_rating{
    	padding: 16px 0;
    	font-size: 12px;
    	color: rgb(147,153,159);
    }
</style>