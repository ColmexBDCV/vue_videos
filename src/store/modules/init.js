import ENV from '../../../config/.env.js'
import filter_data from '../../../functions.js'

export default {
    namespaced: true,
    state: {
        repo: '',
        base_url: ENV.BASE_URL,
        link_url: ENV.LINK_URL,
        share_url: ENV.SHARE_URL,
        url: ENV.THEMATIC_URL,
        url_aux: ENV.THEMATIC_URL_AUX,
        video_url: ENV.VIDEO_URL,
        modalFacets: false,
        collections: [],
    },
    mutations: {
        set_repo(state, repo) {
			state.repo = repo;
        },
        set_url(state, url){
            state.url = url;
        },
        set_modalFacets(state, value){
            state.modalFacets = value;
        },
        set_collections(state, value){
            value.facets.forEach(element => {
                //alert(element.name);
                if(element.name == "thematic_collection_sim"){                      
                    //alert(JSON.stringify(element.items));
                    state.collections= element.items;
                    return false;
                }
            });
        }
    },
    getters: {
        repo(state){
            return state.repo
        },
        url(state){
            return state.url
        },
        modalFacets(state){
            return state.modalFacets
        },
        base_url(state){
            return state.base_url;
        },
        link_url(state){
            return state.link_url;
        },
        share_url(state){
            return state.share_url;
        },
        video_url(state){
            return state.video_url;
        },
        collections(state){
            return state.collections;
        },
    },
    actions: {
        async get_data({ state, commit },send_url) {
            //console.log(state.url);
            await axios.get(state.url)
               .then(response => {
                   var repository = filter_data(response.data.response);
                   commit('set_repo', repository);
                   commit('set_collections', repository);
               })
       },
       async reset_data({ commit, state, dispatch }) {
        // Llamas a la mutación usando commit
        commit('set_url', state.url_aux);
      
        // Si "get_data" es otra acción, la llamas con dispatch
        await dispatch('get_data', state.url_aux);
      }
    },
}