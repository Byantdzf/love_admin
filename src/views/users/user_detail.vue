<template>
	<div class="hello">
		<Menu mode="horizontal" theme="light" active-name="1">
			<MenuItem name="1">
				<Icon type="ios-paper"></Icon>
				用户详情
			</MenuItem>
		</Menu>
		<Row>
			<Col span="11" style="margin: 22px">
			<Card>
				<p slot="title" style="color: #ff6c4c">基本信息</p>
				<div style="display: inline-block">
					<span class="font_16 _bold">头像：<img :src="avatar" alt="" width="80rpx" style="box-shadow: 1px 1px 12px #c1c1c1"></span>
				</div>
				<div style="display: inline-block;margin-left: 22px;">
					<span class="font_16 _bold">用户名：</span>
					<span class="font_16">{{name}}</span>
				</div>
				<Table :columns="columns" :data="information" :show-header="false" :border="false" style="margin-top: 26px"></Table>
			</Card>
			</Col>
			<Col span="11" style="margin: 22px">
			<Card>
				<p slot="title" style="color: #ff6c4c">VIP信息</p>
				<Table :columns="columns1" :data="VIPinformation" :show-header="false" :border="false" style="margin-top: 26px"></Table>
				<Card style="margin-top: 12px;">
					<p slot="title">生活照</p>
					<span v-for="(item,index) in photos" style="margin: 0 10px;">
						<img :src="item" alt="" width="80rpx" @click="showModal(item,'image')">
					</span>
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">身份证</p>
					<span v-for="(item,index) in identification_photos" style="margin: 0 10px;">
						<img :src="item" alt="" width="80rpx" @click="showModal(item,'image')">
					</span>
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">毕业照</p>
					<span v-for="(item,index) in graduate_photos" style="margin: 0 10px;">
						<img :src="item" alt="" width="80rpx" @click="showModal(item,'image')">
					</span>
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">其他证件</p>
					<span v-for="(item,index) in other_photos" style="margin: 0 10px;">
						<img :src="item" alt="" width="80rpx" @click="showModal(item,'image')">
					</span>
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">二维码</p>
					<span v-for="(item,index) in wechat_qrcode" style="margin: 0 10px;">
						<img :src="item" alt="" width="80rpx" @click="showModal(item,'image')">
					</span>
				</Card>
				<Card style="margin-top: 12px;">
					<p slot="title">测试结果</p>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px;display: inline-block;color: #00a050;font-weight: bold" >爱情语言</p>
					<div style="border-bottom: 1px solid #d3d3d3;padding: 6px;padding-right: 22px;" v-for="item in love_languages" @click="showModal(item,'test')">
						<span>{{item.title}}</span>
						<Icon type="chevron-right" style="float: right;margin-top: 4px;margin-left: 22px;"></Icon>
						<span style="float: right">{{item.num}}</span>
					</div>
					<p style="border-bottom: 1px solid #d3d3d3;padding: 6px;display: inline-block;color: #a03a17;font-weight: bold" >交往基因</p>
					<div style="border-bottom: 1px solid #d3d3d3;padding: 6px;padding-right: 22px;" v-for="item in love_characters" @click="showModal(item,'test')">
						<span>{{item.title}}</span>
						<Icon type="chevron-right" style="float: right;margin-top: 4px;margin-left: 22px;"></Icon>
						<span style="float: right">{{item.num}}</span>

					</div>
					<div style="border-bottom: 1px solid #d3d3d3;padding: 6px;padding-right: 22px;" @click="showModal(character,'character')">
						<span style="color: #ff1837;font-weight: bold" >我的优势</span>
						<Icon type="chevron-right" style="float: right;margin-top: 4px;"></Icon>
					</div>

				</Card>

			</Card>
			</Col>
		</Row>
		<Modal
				v-model="modal"
				:title="message.title_v"
				ok-text="OK"

				no-cancel>
			<!--<p>{{message.type}}</p>-->
			<div style="font-size: 16px">
				<div v-if="message.type_v == 'test'">{{message.content}}</div>
				<div style="text-align: center"   v-if="message.type_v == 'image'">
					<img :src="message.image" style="width: 400px;"/>
				</div>
				<div v-if="message.type_v == 'character'">
					<p style="font-weight: bold;margin: 4px;" ><span>类型:</span><p>{{character.type}}</p></p>
					<p style="font-weight: bold;margin: 4px;" ><span>性格:</span><p>{{character.character}}</p></p>
					<p style="font-weight: bold;margin: 4px;" ><span>推荐职位:</span><p v-for="item in character.profession">{{item}}</p></p>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
    import axios from 'axios';
    import uAxios from '../../api';
    import config from '../../api/config';
    //  import md5 from 'js-md5';
    //	import moment from 'moment';

    export default {
        name: 'Org',
        data () {
            return {
                articlesId: '',
                columns: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'key'
                    }
                ],
                columns1: [
                    {
                        title: 'Name',
                        key: 'title'
                    },
                    {
                        title: 'Age',
                        key: 'key'
                    }
                ],
                information: [],
                VIPinformation: [],
                searchKeyword: '',
                activeTab: 'orgInfo',
                orgColumns: [
                    {
                        key: 'updatedAt',
                        width: '150px',
                        align: 'right'
                    },
                    {
                        key: 'value',
                        align: 'left',
                        render: (h, params) => {
                            if (params.row.key === 'LOGO') {
                                return h('div', [
                                    h('Avatar', {
                                        props: {
                                            src: params.row.value,
                                            shape: 'square'
                                        },
                                        style: {
                                            width: '50px',
                                            height: '50px',
                                            margin: '10px 0'
                                        }
                                    })
                                ]);
                            } else {
                                return h('div', [
                                    h('span', params.row.value)
                                ]);
                            }
                        }
                    }
                ],
                orgData: [],
                total: 0,
                orgTotal: 0,
                modal: false,
                name: '',
                mobile: '',
                avatar: '',
                photos: [],
				graduate_photos: [],
				other_photos: [],
				identification_photos: [],
				wechat_qrcode: [],
                love_characters: [],
                love_languages: [],
                character: {},
                message: {},
                uploaddata: []
            };
        },
        methods: {
            showModal(item, type) {
                console.log(this.character)
                if(type == 'test'){
                    this.modal = true;
                    this.message = item;
                    this.message.type_v = 'test';
                    this.message.title_v = item.title;
				}else if(type == 'image'){
                    this.modal = true;
                    this.message.title_v = '预览';
                    this.message.type_v = 'image';
                    this.message.image = item;
				}else{
                    this.modal = true;
                    this.message.title_v = '了解自己的优势';
                    this.message.type_v = 'character';
				}
				console.log(this.message)
            },
//            save () {
//                let self = this;
//                let data = {
//                    'file': self.filePath,
//                    'category_id': self.articlesId
//                };
//                uAxios.post('import/articles',data).then(res => {
//                    let result = res.data.data
//                    if(res.data.code == 1) {
//
//                    }
//                });
//            },
//            upload () {
//                var self = this;
//                self.loadingStatus = true;
//                var formData = new FormData();
////              var fileName = md5(self.file.name) + '.' + self.file.type.split('/').pop().toLowerCase();
//                var fileName = self.file.name;
//                var filePath = self.host + '/' + self.ossConfig.dir + fileName;
//                formData.append('name', self.ossConfig.dir + fileName);
//                formData.append('key', self.ossConfig.dir + fileName);
//                formData.append('policy', self.ossConfig.policy);
//                formData.append('OSSAccessKeyId', self.ossConfig.accessid);
//                formData.append('success_action_status', '200');
//                formData.append('signature', self.ossConfig.signature);
//                formData.append('file', self.file);
//                formData.append('filename', self.file.name);
//                console.log(formData);
//                console.log(self.ossConfig.host)
//                axios.post(self.ossConfig.host, formData, {headers: {'Content-Type': 'multipart/form-data'}}
//                ).then(function (response) {
//                    if (response.status === 200) {
////                        console.log(filePath);
//                        self.filePath = filePath;
//                        self.$Notice.success({
//                            title: '文件上传成功',
//                            desc: '文件 ' + self.file.name + ' 上传成功。'
//                        });
//                        self.file = null;
//                        self.save()
//                    } else {
//                        self.$Modal.error({
//                            content: response.statusText
//                        });
//                    }
//                });
//                self.loadingStatus = false;
//            },
//            handleFormatError (file) {
//                this.$Notice.warning({
//                    title: '文件格式不正确',
//                    desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
//                });
//            },
//            handleBeforeUpload (file) {
//                // console.log(file);
//                this.file = file;
//                this.imgName = file.name;
//                return false;
//            },
//            getData (id,page) {
//                // 获取机构资料
//                const self = this;
//                uAxios.get('categories/' + id + '/articles?page=' + page).then(res => {
//                    let result = res.data.data;
//                    self.orgData = result.data;
//                    self.orgTotal = result.total;
//                });
//            },
//            handlePage (num) {
//                let query = num + '&keyword=' + this.searchKeyword;
//                this.getData(this.articlesId, query);
//            },
//            handleSearch () {
//                // 处理搜索
//                let query = '1&keyword=' + this.searchKeyword;
//                this.getData(this.articlesId, query);
//            },
//            getSignature () {
//                const self = this;
//                uAxios.get('upload/signature').then(res => {
//                    let result = res.data.data;
//                    self.ossConfig = result;
//                    self.host = result.host;
//                });
//            }
            getlist (page) {
                let self = this;
                self.loading = true
                uAxios.get('admin/users/' + self.id + '?page=' + page )
                    .then(res => {
                        let result = res.data.data;
                        console.log(result)
                        self.name = result.name;
                        self.avatar = result.avatar;
                        self.mobile = result.mobile;
                        self.love_characters = result.love_characters;
                        self.love_languages = result.love_languages;
                        self.character = result.character;
                        self.photos = result.profile.photos
                        self.graduate_photos = result.profile.graduate_photos
                        self.other_photos = result.profile.other_photos
                        self.identification_photos = result.profile.identification_photos
                        self.wechat_qrcode = result.profile.wechat_qrcode
                        self.information = [
                            {
								name: '手机号',
								key: result.mobile
							},
                            {
                                name: '类型',
                                key: result.type == 'single' ? '单身' : '介绍人'
                            },

                            {
                                name: '性别',
                                key: result.sex == '1' ? '男' : '女'
                            },
                            {
                                name: '出生日期',
                                key: result.profile.birthday
                            },
                            {
                                name: '单身状态',
                                key: result.profile.state
                            },
                            {
                                name: '身高',
                                key: result.profile.stature + 'cm'
                            },
                            {
                                name: '体重',
                                key: result.profile.weight + 'cm'
                            },
                            {
                                name: '常住地',
                                key: result.profile.city
                            },
                            {
                                name: '户口类型',
                                key: result.profile.resident_type
                            },
                            {
                                name: '成长地',
                                key: result.profile.resident_city
                            },
                            {
                                name: '学历',
                                key: result.profile.degree
                            },
                            {
                                name: '毕业学校',
                                key: result.profile.graduate_school
                            },
                            {
                                name: '工作单位',
                                key: result.profile.company
                            },
                            {
                                name: '单位性质',
                                key: result.profile.work_sort
                            },
                            {
                                name: '行业',
                                key: result.industry + '~' + result.industry_sub
                            },
                            {
                                name: '加入时间',
                                key: result.profile.created_at
                            },
                            {
                                name: '推荐人',
                                key: result.from_user_name
                            },
                            {
                                name: 'VIP等级',
                                key: result.rank_name
                            },
                            {
                                name: '个人简介',
                                key: result.profile.introduction
                            },
                            {
                                name: '理想对象',
                                key: result.profile.ideal_mate
                            }

                        ]
                        self.VIPinformation = [
                            {
                                title: '薪资',
                                key: result.profile.salary
                            },
                            {
                                title: '购车情况',
                                key: result.profile.h_car == 1 ? '有' : '无'
                            },

                            {
                                title: '购房情况',
                                key: result.profile.h_housing == 1 ? '有' : '无'
                            }
                        ]
                        self.orgTotal = result.total;
                        self.loading = false;
                        // self.searchKeyword = ''

                    });
            },
        },
        mounted () {
            this.id = this.$route.params.user_detail_id;
            this.getlist(1);
//            this.articlesId = this.$route.params.articles_id;
//            this.getData(this.articlesId, 1);
//            this.getSignature()
        }
    };
</script>

<style>
	._bold{font-weight: bold}
</style>
