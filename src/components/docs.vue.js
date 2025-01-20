import {field_filter} from '../../functions.js'

export default {
    name: 'docs',
    props: ['docs', 'keyword'],
    template: "#docs",
    methods: {
        get_url(){           
            return this.$store.getters['principal/base_url']
        },
        check_metadata(metadata, key) {
            if (!field_filter(key))
                return false

            if (typeof metadata == "object")
                if (metadata == null || metadata.length < 1) {
                    return false
                }

            if (typeof metadata === "string")
                if (metadata == "") {
                    return false
                }


            return true
        },
        clean_search(){
            var val = "";
            this.tmp_keyword = val;
            var params = this.$store.getters['principal/url'].split("?");
            var urlParams = new URLSearchParams(this.$store.getters['principal/url'].split('?')[1]);
            urlParams.delete('op');
            //urlParams.delete(this.search_in);
            urlParams.delete('commit');
            urlParams.delete('search_field');
            urlParams.delete('q');
            this.$store.commit('principal/set_url', params[0] + "?" + urlParams.toString());
        },
        isObject(o) {
            //console.log("keyword: " + this.keyword);
            return typeof o == "object"
        }
    },
    mounted(){

    }
}