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
                        <img src="https://wx.qlogo.cn/mmopen/vi_32/Xo4XMYop4jicHhUeI1mhInynkjcxCiajrVrnWZbEq5WwO6CRnYPY8ibwe6Map8M5iaN8QiboR3TfARh1N4vvA9DHVCA/132" width="60px" alt="">
                    </FormItem>
                    <FormItem label="订单号" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="商品名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="企业名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="商品个数" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="订单状态" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="价格" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="下单时间" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="订单备注" prop="link">
                        <Row>
                            <Col span="24">
                            <Input v-model="formValidate.link" type="textarea" :rows="4" :autosize="true" style="width: 100%" placeholder="Enter your e-mail"></Input>
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
                        <img src="https://wx.qlogo.cn/mmopen/vi_32/Xo4XMYop4jicHhUeI1mhInynkjcxCiajrVrnWZbEq5WwO6CRnYPY8ibwe6Map8M5iaN8QiboR3TfARh1N4vvA9DHVCA/132" width="60px" alt="">
                    </FormItem>
                    <FormItem label="买家名称" prop="name">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="联系方式" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
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
                    <FormItem label="快递单号" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="收货地址" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem>
                        <!--<Button type="primary" @click="handleSubmit('formValidate')">保存</Button>-->
                    </FormItem>
                </Form>
            </Card>
            </Col>
            <Button type="primary" style="margin-left: 22%" @click="handleSubmit('formValidate')">保存</Button>
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
              formValidate: {
                name: '',
                link: '',
                image: ''
              },
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
          }
        },
        mounted () {
//            this.orderId = th/is.$route.params.order_id;
//            console.log(this.orderId);
//            this.getSignature()
        }
    };
</script>

<style scoped>
</style>
