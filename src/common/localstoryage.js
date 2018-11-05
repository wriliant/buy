const KEY = "GOODS"

const getLocalGoods = ()=>{
    return JSON.parse(localStorage.getItem(KEY) || "{}")
}


const getTotalCount = () => {
    const localGoods = getLocalGoods();

    let totalCount = 0;

   for (const key in localGoods) {
        totalCount+=localGoods[key]
    }
    return totalCount
}

 /**
 * 将商品存储到本地
 * @param {*} goods 
 */
const addLocalGoods = goods => {
   
    const localGoods = getLocalGoods();

    if (localGoods[goods.goodsId]) {
        localGoods[goods.goodsId] += goods.count;    
    }else{
        localGoods[goods.goodsId] = goods.count; 
    }

    localStorage.setItem(KEY,JSON.stringify(localGoods));

    return getTotalCount()
}
/**
 * 修改本地存储
 * @param {*} goods 
 */
const updateLocalGoods = goods=>{
    //先获取本地localstory
    const localGoods = getLocalGoods();
    localGoods[goods.goodsId] = goods.count;
    localStorage.setItem(KEY,JSON.stringify(localGoods));
    return getTotalCount();
}
/**
 * 删除本地商品
 * @param {*} goodId 
 */
const deleteLocalGoods = goodId => {
    const localGoods = getLocalGoods();
    delete localGoods[goodId];
    localStorage.setItem(KEY,JSON.stringify(localGoods));
    return getTotalCount();
}
export {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
    updateLocalGoods,
    deleteLocalGoods,
}

/**
 * 1,
 * 
 * */