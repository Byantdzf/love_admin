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
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="企业logo" prop="image">
                        <Card>
                            <uploadLogo v-on:uploadPictures ='uploadLOGO'></uploadLogo>
                        </Card>
                    </FormItem>
                    <FormItem label="企业名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="企业地址" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="负责人" prop="link">
                        <Row>
                            <Col span="">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="职位" prop="name">
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
                    <FormItem label="审核状态" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="是否认证" prop="link">
                        <Row>
                            <Col span="5">
                            <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="企业行业" prop="link">
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
                    <FormItem label="企业介绍" prop="link">
                        <Row>
                            <Col span="24">
                            <Input v-model="formValidate.link" type="textarea" :rows="3" :autosize="true" style="width: 100%" placeholder="Enter your e-mail"></Input>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="企业详情" prop="image">
                        <Card>
                            <detailImage v-on:uploadPictures="detailImage"></detailImage>
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

    //  import md5 from 'js-md5';
//  import moment from 'moment';

    export default {
        name: 'Org',
      components: {
        uploadLogo: uploadLogo,
        detailImage: uploadImage
      },
        data () {
            return {
              active: '',
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
          // 子组件传递
          uploadLOGO (image) {
            this.logo = image;
          },
          detailImage (image) {
            this.detailPic = image;
            debugger
          },
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
          }
        },
        mounted () {
//            this.mcircleId = this.$route.params.mcircle_id;
//            console.log(this.mcircleId);
//            this.getData(this.mcircleId);
        }
    };
</script>

<style scoped>
</style>
