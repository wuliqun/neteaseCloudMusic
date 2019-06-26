<template>
    <div class="search-page">
        <div class="wrapper">
            <div class="head">
                <div class="head-wrap clearfix">
                    <input 
                        type="text" 
                        name="keyword" 
                        v-model="keyword" 
                        autocomplete="off"
                        class="input">
                    <button 
                        class="submit"
                        title="搜索">                        
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="info-desc" v-if="lastKeyword">搜索“{{ lastKeyword }}”,共找到<span class="red">{{ count }}</span>{{ type | type2str }}</div>
                <search-tab
                    @changetype="changeType"
                    :type="type">
                </search-tab>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchTab from './components/searchTab'
    export default {
        data(){
            return {
                lastKeyword:'',
                keyword:'',
                type:1000,
                count:600
            }
        },
        created(){
            this.initData();
        },
        methods:{
            initData(){
                this.keyword = this.lastKeyword = this.$route.query.s;
                this.type = Number(this.$route.query.type) || 1;
            },
            changeType(type){
                this.type = type;
            }
        },
        filters:{
            type2str(type){
                type = Number(type)
                switch(type){
                    case 1:
                        return "首单曲"
                    case 100:
                        return "个歌手"
                    case 10:
                        return "张专辑"
                    case 1014:
                        return "个视频"
                    case 1000:
                        return "个歌单"
                    case 1006:
                        return "个歌词"
                    case 1009:
                        return "个节目"
                    case 1002:
                        return "个用户"
                }
            }
        },
        components:{
            SearchTab
        }
    }
</script>
<style lang="scss" scoped>
    .search-page{
        background-color: #f5f5f5;
        .head{
            padding:40px 0 30px;
            .head-wrap{
                width:420px;
                margin:0 auto;
            }
            .input{
                float: left;
                width:370px;
                box-sizing: border-box;
                padding:0 20px;
                line-height: 38px;
                border:1px solid #c9c9c9;
                border-radius: 5px 0 0 5px/5px 0 0 5px;
                box-shadow:2px -2px 3px insert #ccc;
            }
            .submit{
                float: left;
                height:40px;
                width:50px;
                box-sizing: border-box;
                border:1px solid #c9c9c9;
                border-left: none;
                border-radius: 0 5px 5px 0/0 5px 5px 0;
                cursor:pointer;
                background:url(../../assets/topbar.png) no-repeat 8px -95px #f8f8f8;
            }
        }
        .info-desc{
            margin-bottom: 15px;
        }
        .content{
            padding:0 40px;
            .red{
                margin:0 4px;
                color:#c20c0c;
            }
        }
    }
    .wrapper{
        width:982px;
        margin:0 auto;
        border:solid #d3d3d3;
        border-width:0 1px;
        background-color: #fff;
    }
</style>

