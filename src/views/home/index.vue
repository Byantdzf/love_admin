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
                <Radio label="广州"></Radio>
                <Radio label="深圳"></Radio>
                <Radio label="上海"></Radio>
            </RadioGroup>
        </Card>
        <Card :bordered="true" class="margin-bottom-10">
            <p slot="title">轮播图</p>
            <!--<Radio v-model="disabledSingle" disabled>Radio</Radio>-->
            <Row>
                <Col span="12">
                <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
                    <FormItem
                            v-for="(item, index) in formDynamic.items"
                            v-if="item.status"
                            :key="index"
                            :label="'标题' + item.index"
                            :prop="'items.' + index + '.value'">
                        <Row>
                            <Col span="18">
                            <Input type="text" v-model="item.value" placeholder="测试标题..." readonly="readonly"></Input>
                            </Col>
                            <Col span="4" offset="1">
                            <Button @click="handleRemove(index)" type="error">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                            <Button long @click="handleAdd" type="primary">添加轮播图</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                </Col>
                <Col span="12">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="标题" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="链接" prop="link">
                        <Input v-model="formValidate.link" placeholder="Enter your e-mail"></Input>
                    </FormItem>
                    <FormItem label="图片" prop="image">
                        <Card>
                            <uploadImage v-on:uploadPictures="uploadPictures"></uploadImage>
                        </Card>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    </FormItem>
                </Form>
                </Col>
            </Row>
        </Card>
        <Card :bordered="true" class="margin-bottom-10">
            <p slot="title">
                推荐商品
            </p>
            <Table :columns="shopTitle" :data="shopData"></Table>
        </Card>
        <Card :bordered="true" class="margin-bottom-10">
            <p slot="title">推荐企业</p>
            <Table :columns="mcircleTitle" :data="mcircleData"></Table>
        </Card>
        <Modal
                v-model="modal1"
                title="温馨提示"
                @on-ok="ok"
                @on-cancel="cancel">
            <h3>是否确认移除该商品？</h3>
            <p style="color: red;text-align: right">*此操作不会删除商品！</p>
        </Modal>
    </div>
</template>

<script>
  import axios from 'axios';
  import uAxios from '../../api';
  import config from '../../api/config';
  import uploadImage from '../components/uploadImage';
  export default {
    name: 'home',
    components: {uploadImage},
    data () {
      return {
        addressGroup: '上海',
        cities: [],
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
        modal1: false,
        slideshow: '',
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
        shopTitle: [
          {
            title: '商品图片',
            key: 'image',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.image
                  },
                  style: {
                    width: '32px'
                  }
                }),
//                                h('strong', params.row.profile.title)
              ]);
            },
            align: 'center'
          },
          {
            title: '商品名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '普通价格',
            key: 'address',
            align: 'center'
          },
          {
            title: '福分价格',
            key: 'address',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary'
//                                    size: 'small'
                  },
                  style: {
                    margin: '12px'
                  },
                  on: {
                    click: () => {
                      let argu = {goods_id: '393'};
                      this.$router.push({
                        name: 'goods-detail',
                        params: argu
                      });
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error'
//                                       size: 'small'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true
                    }
                  }
                }, '移除')
              ]);
            }
          }
        ],
        mcircleTitle: [
          {
            title: '企业logo',
            key: 'image',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: params.row.image
                  },
                  style: {
                    width: '32px'
                  }
                }),
//                                h('strong', params.row.profile.title)
              ]);
            },
            align: 'center'
          },
          {
            title: '企业名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '类型',
            key: 'address',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'address',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary'
//                                    size: 'small'
                  },
                  style: {
                    margin: '12px'
                  },
                  on: {
                    click: () => {
                      let argu = {mcircle_id: params.row.id};
                      this.$router.push({
                        name: 'mcircle-detail',
                        params: argu
                      });
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error'
//                                       size: 'small'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true
                    }
                  }
                }, '移除')
              ]);
            }
          }
        ],
        mcircleData: [
            {
              name: 'John Brown',
              image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
            },
            {
              name: 'Jim Green',
              image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
              address: 'London No. 1 Lake Park',
              date: '2016-10-01'
            },
            {
              name: 'Joe Black',
              image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
              address: 'Sydney No. 1 Lake Park',
              date: '2016-10-02'
            },
            {
              name: 'Jon Snow',
              image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
              address: 'Ottawa No. 2 Lake Park',
              date: '2016-10-04'
            }
          ],
        shopData: [
          {
            name: 'John Brown',
            image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            image: 'http://images.ufutx.com/201808/22/2746fcf04664ca61c250407253ef0f4e.png',
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ]
      };
    },
    methods: {
      // 上传文件子组件传递
      uploadPictures (image) {
        this.slideshow = image;
        console.log(this.slideshow)
      },
      // 获取城市列表
      getCities(){
        let self = this;
        uAxios.get('cities').then((response) => {
          let result = response.data.data;
          console.log(result)
        });
      },
      // 弹框
      ok () {
        let self = this
        console.log(self.id)
        uAxios.delete('profiles/' + self.id ).then((response) => {
          if (response.data.code === 0) {
            this.$Message.info('删除成功');
            this.getlist(this.currentPage)
          } else {
            this.$Modal.error({
              content: response.data.message
            });
          }
        });
      },
      cancel () {
        this.$Message.info('Clicked cancel');
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
      this.getCities()
    }
  };
</script>
