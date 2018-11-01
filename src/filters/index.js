import Vue from "vue";
import moment from "moment";

Vue.filter("dataFtm",(input,formatStr='YYYY-MM-DD')=>{
    return moment(input).format(formatStr)
})
