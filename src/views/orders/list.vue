<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label="全部"  name="ALL">
                <Col span="24">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="关键字搜索..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                <Table :loading="loading" :columns="orgColumns" :data="information" style="width: 100%;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                </Col>
            </TabPane>
            <TabPane label="未支付"  name="UNPAID">
                <Col span="24">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="关键字搜索..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                <Table :loading="loading" :columns="orgColumns" :data="information" style="width: 100%;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                </Col>
            </TabPane>
            <TabPane label="待发货"  name="PAID">
                <Col span="24">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="关键字搜索..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                <Table :loading="loading" :columns="orgColumns" :data="information" style="width: 100%;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                </Col>
            </TabPane>
            <TabPane label="已发货"  name="SENT">
                <Col span="24">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="关键字搜索..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                <Table :loading="loading" :columns="orgColumns" :data="information" style="width: 100%;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                </Col>
            </TabPane>
            <TabPane label="已完成"  name="SETTLED">
                <Col span="24">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="关键字搜索..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                <Table :loading="loading" :columns="orgColumns" :data="information" style="width: 100%;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
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
                activeTab: 'ALL',
                currentPage: 1,
                searchKeyword: '',
                status:'',
                orgTotal: 0,
                fieldList: [],
                modelValue: '',
                industryList: [],
                id: '',
                addressList: [],
                modal1: false,
                orgColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '用户名',
                        key: 'user_name',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                        title: '头像',
                        key: 'avatar',
                        render: (h, params) => {
                            return h('div', [
                                h('Avatar', {
                                    props: {
                                        src: params.row.avatar,
                                        size: 'large'
                                    }
                                })
                            ]);
                        },
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '商品名称',
                        key: 'goods_name',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                         title: '订单号',
                         key: 'trade_no',
                         align: 'center',
//                        width: 100,
                         editable: true
                    },
                    {
                        title: '联系人',
                        key: 'name',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                        title: '联系电话',
                        key: 'mobile',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                        title: '状态',
                        key: 'pay_status',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                     title: '价格',
                     key: 'goods_fee',
                     align: 'center',
//                        width: 100,
                     editable: true
                    },
                    {
                        title: '消费时间',
                        key: 'created_at',
                        align: 'center',
//                        width: 100,
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
                                        type: 'primary'
//                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row.id)
                                            let argu = {order_id: params.row.id};
                                             this.$router.push({
                                                 name: 'order-detail',
                                                 params: argu
                                             });
                                        }
                                    }
                                }, '详情')
                            ]);
                        }
                    }
                ],
                modal: false,
                value: '',
                information: [],
                title:'',
                msgBiz: '',
                loading: false,
                brokerLecturerData: []
            };
        },
        methods: {
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
//                                    self.getlist('1')
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
                    title: this.value,
                    msgBiz: this.msgBiz
                }
                uAxios.put('profiles/' + self.id, data).then((response) => {
                    if (response.data.code === 0) {
//                      this.$Modal.error({
//                          content: '删除成功'
//                      });
                        this.$Message.info('修改成功');
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
                console.log(type);
                this.getlist(1)
            },
            handlePage (num) {
                // 分页
                this.currentPage = num;
                this.getlist(num);

            },
            getlist (page) {
                let self = this;
                self.loading = true
                uAxios.get('orders?page=' + page  + '&keyword=' + self.searchKeyword + '&status=' + self.activeTab)
                    .then(res => {
                        let result = res.data.data;
                        console.log(result)
                        self.information = result.data.map((item)=>{
                            return {user_name: item.user_name,
                                trade_no: item.trade_no,
                                user_name: item.user_name,
                                goods_name: item.goods_name,
                                pay_status: item.pay_status,
                                goods_fee: item.goods_fee,
                                avatar: item.avatar,
                                goods: item.goods,
                                created_at: item.created_at,
                                name:item.name,
                                mobile:item.mobile,
                                id:item.id
                                }
                        })
                        console.log(self.information)
                        self.orgTotal = result.total;
                        self.loading = false
                        // self.searchKeyword = ''

                    });
            },
            remove (index,_id) {
                this.information.splice(index, 1);
                console.log(_id)
                uAxios.delete('profiles/' + _id)
                    .then(res => {
                        this.$Message.info('删除成功');
                    });
            },
            handleSearch () {
                let query = '&keyword=' + this.searchKeyword + '&status=' + this.activeTab;
                let self = this;
                let page = 1;
                uAxios.get('/orders?page=' + page + query)
                    .then(res => {
                        let result = res.data.data;
                        console.log(result)
                        self.information = result.data
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
    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        height: 120px;
        margin-top: -16px;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
