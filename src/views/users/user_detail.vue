<template>
	<div class="hello">
		<Menu mode="horizontal" theme="light" active-name="1">
			<MenuItem name="1">
				<Icon type="ios-paper"></Icon>
				用户详情
			</MenuItem>
		</Menu>
		<Row>
			<!--<Col span="11" style="margin: 22px">-->
			<!--<Card>-->
			<!--<Form  :label-width="0">-->
			<!--<FormItem style="border-bottom: 1px solid #d3d3d3;">-->
			<!--<div class="order_box">-->
			<!--<span class="font_16">头像：<img src="../../images/love.png" alt="" width="80rpx"></span>-->
			<!--</div>-->
			<!--<div class="order_box">-->
			<!--<span>名字：angelabbay</span>-->
			<!--</div>-->
			<!--<div class="order_box">-->
			<!--<span>手机号：angelabbay</span>-->
			<!--</div>-->
			<!--</FormItem>-->

			<!--</Form>-->
			<!--</Card>-->
			<!--</Col>-->
			<Col span="11" style="margin: 22px">
			<Card>
				<p slot="title" style="color: #ff6c4c">基本信息</p>
				<div style="display: inline-block">
					<span class="font_16">头像：<img src="../../images/love.png" alt="" width="80rpx"></span>
				</div>
				<div style="display: inline-block;margin-left: 12px;">
					<span class="font_16">用户名：</span>
					<span class="font_16">BYANT</span>
				</div>
				<Table :columns="columns1" :data="information" :show-header="false" :border="false" style="margin-top: 26px"></Table>
			</Card>
			</Col>
			<Col span="11" style="margin: 22px">
			<Card>
				<p slot="title" style="color: #ff6c4c">VIP信息</p>
				<Table :columns="columns1" :data="VIPinformation" :show-header="false" :border="false" style="margin-top: 26px"></Table>
				<Card style="margin-top: 12px;">
					<p slot="title">测试结果</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px;display: inline-block;color: #00a050" >爱情语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px;display: inline-block;color: #a03a17" >交往基因</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px;display: inline-block;color: #8049a0" >我的优势</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px">需要肯定的语言</p>
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">生活照</p>
					<img src="../../images/love.png" alt="" width="80rpx">id=330
					<img src="../../images/love.png" alt="" width="80rpx">
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">身份证</p>
					<img src="../../images/love.png" alt="" width="80rpx">id=330
					<img src="../../images/love.png" alt="" width="80rpx">
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">毕业照</p>
					<img src="../../images/love.png" alt="" width="80rpx">
					<img src="../../images/love.png" alt="" width="80rpx">
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">其他证件</p>
					<img src="../../images/love.png" alt="" width="80rpx">
					<img src="../../images/love.png" alt="" width="80rpx">
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">二维码</p>
					<img src="../../images/love.png" alt="" width="80rpx">
					<img src="../../images/love.png" alt="" width="80rpx">
				</Card>

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
    //	import moment from 'moment';

    export default {
        name: 'Org',
        data () {
            return {
                articlesId: '',
                information: [
                    {id: 250, updatedAt: '数据缺失'},
                    {id: 256, updatedAt: '数据缺失'},
                    {id: 257, updatedAt: '数据缺失'}
                ],
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'key'
                    }
                ],
                information: [
                    {
                        name: '手机号',
                        key: 15707531610
                    },
                    {
                        name: '类型',
                        key:'单身'
                    },

                    {
                        name: '性别',
                        key: '男'
                    },
                    {
                        name: '出生日期',
                        key: 'London No. 1 Lake Park'
                    },
                    {
                        name: '单身状态',
                        key: '2016-10-02'
                    },
                    {
                        name: '身高',
                        key: 26
                    },
                    {
                        name: '体重',
                        key: 26
                    },
                    {
                        name: '常住地',
                        key: 26
                    },
                    {
                        name: '户口类型',
                        key: 26
                    },
                    {
                        name: '成长地',
                        key: 26
                    },
                    {
                        name: '学历',
                        key: 26
                    },
                    {
                        name: '毕业学校',
                        key: 26
                    },
                    {
                        name: '工作单位',
                        key: 26
                    },
                    {
                        name: '单位性质',
                        key: 26
                    },
                    {
                        name: '行业',
                        key: 26
                    },
                    {
                        name: '加入时间',
                        key: 26
                    },
                    {
                        name: '推荐人',
                        key: 26
                    },
                    {
                        name: 'VIP等级',
                        key: 26
                    }

                ],
                VIPinformation: [
                    {
                        name: '薪资',
                        key: 120000
                    },
                    {
                        name: '购车情况',
                        key: '无'
                    },

                    {
                        name: '购房情况',
                        key: '有'
                    }
                ],
                searchKeyword: '',
                activeTab: 'orgInfo',
                orgColumns: [
                    {
                        key: 'updatedAt',
                        width: '150px',
                        align: 'right'
                    },
                    {
                        key: 'value',
                        align: 'left',
                        render: (h, params) => {
                            if (params.row.key === 'LOGO') {
                                return h('div', [
                                    h('Avatar', {
                                        props: {
                                            src: params.row.value,
                                            shape: 'square'
                                        },
                                        style: {
                                            width: '50px',
                                            height: '50px',
                                            margin: '10px 0'
                                        }
                                    })
                                ]);
                            } else {
                                return h('div', [
                                    h('span', params.row.value)
                                ]);
                            }
                        }
                    }
                ],
                orgData: [],
                total: 0,
                orgTotal: 0,
                host: '',
                file: null,
                ossConfig: {},
                defaultList: [],
                loadingStatus: false,
                imgName: '',
                modal: false,
                uploadList: [],
                filePath: '',
                uploaddata: [],
                Columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '头像',
                        key: 'image',
                        render: (h, params) => {
                            return h('div', [
                                h('Avatar', {
                                    props: {
                                        src: params.row.image,
                                        size: 'large'
                                    }
                                })
                            ]);
                        },
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '手机号',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '商品名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '商品价格',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '消费类型',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '支付方式',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '支付金额',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '消费时间',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '订单号',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '详情',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'large'
                                },
                                on: {
                                    click: () => {
                                        this.modal = true
                                    }
                                }
                            }, '查看详情');
                        }
                    }
                ]
            };
        },
        methods: {
            save () {
                let self = this;
                let data = {
                    'file': self.filePath,
                    'category_id': self.articlesId
                };
                uAxios.post('import/articles',data).then(res => {
                    let result = res.data.data
                    if(res.data.code == 1) {

                    }
                });
            },
            upload () {
                var self = this;
                self.loadingStatus = true;
                var formData = new FormData();
//              var fileName = md5(self.file.name) + '.' + self.file.type.split('/').pop().toLowerCase();
                var fileName = self.file.name;
                var filePath = self.host + '/' + self.ossConfig.dir + fileName;
                formData.append('name', self.ossConfig.dir + fileName);
                formData.append('key', self.ossConfig.dir + fileName);
                formData.append('policy', self.ossConfig.policy);
                formData.append('OSSAccessKeyId', self.ossConfig.accessid);
                formData.append('success_action_status', '200');
                formData.append('signature', self.ossConfig.signature);
                formData.append('file', self.file);
                formData.append('filename', self.file.name);
                console.log(formData);
                console.log(self.ossConfig.host)
                axios.post(self.ossConfig.host, formData, {headers: {'Content-Type': 'multipart/form-data'}}
                ).then(function (response) {
                    if (response.status === 200) {
//                        console.log(filePath);
                        self.filePath = filePath;
                        self.$Notice.success({
                            title: '文件上传成功',
                            desc: '文件 ' + self.file.name + ' 上传成功。'
                        });
                        self.file = null;
                        self.save()
                    } else {
                        self.$Modal.error({
                            content: response.statusText
                        });
                    }
                });
                self.loadingStatus = false;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
                });
            },
            handleBeforeUpload (file) {
                // console.log(file);
                this.file = file;
                this.imgName = file.name;
                return false;
            },
            getData (id,page) {
                // 获取机构资料
                const self = this;
                uAxios.get('categories/' + id + '/articles?page=' + page).then(res => {
                    let result = res.data.data;
                    self.orgData = result.data;
                    self.orgTotal = result.total;
                });
            },
            handlePage (num) {
                let query = num + '&keyword=' + this.searchKeyword;
                this.getData(this.articlesId, query);
            },
            handleSearch () {
                // 处理搜索
                let query = '1&keyword=' + this.searchKeyword;
                this.getData(this.articlesId, query);
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
//            this.articlesId = this.$route.params.articles_id;
//            this.getData(this.articlesId, 1);
//            this.getSignature()
        }
    };
</script>

<style scoped>
</style>
