<template>
	<div>
		<promote></promote>
		<div v-for="radios in indexData" :key="radios.id">
			<radio :radios="radios"></radio>
		</div>
	</div>
</template>

<script>
	import Promote from './promote'
	import Radio from './radio'
	import {getDjRecommendByType} from 'API/getData'
	export default{
		data(){
			return{
				indexData:[],
				types:[2,6,5,3,2001,11]
			}
		},
		components:{
			Promote,
			Radio
		},
		methods:{
			async initData(){
				for(let type of this.types){
					await getDjRecommendByType(type).then(response=>{
						this.indexData.push(response.data.djRadios);
					});
				}
			}
		},
		created(){
			this.initData();
		}
	}
</script>

<style lang="scss">
	.section-header{
		margin-top:15px;
		padding-bottom:10px;
		border-bottom:2px solid #c20c0c;
		.title{
			float:left;
			line-height:31px;
			font-size:24px;
			color:#333;
			a{
				color:#333;	
				&:hover{
					text-decoration: none;
				}			
			}
		}
		.more{
			float:right;
			line-height:16px;
			margin-top:14px;
		}
		a:hover{
			text-decoration:underline;
		}
	}
</style>