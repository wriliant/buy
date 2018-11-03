import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { addLocalGoods, getTotalCount} from "../common/localstoryage.js";

const store = new Vuex.Store({
    state: {
      buyCount: 0
    },

    getters: {
      getByCount: (state, getters) => {
        return state.buyCount==0 ? getTotalCount() :state.buyCount
      }
    },
    mutations: {
      increment (state,goods) {
        // state.buyCount += goods.count;
        state.buyCount = addLocalGoods(goods)
      }
    }
  })

  export default store;