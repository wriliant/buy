import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import { addLocalGoods, getTotalCount,updateLocalGoods,deleteLocalGoods} from "../common/localstoryage.js";

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
      addGoods (state,goods) {
        // state.buyCount += goods.count;
        state.buyCount = addLocalGoods(goods)
      },
      updateLocalGoods(state,goods){
        state.buyCount = updateLocalGoods(goods);
      },
      deleteGoods(state,goodsId){
        state.buyCount = deleteLocalGoods(goodsId);
      }
    }
  })

  export default store;