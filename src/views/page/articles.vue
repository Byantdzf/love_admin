<template>
    <div class="hello">
        <Tabs v-model="activeTab">
            <TabPane label="文章列表" name="orgInfo">
			    <Row>
			    	<Col span="20">
			    		<Row>
			                <Input
			                        v-model="searchKeyword"
			                        placeholder="请输入关键字搜索..."
			                        @on-enter="handleSearch"
			                        style="width: 200px "/>
			                <span @click="handleSearch"><Button type="primary" icon="search">搜索</Button></span>
			            </Row>
				 		<Table
			                    :columns="Columns"
			                    :data="orgData" border
			                   style="width: 100%;margin-top: 46px;">
			            </Table>
			            <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
			                  style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
			    	 </Col>
			    	 <Col span="3" offset="1">
			    	 	<Card>
			                    <p slot="title">
			                        <Icon type="navicon-round" class="Primary"></Icon>
			                        <span class="Primary">文章上传</span>
			                    </p>
			                    <Upload
						                :before-upload="handleBeforeUpload"
						                :action="host">
						            <Button type="ghost" style="width: 58px;height:58px;line-height: 48px;">
						                <div>
						                	<Icon type="ios-paper" size="26"></Icon>
						                </div>
						            </Button>
						        </Upload>
						        <div v-if="file !== null">
						           	<span style='margin-right: 22px;'>文件名: {{ file.name }}</span>
						            <Button type="success" @click="upload" :loading="loadingStatus" class="">
						                点击上传
						            </Button>
						        </div>
			               </Card>
			        	<div style="clear: both;"></div>
			    	 </Col>
			    </Row>
            </TabPane>
        </Tabs>
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
                searchKeyword: '',
                activeTab: 'orgInfo',
                orgColumns: [
                    {
                        key: 'key',
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
                visible: false,
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
                        title: '文章标题',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '作者',
                        key: 'author',
                        align: 'center'
                    },
                    {
                        title: '图片',
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
                        title: '来源',
                        key: 'source',
                        align: 'center'
                    },
                    {
                        title: '阅读数',
                        key: 'read_num',
                        align: 'center'
                    },
                    {
                        title: '点赞数',
                        key: 'like_num',
                        align: 'center'
                    },
                    {
                        title: '发布时间',
                        key: 'push_time',
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
                                        window.open(params.row.link);
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
            this.articlesId = this.$route.params.articles_id;
            this.getData(this.articlesId, 1);
            this.getSignature()
        }
    };
</script>

<style>
	.upload{
		margin-top: 22px;
		margin-bottom: 22px;
		text-align: center;
		float: right;
		min-width: 200px;
	}

</style>
