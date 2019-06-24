import Vue from 'vue'
import Vuex from 'vuex'

import album from './modules/album'
import playlist from './modules/playlist'
import collectionList from './modules/collectionList'
import userDiyPlaylist from './modules/userDiyPlaylist'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        localUser:{
            level: 3,
            listenSongs: 4547,
            userId: 123456789,
            gender: 1,
            nickname: "localUser",
            birthday: 1552435200000,
            avatarUrl: "http://p2.music.126.net/eck-T1bNegtEU-1JY3zFTA==/18553159209010581.jpg?param=180y180",
            peopleCanSeeMyPlayRecord: true,
            adValid: false,
            code: 200,
            createTime: 1552469167343
        }
    },
    getters:{

    },
    mutations:{

    },
    actions:{

    },
    modules:{
        album,
        playlist,
        collectionList,
        userDiyPlaylist
    }
})