<template>
	<div id="dld-banner">
		<div class="banner-wrapper clearfix">
			<div class="banner-container">
				<div class="img-wrap">
					<transition>
						<span class="img" :style="{'background-image':'url(' + imgs[currentIndex] + ')'}" :key="imgs[currentIndex]"></span>
					</transition>
				</div>
				<ul class="cursor clearfix">
					<li v-for="(item,index) in imgs" :class="{act:index==currentIndex}" @click="goto(index)" :key="item.id"></li>
				</ul>
			</div>
			<div class="clients">
				<ul class="clients-list">
					<li></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				imgs:['https://s2.music.126.net/style/web2/img/down/banner-ios.png?2d83ec5d56c52fb3a749bce72d859a2c','https://s2.music.126.net/style/web2/img/down/banner-aos.png?c49792d49947fe09da7e3c5c3a46f04e','https://s2.music.126.net/style/web2/img/down/banner-pc.png?d83ae5fba8335e997611b618b066feae'],
				currentIndex:0,
				playTimer:undefined
			}
		},
		methods:{
			goto(index){
				this.currentIndex = index;
				this.autoplay();
			},
			autoplay(){
				clearInterval(this.playTimer);
				this.playTimer = setInterval(()=>{
					this.currentIndex ++;
					if(this.currentIndex === this.imgs.length){
						this.currentIndex = 0;
					}
				},5000);
			}
		},
		mounted(){
			this.autoplay();
		}
	}
</script>
<style scoped>
	#dld-banner{
		height:483px;
		background:url('https://s2.music.126.net/style/web2/img/down/bg.jpg?97bd9614329561f15e304cbec1ec64b2') no-repeat 50% 50%;
	}	
	#dld-banner .banner-wrapper{
		width:982px;
		margin:0 auto;
	}
	#dld-banner .banner-container{
		position:relative;
		float:left;
	}
	#dld-banner .img-wrap{
		position:relative;
		width:545px;
		height:465px;
		padding:16px 50px 0 35px;
	}
	#dld-banner .img-wrap .img{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background-repeat:no-repeat;
		background-position:50% 50%;
	}
	#dld-banner .img-wrap .img.v-enter-active{
		animation:fadeIn 1.5s;
	}
	@keyframes fadeIn{
		from{
			opacity:0
		}
		to{
			opacity:1
		}
	}
	#dld-banner .cursor{
		position:absolute;
		bottom:13px;
		left:45px;
		height:9px;
		margin-right:-8px;	
	}
	#dld-banner .cursor li{
		float:left;
		width:9px;
		height:9px;
		margin-right:8px;
		border-radius:50%;
		background-color:#8695ac;
	}
	#dld-banner .cursor li.act{
		background-color:#fff;
	}
</style>