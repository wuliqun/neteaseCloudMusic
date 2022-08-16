<template>
	<div id="playlist-editer">
		<div class="header">
			<router-link :to="{name:'myMusicPlaylist',query:{name}}" class="name" v-once>
				{{name}}
			</router-link>&gt;编辑歌单
		</div>
		<div>
			<div class="item">
				<div class="label required">歌单名：</div>
				<div class="input">
					<input type="text" v-model="name" class="ipt">
				</div>
				<div class="tip error-msg" v-if="errorMsg">
					<i class="warning"></i>
					{{errorMsg}}
				</div>
			</div>
			<div class="item">
				<div class="label">标签：</div>
				<div class="input">
					<input type="text" v-model="tagStr" class="ipt">
				</div>
				<div class="tip">
				TIPS:标签之间以空格分开
				</div>
			</div>
			<div class="item">
				<div class="label">介绍：</div>
				<div class="input">
					<textarea id="" cols="50" rows="10" v-model="description" class="textarea"></textarea>	
				</div>
			</div>
			<div class="btn">
				<a class="save" @click="submitChange" :class="{disabled:!changed}">保存</a>
				<a class="cancel" @click="cancel">取消</a>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return {
				name:null,
				tags:null,
				description:null,
				tagStr:null,
				errorMsg:'',
				playlist:null
			}
		},
		methods:{
			...mapMutations('userDiyPlaylist',['updateUserDiyPlaylist']),
			cancel(){
				this.$router.push({
					name:'myMusicPlaylist', 
					query:{name:this.playlist.name}
				});
			},
			submitChange(){
				if(this.changed){
					this.updateUserDiyPlaylist({
						oldName:this.playlist.name,
						name:this.name.trim(),
						tags:this.tagStr.trim().split(/\s+/),
						description:this.description.trim()
					});
					this.$router.push({
						name:'myMusicPlaylist', 
						query:{name:this.name.trim()}
					});
				}
			}
		},
		computed:{
			...mapState('userDiyPlaylist',['userDiyPlaylist','userDiyPlaylistNameArr']),
			changed(){
				return !(this.name == this.playlist.name && this.description == this.playlist.description &&
					this.tagStr == this.playlist.tags.join(' '));
			}
		},
		created(){
			let name = this.$route.query.name;
			let index = this.userDiyPlaylistNameArr.indexOf(name.toString());
			let playlist = this.userDiyPlaylist[index];
			this.name = name;
			this.tagStr = playlist.tags.join(' ');
			this.description = playlist.description;
			this.playlist = playlist;
		}
	}
</script>

<style scoped>
	#playlist-editer{
		padding:20px;
	}
	#playlist-editer .header{
		padding:10px 0;
		margin-bottom:10px;
		font-weight:700;
		color:#000;
		border-bottom:1px solid #eee;
	}
	#playlist-editer .header .name{
		font-weight:normal;
		color:#0c73c2;
	}
	#playlist-editer .header .name:hover{
		text-decoration:underline;
	}
	#playlist-editer .item{
		margin:10px 0;
	}
	#playlist-editer .label{
		position:relative;
		float:left;
		width:60px;
		line-height:32px;
		text-align:right;
		color:#666;
	}
	#playlist-editer .input{
		margin-left:62px;
	}
	#playlist-editer .label.required:before{
		content:'*';
		position:absolute;
		top:0;
		left:0;
		line-height:32px;
		color:#ff0036;
	}
	#playlist-editer .input input{
		height:30px;
		line-height:30px;
		width:304px;		
		border:1px solid #999;
		padding:3px 5px;
		box-sizing:border-box;
	}
	#playlist-editer .tip{
		margin:5px 0 5px 62px;
	}
	#playlist-editer .tip.error-msg{
		color:#e33232;
	}
	#playlist-editer .tip.error-msg .warning{
		float:left;
		width:14px;
		height:14px;
		margin:2px 3px 0 0;
		background:url(../../img/icon-1.png) no-repeat -50px -270px;
	}
	#playlist-editer .btn{
		margin-left:62px;
	}
	#playlist-editer .btn a{
		display:inline-block;
		width:78px;
		height:29px;
		line-height:29px;
		text-align:center;
		border-radius:5px;
	}
	#playlist-editer .btn .save{
		color:#fff;
		border:1px solid #3984c1;
		background-color:#2e7ac3;
	}
	#playlist-editer .btn .save:hover{
		background-color:#408bd2;
	}
	#playlist-editer .btn .save.disabled{
		background-color:#eee;
		color:#bebebe;
		border-color:#ccc;
		cursor:default;
	}
	#playlist-editer .btn .cancel{
		color:#333;
		border:1px solid #c4c4c4;
		background-color:#fdfdfd;
	}
	#playlist-editer .btn .cancel:hover{
		background-color:#fefefe;
	}
	#playlist-editer .textarea{
		width:306px;
		height:160px;
		padding:3px 5px;
		box-sizing:border-box;
	}
</style>