<template>
    <div>
        <Tabs>
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
                currentPage: 1,
                searchKeyword: '',
                orgTotal: 0,
                fieldList: [],
                modelValue: '',
                industryList: [],
                id: '',
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
                        key: 'pic',
                        render: (h, params) => {
                            return h('div', [
                              h('img', {
                                attrs: {
                                  src: params.row.pic
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
                        key: 'name',
                        align: 'center',
    //                        width: 100,
                        editable: true
                      },
                    {
                        title: '普通价格',
                        key: 'price',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                        title: '福分价格',
                        key: 'score_price',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                        title: '已售件数',
                        key: 'order_num',
                        align: 'center',
//                        width: 100,
                        editable: true
                    },
                    {
                        title: '规格',
                        key: 'unit',
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
                                        this.modal1 = true;
                                        this.id = params.row.id;
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
                loading: false,
                brokerLecturerData: []
            };
        },
        methods: {
          // 确定删除
            ok () {
                uAxios.delete(`goods/${this.id}` ).then((response) => {
                    if (response.data.code === 0) {
                        this.$Message.info('删除成功');
                        this.getlist(this.currentPage);
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
          // 分页
            handlePage (num) {
                this.currentPage = num;
                this.getlist(num);
            },
            getlist (page) {
                let self = this;
                self.loading = true;
                uAxios.get(`goods?page=${page}&keyword=${self.searchKeyword}`)
                    .then(res => {
                        let result = res.data.data;
                        self.information = result.data;
                        console.log(self.information);
                        self.orgTotal = result.total;
                        self.loading = false;
                        // self.searchKeyword = ''
                    });
            },
            handleSearch () {
              this.getlist(1);
            }
        },
        mounted () {
            this.getlist(1);
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
