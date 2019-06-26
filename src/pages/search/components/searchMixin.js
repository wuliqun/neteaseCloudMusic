export default{
    props:{
        list:Array,
        keyword:String
    },
    methods:{
        wrapKeywords(str){
            return str.replace(this.keyword,`<span style="color:#0c73c2;">${this.keyword}</span>`)
        }
    }
}