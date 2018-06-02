<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label="文章标签" name="org">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="创建标签..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">创建</Button>
                </span>
                <Card style="margin-bottom: 32px">
                    <p slot="title">
                        <Icon type="ionic"></Icon>
                        点击标签搜索
                    </p>
                    <CheckboxGroup v-model="social" v-for="(item,index) in labels" @on-change="filterLabel">
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
                        width: 120,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '发布时间',
                        width: 120,
                        align: 'center',
                        key: 'createdAt',
                        sortable: true
                    },
                    {
                        title: '文章标题',
                        key: 'title',
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
                        align: 'center'
                    },
                    {
                        title: '点赞数',
                        key: 'linkNum',
                        align: 'center'
                    },
                    {
                        title: '更新时间',
                        key: 'updatedAt',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '时间间隔',
                        key: 'time',
                        align: 'center'
                    },
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
            filterLabel () {
              console.log(this.social)
                let self = this
                let data = {
                    label_ids: this.social
                }
                uAxios.post('labels/posts', data)
                    .then(res => {
                        let result = res.data.data;
                        self.orgData = result.data
                        console.log(self.orgData)
                        self.orgTotal = result.total;
                        self.searchKeyword = ''
                    });
            },
            ok () {
                let self = this
                uAxios.delete('article/categories/' + self.id ).then((response) => {
                    if (response.data.code === 0) {
//	                	this.$Modal.error({
//	                        content: '删除成功'
//	                    });
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
                uAxios.put('article/categories/' + self.id, data).then((response) => {
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
                uAxios.get('posts?page=' + page)
                    .then(res => {
                        let result = res.data.data;
                        self.orgData = result.data
                        console.log(self.orgData)
                        self.orgTotal = result.total
                        self.searchKeyword = ''
                        self.loading = false
                    });
                uAxios.get('labels?page=' + page)
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
            this.getlist()
//          this.getOrgData(1, '');
//          this.$store.commit('updateMenulist');
        }
    };
</script>

<style lang="less">
    /*@import "../../styles/common";*/
</style>
