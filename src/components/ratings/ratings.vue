<template>
	<div class="ratings" ref="ratings">
		<div class="ratings_content">
			<div class="overview">
				<div class="overview_left">
					<div class="score">{{seller.score}}</div>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview_right">
					<div class="score_wrapper">
						<span class="title">服务态度</span>
						<v-star class="star" :size="36" :score="seller.serviceScore"></v-star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score_wrapper">
						<span class="title">商品评分</span>
						<v-star class="star" :size="36" :score="seller.foodScore"></v-star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery_wrapper">
			            <span class="title">送达时间</span>
			            <span class="delivery">{{seller.deliveryTime}}分钟</span>
			        </div>
				</div>
			</div>
			<v-split></v-split>
			<v-ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @increment="incrementTotal"></v-ratingselect>
			<div class="rating_wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating_item2" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28"/>
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star_wrapper">
								<v-star :size="24" :score="rating.score"></v-star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
				            <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
				              	<i class="icon-thumb_up"></i>
				              	<span class="item" v-for="item in rating.recommend" >{{item}}</span>
				            </div>
				            <div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import BScroll from 'better-scroll'
	import vStar from '@/components/star/star'
	import vSplit from '@/components/split/split'
	import vRatingselect from '@/components/ratingselect/ratingselect'
	import {formatDate} from '../../common/js/date';
	
	const POSITIVE = 0;//正面
	const NEGATIVE = 1;//负面
	const ALL = 2;//全部
	const ERR_OK = 0;
	
	
	export default{
		props:{
			seller:{
				type: Object
			}
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true,
				desc:{
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		created: function () {
			var that = this;
			axios.get('/api/ratings')
			.then(function (response) {
			  	//console.log(response.data)
			  	if (response.data.errno === ERR_OK) {
			  			that.ratings = response.data.data;
			  			//console.log(that.ratings);
			  			that.$nextTick(function() {
					        that.scroll = new BScroll(this.$refs.ratings, {
								probeType: 3,
					            click: true
					        });
					    });
			  	}
			})
			.catch(function (error) {
			    console.log("调用失败");
			});
		},
		filters:{
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date,'yyyy-MMM-dd hh:mm');
			}
		},
		methods:{
			incrementTotal(type, data) {
		        this[type] = data;
		        this.$nextTick(function() {
		          	this.scroll.refresh();
		        });
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
		components:{
			vStar,
			vSplit,
			vRatingselect
		}
	}
</script>

<style>
	.ratings{
		position: absolute;
		top: 174px;
		bottom: 0;
		width: 100%;
		left: 0;
		overflow: hidden;
	}
	.ratings .overview{
		display: flex;
		padding: 18px 0;
	}
	.ratings .overview .overview_left{
		flex: 0 0 137;
		width: 137px;
	    padding: 6px 0px;
	    border-right: 1px solid rgba(7, 17, 27, 0.1);
	    text-align: center;
	}
	.overview_left .score{
		line-height: 28px;
		color: rgb(255, 153, 0);
		font-size: 24px;
	}
	.overview_left .title{
		margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
	}
	.overview_left .rank{
		line-height: 10px;
        font-size: 12px;
        color: rgb(147, 153, 159);
	}
	.ratings .overview .overview_right{
		flex: 1;
		padding: 6px 0 6px 24px;
	}
	.overview_right .score_wrapper{
		line-height: 18px;
        margin-top: 8px;
        font-size: 0;
	}
	.score_wrapper .title{
		display: inline-block;
        vertical-align: top;
        line-height: 18px;
        font-size: 12px;
        color: rgb(7, 17, 27);
	}
	.score_wrapper .star{
		display: inline-block;
        margin: 0 12px;
        vertical-align: top;
	}
	.score_wrapper .score{
       	display: inline-block;
       	vertical-align: top;
      	line-height: 18px;
      	font-size: 12px;
      	color: rgb(266, 153, 0);
    }
    .delivery_wrapper{
    	 font-size: 0;
    }
    .delivery_wrapper .title{
    	/*display: inline-block;
	    vertical-align: top;*/
	    line-height: 18px;
	    font-size: 12px;
	    color: rgb(7, 17, 27);
    }
    .delivery_wrapper .delivery{
    	/*都是文字的话机构一样，加不加下面的两个属性都可以*/
    /*	display: inline-block;       
        vertical-align: top;*/
         margin-left: 12px;
        line-height: 18px;
        font-size: 12px;
        color: rgb(147, 153, 159);
    }
    .rating_wrapper{
    	padding: 0 18px;
    }  
    .rating_wrapper .rating_item2{
    	display: flex;
      	padding: 18px 0;
      	border-bottom: solid 1px rgba(1, 17, 27, 0.1);
    } 
    .rating_item2 .avatar{
    	flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
    } 
    .rating_item2 .avatar img{
    	border-radius: 50%;
    } 
    .rating_item2 .content{
    	position: relative;
        flex: 1;
    }
    .rating_item2 .content .name{
    	margin-bottom: 4px;
        line-height: 12px;
        font-weight: 700;
        font-size: 10px;
        color: rgb(7, 17, 27);
    }
    .rating_item2 .content .star_wrapper{
    	margin-bottom: 6px;
        font-size: 0;
    } 
    .star_wrapper .star{
    	display: inline-block;
        margin-right: 5px;
        vertical-align: top;
    }  
    .star_wrapper .delivery{
    	display: inline-block;
        vertical-align: top;
        font-size: 10px;
        line-height: 12px;
        color: rgb(147, 153, 159);
    } 
    .rating_item2 .content .text{
    	line-height: 18px;
        color: rgb(7, 17, 27);
        font-size: 12px;
        margin-bottom: 8px;
    }  
    .rating_item2 .content .recommend{
    	line-height: 16px;
        font-size: 0;
    } 
    .recommend .icon-thumb_up,.recommend .item{
    	display: inline-block;
        margin: 0 8px 4px 0;
        font-size: 9px;
    }
    .recommend .icon-thumb_up{
    	 color: rgb(0, 160, 220);
    }
    .recommend .item{
    	padding: 0 6px;
        border: 1px solid rgba(7, 17, 27, 0.1);
        border-radius: 1px;
        color: rgb(147, 153, 159);
        background: #fff;
    }
    .rating_item2 .content .time{
    	position: absolute;
        top: 0;
        right: 0;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
</style>