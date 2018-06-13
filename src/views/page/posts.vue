<template>
    <div v-model="activeTab">
        <Row>
            <Col span="24">
                <Tabs @on-click="getTab">
                    <TabPane label="全部数据"  name="allRead">
                        <Input
                                v-model="searchKeyword"
                                @on-enter="handleSearch"
                                placeholder="关键字搜索..."
                                style="width: 200px; margin-bottom: 22px;"/>
                        <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                        <Button @click="handleSelectAll()" style="float: right" icon="checkmark-round">批量打标签</Button>
                        <Table :loading="loading" :columns="orgColumns" :data="orgData" border  @on-selection-change="selectionchange"></Table>
                        <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                              style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                    </TabPane>
                    <TabPane label="有阅读量"   name="haveRead">
                        <Input
                                v-model="searchKeyword"
                                @on-enter="handleSearch"
                                placeholder="关键字搜索..."
                                style="width: 200px; margin-bottom: 22px;"/>
                        <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                        <Button @click="handleSelectAll()" style="float: right" icon="checkmark-round">批量打标签</Button>
                        <Table :loading="loading" :columns="orgColumns" :data="orgData"  border  @on-selection-change="selectionchange"></Table>
                        <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                              style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                    </TabPane>
                    <TabPane label="无阅读量"   name="noneRead">
                        <Input
                                v-model="searchKeyword"
                                @on-enter="handleSearch"
                                placeholder="关键字搜索..."
                                style="width: 200px; margin-bottom: 22px;"/>
                        <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                        <Button @click="handleSelectAll()" style="float: right" icon="checkmark-round">批量打标签</Button>
                        <Table :loading="loading" :columns="orgColumns" :data="orgData"  border  @on-selection-change="selectionchange"></Table>
                        <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                              style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
        <Modal
        	v-model="modal1"
	        title="温馨提示"
	        @on-ok="ok"
	        >
	        <p>是否确定删除该栏目？</p>
	    </Modal>
	    <Modal
        	v-model="modal"
	        title="标记文章"
	        @on-ok="cancel"
	        >
            <CheckboxGroup v-model="social" v-for="(item,index) in labels">
                <Checkbox :label="item._id" >
                    <Icon type="ios-pricetags"></Icon>
                    <span>{{item.title}}</span>
                </Checkbox>
            </CheckboxGroup>
	    </Modal>
        <Modal
                v-model="modal2"
                title="编辑文章标签"
                @on-ok="cancelOK"
        >
            <CheckboxGroup v-model="social1" v-for="(item,index) in labels">
                <Checkbox :label="item._id" >
                    <Icon type="ios-pricetags"></Icon>
                    <span>{{item.title}}</span>
                </Checkbox>
            </CheckboxGroup>
            <Input
                    v-model="editlable"
                    @on-enter="createLabel"
                    placeholder="添加标签..."
                    style="width: 150px;height: 42px; margin-bottom: -12px;margin-top: 12px"/>
            <span @click="createLabel" >
                    <Button type="primary" style="margin-bottom: -14px;">添加</Button>
                </span>
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
                activeTab: 'allRead',
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
                modal2: false,
                editlable:'',
                social1:['5b11317d5360b92a60002151'],
                social: [],
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
                        // fixed: 'left',
                        sortable: true
                    },
                    {
                        title: '发布时间',
                        align: 'center',
                        key: 'createdAt',
                        width: 100,
                        sortable: true
                    },
                    {
                        title: '文章标题',
                        key: 'title',
                        // width: 600,
                        align: 'center',
                         render: (h, params) => {
                            // debugger
                             return h('div', [
                                 h('Icon', {
                                     props: {
                                        type: "android-list"
                                     },
                                     style: {
                                         fontSize: '14px'
                                     }
                                 }),
                                 h('strong', {
                                     style: {
                                         margin: '12px',
                                         fontSize: '14px'
                                     },
                                     on: {
                                         click: () => {
                                             console.log(params.row.link)
                                             window.open(params.row.link)
                                         }
                                     }
                                 }, params.row.title)
                             ]);
                         }
                    },
                    {
                        title: '阅读数',
                        key: 'readNum',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '点赞数',
                        key: 'likeNum',
                        width: 80,
                        align: 'center'
                    },
                    // {
                    //     title: '更新时间',
                    //     key: 'updatedAt',
                    //     width: 100,
                    //     align: 'center',
                    //     sortable: true
                    // },
                    {
                        title: '标签',
                        key: 'label_str',
                        width: 200,
                        align: 'center',
                    },
                    // {
                    //     title: '时间间隔',
                    //     key: 'time',
                    //     align: 'center'
                    // },
                    {
                        title: '公众号头像',
                        key: 'profile_title',
                        width: 200,
                        render: (h, params) => {
                            // debugger
                            return h('div', [
                                h('Avatar', {
                                    props: {
                                        src: params.row.profile.headimg,
                                        size: 'large'
                                    },
                                    style: {
                                        margin: '0 10px 0 0'
                                    }
                                }),
                                h('strong', params.row.profile.title)
                            ]);
                        },
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'show_more',
                        width: 100,
                        // fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.id = params.row._id
                                            this.handleSelectAll2(params.row.post_label)
                                        }
                                    }
                                }, '编辑标签'),
                            ]);
                        }
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }

                ],
                modal: false,
                value: '',
                orgData: [],
                brokerData: [],
                lecturerData: [],
                orgLecturerData: [],
                labels: [],
                loading: false,
                show: false,
                brokerLecturerData: [],
                post_ids: [],
                msgBiz: '',
                type: ''

            };
        },
        methods: {
            labelsActive (item) {
                console.log(this.single);
            },
            selectionchange(e){
                this.post_ids = []
                e.forEach((item, index, arr) => {
                    this.post_ids.push(arr[index]._id);
                });
                console.log(this.post_ids)
            },
            handleSelectAll (status) {
                let self = this
                uAxios.get('labels')
                    .then(res => {
                        self.modal = true
                        let result = res.data.data;
                        self.labels = result.data;
                        self.labels.forEach((item, index, arr) => {
                            arr[index].active = false;
                        })
                        console.log(self.labels)
                    });
            },
            handleSelectAll2 (post_label) {
                console.log(post_label)
                let self = this
                self.social1 = []
                post_label.forEach((item, index, arr) => {
                    self.social1.push(arr[index].label._id);
                });
                uAxios.get('labels')
                    .then(res => {
                        self.modal2 = true
                        let result = res.data.data;
                        self.labels = result.data;
                        self.labels.forEach((item, index, arr) => {
                            arr[index].active = false;
                        })
                        console.log(self.labels)
                    });
            },
        	ok () {
                let self = this
                uAxios.delete('article/categories/' + self.id ).then((response) => {
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
            cancel (e) {
                console.log(this.social)
                let self = this
                if (this.post_ids.length === 0) {
                    alert('请先勾选需要标记的文章！');
                } else {
                    let data = {
                        label_ids: this.social,
                        post_ids: this.post_ids
                    }
                    console.log(data)
                    uAxios.post('posts/labels', data).then((response) => {
                        if (response.data.code === 0) {
                            this.$Message.info('标记成功');
                            this.getlist(1)
                        } else {
                            this.$Modal.error({
                                content: response.data.message
                            });
                        }
                    });
                }
            },
            cancelOK (e) {
                let self = this
                console.log(self.social1)
                let array = []
                    array.push(this.id)
                    let data = {
                        label_ids: this.social1,
                        post_ids: array
                    }
                    console.log(data)
                    uAxios.post('posts/labels', data).then((response) => {
                        if (response.data.code === 0) {
                            this.$Message.info('修改成功');
                            this.getlist(1)
                        } else {
                            this.$Modal.error({
                                content: response.data.message
                            });
                        }
                    })
            },
            getTab (type) {
                // 获得激活的Tab页
                this.activeTab = type;
                this.getlist(1)
            },
            handlePage (num) {
                // 分页
//              self.currentPage = num;
                this.getlist(num);

            },
            getlist (page) {
            	let self = this
            	self.loading = true
                let read = ''
                let query = ''
                if(this.activeTab == 'haveRead'){
                    read = '&is_read=1'
                }else if(this.activeTab == 'noneRead'){
                    read = '&is_read=0'
                }
                if (this.searchKeyword) {
                    query = '&keyword=' + this.searchKeyword;
                }
                if(self.msgBiz) {
            	    let data = {
            	        page: page,
                        msgBiz: self.msgBiz
                    }
                    uAxios.get('posts?page=' + page + '&msgBiz=' + self.msgBiz + query + read)
                        .then(res => {
                            let result = res.data.data;
                            self.orgData = result.data
                            console.log(self.orgData)
                            self.orgTotal = result.total
                            self.loading = false
                        });
                } else {
                    uAxios.get('posts?page=' + page + query +read)
                        .then(res => {
                            let result = res.data.data
                            let  array = [];
                            self.orgData = result.data
                            console.log(self.orgData)
                            self.orgTotal = result.total
                            self.loading = false
                        });
                }
            },
            createLabel () {
                let self = this
                console.log(this.editlable);
                let data = {
                    title: this.editlable
                }
                uAxios.post('labels', data)
                    .then(res => {
                        uAxios.get('labels')
                            .then(res => {
                                let result = res.data.data;
                                self.labels = result.data;
                                self.labels.forEach((item, index, arr) => {
                                    arr[index].active = false;
                                })
                            });
                    });
            },
            handleSearch () {
                let read = ''
                if(this.activeTab == 'haveRead'){
                    read = '&is_read=1'
                }else if(this.activeTab == 'noneRead'){
                    read = '&is_read=0'
                }
            	let query = '&keyword=' + this.searchKeyword;
            	let self = this;
            	let page = 1;
                uAxios.get('posts?page=' + page + query + read)
                    .then(res => {
                        let result = res.data.data;
                        self.orgData = result.data
                        console.log(self.orgData)
                        self.orgTotal = result.total;
                        // self.searchKeyword = ''
                    });
            }
        },
        mounted () {
            if(this.$route.query.msgBiz){this.msgBiz = this.$route.query.msgBiz}
            this.getlist(1)
        }
    };
</script>

<style lang="less">
    /*@import "../../styles/common";*/
    .laberStyle{
        padding: 4px 8px;
        background: #00a050;
    }
</style>
