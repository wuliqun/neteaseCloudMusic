import {
    getStore,
    setStore
} from '@service/storageApi'
import {
    getPlaylistDetail,
    getAlbumDetail,
    getSongDetailInfo
} from '@service/getData'

const state = {
    playlist:null,
    playlistIdArr:null,
    restartPlayer:false,
    playingId:null //当前正在播放的歌曲
}
const getters = {

}
const mutations = {
    insertIntoPlaylist:(state,payload)=>{
        if(Array.isArray(payload)){
            var idArr = [];
            // 去重            
            for(var i=0;i<payload.length;i++){
                var idx = state.playlistIdArr.indexOf(payload[i].id);
                idArr.push(payload[i].id);
                if(idx !== -1){
                    state.playlist.splice(idx,1);
                    state.playlistIdArr.splice(idx,1);
                }
            }
            // 拼接
            state.playlist = payload.concat(state.playlist);
            state.playlistIdArr = idArr.concat(state.playlistIdArr);
        }else{
            var idx = state.playlistIdArr.indexOf(payload.id)
            if(idx === -1){
                state.playlist.unshift(payload);
                state.playlistIdArr.unshift(payload.id);
            }else{
                state.playlist.splice(idx,1);
                state.playlistIdArr.splice(idx,1);
                state.playlist.unshift(payload);
                state.playlistIdArr.unshift(payload.id);

            }
        }
        state.restartPlayer = true;
    },
    pushIntoPlaylist:(state,payload)=>{
        if(Array.isArray(payload)){
            var idArr = [];
            // 去重            
            for(var i=0;i<payload.length;i++){
                var idx = state.playlistIdArr.indexOf(payload[i].id);
                if(idx !== -1){
                    payload.splice(idx,1);
                    i --;
                }else{
                    idArr.push(payload[i].id);
                }
            }            
            // 拼接
            state.playlist = state.playlist.concat(payload);
            state.playlistIdArr = state.playlistIdArr.concat(idArr);
        }else{
            var idx = state.playlistIdArr.indexOf(payload.id)
            if(idx === -1){
                state.playlist.push(payload);
                state.playlistIdArr.push(payload.id);
            }
        }
    },
    removeItemOfPlaylist:(state,index)=>{
        state.playlist.splice(index,1);
        state.playlistIdArr.splice(index,1);
    },
    clearPlaylist:(state)=>{
        state.playlist = [];
        state.playlistIdArr = [];
    },
    setPlaylist:(state,payload)=>{
        state.playlist = payload;
        state.playlistIdArr = payload.map(item=>{
            return item.id;
        });
    },
    toggleRestartPlayer:(state)=>{
        state.restartPlayer = !state.restartPlayer;
    },
    savePlaylist:(state)=>{
        setStore('playlist',state.playlist);
    },
    setPlayingId:(state,id)=>{
        state.playingId = id;
    },
    removePlayingId:state=>{
        state.playingId = null;
    }
}
const actions = {
    initPlaylist:({commit,state})=>{
        var playlist = getStore('playlist') || [];
        commit('setPlaylist',playlist);
    },
    insertListIntoPlaylistById:({commit,state},id)=>{
        getPlaylistDetail(id).then(response=>{
			commit('insertIntoPlaylist',response.data.playlist.tracks);
		});
    },
    pushListIntoPlaylistById:({commit,state},id)=>{
        getPlaylistDetail(id).then(response=>{
			commit('pushIntoPlaylist',response.data.playlist.tracks);
		});
    },
    insertSongIntoPlaylistById:({commit,state},id)=>{
        getSongDetailInfo({id}).then(res=>{
            commit('insertIntoPlaylist',res.data.songs[0]);
        })
    },
    pushSongIntoPlaylistById:({commit,state},id)=>{
        getSongDetailInfo({id}).then(res=>{
            commit('pushIntoPlaylist',res.data.songs[0]);
        })
    },
    insertListIntoPlaylistByAlbumId:({commit,state},id)=>{
        getAlbumDetail(id).then(response=>{
			commit('insertIntoPlaylist',response.data.songs);
		});
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}