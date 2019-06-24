<template>
	<div>
		<download-banner></download-banner>
		<client-ad></client-ad>
		<download-foot></download-foot>
	</div>
</template>
<script>
	import DownloadBanner from './components/downloadBanner'
	import ClientAd from './components/clientAd'
	import DownloadFoot from './components/downloadFoot'
	export default{
		data(){
			return {}
		},
		components:{
			DownloadBanner,
			ClientAd,
			DownloadFoot
		}
	}
</script>
