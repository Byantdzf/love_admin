<template>
	<div class="hello">
		<Menu mode="horizontal" theme="light" active-name="1">
			<MenuItem name="1">
				<Icon type="ios-paper"></Icon>
				用户详情
			</MenuItem>
		</Menu>
		<Row>
			<Col span="22" style="margin: 22px">
			<Card>
				<Form ref="formValidate" :model="formValidate" :label-width="80">
					<FormItem label="用户头像" prop="image">
                        <Card>
                        <img :src="formValidate.avatar" alt="">
                        </Card>
					</FormItem>
					<FormItem label="用户名" prop="name">
						<Input v-model="formValidate.name" placeholder="Enter your name"></Input>
					</FormItem>
					<FormItem label="联系方式" prop="link">
						<Row>
							<Col span="5">
							<Input v-model="formValidate.mobile" placeholder="Enter your order_num"></Input>
							</Col>
						</Row>
					</FormItem>
					<FormItem label="剩余积分" prop="name">
						<Row>
							<Col span="5" style="margin-right: 12px">
							 <Input v-model="formValidate.remain_amount"   placeholder="Enter your stock"></Input>
							</Col>
                            <Col span="5">
                            <Button type="warning" @click="gotoIntegral">福分记录</Button>
                            </Col>
						</Row>
					</FormItem>
                    <FormItem label="名下企业" prop="name">
                        <dropdown :dropData="enterprises" v-on:getGropData="getGropData" :id="enterprises_id"></dropdown>
                    </FormItem>
				</Form>
                <Card>
                    <p slot="title">用户订单</p>
                    <Input
                            v-model="searchKeyword"
                            @on-enter="handleSearch"
                            placeholder="搜索用户..."
                            style="width: 200px; margin-bottom: 22px;"/>
                    <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">搜索</Button>
                </span>
                    <Table :loading="loading" :columns="Columns" :data="orderList" style="width: 100%;" border></Table>
                    <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                          style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
                </Card>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
    import axios from 'axios';
    import uAxios from '../../api';
    import config from '../../api/config';
    import dropdown from '../components/dropdown';

    //  import md5 from 'js-md5';
    //	import moment from 'moment';

    export default {
        name: 'Org',
        data () {
            return {
              id: '',
              orgTotal: 0,        // 分页
              searchKeyword: '',  // 订单搜索
              formValidate: {},   // 数据赋值
              enterprises: [],    // 企业列表
              enterprises_id: '', // 默认企业id
              orderList: [],      //  用户订单
              loading: false,
              currentPage: 1,
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
                      }, '详情')
                    ]);
                  }
                }
              ]
            };
        },
      components: {
        dropdown: dropdown
      },
        methods: {
          gotoIntegral () {
            let argu = {user_integral_id: this.id};
            this.$router.push({
              name: 'user_integral',
              params: argu
            });
          },
          getGropData (_id) {
            this.formValidate.enterprise_id = _id; // 企业
            let argu = {user_mcircle_id: _id};
            this.$router.push({
              name: 'user_mcircle',
              params: argu
            });
          },
          // 获取数据
            getlist (page) {
                let self = this;
                self.loading = true
                uAxios.get('users/' + self.id + '?page=' + page )
                    .then(res => {
                      if (res.data.code === 0) {
                        let result = res.data.data;
                        self.formValidate = {
                            name: result.name,
                            avatar: result.wechat.avatar,
                            created_at: result.created_at,
                            mobile: result.mobile,
                            id: result.id,
                            remain_amount: result.score.remain_amount
                        };
                        console.log(self.formValidate)
                        self.loading = false;
                      }else {
                        alert('数据出错了！');
                      }
                    });
            },
          // 用户企业
          getEnterprises () {
            let self = this;
            self.loading = true;
            uAxios.get(`users/${self.id}/enterprises?nopage=1`)
              .then(res => {
                if (res.data.code === 0) {
                  let result = res.data.data;
                  self.enterprises = result;
                  self.enterprises_id = self.enterprises[0].id;
                  self.loading = false;
                }else {
                  alert('数据出错了！');
                }
              });
          },
          // 用户订单
          getOrder (page) {
            let self = this;
            self.loading = true;
            uAxios.get(`users/${self.id}/orders?page=${page}&keyword=${self.searchKeyword}`)
              .then(res => {
                if (res.data.code === 0) {
                  let result = res.data.data;
                  self.orderList = result.data;
                  console.log(self.orderList);
                  self.orgTotal = result.total;
                  self.loading = false;
                }else {
                  alert('数据出错了！');
                }
              });
          },
          // 搜索
          handleSearch () {
            this.getlist(1);
          },
          // 分页
          handlePage (num) {
            this.currentPage = num;
            this.getlist(num);
          }
        },
        mounted () {
            this.id = this.$route.params.user_detail_id;
            this.getEnterprises();
            this.getOrder();
            this.getlist(1);
        }
    };
</script>

<style>
	._bold{font-weight: bold}
</style>
