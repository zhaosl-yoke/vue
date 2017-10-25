<template>
	<div>
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content_left">
					<div class="logo_wrapper">
						<div class="logo" :class="{'highlight':totalPrice>0}">
							<i class="icon-shopping_cart"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price">￥{{totalPrice}}</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
				</div>
				<div class="content_right" @click.stop.prevent="pay">
					<div class="pay" :class="payClass">{{payDesc}}</div>
				</div>
			</div>
			<div class="ball_container">
				<div v-for="ball in balls">
					<transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
			            <div class="ball" v-show="ball.show">
				            <div class="inner inner-hook">
				            </div>
			            </div>
		          	</transition>
				</div>		
			</div>
			<transition name="fold">
				<div class="shopcart_list" v-show="listShow">
					<div class="list_header">
						<h1 class="title">购物车</h1>
						<div class="empty" @click="empty">清空</div>
					</div>
					<div class="list_content" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<div class="cartControll_wrapper">
									<v-cartcontroll :food="food"></v-cartcontroll>
								</div>	
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
	      	<div class="list_mask" v-show="listShow" @click="hideList"></div>
	    </transition>
    </div>
</template>

<script>
	import BScroll from 'better-scroll'
	import vCartcontroll from '@/components/cartcontroll/cartcontroll'
	export default{
		props: {	
			selectFoods:{/*通过父组件传过来的属性*/
				type:Array,/*如果type是Array或者是Object,默认值是一个函数*/
				default() {
					return [
						{
							price: 10,
							count: 2
						}
					];
				}
			},
		    deliveryPrice: {
		       	type: Number,/*接收props时一定要注意注明type*/
		       	default: 0/*默认值*/
		    },
		    minPrice: {
		        type: Number,
		        default: 0
		    }
		},
		data() {
			return {
				balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
				dropBalls:[],
				fold: true
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach(function(food) {
					total += food.price * food.count;
				})
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach(function(food) {
					count += food.count;
				})
				return count;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return '￥'+ this.minPrice +'元起送';
				} else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return '还差￥'+ diff +'起送';
				} else {
					return '结算';
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not_enough';
				} else {
					return 'enough';
				}
			},
		    listShow() {
		    	if (!this.totalCount) {
		    		this.fold = true;
		    		return false;
		    	}
		    	let show = !this.fold;
		    	if (show) {
		    		this.$nextTick(function() {
		    			if (!this.scroll) {
		    				this.scroll = new BScroll(this.$refs.listContent,{
			    				probeType: 3,
			            		click: true
			    			})
		    			} else {
		    				this.scroll.refresh();
		    			}		    			
		    		})
		    	}
		    	return show;
		    }
		},
		methods:{
			drop(el) {
				//console.log(el);
				for (let i = 0; i < this.balls.length; i++) {
			        let ball = this.balls[i];
		          	if (!ball.show) {
			            ball.show = true;
			            ball.el = el;
			            this.dropBalls.push(ball);
			            return;
		        	}
		        }
			},
			beforeEnter(el) {
		        let count = this.balls.length;
		        while (count--) {
		          	let ball = this.balls[count];
			        if (ball.show) {
			            let rect = ball.el.getBoundingClientRect();
			            let x = rect.left - 32;
			            let y = -(window.innerHeight - rect.top - 22);
			            el.style.display = '';
			           	el.style.webkitTransform = `translate3d(0,${y}px,0)`;
			           	el.style.transform = `translate3d(0,${y}px,0)`;
			           	let inner = el.getElementsByClassName('inner-hook')[0];
			           	//console.log(inner)
			           	inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
			           	inner.style.transform = `translate3d(${x}px,0,0)`;
	        		}
       			}
      		},
	      	enter(el) {
	      		/*eslint-disable no-unused-vars*/
	      		let rf = el.offsetHeight;/*"重绘"这个使得每次点击都会有小球弹出（不理解）*/
		        this.$nextTick(function() {
			        el.style.webkitTransform = 'translate3d(0,0,0)';
			        el.style.transform = 'translate3d(0,0,0)';
			        let inner = el.getElementsByClassName('inner-hook')[0];
			        inner.style.webkitTransform = 'translate3d(0,0,0)';
			        inner.style.transform = 'translate3d(0,0,0)';
		        });
	      	},
		    afterEnter(el) {
		        let ball = this.dropBalls.shift();
		        if (ball) {
		          ball.show = false;
		          el.style.display = 'none';
		        }
		    },
		    toggleList() {
		    	if (!this.totalCount) {
		    		return;
		    	}
		    	this.fold = !this.fold;
		    },
		    empty() {
		    	this.selectFoods.forEach(function(food) {
		    		food.count = 0;
		    	})
		    },
		    hideList() {
		        this.fold = true;
		    },
		    pay() {
		    	if(this.totalPrice < this.minPrice) {
		    		return;
		    	}
		    	window.alert(`支付${this.totalPrice}元`);
		    }
		},
		components: {
			vCartcontroll
		}
	}
</script>

<style>
	.ball_container .ball{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index: 200;
		transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41)/*此种是抛物线  （贝塞尔曲线）*/
		/*transition: all 0.4s;*/  /*此种是直线*/
	}
	.ball .inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(0,160,220);
		transition: all 0.4s linear;
	}
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		background: #141d27;
	}
	.shopcart .content{
		display: flex;
		background: #141d27;
		font-size: 0;
		color: rgba(255,255,255,0.4);
	}
	.content .content_left{
		flex: 1;
	}
	.content_left .logo_wrapper{
		display: inline-block;
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;/*display: inline-block;居中的话设置vertical-align:top*/
		border-radius: 50%;
		background: #141d27;
	}
	.logo_wrapper .logo{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
	}
	.logo_wrapper .highlight{
		background: rgb(0,160,220);
	}
	.logo_wrapper .num{
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 9px;
		font-weight: 400;
		color: #fff;
		background: rgb(240,20,20);
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.logo .icon-shopping_cart{
		line-height: 44px;
		font-size: 24px;
		color: #80858a;
	}
	.highlight .icon-shopping_cart{
		color: #fff;
	}
	.content_left .price{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;/*为了使border的高度居中*/
		margin-top: 12px;
		box-sizing: border-box;
		padding-right: 12px;
		border-right: solid 1px rgba(255,255,255,0.1);
		font-size: 16px;
		font-weight: 700;
	}
	.content_left .desc{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin: 12px 0 0 12px;
		font-size: 10px;
	}
	.content .content_right{
		flex: 0 0 105px;
		width: 105px;
	}
	.content_right .pay{
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 12px;
		background: #2b333b;
		font-weight: 700;
	}
	.content_right .not_enough{
		background: #2b333b;
	}
	.content_right .enough{
		background: #00b43c;
		color: #fff;
	}
	.shopcart_list{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		transform: translate3d(0, -100%, 0);
	}
	.fold-enter-active, .fold-leave-active {
      transition: all 0.5s;
      transform: translate3d(0, -100%, 0);
    }
    .fold-enter, .fold-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .shopcart_list .list_header{
    	height: 40px;
    	line-height: 40px;
    	padding: 0 18px;
    	background: #f3f5f7;
    	border-bottom: solid 2px rgba(7,17,27,0.1);
    }
    .list_header .title{
    	float: left;
    	font-size: 17px;
    	color: rgb(7,17,27);
    }
     .list_header .empty{
    	float: right;
    	font-size: 12px;
    	color: rgb(0,160,220);
    }
    .list_content{
    	padding: 0 18px;
    	max-height: 217px;
    	overflow: hidden;
    	background: #fff;
    }
    .list_content .food{
    	position: relative;
    	padding: 12px 0;
    	box-sizing: border-box;
    	border-bottom: solid 1px rgba(7,17,27,0.1);
    }
    .list_content .food .name{
    	line-height: 24px;
    	font-size: 14px;
    	color: rgb(7,17,27);
    }
    .list_content .food .price{
    	position: absolute;
    	right: 90px;
    	bottom: 12px;
    	line-height: 24px;
    	font-size: 14px;
    	color: rgb(240,20,20);
    	font-weight: 700;
    }
    .list_content .food .cartControll_wrapper{
    	position: absolute;
    	right: 0;
    	bottom: 6px;
    }   
    .list_mask{
    	position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		opacity: 1;
		background: rgba(7, 17, 27, 0.6);
    }
  
  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: all 0.5s;
    background: rgba(7, 17, 27, 0.6);
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }

</style>