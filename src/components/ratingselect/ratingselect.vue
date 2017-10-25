<template>
	<div class="rating_select">
		<div class="rating_type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent($event)" class="switch" :class="{'on':only}">
			<span class="icon-check_circle"></span>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;//正面
	const NEGATIVE = 1;//负面
	const ALL = 2;//全部
	export default{
		props:{
			ratings:{
				type: Array,
				default() {
					return [];
				}
			},
			selectType:{
				type: Number,
				default: ALL
			},
			onlyContent:{
				type: Boolean,
				default: false
			},
			desc:{
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		data() {
			return{
				type: this.selectType,
				only: this.onlyContent
			}
		},
		methods:{
			select(type,event) {
				if(!event._constructed) {
					return;
				}
				this.type = type;
				/*this.selectType = type;*/  /*此种方法会报错*/
				// 子组件通过 $emit触发父组件的方法 increment   还可以传参   this.$emit('increment' ,this.counter);
				this.$emit('increment', 'selectType', type); 
			},
			toggleContent(event) {
				if(!event._constructed) {
					return;
				}
				this.only = !this.only;
				/*this.onlyContent = !this.onlyContent;*/  /*vue2.0修改，不能对props的属性进行直接修改 */
				this.$emit('increment', 'onlyContent', this.only);
			}
		},
		computed:{
			positives() {
				return this.ratings.filter(function(rating) {
					return rating.rateType === POSITIVE;
				})
			},
			negatives() {
				return this.ratings.filter(function(rating) {
					return rating.rateType === NEGATIVE;
				})
			}
		}
	}
</script>

<style>
	.rating_select{
		
	}
	.rating_select .rating_type{
		padding: 18px 0;
		margin: 0 18px;
		border-bottom: solid 1px rgba(7,17,27,0.1);
		font-size: 0;
	}
	.rating_type .block{
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		border-radius: 2px;
		color: rgb(77,85,93);
		font-size: 12px;
		line-height: 16px;
	}
	.rating_type .block .count{
		font-size: 8px;
		margin-left: 2px;
	}
	.rating_type .positive{
		background: rgba(0,160,220,0.2);
	}
	/*block  active*/
	.rating_type .block.active{
		color: #fff;
	}
	/*positive  active2*/
	.rating_type .positive.active{
		background: rgb(0,160,220);
	}
	/*negative  active2*/
	.rating_type .negative.active{
		background: rgb(77,85,93);
	}
	.rating_type .negative{
		background: rgba(77,85,93,0.2);
	}
	.switch{
		padding:12px 18px;
		line-height: 24px;
		font-size: 12px;
		color: rgb(147,153,159);
		border-bottom: solid 1px rgba(7,17,27,0.1);
		font-size: 0;
	}
	.switch.on .icon-check_circle{
		color: #00c850;
	}
	.switch .icon-check_circle{
		margin-right: 4px;
		font-size: 24px;
		display: inline-block;
		vertical-align: top;	
	}
	.switch .text{
		font-size: 12px;
	}
</style>