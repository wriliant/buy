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

export {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
}

/**
 * 1,
 * 
 * */