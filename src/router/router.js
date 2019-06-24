const Recommend = () => import('@pages/recommend')
const My = () => import('@pages/my')
const Blank = ()=> import('@components/blank')
const PlaylistDetail = ()=> import('@components/playlistDetail')
const PlaylistEditor = ()=> import('@components/playlistEditor')
const Friend = () => import('@pages/friend')

const Download = () => import('@pages/download')

const Toplist = () => import('@pages/toplist')

const DiscoverPlaylist = () => import('@pages/playlist')

const DjRadio = () => import('@pages/djRadio')
const DjRadioIndex = () => import('@pages/djRadio/components/index')
const DjRadioCategory = () => import('@pages/djRadio/components/category')
const DjRadioRecommend = () => import('@pages/djRadio/components/recommend')
const DjRadioRank = () => import('@pages/djRadio/components/rank')

const DiscoverArtist = () => import('@pages/artist')
const DiscoverArtistIndex = ()=>import('@pages/artist/components/index')
const DiscoverSignedArtistList= ()=>import('@pages/artist/components/signedArtistList')
const DiscoverArtistList = ()=>import('@pages/artist/components/cat')

const DiscoverNewAlbum = () => import('@pages/newAlbum')

const Search = () => import('@pages/search')
const Mv = () => import('@pages/detail/mv')
const Song = () => import('@pages/detail/song')
const Album = () => import('@pages/detail/album')
const Artist = () => import('@pages/detail/artist')
const Playlist = () => import('@pages/detail/playlist')
const UserHome = () => import('@pages/detail/userHome')
const Dj = () => import('@pages/detail/dj')
const Program = () => import('@pages/detail/program')

export default {
    mode : 'hash',
    routes: [
    	{
            path:'/',
            name:'index',
            redirect:{
                name:'discoverRecommend'
            }
        },
        {
            path:'/discover',
            name:'discoverRecommend',
            component:Recommend
        },
        {
            path:'/discover/toplist',
            name:'discoverToplist',
            component:Toplist
        },
        {
            path:'/discover/playlist',
            name:'discoverPlaylist',
            component:DiscoverPlaylist
        },
        {
            path:'/discover',
            name:'discoverRecommend',
            component:Recommend
        },
        {
            path:'/discover/djradio',
            name:'discoverDjRadio',
            component:DjRadio,
            children:[
                {
                    path:'',
                    name:'discoverDjRadioIndex',
                    component:DjRadioIndex
                },
                {
                    path:'category',
                    name:'discoverDjRadioCategory',
                    component:DjRadioCategory
                }
            ]
        },
        {
            path:'/discover/djradio/recommend',
            name:'discoverDjRadioRecommend',
            component:DjRadioRecommend
        },
        {
            path:'/discover/djradio/rank',
            name:'discoverDjRadioRank',
            component:DjRadioRank
        },
        {
            path:'/discover/artist',
            name:'discoverSinger',
            component:DiscoverArtist,
            children:[
                {
                    path:'',
                    name:'discoverSingerIndex',
                    component:DiscoverArtistIndex
                },
                {
                    path:'signed',
                    name:'discoverSingerSigned',
                    component:DiscoverSignedArtistList
                },
                {
                    path:'cat',
                    name:'discoverSingerCategory',
                    component:DiscoverArtistList
                }
            ]
        },
        {
            path:'/discover/newalbum',
            name:'discoverNewAlbum',
            component:DiscoverNewAlbum
        },
        {
            path:'/my',
            name:'my',
            component:My,
            children:[
                {
                    path:'music/blank',
                    name:'myMusicBlank',
                    component:Blank
                },
                {
                    path:'music/playlist',
                    name:'myMusicPlaylist',
                    component:PlaylistDetail
                },
                {
                    path:'music/playlist/edit',
                    name:'myMusicEditor',
                    component:PlaylistEditor
                }
            ]
        },
        {
            path:'/friend',
            name:'friend',
            component:Friend
        },
        {
            path:'/download',
            name:'download',
            component:Download
        },
        { // down all TODO:
            path:'/mv',
            name:'mv',
            component:Mv
        },
        {
            path:'/song',
            name:'song',
            component:Song
        },
        {
            path:'/album',
            name:'album',
            component:Album
        },
        {
            path:'/artist',
            name:'artist',
            component:Artist
        },
        {
            path:'/playlist',
            name:'playlist',
            component:Playlist
        },
        {
            path:'/user/home',
            name:'userHome',
            component:UserHome
        },
        {
            path:'/dj',
            name:'dj',
            component:Dj
        },
        {
            path:'/program',
            name:'program',
            component:Program
        },
        {
            path:'/search',
            name:'search',
            component:Search
        }
    ]
}
