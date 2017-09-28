//language change zh-cn
// Author: kyon
// Date: 2017-08-11

var rblanguage= {
	login: {
		username:'用户名',
		password:'密码',
		code:'验证码',
	},
	admin: {
		bankname:'银行名称',
		account:'管理员账号',
		phone:'管理员手机号',
		contactname:'联系人姓名',
		contactphone:'联系人手机号',
		style:'样式',
		loginaddress:'登录地址',
		successmsg:'新增成功',
		errormsg:'异常',
		savemsg:'保存成功',
		configmsg:'配置成功',
		resetpassword:'重置密码',
		repasstip:'确认重置密码? 确认重置后,系统会将新密码发送至银行管理员手机。',
		resetmsg:'重置成功',
		disable:'禁用',
		bankdistip:'是否确认禁用该银行?',
		disablemsg:'禁用成功',
		enablemsg:'启用成功',
		email:'邮箱',
		province:'省',
		city:'城市',
	},
	alipay:{
		signdate:'报名日期',
		name:'姓名',
		birth:'出生年月',
		id:'身份证号',
		cantact:'联系方式',
		residence:'户口所在地',
		address:'家庭住址',
		namemsg:'姓名只能输入字母和汉字',
		idmsg:'请输入有效的身份证号',
		valid:'请输入有效的',
		listtitle:'选择支付金额',
		stunumber:'学生学号',
		confir:'提示移除后，下次只能通过学号的方式进行查询?',
		delconfirm:'确认删除订单?',
		begintime:'起始日期',
		endtime:'结束日期',
		pay:'支付',
		otherpaying:"其他用户正在支付。",
		neterror:"网络异常，请稍后重试",
		paysuccess:"支付成功!",
		payfail:"支付失败",
		groupname:'集团名称',
		adminaccount:'管理员账户',
		role:'角色',

	},
	bank:{
		username:'用户名',
		editmsg:'修改成功',
		repasswordgtip:'确认重置密码? 确认重置后,系统会将新密码发送至集团管理员手机.',
		disableadmintip:'是否确认禁用该管理员?',
		deladmintip:'是否确认删除该管理员?',
		del:'删除',
		delmsg:'删除成功',
		rolename:'角色名',
		roleconfig:'角色权限配置',
		delgrouptip:'是否确认禁用该集团?',
		menuallocation:'菜单分配',

	},
	group:{
		businessname:'商户号别名',
		privatekey:'私钥',
		scope:'应用范围',
		disablebusiness:'是否确认禁用该商户?',
		delschooltip:'是否确认删除该学校?',
		setmsg:'设置成功',
		schoolname:'学校名称',
		adminname:'管理员姓名',
		disableschooltip:'是否确认禁用该学校?',
		repasswordtip:'确认重置密码? 确认重置后,系统会将新密码发送至学校管理员手机.',
		repasswordmsg:'重置密码成功',
		resetkey:'重置授权密码',
		resetmsg:'重置授权密码成功',
		resetkeytip:'确认重置授权密码？确认重置后，系统会将新密码发送至学校管理员手机.',

	},
	school:{
		lifename:'生活号名称',
		paymentway:'缴费途径',
		paymentitem:'缴费项目',
		payTypeId:'项目类别',
		paymentamount:'缴费金额',
		paytime:'缴费开始日期',
		paytimeend:'缴费结束日期',
		allbusiness:'全部商户号别名',
		disabletollitem:'禁用收费项目',
		distollitemtip:'禁用后,将无法进行该项目的缴费,确认操作?',
		deltollitem:'删除收费项目',
		deltip:'确认删除',
		matip:'吗?',
		enabled:'已启用',
		disabled:'已禁用',
		allpayitem:'全部缴费项目',
		userenteramount:'自输入金额',
        itemfeetip:'缴费金额只能输入整数或两位小数',
        timeout:'请求超时,请重新导入',
        copysuccess:'复制成功'
	},
	oldpage:{
		entername:'请输入姓名',
		gendermsg:'请选择性别',
		birthmsg:'请选择出生年月',
		cantactmsg:'请输入联系方式',
		cantacterror:'请输入正确的联系方式',
		emailerror:'您输入的邮箱格式不正确',
		grademsg:'请选择年级',
		yearmsg:'请选择入学年份',
		classesmsg:'请选择班级',
		newstu:'请选择至少一个新生',
		neterrormsg:'网络异常，请稍候重试！',
		newsuccessmsg:'新增成功',
		majormsg:'请选择学院或系部',
		errortips:'请勿输入特殊字符',
		classesnamemsg:'请输入班级名称',
		selectmajormsg:'请选择所属专业',
		institutesmsg:'请输入院级/系部名称',
		selinstitutesmsg:'请选择院级/系部名称',
		majornamemsg:'请输入专业名称',
		allinstitutesmsg:'全部院系',
		selectinstitutesmsg:'请选择所属院系！',
		selectgrademsg:'请选择所属年级！',
		selectmajor:'请选择所属专业！',
		neterror:"网络连接出错！",
		editmsg:'修改成功',
		deletemsg:'删除成功',
		classeserrormsg:'班级名称不能为空！',
		editsuccess:'编辑成功',
		enterinstitutes:'请输入院系名称',
		majornonemsg:'专业名称不能为空',
		gradenonemsg:'年级名称不能为空',
	}
};

//validate.js表单验证时模板提示信息国际化
var defaults = {
    	isSubmitGo:false, //是否在表单提交时自动执行验证
        messages: {
            required: '%s不能为空',
            matches: '%s和%s必须一致',
            "default": '%s仍然是默认值,请继续修改',
            valid_email: '请输入正确的%s',
            valid_emails: '请输入正确的%s',
            min_length: '%s的长度至少为%s位',
            max_length: '%s的长度不能超过%s位',
            exact_length: '%s的长度必须为%s位',
            greater_than: '%s的值必须大于%s',
            less_than: '%s的值必须小于%s',
            alpha: '%s只能输入字母.',
            alpha_numeric: '%s只能输入字母和数字',
            alpha_dash: '%s只能包含字母数字、横线、下划线.',
            numeric: '%s只能输入数字',
            integer: '%s只能输入整数',
            decimal: '%s只能输入整数或小数.',
            is_natural: '%s只能输入正数.',
            is_natural_no_zero: '%s必须包含一个大于0的数',
            valid_ip: '请输入正确的ip地址',
            valid_base64: '请输入正确的base64字符',
            valid_credit_card: '请输入正确的信用卡号',
            is_file_type: '%s必须包含正确的文件格式',
            valid_url: '请输入正确的url地址',
            greater_than_date: '%s必须大于%s',
            less_than_date: '%s必须小于%s',
            greater_than_or_equal_date: '%s必须大于等于%s',
            less_than_or_equal_date: '%s必须小于等于%s',
            valid_phone:'请输入正确的%s',
            no_space:'%s不能输入空格'
        },
        callback: function(errors) {

        }
    };
