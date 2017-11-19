//insert
function keypress(e){
    e.preventDefault();
    var target = e.target;
    var value = target.getAttribute('data-value');
    var dot = valueCur.match(/\.\d{2,}$/);
    if(!value || (value !== 'delete' && dot)){
        return;
    }
    switch(value){
        case '0' :
            valueCur = valueCur === '0' ? valueCur : valueCur + value;
            break;
        case 'dot' : 
            valueCur = valueCur === '' ? valueCur : valueCur.indexOf('.') > -1 ? valueCur : valueCur + '.'; 
            break;
        case 'delete' : 
            valueCur = valueCur.slice(0,valueCur.length-1);
            break;
        default : 
            valueCur = valueCur === '0' ? value : valueCur + value;
    }
    format();
}

//format
function format(){
    var arr = valueCur.split('.');
    var right = arr.length === 2 ? '.'+arr[1] : '';
    var num = arr[0];
    var left = '';
    while(num.length > 3){
        left = ',' + num.slice(-3) + left;
        num = num.slice(0,num.length - 3);
    }
    left = num + left;
    valueFormat = left+right;
    valueFinal = valueCur === '' ? 0 : parseFloat(valueCur);
    check();
}

//check
function check(){
    amount.innerHTML = valueFormat;
    if(valueFormat.length > 0){
        clearBtn.classList.remove('none');
    }else{
        clearBtn.classList.add('none');
    }
    if(valueFinal === 0 || valueCur.match(/\.$/)){
        payBtn.classList.add('disable');
    }else{
        payBtn.classList.remove('disable');
    }
}

//clear
function clearFun(){
    valueCur = '';
    valueFormat = '';
    valueFinal = 0;
    amount.innerHTML = '';
    clearBtn.classList.add('none');
    payBtn.classList.add('disable');
}

//show remark
function remarkShowFun(){
    remarkPop.classList.remove('none');
}

//cancel remark
function remarkCancelFun(){
    var value = remarkBtn.innerHTML === '付款备注' ? '' : remarkBtn.innerHTML;
    remarkInput.value = value;
    remarkPop.classList.add('none');
}

//confirm remark
function remarkConfirmFun(){
    var value = trim(remarkInput.value) || '付款备注';
    remarkBtn.innerHTML = value;
    remarkPop.classList.add('none');
}

//submit
function submitFun(){
    if(!submitAble || payBtn.classList.contains('disable')){
        return;
    }
    if(valueFinal === 0){
        tips.show('请输入金额！');
        return;
    }
    
    if(valueFinal > 50000){
        tips.show('支付金额不能大于5万');
        return;
    }
    
    submitAble = false;
    loading.show();
    
    data.money = Math.round(valueFinal*100);
    data.attach = trim(remarkInput.value);
    
    new Post({
        url : '/spay/fixedCodePay',
        data : data,
        error : function(){
            loading.hide();
            submitAble = true;
            tips.show('网络异常，请稍后重试！');
        },
        success : function(response){
            if(response.status == 200){
                location.href = response.message.code_url;
            }else{
                tips.show(response.message);
            }
            loading.hide();
            submitAble = true;
        }
    });
    
}



var keyboard = getId('keyboard');
var amount = getId('amount');
var clearBtn = getId('clearBtn');
var payBtn = getId('payBtn');
var remarkBtn = getId('remarkBtn');
var remarkPop = getId('remarkPop');
var remarkInput = getId('remarkInput');
var remarkCancel = getId('remarkCancel');
var remarkConfirm = getId('remarkConfirm');
var valueCur = '';
var valueFormat = '';
var valueFinal = 0;
var submitAble = true;
var data = {
    mchId : getId('mchId').value,
    userId : getId('userId').value,
    sign : getId('sign').value,
    mchName : getId('mchName').value,
    outTradeNo : getId('outTradeNo').value,
    body : getId('body').value,
    client : getId('client').value,
    userName : getId('userName').value,
    payType : getId('payType').value
};

new Hammer(keyboard).on('tap',keypress);
new Hammer(payBtn).on('tap',submitFun);
new Hammer(clearBtn).on('tap',clearFun);
new Hammer(remarkBtn).on('tap',remarkShowFun);
new Hammer(remarkCancel).on('tap',remarkCancelFun);
new Hammer(remarkConfirm).on('tap',remarkConfirmFun);
remarkInput.value = '';
