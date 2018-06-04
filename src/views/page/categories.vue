<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label="文章标签" name="org">
                <Input
                        v-model="searchKeyword"
                        @on-enter="createLabel"
                        placeholder="创建标签..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="createLabel" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">创建</Button>
                </span>
                <Card style="margin-bottom: 32px">
                    <p slot="title">
                        <Icon type="ionic"></Icon>
                        点击标签筛选
                    </p>
                    <CheckboxGroup v-model="social" v-for="(item,index) in labels" @on-change="filterLabel" style="margin-bottom: 12px">
                        <Button type="primary"  size="small" @click="editLabel(item._id,item.title)">修改</Button>
                        <Button type="error"  size="small" @click="deleteLabel(item._id)">删除</Button>
                        <Checkbox :label="item._id">
                            <Icon type="ios-pricetags"></Icon>
                            <span>{{item.title}}</span>
                        </Checkbox>
                    </CheckboxGroup>

                </Card>
                <Table :loading="loading" :columns="orgColumns" :data="orgData" style="width: 100%;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
            </TabPane>
        </Tabs>
        <Modal
                v-model="modal1"
                title="温馨提示"
                @on-ok="ok"
        >
            <p>是否确定删除该标签？</p>
        </Modal>
        <Modal
                v-model="modal"
                title="编辑标签"
                @on-ok="cancel"
        >
            <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
        </Modal>
    </div>
</template>

<script>
    import uAxios from '../../api/index';
    import config from '../../api/config';
    // import moment from 'moment';

    export default {
        search: '',
        name: 'users',
        data () {
            return {
                activeTab: 'org',
                currentTab: 'org',
                currentPage: 1,
                searchKeyword: '',
                orgTotal: 0,
                brokerTotal: 0,
                lecturerTotal: 0,
                orgLecturerTotal: 0,
                brokerLecturerTotal: 0,
                fieldList: [],
                modelValue: '',
                industryList: [],
                id: '',
                addressList: [],
                modal1: false,
                social: [],
                labels: [],
                orgColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '发布时间',
                        align: 'center',
                        width: 150,
                        key: 'createdAt',
                        sortable: true
                    },
                    {
                        title: '文章标题',
                        key: 'title',
                        width: 600,
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
                                        margin: '5px',
                                        fontSize: '14px'
                                        // color: '#253fd3'
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
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '点赞数',
                        width: 100,
                        key: 'likeNum',
                        align: 'center'
                    },
                    {
                        title: '更新时间',
                        key: 'updatedAt',
                        width: 150,
                        align: 'center',
                        sortable: true
                    },
                    // {
                    //     title: '时间间隔',
                    //     key: 'time',
                    //     align: 'center'
                    // },
                    {
                        title: '公众号头像',
                        key: 'profile_title',
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
                        key: 'title',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.postlabels_move(params.row.move_id,'up')
                                        }
                                    }
                                }, '上移'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.postlabels_move(params.row.move_id,'down')
                                        }
                                    }
                                }, '下移'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.postlabels_move(params.row.move_id,'start')
                                        }
                                    }
                                }, '置顶'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.postlabels_move(params.row.move_id,'end')
                                        }
                                    }
                                }, '置底')
                            ]);
                        }
                    }
                ],
                modal: false,
                value: '',
                orgData: [],
                brokerData: [],
                lecturerData: [],
                orgLecturerData: [],
                loading: false,
                brokerLecturerData: []
            };
        },
        watch: {
            activeTab: {
                handler () {
                    switch (this.activeTab) {
                        case 'org':
                            this.getOrgData(1, '');
                            break;
                        case 'broker':
                            this.getBrokerData(1, '');
                            break;
                        case 'lecturer':
                            this.getLecturerData(1, '');
                            break;
                        case 'orgLecturer':
                            this.getOrgLecturers(1, '');
                            break;
                        case 'brokerLecturer':
                            this.getBrokerLecturers(1, '');
                            break;
                        default:
                            this.getOrgData(1, '');
                    }
                }
            }
        },
        methods: {
            // 创建标签
            editLabel (_id,title) {
                this.modal = true
                this.id = _id
                this.value = title
            },
            deleteLabel (_id) {
                this.modal1 = true
                this.id = _id
                let index = this.social.indexOf(_id)
                if (index > -1) {
                    this.social.splice(index, 1);
                }
            },
            postlabels_move (_id, type) {
                uAxios.post('postlabels/' + _id + '/move/' + type)
                    .then(res => {
                        console.log(res.data.code)
                        if(res.data.code == 0){
                            this.$Message.info('操作成功');
                            this.getlist(1)
                        }else{
                            this.$Message.error(res.message);
                        }
                    });
            },
            createLabel () {
                let self = this
                console.log(this.searchKeyword);
                let data = {
                    title: this.searchKeyword
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
            filterLabel (page) {
              console.log(this.social)
                let self = this
                let data = {
                    label_ids: this.social
                }
                uAxios.post('labels/posts?page=' + page, data)
                    .then(res => {
                        let result = res.data.data;
                        self.orgData = result.data.map((item)=>{
                            return item.post
                        })
                        console.log(self.orgData)
                        self.orgTotal = result.total;
                        self.searchKeyword = ''
                    });
            },
            ok () {
                let self = this
                uAxios.delete('labels/' + self.id ).then((response) => {
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
                    title: this.value
                }
                uAxios.put('labels/' + self.id, data).then((response) => {
                    if (response.data.code === 0) {
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
                if (this.social.length == 0) {
                    this.getlist(num);
                } else {
                    this.filterLabel(num);
                }

            },
            getlist (page) {
                let self = this;
                self.loading = true
                uAxios.get('labels/posts/v2?page=' + page)
                    .then(res => {
                        let result = res.data.data;
                        self.orgData = result.data.map((item)=>{
                           return {
                               move_id: item._id,
                               link:  item.post.link,
                               profile: item.post.profile,
                               msgBiz: item.post.msgBiz,
                               createdAt: item.post.createdAt,
                               digest: item.post.digest,
                               publishAt: item.post.publishAt,
                               updatedAt: item.post.updatedAt,
                               _id: item.post._id,
                               likeNum: item.post.likeNum,
                               readNum: item.post.readNum,
                               title: item.post.title
                            }
                        })
                        console.log(self.orgData)
                        self.orgTotal = result.total
                        self.loading = false
                    });
                uAxios.get('labels')
                    .then(res => {
                        let result = res.data.data;
                        self.labels = result.data;
                        self.labels.forEach((item, index, arr) => {
                            arr[index].active = false;
                        })
                        console.log(self.labels)
                    });
            },
            handleSearch () {
                let query = '&keyword=' + this.searchKeyword;
                let self = this;
                let page = 1;
                uAxios.get('posts?page=' + page + query)
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
            this.getlist(1)
//          this.getOrgData(1, '');
//          this.$store.commit('updateMenulist');
        }
    };
</script>

<style lang="less">
    /*@import "../../styles/common";*/
</style>
