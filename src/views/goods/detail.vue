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
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="轮播图片" prop="image">
                        <Card>
                            <uploadImage v-on:uploadPictures="uploadPictures"></uploadImage>
                        </Card>
                    </FormItem>
                    <FormItem label="商品名字" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="已售件数" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="库存" prop="name">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="普通价格" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="企业选择" prop="link">
                        <Row>
                            <Col span="5">
                            <Dropdown>
                                <Input v-model="formValidate.link" placeholder="Enter your e-mail" readonly="readonly"></Input>
                                <DropdownMenu slot="list">
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
                            <detailImage v-on:uploadPictures="detailImage"></detailImage>
                        </Card>
                    </FormItem>
                    <FormItem
                            v-for="(item, index) in formDynamic.items"
                            v-if="item.status"
                            :key="index"
                            :label="'sku' + item.index">
                        <Row>
                            <Col span="6" style="margin-right: 10px">
                            <Input type="text" v-model="item.value" placeholder="名称..." readonly="readonly"></Input>
                            </Col>
                            <Col span="4" style="margin-right: 10px">
                            <Input type="text" v-model="item.value" placeholder="普通价格..." readonly="readonly"></Input>
                            </Col>
                            <Col span="4" style="margin-right: 10px">
                            <Input type="text" v-model="item.value" placeholder="福分价格..." readonly="readonly"></Input>
                            </Col>
                            <Col span="4" style="margin-right: 10px">
                            <Input type="text" v-model="item.value" placeholder="单位..." readonly="readonly"></Input>
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
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    </FormItem>
                </Form>
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
              slideshow: [], // 轮播图
              detailPic: [], //详情图片
              index: 1,
              formDynamic: {
                items: [
                  {
                    value: '',
                    index: 1,
                    status: 1
                  }
                ]
              },
              formValidate: {
                name: '',
                link: '',
                image: ''
              },
              ruleValidate: {
                name: [
                  { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                link: [
                  { required: true, message: '请输入链接', trigger: 'blur' },
                ],
                image: [
                  { required: true, message: '请上传图片', trigger: 'blur' },
                ]
              },
            };
        },
        methods: {
          // 子组件传递
          uploadPictures (image) {
            this.slideshow = image;
          },
          detailImage (image) {
            this.detailPic = image;
          },
          // 表单
          handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.$Message.success('Success!');
              } else {
                this.$Message.error('Fail!');
              }
            });
          },
          handleAdd () {
            this.index++;
            this.formDynamic.items.push({
              value: '',
              index: this.index,
              status: 1
            });
          },
          handleRemove (index) {
            this.formDynamic.items[index].status = 0;
          },
          getSignature () {
            const self = this;
            uAxios.get('upload/signature').then(res => {
              let result = res.data.data;
              self.ossConfig = result;
              self.host = result.host;
            });
          }
        },
        mounted () {
          this.getSignature()
        }
    };
</script>

<style scoped>
</style>
