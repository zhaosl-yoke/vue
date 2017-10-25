<template>
	<div class="cartcontroll">
		<transition name="move">
			<div class="cart_decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
		</transition>
		<div class="cart_count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart_add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		
		props:{
			food:{
				type: Object
			}
		},
		/*created() {
			console.log(this.food)
		}*/
		methods:{
			addCart(event) {
				if (!event._constructed) {
		          	// 去掉自带click事件的点击
		          	return;
		        }
				if (!this.food.count) {
					Vue.set(this.food,'count',1);
					//this.food.count = 1;/*给对象加没有的属性，不能直接加，需要set*/
				} else {
					this.food.count ++;
				}
				this.$emit('increment',event.target); // 子组件通过 $emit触发父组件的方法 increment
			},
			decreaseCart(event) {
				if (!event._constructed) {
		          	// 去掉自带click事件的点击
		          	return;
		        }
				if (this.food.count) {
					this.food.count --;
				}
			}
		}
	}
</script>

<style>
	.move-enter{
		transform: translate3d(24px,0,0);
	    opacity: 0;
	}
	.move-leave{
		transform: translate3d(0,0,0);
	  	opacity: 1;	  	
	}
	.move-enter-active {
	  transition: all 0.4s linear;
	}
	.move-leave-active{
		transition: all 0.4s linear;
	}
	.move-enter-to{	  
	    transform: translate3d(0,0,0);
	  	opacity: 1;
	}
	.move-leave-to {
		transform: translate3d(24px,0,0);
	    opacity: 0;
	}
	.cartcontroll{
		font-size: 0;
	}
	.cartcontroll .cart_decrease,.cartcontroll .cart_add{
		display: inline-block;
		padding: 6px;/*通过padding增加点击区域*/
		font-size: 20px;
		line-height: 24px;
		color: rgb(0,160,260);
	}
	.cartcontroll .cart_count{
		display: inline-block;
		width: 12px;
		vertical-align: top;
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
		font-size: 10px;
		color: rgb(147,153,159);
	}
</style>