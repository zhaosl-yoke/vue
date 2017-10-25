<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star_item"></span>
	</div>
</template>

<script>
	const length = 5;
	const cl_on = "on";
	const cl_half = "half";
	const cl_off = "off";
	export default{
		props:{
			size:{
				type: Number
			},
			score:{
				type: Number
			}
		},
		computed:{
			starType() {
				return 'star-'+ this.size;
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score * 2) / 2;
				let hasDecimal = score % 1 !== 0;
				let integer = Math.floor(score);
				for (let i = 0; i < integer; i++) {
					result.push(cl_on);
				}
				if (hasDecimal) {
					result.push(cl_half);
				}
				while (result.length < length) {
					result.push(cl_off);
				}
				return result;
				console.log(result)
			}
		}
	}
</script>

<style>
	.star{
		font-size: 0;
	}
	.star .star_item{
		display: inline-block;
	}
	.star-48 .star_item{
		width: 20px;
		height: 20px;
		margin-right: 22px;
	}
	.star-36 .star_item{
		width: 15px;
		height: 15px;
		margin-right: 6px;
	}
	.star-24 .star_item{
		width: 10px;
		height: 10px;
		margin-right: 3px;
	}
	.star-48 .on{
		background: url(star48_on@2x.png) no-repeat;
		background-size: 20px 20px;
	}
	.star-48 .half{
		background: url(star48_half@2x.png) no-repeat;
		background-size: 20px 20px;
	}
	.star-48 .off{
		background: url(star48_off@2x.png) no-repeat;
		background-size: 20px 20px;
	}
	.star-48 .star_item:last-child(1) {
		margin-right: 0;
	}
	
	.star-36 .on{
		background: url(star36_on@2x.png) no-repeat;
		background-size: 15px 15px;
	}
	.star-36 .half{
		background: url(star36_half@2x.png) no-repeat;
		background-size: 15px 15px;
	}
	.star-36 .off{
		background: url(star36_off@2x.png) no-repeat;
		background-size: 15px 15px;
	}
	.star-36 .star_item:last-child(1) {
		margin-right: 0;
	}
	
	.star-24 .on{
		background: url(star24_on@2x.png) no-repeat;
		background-size: 10px 10px;
	}
	.star-24 .half{
		background: url(star24_half@2x.png) no-repeat;
		background-size: 10px 10px;
	}
	.star-24 .off{
		background: url(star24_off@2x.png) no-repeat;
		background-size: 10px 10px;
	}
	.star-24 .star_item:last-child(1) {
		margin-right: 0;
	}
</style>