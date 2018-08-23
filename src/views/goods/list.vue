<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label="商品列表"  name="score">
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
            <TabPane label="首页推荐"  name="score">
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
                @on-cancel="cancel">
            <p>是否确认删除该商品？</p>
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
                activeTab: 'score',
                currentPage: 1,
                searchKeyword: '',
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
                        title: '商品图片',
                        key: 'avatar',
                        render: (h, params) => {
                            return h('div', [
                              h('img', {
                                attrs: {
                                  src: params.row.avatar
                                },
                                style: {
                                  width: '42px',
                                  margin: '12px'
                                }
                              }),
                            ]);
                        },
                        width: 120,
                        align: 'center'
                    },
                      {
                        title: '商品名称',
                        key: 'user_name',
                        align: 'center',
    //                        width: 100,
                        editable: true
                      },
                    {
                        title: '普通价格',
                        key: 'goods',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                  {
                    title: '福分价格',
                    key: 'goods',
                    align: 'center',
//                        width: 100,
                    editable: true
                  },
                    {
                        title: '已售件数',
                        key: 'type',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                        title: '上架时间',
                        key: 'created_at',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                  {
                    title: '首页推荐',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h,params) => {
                      return h('i-switch',{
                        props: {
                           size: 'large',
                           value: false
                        },
                        style: {
//                           marginRight: '5px'
                        },
                        on: {
                          change: () =>{
                            this.$Message.info('开关状态：' + status);
                          }
                        }
                      }, [
                        h('span', {
                          slot: 'open'
                        }, 'ON'),
                        h('span', {
                          slot: 'close'
                        }, 'OFF')
                      ])
                    }

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
//                                        size: 'small'
                                    },
                                    style: {
                                        margin: '12px'
                                    },
                                    on: {
                                        click: () => {
                                            let argu = {goods_id: params.row.id};
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
                                    },
                                    on: {
                                      click: () => {
                                        this.modal1 = true
                                      }
                                    }
                                  }, '删除')
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
              this.$Message.info('Clicked cancel');
            },
            getTab (type) {
                // 获得激活的Tab页
                this.activeTab = type;
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
                uAxios.get('admin/orders?page=' + page + '&type=' + self.activeTab + '&keyword=' + self.searchKeyword)
                    .then(res => {
                        let result = res.data.data;
                        console.log(result)
                        self.information = result.data.map((item)=>{
                            var type = '';
                            switch(item.type){
                                case 'score':
                                    type='福分充值';
                                    break;
                                case 'rank':
                                    type='VIP充值';
                                    break;
                                case 'other_rank':
                                    type='替人VIP充值';
                                    break;
                                case 'goods':
                                    type='兑换商品';
                                    break;
                                default:
                                    type='赠送礼物';
                            }
                            return {user_name: item.user_name,
                                    avatar: item.avatar,
                                    type: type,
                                    goods: item.goods,
                                    created_at: item.created_at,
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
                let query = '&keyword=' + this.searchKeyword;
                let self = this;
                let page = 1;
                uAxios.get('/admin/orders?page=' + page + query)
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
