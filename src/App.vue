<template>
  <div id="app">
  	<v-header :seller="seller"></v-header>
  	<div class="tab border-1px">
  		<div class="tab-item">
  			  <router-link to="/goods/goods">商品</router-link>
  		</div>
  		<div class="tab-item">
  			 <router-link to="/ratings/ratings">评论</router-link>
  		</div>
  		<div class="tab-item">
  			 <router-link to="/seller/seller">商家</router-link>
  		</div>
  	</div>
  	<!--router切换状态保留   keep-alive-->
  	<keep-alive>
  		<router-view :seller="seller"></router-view>
  	</keep-alive>
  </div>
</template>

<script>
	import VHeader from '@/components/header/header'
	import axios from 'axios'
	const ERR_OK = 0;
	export default {
		data() {
			return {
				seller:{}
			}
		},
		name: 'app',
		components: {
			VHeader
		},
		created: function () {
			var that = this;
			axios.get('/api/seller')
		  .then(function (response) {
		  	if (response.data.errno === ERR_OK) {
		  			that.seller = response.data.data;
		  			//console.log(that.seller)
		  	}
		  })
		  .catch(function (error) {
		    console.log(1)
		  });
		}
	}
	
</script>

<style scoped>
	.tab{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		/*border-bottom: 1px solid rgba(7,17,27,0.1);*/
		position: relative;
	}
	.tab:after{
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid rgba(7,17,27,0.1);
		content: '';
	}
	.tab-item{
		flex: 1;
		text-align: center;
		color: rgb(77,85,93);
	}	
	.tab-item a{
		display: block;
		font-size: 14px;
	}
	.router-link-active {
		color: rgb(240,20,20);
	}
</style>
