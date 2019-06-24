import {
    getStore,
    setStore
} from '@service/storageApi'

const state = {
    isAddDiyListPanelShowing:false,
    isCreateDiyListPanelShowing:false,
    userDiyPlaylist:null,
    userDiyPlaylistNameArr:null,
    songWaitToAdd:null,
    songListWaitToAdd:null
}
const getters = {
    playlistNameExist:(state)=>name=>{
        return state.userDiyPlaylistNameArr.indexOf(name) !== -1;
    }
}
const mutations = {
    showAddDiyListPanel:(state)=>{
        state.isAddDiyListPanelShowing = true;
    },
    hideAddDiyListPanel:(state)=>{
        state.isAddDiyListPanelShowing = false;
    },
    showCreateDiyListPanel:(state)=>{
        state.isCreateDiyListPanelShowing = true;
    },
    hideCreateDiyListPanel:(state)=>{
        state.isCreateDiyListPanelShowing = false;
    },
    removeDiyPlaylist:(state,payload)=>{
        if(payload === 'undefined'){
            state.userDiyPlaylist = [];
            state.userDiyPlaylistNameArr = [];
        }else{
            state.userDiyPlaylist.splice(payload,1);
            state.userDiyPlaylistNameArr.splice(payload,1);
        }
    },
    createDiyPlaylist:(state,{name,user})=>{
        state.userDiyPlaylistNameArr.push(name);
		state.userDiyPlaylist.push({
			name,
			coverImgUrl:'https://p1.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=200y200',
			tracks:[],
			creator:user,
			createTime:Date.now(),
			subscribedCount:0,
			shareCount:0,
			commentCount:0,
			tags:[],
			description:'',
			idArr:[]//包含哪些歌曲，避免重复
		});
    },
    addSongToDiyPlaylistByName:(state,name)=>{
        var index = state.userDiyPlaylistNameArr.indexOf(name);
        if(index === -1){
            return
        }
        var playlist = state.userDiyPlaylist[index];
        if(state.songWaitToAdd){
            if(playlist.idArr.indexOf(state.songWaitToAdd.id) === -1){
                // 添加第一首歌  更新封面
                if(playlist.tracks.length === 0){
                    playlist.coverImgUrl = state.songWaitToAdd.al.picUrl;
                }
                playlist.tracks.push(state.songWaitToAdd);
                playlist.idArr.push(state.songWaitToAdd.id);
            }
        }else if(state.songListWaitToAdd){
            var list = state.songListWaitToAdd;
            if(playlist.tracks.length === 0){
                playlist.coverImgUrl = list[0].al.picUrl;
                playlist.tracks = list;
                playlist.idArr = list.map(item=>item.id);
            }else{
                var idArr = [];
                // 去重
                for(var i=0;i<list.length;i++){
                    idArr.push(list[i].id);
                    var index = playlist.idArr.indexOf(list[i].id);
                    if(index !== -1){
                        playlist.tracks.splice(index,1);
                        playlist.idArr.splice(index,1);
                    }
                }
                playlist.tracks = playlist.tracks.concat(list);
                playlist.idArr = playlist.idArr.concat(idArr);
            }
        }             
    },
    setSongWaitToAdd:(state,payload)=>{
        state.songWaitToAdd = payload;
    },
    setSongListWaitToAdd:(state,payload)=>{
        state.songListWaitToAdd = payload;
    },
    updateUserDiyPlaylist:(state,payload)=>{
        var index = state.userDiyPlaylistNameArr.indexOf(payload.oldName);
        if(index !== -1){
            state.userDiyPlaylistNameArr.splice(index,1,payload.name);
            state.userDiyPlaylist[index].name = payload.name;
            state.userDiyPlaylist[index].tags = payload.tags;
            state.userDiyPlaylist[index].description = payload.description;
        }
    },
    delUserDiyPlaylistTrack:(state,payload)=>{
        var name = payload.name;
        var index = payload.index;
        var listIndex = state.userDiyPlaylistNameArr.indexOf(name);
        if(listIndex === -1) return ;
        var playlist = state.userDiyPlaylist[listIndex];
        playlist.tracks.splice(index,1);
        playlist.idArr.splice(index,1);
        console.log(playlist);
    },
    removeWaitToAdd:(state)=>{
        state.songListWaitToAdd = null;
        state.songWaitToAdd = null;
    },
    setUserDiyPlaylist:(state,payload)=>{
        state.userDiyPlaylist = payload;
        state.userDiyPlaylistNameArr = payload.map(item=>{
            return item.name;
        });
    },
    saveUserDiyPlaylist:(state)=>{
        setStore('userDiyPlaylist',state.userDiyPlaylist);
    }
}
const actions = {
    // 初始化用户自建歌单，这里虽然是读本地，不需要网络
    // 但正式环境应该是网络获取，所以使用action
    initUserDiyPlaylist:({commit})=>{
        var userDiyPlaylist = getStore('userDiyPlaylist') || [];
        commit('setUserDiyPlaylist',userDiyPlaylist);
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}