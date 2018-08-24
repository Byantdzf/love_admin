<style lang="less">
.margin-bottom-10{
    margin-bottom: 20px;
}
</style>
<template>
    <div class="home-main">
        <Card :bordered="true" class="margin-bottom-10">
            <p slot="title">地址选择</p>
            <!--<Radio v-model="disabledSingle" disabled>Radio</Radio>-->
            <RadioGroup v-model="addressGroup">
                <Radio :label="item.name" v-for="item,index in cities" :key="item.id" ></Radio>
            </RadioGroup>
        </Card>
        <carouselConfig :configData="carousel" title="轮播图" type="carousel"></carouselConfig>
        <gridConfig :configData="grid" title="推荐商品" type="grid"></gridConfig>
        <listConfig :configData="list" title="推荐企业" type="list"></listConfig>
    </div>
</template>

<script>
  import axios from 'axios';
  import uAxios from '../../api';
  import config from '../../api/config';
  import uploadImage from '../components/uploadImage';
  import homeConfig from '../components/homeConfig';
  export default {
    name: 'home',
    components: {
      uploadImage: uploadImage,
      carouselConfig: homeConfig,
      gridConfig: homeConfig,
      listConfig: homeConfig,
    },
    data () {
      return {
        addressGroup: '深圳',
        cities: [],
        carousel: [], // 轮播图
        grid: [], // 推荐商品
        list: [], // 推荐企业
        slideshow: '',  // 上传轮播图
        showModel: false // 弹框
      };
    },
    watch:{
      addressGroup:function () {
//        includes
        this.cities.forEach((item) => {
          if(JSON.stringify(item).includes(this.addressGroup)){
            return this.updataCity(item.id);
          }
        });
      }
    },
    methods: {
      // 获取城市列表
      getCities(){
        let self = this;
        uAxios.get('cities').then((response) => {
          let result = response.data.data;
          this.cities = result;
          this.addressGroup = this.cities[0].name;
          this.updataCity(this.cities[0].id);
//          console.log(this.cities);
        });
      },
      // 获取城市数据
      updataCity (_id) {
        uAxios.get(`cities/${_id}/home/configs`).then((response) => {
          let result = response.data.data;
          result.forEach((item) => {
            if (item.key == 'carousel') {
              this.carousel = item;
            } else if (item.key == 'grid') {
              this.grid = item;
            } else {
              this.list = item;
            }
          });
        });
      }
    },
    mounted () {
      this.getCities()
    }
  };
</script>
