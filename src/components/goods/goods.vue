<template>
	<div>
		<div class="goods">
			<div class="menu_wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu_item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
						<span class="text">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
							{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods_wrapper" ref="foodWrapper">
				<ul>
					<li v-for="item in goods" class="food_list" ref="foodList">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="food in item.foods" class="food_item" @click="selectFood(food,$event)">
								<div class="icon">
									<img :src="food.icon" width="57" height="57"/>
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
										<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartcontroll_wrapper">
										<v-cartcontroll :food="food" @increment="incrementTotal"></v-cartcontroll>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<v-shopcart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
		</div>
		<v-food :food="selectedFood" ref="food"></v-food>
	</div>
</template>

<script>
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import vShopcart from '@/components/shopcart/shopcart'
	import vCartcontroll from '@/components/cartcontroll/cartcontroll'
	import vFood from '@/components/food/food'
	const ERR_OK = 0;
	export default{
		name: 'goods',
		props:{
			seller:{
				type: Object
			}
		},
		data() {
			return{
				goods: [],
				listHeight: [],
				scrolly: 0,
				selectedFood:{}
			}
		},
		computed: {
	      	currentIndex() {
	      		//console.log(this.scrolly);
		        for (let i = 0; i < this.listHeight.length; i++) {
		           	let height = this.listHeight[i];
		            let height2 = this.listHeight[i + 1];
			        if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
			            return i;			         
			        }
		        }
		        return 0;
		    },
		    selectFoods() {
		    	let foods = [];
		    	//console.log(this.goods)
		    	this.goods.forEach(function(good) {
		    		good.foods.forEach(function(food) {
		    			if (food.count) {
			    			foods.push(food);
			    		}
		    		})
		    	})
		    	return foods;
		    }
	    },
		created: function () {
			var that = this;
			axios.get('/api/goods')
			.then(function (response) {
			  	//console.log(response.data)
			  	if (response.data.errno === ERR_OK) {
			  			that.goods = response.data.data;
			  			//console.log(that.goods)
			  			that.$nextTick(function() {
					        that.initScroll();
					        that.caculateHeight();
					    });
			  	}
			})
			.catch(function (error) {
			    console.log("调用失败");
			});
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			//console.log(this.scrolly);
		},
		methods: {
			initScroll() {
				var _this = this;/*此处要重新定义一下this*/
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					probeType: 3,
		            click: true
		        });
		        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
		            probeType: 3,
		            click: true
		        });
		        this.foodScroll.on('scroll',function(pos) {
		        	_this.scrolly = Math.abs(Math.floor(pos.y));
		        	//this.scrolly = Math.abs(Math.round(pos.y)); /*此处的this是指向scroll*/
		        });
			},
			caculateHeight() {
				let foodList = this.$refs.foodList;
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i ++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index,event) {
				if (!event._constructed) {
		          	// 去掉自带click事件的点击
		          	return;
		        }
				//console.log(index)
				let foodList = this.$refs.foodList;
				let el = foodList[index];
				this.foodScroll.scrollToElement(el,300);
			},
			incrementTotal(target) {
				//体验优化，异步执行下出动画
				console.log(1)
				this.$nextTick(function() {
					this.$refs.shopCart.drop(target);
				})
		    },
		   selectFood(food,event) {
			   	if (!event._constructed) {			    
			        return;
			    }
			   	this.selectedFood = food;
			   	this.$refs.food.show();
		   }
		},
		components: {
			vShopcart,
			vCartcontroll,
			vFood
		}
	}
</script>

<style>
	.goods{
		display: flex;
		overflow: hidden;
		position: absolute;
		top: 174px;/*174px是header与tab的和*/
		bottom: 46px;
		width: 100%;
	}
	.goods .menu_wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.menu_wrapper .menu_item{
		display: table;/*垂直居中布局*/
		width: 56px;
		height: 54px;
		line-height: 14px;
		padding: 0 12px;
	}
	.menu_item .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		margin-right: 2px;
		background-size: 12px 12px;
		vertical-align: top;
	}
	.menu_item .text{
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
		border-bottom: solid 1px rgba(7,17,27,0.1);
	}
	.menu_item .decrease{
		background: url(decrease_3@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	.menu_item .discount{
		background: url(discount_3@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	.menu_item .guarantee{
		background: url(guarantee_3@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	.menu_item .invoice{
		background: url(invoice_3@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	.menu_item .special{
		background: url(special_3@2x.png) no-repeat;
		background-size: 12px 12px;
	}
	.current{
		position: relative;
		margin-top: -1px;
		z-index: 10;
		background: #fff;
	}
	.current .text{
		border-bottom: none;
		font-weight: 700;
	}
	/*.menu_item .text{
		line-height: 12px;
		font-size: 10px;
	}*/
	.goods .foods_wrapper{
		flex: 1;
	}
	.food_list .title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147,153,159);
		background: #f3f5f7;
	}
	.food_item {
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
		border-bottom: solid 1px rgba(7,17,27,0.1);
	}
	.food_item:last-child(1) {
		border-bottom: 0;
		margin-bottom: 0;
	}
	.food_item .icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.food_item .content{
		position: relative;
		flex: 1;
	}
	.food_item .content .name{
		font-size: 14px;
		margin: 2px 0 8px 0;
		line-height: 14px;
		height: 14px;
		color: rgb(7,17,27);
	}
	.food_item .content .desc{
		margin-bottom: 8px;
		font-size: 10px;
		line-height: 12px;
		color: rgb(147,153,159);
	}
	.food_item .content .extra{
		font-size: 10px;
		line-height: 12px;
		color: rgb(147,153,159);
	}
	.extra .count{
		margin-right: 12px;
	}
	.food_item .content .price{
		font-weight: 700;
		line-height: 24px;
	}
	.food_item .content .price .now{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240,20,20);
	}
	.food_item .content .price .old{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147,153,159);
	}
	.cartcontroll_wrapper{
		position: absolute;
		right: 0;
		bottom: 12px;
	}
</style>