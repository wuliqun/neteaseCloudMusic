<template>
	<div class="panel">
		<div class="header clearfix">
			<p class="tit">新建歌单</p>
			<i class="close" @click="hide"></i>
		</div>
		<div class="panel-content">
			<div class="input-wrap">
				歌单名：<input type="text" v-model="name">
			</div>
			<div class="error-msg">{{errorMsg}}</div>
			<p class="tips">可通过“收藏”将音乐添加到新歌单中</p>
			<div class="btn clearfix">
				<a class="create" @click="createPlayList">新 建</a>
				<a class="cancel" @click="hide">取 消</a>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default{
		data(){
			return {
                name:'',
                errorMsg:''
			}
		},
		methods:{
			...mapMutations('userDiyPlaylist',['createDiyPlaylist','hideCreateDiyListPanel']),
			hide(){
                this.name = '';
                this.errorMsg = '';
				this.hideCreateDiyListPanel();
			},
			createPlayList(){
				let name = this.name.trim();
				if(!name){
					this.errorMsg = '歌单名不能为空';
				}else if(this.playlistNameExist(name)){
                    this.errorMsg = `您已创建了名称为“${name}”的歌单哦~~，再选一个名字吧`;
				}else{
					this.createDiyPlaylist({
                        name,
                        user:this.localUser
                    });
					this.hideCreateDiyListPanel();
				}
			}
		},
		mounted(){
		},
		computed:{
            ...mapGetters('userDiyPlaylist',['playlistNameExist']),
            ...mapState(['localUser'])
		}
	} 
</script>

<style lang="scss" scoped>
	@mixin wh($w,$h){
		width:$w;
		height:$h;
	}
	.panel{
		.panel-content{
			padding:40px 30px;
			background-color:#fff;
		}
		.input-wrap{
			line-height:32px;
			color:#333;
			input{
				@include wh(344px,32px);
				padding:3px 5px;
				box-sizing:border-box;
				border:1px solid #cdcdcd;
			}
		}
		.error-msg{
			height:20px;
			margin:5px 0 15px 48px;
			line-height:20px;
			color:#ff0036;
		}
		.tips{
			margin-left:48px;
			color:#999;
		}
		.btn{
			margin:20px 0 0 48px;
			a{
				position:relative;
				float:left;
				@include wh(80px,31px);
				line-height:31px;
				text-align:center;
				font-size:13px;
				margin-right:23px;
				background:url(../../img/button2.png) no-repeat 0 0;
				&:after{
					content:'';
					position:absolute;
					@include wh(5px,31px);
					top:0;
					right:0;
					background:url(../../img/button2.png) no-repeat 0 0;
				}
			}
			.create{
				color:#fff;
				background-position:0 -387px;
				&:hover{
					background-position:0 -469px;
					&:after{
						background-position:-245px -510px;
					}
				}
				&:after{
					background-position:-245px -428px;
				}
			}
			.cancel{
				color:#666;
				background-position:0 -141px;
				&:hover{
					background-position:0 -223px;
					&:after{
						background-position:-245px -264px;
					}
				}
				&:after{
					background-position:-245px -182px;
				}
			}
		}
	}
</style>