<template>
    <div class="hello">
        <Menu mode="horizontal" theme="light" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                企业详情
            </MenuItem>
        </Menu>
        <Row>
            <Col span="18" style="margin: 22px">
            <Card>
                <Form ref="formValidate"  :label-width="80">
                    <FormItem label="企业logo" prop="image">
                        <Card>
                            <uploadLogo v-on:uploadPictures ='uploadLOGO' :pic="formValidate.logo"></uploadLogo>
                        </Card>
                    </FormItem>
                    <FormItem label="企业名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="企业地址" prop="name">
                        <Input v-model="formValidate.address" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="负责人" prop="link">
                        <Row>
                            <Col span="">
                            <Input v-model="formValidate.user_name" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="职位" prop="name">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.position" placeholder="Enter your name"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="联系方式" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.mobile" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="审核状态" prop="link">
                        <RadioGroup v-model="formValidate.status">
                            <Radio label="0">
                                <span>待审核</span>
                            </Radio>
                            <Radio label="1">
                                <span>已审核</span>
                            </Radio>
                            <Radio label="-1">
                                <span>已拒绝</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="是否认证" prop="link">
                        <RadioGroup v-model="formValidate.identified">
                            <Radio label="0">
                                <span>未认证</span>
                            </Radio>
                            <Radio label="1">
                                <span>已认证</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="企业行业" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.industry_name" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="企业介绍" prop="link">
                        <Row>
                            <Col span="24">
                            <Input v-model="formValidate.intro" type="textarea" :rows="3" :autosize="true" style="width: 100%" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="企业详情" prop="image">
                        <Card>
                            <detailImage v-on:uploadPictures="detailImage" :pic="formValidate.detail_pic"></detailImage>
                        </Card>
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
    import uploadLogo from '../components/uploadImage';
    import uploadImage from '../components/uploadImages';
    import dropdown from '../components/dropdown';

    //  import md5 from 'js-md5';
//  import moment from 'moment';

    export default {
        name: 'Org',
      components: {
        uploadLogo: uploadLogo,
        detailImage: uploadImage,
        dropdown: dropdown
      },
        data () {
            return {
              active: '',
              id: '', //企业id
              logo: '', // 企业logo
              detailPic: [], // 企业详情图片
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
              loadingStatus: false
            };
        },
        methods: {
          // 子组件传递
          uploadLOGO (image) {
            this.formValidate.logo = image;
          },
          detailImage (image) {
            this.formValidate.detail_pic = image;
          },
          // 表单
          handleSubmit () {
            uAxios.put(`enterprises/${this.id}`, this.formValidate)
              .then(res => {
                if (res.data.code === 0) {
                  this.$Message.success('保存成功!');
                }else {
                  alert('操作失败！');
                }
              });
          },
          getData () {
            let self = this;
            self.loading = true;
            // 企业列表
            uAxios.get(`enterprises/${this.id}`)
              .then(res => {
                if (res.data.code === 0) {
                  let result = res.data.data;
                  this.formValidate = result
                  self.loading = false;
                }else {
                  alert('数据出错了！');
                }
              });
          }
        },
        mounted () {
          this.id = this.$route.params.mcircle_id;
          this.getData();
        }
    };
</script>

<style scoped>
</style>
