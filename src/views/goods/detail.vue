<template>
    <div class="hello">
        <Menu mode="horizontal" theme="light" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                商品详情
            </MenuItem>
        </Menu>
        <Row>
            <Col span="22" style="margin: 22px">
            <Card>
                <Form ref="formValidate" :model="formValidate" :label-width="80">
                    <FormItem label="轮播图片" prop="image">
                        <Card>
                            <uploadImages v-on:uploadPictures="uploadPictures" :pic="formValidate.carousel_pic"></uploadImages>
                        </Card>
                    </FormItem>
                    <FormItem label="商品图片" prop="image">
                        <Card>
                            <uploadImage v-on:uploadPictures="uploadPic" :pic="formValidate.pic"></uploadImage>
                        </Card>
                    </FormItem>
                    <FormItem label="商品名字" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="已售件数" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.order_num" placeholder="Enter your order_num"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="库存" prop="name">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.stock" placeholder="Enter your stock"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="规格" prop="name">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.unit" placeholder="Enter your unit"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="普通价格" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.price" placeholder="Enter your price"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="福分价格" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.score_price" placeholder="Enter your score_price"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="企业选择" prop="link">
                            <dropdown :dropData="enterprises" v-on:getGropData="getGropData" :id="formValidate.enterprise_id"></dropdown>
                    </FormItem>
                    <FormItem label="商品详情" prop="image">
                        <Card>
                            <detailImage v-on:uploadPictures="detailImage" :pic="formValidate.detail_pic"></detailImage>
                        </Card>
                    </FormItem>
                </Form>
                <Row>
                    <Col span="23" style="float: right">
                    <Card style="text-align: center">
                        <Form ref="formValidate"  :label-width="36">
                            <FormItem style="text-align: center">
                                <Row>
                                    <Col span="6" style="margin-right: 10px">
                                    <p>sku名称</p>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px;">
                                    <p>普通价格（元）</p>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px">
                                    <p>福分价格（元）</p>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px">
                                    <p>库存</p>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px">
                                    <p>规格/单位</p>
                                    </Col>
                                    <Col span="4" >
                                    <p>操作</p>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                    v-for="(item, index) in formDynamic"
                                    :key="index"
                                    :label="index + 1 + '、'">
                                <Row>
                                    <Col span="6" style="margin-right: 10px">
                                    <Input type="text" v-model="item.value" placeholder="名称..."></Input>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px">
                                    <Input type="text" v-model="item.price" placeholder="普通价格..."></Input>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px">
                                    <Input type="text" v-model="item.score_price" placeholder="福分价格..."></Input>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px">
                                    <Input type="text" v-model="item.stock" placeholder="库存..."></Input>
                                    </Col>
                                    <Col span="3" style="margin-right: 10px">
                                    <Input type="text" v-model="item.unit" placeholder="单位..."></Input>
                                    </Col>
                                    <Col span="4" >
                                    <Button @click="handleRemove(index)" type="error">删除</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <Row>
                                    <Col span="4">
                                    <Button long @click="handleAdd" type="primary">添加sku</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </Card>
                    </Col>
                </Row>
                <div style="text-align: center">
                    <Button style="margin: 12px auto" type="primary" @click="handleSubmit('formValidate')">保存</Button>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import axios from 'axios';
    import uAxios from '../../api';
    import config from '../../api/config';
    import uploadImages from '../components/uploadImages';
    import uploadImage from '../components/uploadImage';
    import dropdown from '../components/dropdown';
    //  import md5 from 'js-md5';
//  import moment from 'moment';

    export default {
        name: 'goodsDetail',
      components: {
        uploadImages: uploadImages,
        uploadImage: uploadImage,
        detailImage: uploadImages,
        dropdown: dropdown
      },
        data () {
            return {
              id: '', // 商品id
              index: 1,
              formDynamic: [], // sku
              formValidate: {}, // 数据赋值
              enterprises: [], // 企业列表
              enterprises_id: ''
            };
        },
      watch : {
        enterprises_id: function(){
          console.log(this.enterprises_id)
        }
      },
        methods: {
          // 子组件传递
          getGropData (_id) {
            this.formValidate.enterprise_id = _id; // 企业
          },
          uploadPictures (image) {
            this.formValidate.carousel_pic = image; // 轮播
          },
          uploadPic (image) {
            this.formValidate.pic = image; // 商品图片
          },
          detailImage (image) {
            this.formValidate.detail_pic = image; // 详情
          },
          // 表单
          handleSubmit (name) {
            if(this.id != 0){
              uAxios.put(`goods/${this.id}`, this.formValidate)
                .then(res => {
                  if (res.data.code === 0) {
                    this.$Message.success('保存成功!');
                  }else {
                    alert('操作失败！');
                  }
                });
            }else {
              uAxios.post(`goods`, this.formValidate)
                .then(res => {
                  if (res.data.code === 0) {
                    this.$Message.success('新建成功!');
                  }else {
                    alert('操作失败！');
                  }
                });
            }
//            this.$refs[name].validate((valid) => {
//              if (valid) {
//                this.$Message.success('Success!');
//              } else {
//                this.$Message.error('Fail!');
//              }
//            });
          },
          handleAdd () {
            this.index++;
            console.log(this.formDynamic)
            this.formDynamic.push({});
          },
          handleRemove (index) {
            this.formDynamic.splice(index, 1);
          },
          getData () {
            let self = this;
            self.loading = true;
           uAxios.get(`goods/${this.id}`)
             .then(res => {
               if (res.data.code === 0) {
                 let result = res.data.data;
                 this.formValidate = result;
                 this.formDynamic = result.sku;
                 self.loading = false;
               }else {
                 alert('数据出错了！');
               }
             })

          },
          getEnterprises () {
            let self = this;
            self.loading = true;
            uAxios.get(`enterprises?nopage=1`)
              .then(res => {
                if (res.data.code === 0) {
                  let result = res.data.data;
                  self.enterprises = result
                  self.loading = false;
                }else {
                  alert('数据出错了！');
                }
              });
          }
        },
        mounted () {
          this.id = this.$route.params.goods_id;
          this.getEnterprises()
          if (this.id != 0) {
            this.getData()
          }
        }
    };
</script>

<style scoped>
</style>
