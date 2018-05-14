<template>
    <div v-model="activeTab">
        <Tabs @on-click="getTab">
            <TabPane label="创建栏目" name="org">
                <Input
                        v-model="searchKeyword"
                        @on-enter="handleSearch"
                        placeholder="创建栏目..."
                        style="width: 200px; margin-bottom: 22px;"/>
                <span @click="handleSearch" >
                    <Button type="primary" icon="search" style=" margin-bottom: 22px;">创建</Button>
                </span>
                <Table :columns="orgColumns" :data="orgData" style="width: 100%;padding-top: 22px;" border></Table>
                <Page :total="orgTotal" @on-change="handlePage" :page-size="15"
                      style="float:right;margin-top:5px;margin-bottom:30px;"></Page>
            </TabPane>
        </Tabs>
        <Modal
        	v-model="modal1"
	        title="温馨提示"
	        @on-ok="ok"
	        >
	        <p>是否确定删除该栏目？</p>
	    </Modal>
	    <Modal
        	v-model="modal"
	        title="编辑分栏"
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
                orgColumns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: 'center',
                        editable: true
                    },
                    {
                        title: '操作',
                        width: 420,
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            if (parseInt(params.row.is_approval) === 1) {
                               
                            } else {
                            	return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '10px'
                                        },
                                        on: {
                                            click: () => {
                                                let argu = {articles_id: params.row.id};
                                                this.$router.push({
                                                    name: 'articles-info',
                                                    params: argu
                                                });
                                            }
                                        }
                                    }, '查看详情'),
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
                                            	this.id = params.row.id
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '10px'
                                        },
                                        on: {
                                            click: () => {
                                            	this.modal = true
                                            	this.id = params.row.id
                                            	this.value = params.row.title
                                            }
                                        }
                                    }, '编辑')
                                ]);
                            }
                        }
                    }
                ],
                modal: false,
                value: '',
                orgData: [],
                brokerData: [],
                lecturerData: [],
                orgLecturerData: [],
                brokerLecturerData: []
            };
        },
        methods: {
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
            	uAxios.get('article/categories?page=' + page)
                    .then(res => {
                        let result = res.data.data;
                        self.orgData = result.data
                        self.orgTotal = result.total;
                        self.searchKeyword = ''
                        
                    });
            },
            handleSearch () {
            	let query = '&title=' + this.searchKeyword;
            	let self = this;
            	let page = 1;
                uAxios.post('article/categories?page=' + page + query)
                    .then(res => {
                        let result = res.data.data;
                        this.getlist('1')
                        
                    });
            }
        },
        mounted () {
        	this.getlist()
        }
    };
</script>

<style lang="less">
    /*@import "../../styles/common";*/
</style>
