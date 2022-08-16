import {
    getStore,
    setStore    
} from 'API/storageApi'

import {
	getPlaylistDetail
} from 'API/getData'

const state = {
    collectionList:null,
    collectionListIdArr:null
}
const getters = {
    isPlaylistCollected:(state) => (id) =>{
        return state.collectionListIdArr.indexOf(id) !== -1;
    }
}
const mutations = {
    setCollectionList:(state,payload)=>{
        state.collectionList = payload;
        state.collectionListIdArr = payload.map(item=>{
            return item.id;
        });
    },
    addCollect:(state,payload)=>{
        var idx = state.collectionListIdArr.indexOf(payload.id);
        if(idx === -1){
            state.collectionList.push(payload);
            state.collectionListIdArr.push(payload.id);
        }
    },
    removeCollectByIndex:(state,index)=>{
        state.collectionList.splice(index,1);
        state.collectionListIdArr.splice(index,1);
    },
    removeCollectById:(state,id)=>{
        var index = state.collectionListIdArr.indexOf(id);
        if(index !== -1){
            state.collectionList.splice(index,1);
            state.collectionListIdArr.splice(index,1);
        }        
    },
    saveCollectionList:(state)=>{
        setStore('collectionList',state.collectionList);
    }
}
const actions = {
    initCollectionList:({commit,state})=>{
        var collectionList = getStore('collectionList') || []
        commit('setCollectionList',collectionList);
    },
    addCollectById:({commit,state},id) =>{
        getPlaylistDetail(id).then(res=>{
            commit('addCollect',res.data.playlist);
        })
    }  
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}