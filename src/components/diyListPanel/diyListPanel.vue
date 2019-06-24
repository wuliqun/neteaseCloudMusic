<template>
	<div id="mask" v-if="isAddDiyListPanelShowing || isCreateDiyListPanelShowing">
		<div class="layout"></div>
		<add-diy-list-panel v-if="isAddDiyListPanelShowing && !isCreateDiyListPanelShowing"></add-diy-list-panel>
		<create-diy-list-panel v-if="isCreateDiyListPanelShowing"></create-diy-list-panel>
	</div>
</template>

<script>
	import addDiyListPanel from './addDiyListPanel'
	import createDiyListPanel from './createDiyListPanel'
	import {mapState} from 'vuex'
	export default{
		data(){
			return {}
		},
		components:{
            createDiyListPanel,
            addDiyListPanel
		},
		computed:{
			...mapState('userDiyPlaylist',['isAddDiyListPanelShowing','isCreateDiyListPanelShowing'])
		}
	}
</script>

<style lang="scss">
	@mixin wh($w,$h){
		width:$w;
		height:$h;
	}
	#mask{
		position:fixed;
        z-index:999;
		top:0;
		left:0;
		right:0;
		bottom:0;
		text-align:center;
		.layout{
			display:inline-block;
			width:1px;
			height:100%;
			vertical-align:middle;
		}
		.panel{
			display:inline-block;
			width:478px;
			box-shadow:0 0 5px #000;
			border-radius:10px;
			text-align:left;
			vertical-align:middle;
		}
		.success-info{
			display:inline-block;
			width:280px;
			box-shadow:0 0 8px #999;
			text-align:center;
			border:1px solid #c0c0c0;
			vertical-align:middle;
		}
		.header{
			height:38px;
			padding:0 18px;
			line-height:38px;
			cursor:move;
			font-size:14px;
			background-color:#2d2d2d;
		}
		.tit{
			float:left;
			color:#fff;
			font-weight:700;
		}
		.close{
			float:right;
			@include wh(14px,14px);
			margin-top:12px;
			cursor:pointer;
			background:url(../../assets/icon.png) -73px -363px;
		}
	}
</style>