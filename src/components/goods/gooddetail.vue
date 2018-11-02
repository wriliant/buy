<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if="GoodDetail.goodsinfo"  class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in GoodDetail.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src=item.original_path />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{GoodDetail.goodsinfo.title}}</h1>
                                <p class="subtitle">{{GoodDetail.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{GoodDetail.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{GoodDetail.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{GoodDetail.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button"  class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                         <el-input-number :min="1" :max="GoodDetail.goodsinfo.stock_quantity" size="small" v-model="num"></el-input-number>
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{GoodDetail.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a :class="isShowComm ? '': 'selected' " @click="isShowComm=false" href="javascript:;" >商品介绍</a>
                                        </li>
                                        <li>
                                            <a :class="isShowComm ? 'selected': '' " @click="isShowComm=true" href="javascript:;">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                          </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isShowComm" class="tab-content entry" style="display: block;">
                                <div style="padding:5px;" v-html="GoodDetail.goodsinfo.content"></div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isShowComm" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="commentText" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="postComment" id="btnSubmit" name="submit" type="submit"  value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dataFtm('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2, 5, 8, 10]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="total">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in GoodDetail.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/gooddetail/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/gooddetail/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dataFtm}}</span>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

          <!-- 动画元素 -->
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show="isShow" ref="animateDivRef" class="animateDiv" v-if="GoodDetail.imglist">
                <img :src="GoodDetail.imglist[0].original_path" alt="">
            </div>
        </transition>

    </div>
</template>

<style scoped>
    @import "../../statics/jqimgzoom/css/magnifier.css";
    .animateDiv{
        width: 75px;
        height: 75px;
        position: absolute;
        left: 640px;
        top: 425px;
    }
    .animateDiv img{
        width: 75px;
        height: 75px;
    }

</style>



<script>
// import axios from "axios";
import { Affix } from 'iview';
import "../../statics/jqimgzoom/js/magnifier";

export default {
    components:{
        Affix
    },
  data() {
    return {
      num: 1,
      GoodDetail: {},
      isShowComm:false,//是否显示评论
      commentList:[],//定义评论数组
      pageIndex:1,//默认页码
      pageSize:2,//页容量
      total:0,//总记录数
      commentText:'',//评论内容
      isShow:false,//是否显示飞入购物车的图片
    };
  },
  created() {
    this.getGoodDetail();
    this.getCommentListData();
  },
  updated(){
    $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
  },
  watch: {
    $route() {
      this.getGoodDetail();
      this.getCommentListData();
    }
  },
  methods: {
    getGoodDetail() {
      const url = `/site/goods/getgoodsinfo/${this.$route.params.goodId}`;
      this.$axios.get(url).then(response => {
        this.GoodDetail = response.data.message;
      });
    },
    getCommentListData(){
        const url = `site/comment/getbypage/goods/${this.$route.params.goodId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
        this.$axios.get(url).then(response=>{
            this.total = response.data.totalcount;
            this.commentList = response.data.message;
        })
    },
    handleSizeChange(pageSize){
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getCommentListData();
    },
    handleCurrentChange(pageIndex){
        this.pageIndex = pageIndex

        this.getCommentListData();
    },
     //提交评论
  postComment(){
      if(this.commentText.trim().length===0){
            this.$message({
                message: '评论内容不能为空哦...',
                type: 'warning'
            });
            return
        }
      const url = `site/validate/comment/post/goods/${this.$route.params.goodId}`;
      this.$axios.post(url,{commenttxt:this.commentText}).then(response=>{
        //   console.log(response.data);
          this.$message({
                message: '评论成功',
                type: 'success'
            });

            this.commentText="";

            this.pageIndex = 1
            this.getCommentListData()
      })
  },
            addCart(){
                this.isShow = true;
            },
            
            beforeEnter: function (el) {
                el.style.left=640+"px";
                el.style.top = 425+'px';
                el.style.transform = 'scale(1.0)';
            },
            
            enter: function (el, done) {
               el.style.transition = 'all 0.5s'
               el.offsetHeight;
               el.style.left=1200+'px';
               el.style.top = 2+'px';
               el.style.transform = 'scale(0.4)'
                done()
            },
            afterEnter: function (el) {
                this.isShow=false;
            },

  }
}
</script>
