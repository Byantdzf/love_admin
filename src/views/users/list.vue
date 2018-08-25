<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label='用户列表' name="org">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="搜索用户..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                <Table :loading="loading" :columns="Columns" :data="information" style="width: 100%;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
            </TabPane>
        </Tabs>
        <Modal
                v-model="modal1"
                title="温馨提示"
                @on-ok="ok"
                @on-cancel="cancel">
            <p>是否确认删除该用户？</p>
        </Modal>
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
                activeTab: '',
                currentPage: 1,
                modal1: false,
                searchKeyword: '',
                orgTotal: 0,
                id: '',
                Columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        sortable: true
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
                                  type: 'primary'
//                                        size: 'small'
                                },
                                style: {
                                  margin: '12px'
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
                value: '',
                information: [],
                loading: false
            };
        },
        methods: {
          // 确定删除
          ok () {
            uAxios.delete(`users/${this.id}` ).then((response) => {
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
          // 取消删除
          cancel () {
            this.$Message.info('Clicked cancel');
          },
            getTab (type) {
                // 获得激活的Tab页
                this.activeTab = type;
            },
            handlePage (num) {
                // 分页
                this.currentPage = num;
                this.getlist(num);
            },
            getlist (page) {
                let self = this;
                self.loading = true;
                uAxios.get(`users?page=${page}&keyword=${self.searchKeyword}`)
                    .then(res => {
                        let result = res.data.data;
                        self.information = result.data.map((item)=>{
                          return item;
                        });
                        self.orgTotal = result.total;
                        self.loading = false;
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
</style>
