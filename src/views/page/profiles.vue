<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label="公众号列表"  name="org">
                <Col span="20">
                    <Input
                            v-model="searchKeyword"
                            @on-enter="handleSearch"
                            placeholder="关键字搜索..."
                            style="width: 200px; margin-bottom: 22px;"/>
                    <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                    <Table :loading="loading" :columns="orgColumns" :data="orgData" style="width: 100%;" border></Table>
                    <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                          style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                </Col>
                <Col span="4">
                    <Card>
                        <p slot="title">
                            <Icon type="navicon-round" class="Primary"></Icon>
                            <span class="Primary">创建新账号</span>
                        </p>
                        <Tabs type="card" style="margin-bottom: 12px">
                            <TabPane label="填写信息">
                                <div class="classification-con">
                                    <Input v-model="title" placeholder="请输入公众号名称" style=""/>
                                    <Input v-model="msgBiz" placeholder="请输入msgBiz"
                                           style="margin-top: 12px;margin-bottom: 10px"/>
                                </div>
                            </TabPane>

                        </Tabs>
                        <p align="center">
                            <Button type="success" style="width: 150px;height: 38px" icon="ios-checkmark" @click="save">
                                添加公众号
                            </Button>
                        </p>
                    </Card>
                </Col>

            </TabPane>
        </Tabs>
        <Modal
        	v-model="modal1"
	        title="温馨提示"
	        @on-ok="ok"
	        >
	        <p>是否确定删除该公众号？</p>
	    </Modal>
	    <Modal
        	v-model="modal"
	        title="编辑公众号"
	        @on-ok="cancel"
	        >
	         <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
	    </Modal>
    </div>
</template>

<script>
    import uAxios from '../../api/index';
    import config from '../../api/config';

    export default {
        search: '',
        name: 'index',
        data () {
            return {
                activeTab: 'org',
                currentTab: 'org',
                currentPage: 1,
                searchKeyword: '',
                orgTotal: 0,
                fieldList: [],
                modelValue: '',
                industryList: [],
                id: '',
                addressList: [],
                modal1: false,
                // label: (h) => {
                //     return h('div', [
                //         h('span', '标签一'),
                //         h('Badge', {
                //             props: {
                //                 count: 3000
                //             }
                //         })
                //     ])
                // },
                orgColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '更新时间',
                        key: 'updatedAt',
                        align: 'center',
                        width: 100,
                        editable: true
                    },
                    {
                        title: '头像',
                        key: 'headimg',
                        render: (h, params) => {
                            return h('div', [
                                h('Avatar', {
                                    props: {
                                        src: params.row.headimg,
                                        size: 'large'
                                    }
                                })
                            ]);
                        },
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '公众号',
                        key: 'title',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', {
                                    style: {
                                        margin: '12px',
                                        fontSize: '14px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push('/posts/index?msgBiz=' + params.row.msgBiz)
                                        }
                                    }
                                }, params.row.title)
                            ]);
                        }
                    },
                    {
                        title: '最近',
                        key: 'new_createAt',
                        align: 'center',
                        editable: true
                    },
                    {
                        title: '最旧',
                        key: 'last_createAt',
                        align: 'center',
                        editable: true
                    },
                    {
                        title: '文章数',
                        key: 'post_count',
                        align: 'center',
                        editable: true
                    },
                    {
                        title: '有数据',
                        key: 'read_post_count',
                        align: 'center',
                        editable: true
                    },

                    {
                        title: '差',
                        key: 'cha_post_count',
                        align: 'center',
                        editable: true
                    },

                    {
                        title: 'MsgBiz',
                        key: 'msgBiz',
                        align: 'center',
                        editable: true
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal1 = true
                                            this.id = params.row._id
                                            this.msgBiz = params.row.msgBiz
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal = true
                                            this.id = params.row._id
                                            this.value = params.row.title
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                    // {
                    //     title: '操作',
                    //     key: 'show_more',
                    //     align: 'center',
                    //     render: (h, params) => {
                    //         if (parseInt(params.row.is_approval) === 1) {
                    //
                    //         } else {
                    //         	return h('div', [
                    //                 h('Button', {
                    //                     props: {
                    //                         type: 'primary',
                    //                         size: 'small'
                    //                     },
                    //                     style: {
                    //                         marginRight: '10px'
                    //                     },
                    //                     on: {
                    //                         click: () => {
                    //                             let argu = {articles_id: params.row.id};
                    //                             this.$router.push({
                    //                                 name: 'articles-info',
                    //                                 params: argu
                    //                             });
                    //                         }
                    //                     }
                    //                 }, '查看详情'),
                    //                 h('Button', {
                    //                     props: {
                    //                         type: 'error',
                    //                         size: 'small'
                    //                     },
                    //                     style: {
                    //                         marginRight: '10px'
                    //                     },
                    //                     on: {
                    //                         click: () => {
                    //                         	this.modal1 = true
                    //                         	this.id = params.row.id
                    //                         }
                    //                     }
                    //                 }, '删除'),
                    //                 h('Button', {
                    //                     props: {
                    //                         type: 'primary',
                    //                         size: 'small'
                    //                     },
                    //                     style: {
                    //                         marginRight: '10px'
                    //                     },
                    //                     on: {
                    //                         click: () => {
                    //                         	this.modal = true
                    //                         	this.id = params.row.id
                    //                         	this.value = params.row.title
                    //                         }
                    //                     }
                    //                 }, '编辑')
                    //             ]);
                    //         }
                    //     }
                    // }
                ],
                modal: false,
                value: '',
                orgData: [],
                brokerData: [],
                lecturerData: [],
                orgLecturerData: [],
                title:'',
                msgBiz: '',
                loading: false,
                brokerLecturerData: []
            };
        },
        methods: {
            aaa (e){
                console.log(e)
                this.$router.push('/posts/index?msgBiz=' + e.msgBiz)
                // this.$router.push({
                //     name: '',
                //     params: '/posts/index'
                // });
            },
            save() {
//                this.$Message.info('未调接口...');
                let self = this;
                if (self.title === '') {
                    this.$Message.info('请输入公众号名称');
                    console.log(self.classificationList);
                } else if (self.msgBiz === '') {
                    this.$Message.info('请输入公众号msgBiz');
                } else {
                    let data = {
                        'title': self.title,
                        'msgBiz': self.msgBiz
                    };
                    console.log(data);
                    uAxios.post('profiles', data)
                        .then(function (response) {
                            console.log(response.data);
                            if (response.data.code === 0) {
                                self.$Message.info('添加成功');
                                setTimeout(function () {
                                    // location.reload();
                                    self.getlist('1')
                                    self.title = ''
                                    self.msgBiz = ''
                                }, 500);
                            } else {
                                self.$Message.info(response.data.message);
                            }
                        });
                }
            },
        	ok () {
                let self = this
                console.log(self.id)
                uAxios.delete('profiles/' + self.id ).then((response) => {
	                if (response.data.code === 0) {
						this.$Message.info('删除成功');
	                    this.getlist()
	                } else {
	                    this.$Modal.error({
	                        content: response.data.message
	                    });
	                }
	            });
            },
            cancel () {
            	console.log(this.value)
                let self = this
                let data = {
                	title: this.value,
                    msgBiz: this.msgBiz
                }
                uAxios.put('profiles/' + self.id, data).then((response) => {
	                if (response.data.code === 0) {
//	                	this.$Modal.error({
//	                        content: '删除成功'
//	                    });
						this.$Message.info('修改成功');
	                    this.getlist()
	                } else {
	                    this.$Modal.error({
	                        content: response.data.message
	                    });
	                }
	            });
            },
            getTab (type) {
                // 获得激活的Tab页
                this.activeTab = type;
            },
            handlePage (num) {
                // 分页
//              self.currentPage = num;
                this.getlist(num);

            },
            getlist (page) {
            	let self = this;
            	self.loading = true
            	uAxios.get('profiles?page=' + page )
                    .then(res => {
                        let result = res.data.data;
                        console.log(result)
                        self.orgData = result.data
                        self.orgTotal = result.total;
                        self.loading = false
                        // self.searchKeyword = ''

                    });
            },
            remove (index,_id) {
                this.orgData.splice(index, 1);
                console.log(_id)
                uAxios.delete('profiles/' + _id)
                    .then(res => {
                        this.$Message.info('删除成功');
                    });
            },
            handleSearch () {
            	let query = '&keyword=' + this.searchKeyword;
            	let self = this;
            	let page = 1;
                uAxios.get('profiles?page=' + page + query)
                    .then(res => {
                        let result = res.data.data;
                        console.log(result)
                        self.orgData = result.data
                        self.orgTotal = result.total;
                        self.searchKeyword = ''
                    });
            }
        },
        mounted () {
        	this.getlist('1')
        }
    };
</script>

<style lang="less">
    /*@import "../../styles/common";*/
</style>
