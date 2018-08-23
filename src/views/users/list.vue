<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label='用户列表' name="org">
                <Input
                        v-model="searchKeyword"
                        @on-enter="createLabel"
                        placeholder="搜索用户..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="createLabel" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                <Card style="margin-bottom: 32px">
                    <p slot="title">
                        <Icon type="ionic"></Icon>
                        点击标签筛选
                    </p>
                    <RadioGroup v-model="social" v-for="(item,index) in labels" :key="index" @on-change="filterLabel" style="margin-bottom: 12px;display: inline-block">
                        <Radio  :label="index">
                            <!--<Icon type="ios-pricetags"></Icon>-->
                            <span>{{item}}</span>
                        </Radio>
                    </RadioGroup>
                </Card>
                <Table :loading="loading" :columns="Columns" :data="information" style="width: 100%;" border></Table>
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
        name: 'orders',
        data () {
            return {
                activeTab: 'org',
                currentPage: 1,
                searchKeyword: '',
                orgTotal: 0,
                id: '',
                social: '',
                labels: ['全部','男','女'],
                Columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'mobile'
                    },
                    {
                        title: '头像',
                        key: 'updatedAt',
                        render: (h, params) => {
                            return h('div', [
                                h('Avatar', {
                                    props: {
                                        src: params.row.avatar,
                                        size: 'large'
                                    },
                                    style: {
                                        margin: '0 10px 0 0'
                                    }
                                }),
//                                h('strong', params.row.profile.title)
                            ]);
                        },
                        align: 'center'
                    },
                    {
                        title: '用户类型',
                        align: 'center',
                        key: 'type',
                        width: 100
                    },
                    {
                        title: '性别',
                        align: 'center',
                        width: 100,
                        key: 'sex'
                    },
                    {
                        title: '加入时间',
                        align: 'center',
                        width: 100,
                        key: 'created_at'
                    },

                    {
                        title: '操作',
                        key: 'title',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let argu = {user_order_id: params.row.id};
                                            this.$router.push({
                                                name: 'user_order',
                                                params: argu
                                            });
                                        }
                                    }
                                }, '用户订单'),
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
                                            let argu = {user_detail_id: params.row.id};
                                            this.$router.push({
                                                name: 'user_detail',
                                                params: argu
                                            });
                                        }
                                    }
                                }, '用户详情'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let argu = {user_integral_id: params.row.id};
                                            this.$router.push({
                                                name: 'user_integral',
                                                params: argu
                                            });
                                        }
                                    }
                                }, '福分记录'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let argu = {user_mcircle_id: params.row.id};
                                            this.$router.push({
                                                name: 'user_mcircle',
                                                params: argu
                                            });
                                        }
                                    }
                                }, '用户企业')
                            ]);
                        }
                    }
                ],
                value: '',
                information: [],
                loading: false
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
                        this.getlist(this.currentPage)
                    } else {
                        this.$Modal.error({
                            content: response.data.message
                        });
                    }
                })
            },
            handleSelectAll2 (post_label) {
                console.log(post_label)
//              debugger
                let self = this
                self.social1 = []
                post_label.forEach((item, index, arr) => {
                    self.social1.push(arr[index].label._id);
                });
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
            // 创建标签
            editLabel (_id,title) {
                this.modal2 = true
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
                let self = this,
                    data = {
                        label_ids: self.social
                    }
                console.log(data)

                uAxios.post('postlabels/' + _id + '/move/' + type,data)
                    .then(res => {
                        console.log(res.data.code)
                        if(res.data.code == 0){
                            self.$Message.info('操作成功');
                            self.getlist(this.currentPage)
                        }else{
                            self.$Modal.error({
                                content: res.data.message
                            });
                        }
                    });
            },
            createLabel () {
                console.log(this.searchKeyword);
                this.page = 1;
                this.getlist(1);
            },
            filterLabel (page) {
                console.log(this.social)
                this.page = 1;
                this.getlist(1);
            },


            ok () {
                let self = this
                uAxios.delete('labels/' + self.id ).then((response) => {
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
                console.log(this.value)
                let self = this
                let data = {
                    title: this.value
                }
                uAxios.put('labels/' + self.id, data).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.info('标记成功');
                        this.getlist(this.currentPage)
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
                this.currentPage = num;
                if (this.social.length == 0) {
                    this.getlist(num);
                } else {
                    this.filterLabel(num);
                }

            },
            getlist (page) {
                let self = this
                self.loading = true
                uAxios.get('admin/users?page=' + page + '&sex=' + self.social + '&keyword=' + self.searchKeyword)
                    .then(res => {
                        let result = res.data.data;
                      self.information = result.data.map((item)=>{
                         return {
                             avatar: item.avatar,
                             created_at:  item.created_at,
                             id: item.id,
                             mobile: item.mobile,
                             name: item.name,
                             sex: item.sex == 1 ? '男' : '女',
                             type: item.type == 'single' ? '单身' : '介绍人'
                          }
                      })
                        console.log(self.information)
                        self.orgTotal = result.total
                        self.loading = false
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
