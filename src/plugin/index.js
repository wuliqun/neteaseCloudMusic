import PlayerMessage from './playerMessage'
import Toast from './toast'

export default{
    install(Vue,options={}){
        const VueToast = Vue.extend(Toast)
        const VuePlayerMessage = Vue.extend(PlayerMessage)
        let vueToast = null;
        let playerMsg = null;
        function toast(params){
            if(!vueToast){
                vueToast = new VueToast()
                vueToast.$mount()
                document.body.appendChild(vueToast.$el)
            }
            vueToast.show(params)
        }
        function showPlayerMessage(params){
            if(!playerMsg){
                playerMsg = new VuePlayerMessage();
                playerMsg.$mount('#info');
            }
            playerMsg.showMsg(params);
        }
        Vue.prototype.$message = {
            success(msg,duration){
                toast({
                    msg,
                    type:"success",
                    duration
                })
            },
            warning(msg,duration){
                toast({
                    msg,
                    type:"warn",
                    duration
                })
            },
            playerMessage(msg,duration){
                showPlayerMessage({
                    msg,
                    duration
                })
            }
        }
    }
}