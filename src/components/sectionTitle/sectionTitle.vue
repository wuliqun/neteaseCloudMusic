<template>
    <div class="section-title">
        <div class="section-title-wrapper clearfix">
            <i class="circle"></i>
            <h2>
				<router-link :to="{name:routerName}">{{ name }}</router-link>
			</h2>
			<ul class="sublinks" v-if="sublinks.length">				
				<template v-for="(link,index) in sublinks">
					<li class="sublink" :key="link.name">
						<router-link :to="{name:sublinkRouterName,query:{id:link.id}}">{{ link.name }}</router-link>
					</li>
					<li class="seperator" :key="link.name + index"></li>
				</template>
			</ul>
			<div class="more">
				<router-link :to="{name:routerName}">更多</router-link>
				<i class="arrow"></i>
			</div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            name:String,
            routerName:String,
            sublinks:{
                type:Array,
                default(){
                    return []
                }
            },
            sublinkRouterName:String
        }
    }
</script>
<style lang="scss" scoped>
    .section-title{
		padding-bottom:3px;
		border-bottom:2px solid #c10d0c;	
        .circle{
            float:left;
            width:6px;
            height:6px;
            margin:8px 10px;
            border:4px solid #c10d0c;
            border-radius:50%;
        }
        h2{
            float:left;
            font-size:20px;
            line-height:30px;
        }
        h2 a{
            color:#333;
        }
        h2 a:hover{
            text-decoration:none;
        }
        .sublinks{
            float:left;
            margin-left:20px;
            a:hover{
                text-decoration: underline;
            }
        }
        .sublinks li{
            float:left;
            margin-top:10px;
        }
        .sublinks .seperator{
            height:11px;
            width:2px;
            margin:15px 14px 0;
            background-color:#dcdcdc;
        }
        .sublinks .seperator:last-child{
            display:none;
        }
        .more{
            float:right;
            margin:10px 10px 0 0;
            a:hover{
                text-decoration: underline;
            }
        }
        .more .arrow{
            display:inline-block;
            width:12px;
            height:12px;
            background:url(../../assets/index.png) no-repeat 0 -240px;
        }
    }
</style>

