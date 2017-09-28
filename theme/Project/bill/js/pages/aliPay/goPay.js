/**
 * 兴业公众号支付JS
 */
function submitForm(url, orderId, orderAmount, goodName, cprId, accountType, payStartmonth, payEndmonth) {
	//alert(accountType);
	$("#buttonId").attr("disabled", "disabled").prop("disabled", true).addClass('disabled').html('支付中，请稍后...'); // 当执行JS函数的时候禁用支付按钮
	if(accountType == 'wft') {
		$.ajax({
			type: "post",
			dataType: "json",
			url: url + "/wechat/wftPay/wftPay",
			async: true,
			data: {
				"body": goodName,
				"amount": orderAmount,
				"payStartmonth": payStartmonth,
				"payEndmonth": payEndmonth,
				"orderId": orderId
			},
			success: function(json) {
				debug_config._listeners(json);

				if(json.flg == "true") {
					// 把获取到的字段都.toString()转换成字符串，不然支付失败
					pay(url, json.appId.toString(), json.timeStamp.toString(),
						json.nonceStr.toString(), json.pack.toString(),
						json.signType.toString(), json.paySign.toString());
				} else {
					$("#buttonId").removeAttr("disabled").prop("disabled",
						false).removeClass('disabled').html(rblanguage.alipay.pay); // 当支付失败时候解除禁用支付按钮
					if(json.message == 'USERPAYING') {
						alert(rblanguage.alipay.otherpaying);
					} else {
						alert(json.message);
					}

				}
			},
			error: function() {
				$("#buttonId").removeAttr("disabled").prop("disabled", false).removeClass('disabled').html(rblanguage.alipay.pay); // 当支付失败时候解除禁用支付按钮
				alert(rblanguage.alipay.neterror);
			}
		});
	} else if(accountType == 'dx') {
		$.ajax({
			type: "post",
			dataType: "json",
			url: url + "/wechat/dxUnifiedPay/dxUnifiedPay",
			async: true,
			data: {
				"body": goodName,
				"amount": orderAmount,
				"payStartmonth": payStartmonth,
				"payEndmonth": payEndmonth,
				"orderId": orderId
			},
			success: function(json) {
				debug_config._listeners(json);
				if(json.flg == "true") {
					// 把获取到的字段都.toString()转换成字符串，不然支付失败
					pay(url, json.appId.toString(), json.timeStamp.toString(),
						json.nonceStr.toString(), json.package.toString(),
						json.signType.toString(), json.paySign.toString());
				} else {
					$("#buttonId").removeAttr("disabled").prop("disabled", false).removeClass('disabled').html(rblanguage.alipay.pay); // 当支付失败时候解除禁用支付按钮
					alert(json.message);
				}
			},
			error: function() {
				$("#buttonId").removeAttr("disabled").prop("disabled", false).removeClass('disabled').html(rblanguage.alipay.pay); // 当支付失败时候解除禁用支付按钮
				alert(rblanguage.alipay.neterror);
			}
		});
	}
}

// uid:表示我这个微信替谁缴了费。缴费人id，不是微信付款人id哈
// cprId:业主对应的房子id
function pay(url, appid, time, nonce, packages, signtype, paysign) {
	//alert(appid+"--"+time+"--"+nonce+"--"+packages+"--"+signtype+"--"+paysign);
	WeixinJSBridge.invoke('getBrandWCPayRequest', {
		"appId": appid,
		"timeStamp": time,
		"nonceStr": nonce,
		"package": packages,
		"signType": signtype,
		"paySign": paysign
	}, function(res) {
		//alert(res);
		//alert(res.err_msg);
		//  	debug_config._listeners(json);
		if(res.err_msg == "get_brand_wcpay_request:ok") {
			alert(rblanguage.alipay.paysuccess);
			WeixinJSBridge.call('closeWindow'); // 这句代码是在微信浏览器里关闭页面，跳出到公众号关注窗口
		} else {
			$("#buttonId").removeAttr("disabled").prop("disabled", false).removeClass('disabled').html(rblanguage.alipay.pay); // 当支付失败时候解除禁用支付按钮
			alert(rblanguage.alipay.payfail);
			alert(res.err_msg);
		}
	})
}