<template>
	<div id="dj-cate" v-if="djCatlist">
		<div class="cate-container">
			<ul class="catelist clearfix" v-for="n in counts" v-show="n == index" :key="n">
				<li class="cate-item" v-for="i in djCatlist.length-(n-1)*18 >18?18:djCatlist.length-(n-1)*18" :key="i">
					<router-link :to="{name:'discoverDjRadioCategory',query:{id:djCatlist[(n-1)*18 + i - 1].id}}" class="cate-link" :class="{active:currentCate == djCatlist[(n-1)*18 + i - 1].id}">
						<i class="icon" :style="{'background-image':'url('+ djCatlist[(n-1)*18 + i - 1].picWebUrl +')'}"></i>
						<span class="txt">{{djCatlist[(n-1)*18 + i - 1].name}}</span>
					</router-link>
				</li>
			</ul>
			<a class="lctrl" v-if="counts > 1" :class="{disabled:index == 1}" @click="prev"></a>
			<a class="rctrl" v-if="counts > 1" :class="{disabled:index == counts}" @click="next"></a>
		</div>
		<div class="cursor">
			<i v-for="n in counts" :class="{active:n == index}" @click="go(n)" :key="n"></i>
		</div>
	</div>
</template>

<script>
	import {getDjCatlist} from '@service/getData'
	export default{
		data(){
			return {
				djCatlist:null,
				counts:1,
				index:1,
				currentCate:null
			}
		},
		watch:{
			$route(to){
				if(to.name === 'discoverDjRadioCategory'){
					this.currentCate = to.query.id;
				}else{
					this.currentCate = null;
				}
			}
		},
		methods:{
			initData(){
				getDjCatlist().then(response=>{
					this.djCatlist = response.data.categories;
					this.counts = Math.ceil(this.djCatlist.length/18);
				});
			},
			prev(){
				if(this.index == 1){
					return;
				}
				this.index --;
			},
			next(){
				if(this.index == this.counts){
					return;
				}
				this.index ++;
			},
			go(index){
				this.index = index;
			}
		},
		created(){
			this.initData();
			this.currentCate = this.$route.query.id;
		}
	}
</script>

<style lang="scss" scoped>
	#dj-cate{
		.cate-container{
			position:relative;
			height:190px;
		}
		.catelist{
			margin:0 -33px -25px 0;
		}
		.cate-item{
			float:left;
			margin:0 33px 25px 0;			
		}
		.cate-link{
			display:block;
			width:70px;
			height:70px;
			box-sizing:border-box;
			border-radius:5px;
			text-align:center;
			color:#888;
			&:hover{
				background-color:#f6f7f7;
			}
			.icon{
				display:block;
				width:48px;
				height:48px;
				margin:0 auto;
			}
			&.active{
				color:#d35757;
				border:2px solid #d35757;
				.icon{
					margin-top:-2px;
					background-position:-48px 0;
				}
			}
		}
		%ctrl{
			position:absolute;
			top:72px;
			width:12px;
			height:30px;
			opacity:.35;
			background:url(../../../assets/radio_slide.png) no-repeat 0 0;
			&:hover{
				opacity:.55;
			}
			&.disabled{
				opacity:.15;
			}
		}
		.lctrl{
			@extend %ctrl;
			left:-23px;
			background-position:-3px -29px;
		}
		.rctrl{
			@extend %ctrl;
			right:0;
			background-position:-34px -29px;
		}
		.cursor{
			text-align:center;
			i{
				display:inline-block;
				width:6px;
				height:6px;
				margin:0 12px;
				background:url(../../../assets/radio_slide.png) no-repeat -7px -7px;
				&:hover{
					cursor:pointer;
					background-position:-37px -7px;
				}
				&.active{
					background-position:-37px -7px;
				}
			}
		}
	}
</style>