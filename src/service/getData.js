import {baseUrl,requestConfig} from '../config/env'
import axios from 'axios'
import analyze from 'rgbaster'

axios.defaults.baseURL = baseUrl;

// 获取轮播图，没有携带容器背景图片，需自己获取图片主色
// 使用rgbaster  部分图片会显得不协调
export const getBannerData = ()=>{
	return axios.get('/banner',requestConfig);
}

export const getImageMainColor = (url)=>{
	return analyze(url);
}

export const search = (keyword)=>{
	return axios.get('/search/suggest?keywords=' + keyword);
}
export const searchByType = ({keywords,type=1,limit=30,offset=0})=>{
	return axios.get('/search',{
		params:{
			keywords,
			type,
			limit,
			offset
		}
	});
}
// 获取热门推荐数据
export const getHotRecommend = ()=>{
	return axios.get('/personalized');
}

// 获取热门歌单分类，主页热门推荐小标题
export const getHotPlaylistCategory = ()=>{
	return axios.get('/playlist/hot');
}

// 获取首页的新碟上架数据，在首页与新碟上架页通用，放入store中
export const getNewAlbums = ()=>{
	return axios.get('/album/newest');
}

//获取榜单信息，在首页与榜单页通用，放入store中
export const getToplist = ()=>{
	return axios.get('/toplist');
}

// 获取榜单详情 
export const getToplistDetail = (id)=>{
	return axios.get('/top/list?idx=' + id);
}

/**
 * [获取歌手列表]
 * @param  {参数对象} cat 分类  limit返回数量30  offset偏移量0
 *                    如cat=5001&limit=5&offset=0
 * @return {[type]}     array  歌手列表
 */
export const getSingerList = ({cat='5001',offset=0,initial='',limit=100}={})=>{
	let url = '/artist/list?' //cat=5001&limit=5 入驻歌手
	url += 'cat=' + cat;
	url += '&offset=' + offset;
	if(limit){
		url += '&limit=' + limit;
	}
	if(initial){
		url += '&initial=' + initial;
	}
	return axios.get(url);
}
export const getSignedArtist = ({offset=0,limit=30})=>{
	return getSingerList({
		offset,
		limit
	});
}
// 热门歌手  首页需获取100个
export const getTopArtists = ({limit=100,offset=0}={})=>{
	let url = '/top/artists?' 
	url += 'limit=' + limit + '&';
	url += 'offset=' + offset;	
	return axios.get(url);
}

// 获取付费精选  热门主播接口找不到，用付费精选替代
export const getPaygift = ()=>{
	return axios.get('/dj/paygift');
}

// 获取歌单详情，参数id
export const getPlaylistDetail = (id)=>{
	return axios.get('/playlist/detail?id=' + id);
}
//获取专辑详情
export const getAlbumDetail = (id)=>{
	return axios.get('/album?id=' + id);
}
// 获取评论  参数type=playlist|song|album  id
export const getComment = ({type='song',id,offset=0,limit=20} = {})=>{
	return axios.get('/comment/' + type + '?id=' + id + '&offset=' + offset + '&limit=' + limit);
}

// 获取歌曲播放链接
export const getAudioUrl = (id)=>{
	return axios.get('/song/url?id=' + id);
}

export const getPlaylst = ({limit=35,cat='',order='new',offset=0}={})=>{
	return axios.get('/top/playlist?' + 'limit=' + limit + '&cat='+cat + '&order=' + order + '&offset=' + offset);
}

export const getPlaylstCatlist = ()=>{
	return axios.get('/playlist/catlist');
}

export const getDjCatlist = ()=>{
	return axios.get('/dj/catelist');
}

export const getDjRecommend = ()=>{
	return axios.get('/program/recommend');
}
export const getDjRank = ()=>{
	return axios.get('/dj/recommend');
}

export const getDjRecommendByType = (type)=>{
	return axios.get('/dj/recommend/type?type=' + type);
}

export const getAlbums = ({limit=30,offset=0})=>{
	return axios.get('/top/album?offset=' + offset + '&limit=' + limit);
}

// detail

export const getSongDetailInfo = ({id})=>{
	return axios.get('/song/detail?ids=' + id);
}
export const getSongLyric = (id)=>{
	return axios.get('/lyric?id=' + id)
}