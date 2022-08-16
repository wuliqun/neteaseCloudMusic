import {
	getNewAlbums,
} from 'API/getData'

const state = {
    newAlbums:null
}
const getters = {
    
}
const mutations = {
    setNewAlbums:(state,payload)=>{
        state.newAlbums = payload
    }
}
const actions = {
    initNewAlbums:({commit,state})=>{
        if(!state.newAlbums){
            getNewAlbums().then(response=>{
                commit('setNewAlbums',response.data.albums.splice(0,10));
            })
        }
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}