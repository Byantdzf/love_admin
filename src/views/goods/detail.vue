<template>
    <div class="hello">
        <Menu mode="horizontal" theme="light" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                商品详情
            </MenuItem>
        </Menu>
        <Row>
            <Col span="18" style="margin: 22px">
            <Card>
                <Form ref="formValidate" :model="formValidate" :label-width="80">
                    <FormItem label="轮播图片" prop="image">
                        <Card>
                            <uploadImage v-on:uploadPictures="uploadPictures" :pic="formValidate.carousel_pic"></uploadImage>
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
                        <Row>
                            <Col span="5">
                            <Dropdown>
                                <Input v-model="formValidate.link" placeholder="Enter your e-mail" readonly="readonly"></Input>
                                <DropdownMenu slot="list">
                                    <Input  placeholder="Enter your score_price"></Input>
                                    <DropdownItem>驴打滚</DropdownItem>
                                    <DropdownItem>炸酱面</DropdownItem>
                                    <DropdownItem >豆汁儿</DropdownItem>
                                    <DropdownItem>冰糖葫芦</DropdownItem>
                                    <DropdownItem >北京烤鸭</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="商品详情" prop="image">
                        <Card>
                            <detailImage v-on:uploadPictures="detailImage" :pic="formValidate.detail_pic"></detailImage>
                        </Card>
                    </FormItem>
                </Form>
                <Card style="text-align: center">
                    <Form ref="formValidate"  :label-width="36">
                        <FormItem style="text-align: center">
                            <Row>
                                <Col span="6" style="margin-right: 10px">
                                <p>sku名称</p>
                                </Col>
                                <Col span="4" style="margin-right: 10px;">
                                <p>普通价格（元）</p>
                                </Col>
                                <Col span="4" style="margin-right: 10px">
                                <p>福分价格（元）</p>
                                </Col>
                                <Col span="4" style="margin-right: 10px">
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
                                <Col span="4" style="margin-right: 10px">
                                <Input type="text" v-model="item.price" placeholder="普通价格..."></Input>
                                </Col>
                                <Col span="4" style="margin-right: 10px">
                                <Input type="text" v-model="item.score_price" placeholder="福分价格..."></Input>
                                </Col>
                                <Col span="4" style="margin-right: 10px">
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
    import uploadImage from '../components/uploadImages';
    //  import md5 from 'js-md5';
//  import moment from 'moment';

    export default {
        name: 'goodsDetail',
      components: {
        uploadImage: uploadImage,
        detailImage: uploadImage
      },
        data () {
            return {
              id: '', // 商品id
              index: 1,
              formDynamic: [], // sku
              formValidate: {} // 数据赋值
            };
        },
        methods: {
          // 子组件传递
          uploadPictures (image) {
            this.formValidate.carousel_pic = image; // 轮播
          },
          detailImage (image) {
            this.formValidate.detail_pic = image; // 详情
          },
          // 表单
          handleSubmit (name) {
            uAxios.put(`goods/${this.id}`, this.formValidate)
              .then(res => {
                if (res.data.code === 0) {
                  this.$Message.success('保存成功!');
                }else {
                  alert('保存成功！');
                }
              });
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
                }else {
                  alert('数据出错了！');
                }
              });
            // 企业列表
            uAxios.get(`enterprises?nopage=1`)
              .then(res => {
                if (res.data.code === 0) {
                  let result = res.data.data;
                  self.loading = false;
                }else {
                  alert('数据出错了！');
                }
              });
          }
        },
        mounted () {
          this.id = this.$route.params.goods_id;
          this.getData();
        }
    };
</script>

<style scoped>
</style>
