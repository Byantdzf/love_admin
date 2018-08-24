<style lang="less">
.margin-bottom-10{
    margin-bottom: 20px;
}
</style>
<template>
    <div class="home-main">
        <Card :bordered="true" class="margin-bottom-10">
            <p slot="title">{{title}}</p>
            <Row>
                <Col span="12">
                <Form ref="formDynamic" :model="formDynamic" :label-width="10" style="width: 400px">
                    <FormItem
                            v-for="(item, index) in formDynamic.items"
                            :key="index"
                            :prop="'items.' + index + '.value'">
                        <Row>
                            <Col span="12">
                            <Input type="text" v-model="item.value" placeholder="测试标题..." readonly="readonly"></Input>
                            </Col>
                            <Col span="7" :offset="1">
                            <Button @click="handleEdit(item, index)" type="primary" size="small">编辑</Button>
                            <Button @click="handleDelete(index)" type="error" size="small">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                            <Button long @click="handleAdd" type="primary">+ 添加{{title}}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                </Col>
                <Col span="12" v-if="showEdit">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="链接" prop="link">
                        <Input v-model="formValidate.link" placeholder="Enter your page"></Input>
                    </FormItem>
                    <FormItem label="图片" prop="image">
                        <Card>
                            <uploadImage v-on:uploadPictures="uploadPictures" :pic="formValidate.pic"></uploadImage>
                        </Card>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
                    </FormItem>
                </Form>
                </Col>
            </Row>
        </Card>
        <Modal
                v-model="showModel"
                title="温馨提示"
                @on-ok="handleRemove"
                @on-cancel="cancel">
            <h3>是否确认执行该操作？</h3>
        </Modal>
    </div>
</template>

<script>
  import axios from 'axios';
  import uAxios from '../../api';
  import config from '../../api/config';
  import uploadImage from '../components/uploadImage';
  export default {
    name: 'homeConfig',
    components: {uploadImage},
    props: ['configData', 'title', 'type'],
    data () {
      return {
        slideshow: '',  // 上传轮播图
        showModel: false, // 弹框
        showEdit: false, // 编辑轮播
        index: 1,
        formDynamic: {
          items: []
        },
        formValidate: {
          name: '',
          link: '',
          pic: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入链接', trigger: 'blur' },
          ],
          pic: [
            { required: true, message: '请上传图片', trigger: 'blur' },
          ]
        }
      };
    },
    watch: {
      configData:function () {
        console.log(this.configData)
        if (this.configData) {
          this.configData.value.forEach((item) => {
            this.formDynamic.items.push({
              value: item.name,
              goods_id: item.goods_id,
              pic: item.pic
            })
          })
        }
      }
    },
    methods: {
      // 上传文件子组件传递
      uploadPictures (image) {
        this.formValidate.pic = image;
        console.log(this.slideshow)
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
        if (!this.formValidate.name){return this.$Message.error('请填写标题!');}
        if (!this.formValidate.link){return this.$Message.error('请填写链接!');}
        if (!this.formValidate.pic){return this.$Message.error('请上传图片!');}
        if(this.formValidate.goods_id){
          console.log(this.formDynamic.items[this.index].goods_id)
          console.log(this.formValidate)
          this.formDynamic.items[this.index] = {
            value: this.formValidate.name,
            link: this.formValidate.link,
            pic: this.formValidate.pic
          }
        }else{
          this.formDynamic.items.push({
            value: this.formValidate.name,
            link: this.formValidate.link,
            pic: this.formValidate.pic
          });
          console.log(this.formDynamic)
          console.log(this.configData.id)
        }
        let type = this.type,
          data = {};
          data[type] = this.formDynamic.items;
        uAxios.put(`home/configs/${this.configData.id}`, data).then((response) => {
          if (response.data.code === 0) {
            this.$Message.success('保存成功!');
            this.formValidate = {}
          } else {
            this.$Modal.error({
              content: response.data.message
            });
          }
        });
      },
      handleAdd () {
        this.showEdit = true;
      },
      handleDelete () {
        this.showModel = true;
      },
      handleRemove (index) {
        this.formDynamic.items.splice(index, 1);
        console.log(this.formDynamic)
      },
      handleEdit (item, index) {
        console.log(index);
        this.index = index;
        this.showEdit = true;
        this.formValidate = {
          name: item.value,
          link: item.link ? item.link : '',
          pic: item.pic,
          goods_id: item.goods_id
        }
        console.log(this.formValidate)
      }
    },
    mounted () {

    }
  };
</script>
