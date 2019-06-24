<template>
	<div>
		<new-radio :newRadios="newRadios"></new-radio>
		<radio-rank :radioRanks="radioRanks"></radio-rank>
        <!-- <pagination></pagination> -->
	</div>
</template>

<script>
	import NewRadio from './newRadio'
    import RadioRank from './radioRank'
    import Pagination from '@components/pagination'
	import {getDjRecommendByType,getDjRank} from '@service/getData'
	export default{
		data(){
			return {
				newRadios:null,
				radioRanks:null,
                type:null,
                pageIndex:1
			}
		},
		watch:{
			$route(to){
				if(to.name === 'discoverDjRadioCategory'){
					this.initData();
				}
			}
		},
		methods:{
			initData(){
				this.type = this.$route.query.id;
				getDjRecommendByType(this.type).then(response=>{
                    // 没有列表接口，做不了分页
                    if(this.pageIndex === 1){
                        this.newRadios = response.data.djRadios.slice(0,5);
                    }                    
                    this.radioRanks = response.data.djRadios;
				});
			}
		},
		created(){			
			this.initData();
		},
		components:{
			NewRadio,
            RadioRank,
            Pagination
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