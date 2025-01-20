import {field_filter} from '../../functions.js'
import filter_data from '../../functions.js'

export default {
    name: 'grid',
    props: ['docs', 'keyword', 'collections'],
    template: "#grid",
    data: function(){
        return{
            docs_collection: [],
        }
    },
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
        isObject(o) {
            //console.log("keyword: " + this.keyword);
            return typeof o == "object"
        },
        filter_collections(){
            var index = 0;
            this.docs_collection = {"collections":[]};
            var tmp_collections = [];
            this.collections.forEach(element => {
                //alert(element.name);
                var url = this.get_url() + "/catalog.json?f%5Bresource_type_sim%5D%5B%5D=Video&f%5Bthematic_collection_sim%5D%5B%5D=" + element.label;
                
                axios.get(url)
                    .then(response => {
                        tmp_collections.push({"name": element.label,
                            "docs": filter_data(response.data.response.docs)});
                        //docs_collection[index] = filter_data(response.data.response.docs);
                            //console.log(JSON.stringify(this.docs_collection.collections));
                        //return this.docs_collection;
                    })
                index++;
            });
            this.docs_collection.collections = tmp_collections;
        },
    },
    watch:{
        docs_collection(){
            return this.docs_collection;
        },
        collections(){
            this.filter_collections();
        }
    }
}