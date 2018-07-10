<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.mobile" placeholder="请输入手机号">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend"><Icon :size="14" type="locked"></Icon></span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <span slot="title" style='float: right;' @click="goRegister">
	                    <Icon type="log-in"></Icon>
	                    去注册
                	</span>
                	<div style='clear: both;'></div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import store from '../store';
    import Cookies from 'js-cookie';
    import uAxios from '../api/index';
    import config from '../api/config';

    export default {
        data () {
            return {
                form: {
                    mobile: '',
                    password: ''
                },
                rules: {
                    mobile: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
        	goRegister () {
        		let URL = config.baseURL.split('api')[0]
        		window.open(URL + 'register')
        	},
            handleSubmit () {
                const self = this;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let data = {
                            'mobile': self.form.mobile,
                            'password': self.form.password,
                            'wants_token': true
                        };
                        uAxios.post('login', data).then((response) => {
                            // console.log(response);
                            if (response.data.code === 0) {
                                let result = response.data.data;
//                              if (parseInt(result.user_infor.is_super_admin) === 1) {
//                                  localStorage.setItem('permissionList', 'org,search,news,config,coin,sheet,user');
//                              } else {
//                                  localStorage.setItem('permissionList', result.user_infor.permission);
//                              }
//                              store.commit('updatePermission', result.user_infor.permission);
                                localStorage.setItem('ACCESS_TOKEN', result.access_token);
                                localStorage.setItem('mobile', self.form.mobile);
                                Cookies.set('user', self.form.mobile);
                                Cookies.set('avatar', result.avatar);
                                Cookies.set('name', result.name);
                                self.$router.push({
                                    path: '/'
                                });
                            } else {
                                if (response.data.message === 'The given data was invalid.') {
                                    self.$Notice.error({
                                        title: '抱歉',
                                        desc: response.data.errors.mobile[0]
                                    });
                                } else {
                                    self.$Notice.error({
                                        title: '抱歉',
                                        desc: response.data.message
                                    });
                                }
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style>

</style>
