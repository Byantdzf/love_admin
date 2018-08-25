<template>
    <div class="hello">
        <Menu mode="horizontal" theme="light" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                订单详情
            </MenuItem>
        </Menu>
        <Row>
            <Col span="11" style="margin: 22px">
            <Card>
                <p slot="title">订单信息</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="商品图片" prop="name" >
                        <img src="goods_pic" width="60px" alt="">
                    </FormItem>
                    <FormItem label="订单号" prop="trade_no">
                        <Input v-model="formValidate.trade_no" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="商品名称" prop="godos_name">
                        <Input v-model="goods_name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="企业名称" prop="enterprise">
                        <Input v-model="formValidate.enterprise_name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="商品个数" prop="num">
                        <Row>
                            <Col span="10">
                            <Input v-model="goods_num" placeholder=""></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="订单状态" prop="status">
                        <Row>
                            <Col span="10">
                            <Input v-model="formValidate.pay_status" placeholder=""></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="价格" prop="goods_fee">
                        <Row>
                            <Col span="10">
                            <Input v-model="formValidate.goods_fee" placeholder=""></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="下单时间" prop="created_at">
                        <Input v-model="formValidate.created_at" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="订单备注" prop="message">
                        <Row>
                            <Col span="24">
                            <Input v-model="formValidate.message" type="textarea" :rows="4" :autosize="true" style="width: 100%" placeholder=""></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <!--<Button type="primary" @click="handleSubmit('formValidate')">保存</Button>-->
                    </FormItem>
                </Form>
            </Card>
            </Col>
            <Col span="11" style="margin: 22px">
            <Card>
                <p slot="title">买家信息</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="买家头像" prop="name" >
                        <img src="formValidate.avatar" width="60px" alt="">
                    </FormItem>
                    <FormItem label="买家名称" prop="name">
                        <Row>
                            <Col span="10">
                            <Input v-model="formValidate.name" placeholder=""></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="联系方式" prop="mobile">
                        <Row>
                            <Col span="20">
                            <Input v-model="formValidate.mobile" placeholder=""></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <!--<Button type="primary" @click="handleSubmit('formValidate')">保存</Button>-->
                    </FormItem>
                </Form>
            </Card>
            </Col>
            <Col span="11" style="margin: 22px">
            <Card>
                <p slot="title">收货信息</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="快递单号" prop="tracking_num">
                        <Input v-model="formValidate.tracking_num" placeholder="输入快递单号"></Input>
                    </FormItem>
                    <FormItem label="收货地址" prop="address">
                        <Input v-model="formValidate.address" placeholder=""></Input>
                    </FormItem>
                    <FormItem>
                        <!--<Button type="primary" @click="handleSubmit('formValidate')">保存</Button>-->
                    </FormItem>
                </Form>
                <Button type="primary" style="margin-left: 22%" @click="sentOrder()">发快递</Button>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import axios from 'axios';
    import uAxios from '../../api';
    import config from '../../api/config';
//  import md5 from 'js-md5';
//  import moment from 'moment';

    export default {
        name: 'Org',
        data () {
            return {
              formDynamic: {
                items: [
                  {
                    value: '',
                    index: 1,
                    status: 1
                  }
                ]
              },
              goods_pic :'',
              goods_name :'',
              goods_num: 1,
              formValidate: {},
              imgName: '',
              file: null,
              ossConfig: '',
              host: '',
              loadingStatus: false,
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
          // 表单
          handleSubmit (name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.$Message.success('Success!');
              } else {
                this.$Message.error('Fail!');
              }
            })
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
          },
          getData  () { 
                let self = this;
                self.loading = true;
                uAxios.get(`orders/${this.id}`)
                  .then(res => {
                    if (res.data.code === 0) {
                      let result = res.data.data;
                      let goods = (result.goods_list)[0];
                      this.goods_pic = goods['pic'];
                      this.goods_name = goods['name'];
                      this.goods_num = goods['num'];
                      console.log(this.goods_pic);
                      this.formValidate = result;
                    }else {
                      alert('数据出错了！');
                    }
                  });
          },
          sentOrder (tracking_num) {
              let self = this;
              self.loading = true;
              uAxios.put(`orders/${self.id}/send?tracking_num=`+tracking_num)
              .then(res => {
                if (res.data.code === 0) {
                  this.$Message.success('发送成功!');
                  this.getData();
                }else {
                  alert('res.data.message');
                }
              });
          }
        },
        mounted () {
           console.log(this.orderId);
           this.id = this.$route.params.order_id;
           this.getData();
           // this.getSignature()
        }
    };
</script>

<style scoped>
</style>
