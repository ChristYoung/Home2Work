(function() {

	function makeQuestionHtml(questionIndex, questionTagId, questionTitle, allQuestionCount, optionNum, b1, b2, b3, b4, b5) {
		var optionHtml = '<ul class="row"><li class="col-xs-2-5" value="1">' + b1 + '</li><li class="col-xs-2-5" value="2">' + b2 + '</li><li class="col-xs-2-5" value="3">' + b3 + '</li><li class="col-xs-2-5" value="4">' + b4 + '</li><li class="col-xs-2-5" value="5">' + b5 + '</li></ul><input name="question[' + questionTagId + ']"  type="hidden"/>';
		var html = '<div class="question disabled" question-no="' + questionIndex + '" question-tag="' + questionTagId + '"><h3><span class="question-no"><b>' + questionIndex + '</b>/' + allQuestionCount + '</span><span class="real-title">' + questionTitle + '</span></h3><div class="question-options">' + optionHtml + '</div></div>';
		return html;
	};

	function addSectionHeader(title, extraTag) {
		return '<div class="section_header_placeholder" ' + extraTag + '><div class="section_header"><h2>' + title + '</h2></div></div>';
	};

	function in_array(needle, haystack) {
		for(var i in haystack) {
			if(haystack[i] == needle) return true;
		}
		return false;
	};

	function find_array(needle, haystack) { //该方法用于 寻找某个数据在指定数组中的位置
		for(var i = 0; i < haystack.length; i++) {
			if(haystack[i] == needle) {
				return i;
			};
		}
	};

	$(function() {
		var Questions = jQuery.parseJSON('[{"tagID":1,"tag":"您精力充沛吗？"},{"tagID":2,"tag":"您容易疲乏吗？"},{"tagID":3,"tag":"您容易气短，呼吸短促，接不上气吗？"},{"tagID":4,"tag":"您说话声音低弱无力吗?"},{"tagID":5,"tag":"您感到闷闷不乐、情绪低沉吗?"},{"tagID":6,"tag":"您容易精神紧张、焦虑不安吗?"},{"tagID":7,"tag":"您因为生活状态改变而感到孤独、失落吗？"},{"tagID":8,"tag":"您容易感到害怕或受到惊吓吗?"},{"tagID":9,"tag":"您感到身体超重不轻松吗?"},{"tagID":10,"tag":"您眼睛干涩吗?"},{"tagID":11,"tag":"您手脚发凉吗?"},{"tagID":12,"tag":"您胃脘部、背部或腰膝部怕冷吗？"},{"tagID":13,"tag":"您比一般人耐受不了寒冷吗？"},{"tagID":14,"tag":"您容易患感冒吗?"},{"tagID":15,"tag":"您没有感冒时也会鼻塞、流鼻涕吗?"},{"tagID":16,"tag":"您有口粘口腻，或睡眠打鼾吗？"},{"tagID":17,"tag":"您容易过敏(对药物、食物、气味、花粉或在季节交替、气候变化时)吗?"},{"tagID":18,"tag":"您的皮肤容易起荨麻疹吗? "},{"tagID":19,"tag":"您的皮肤在不知不觉中会出现青紫瘀斑、皮下出吗?"},{"tagID":20,"tag":"您的皮肤一抓就红，并出现抓痕吗?"},{"tagID":21,"tag":"您皮肤或口唇干吗?"},{"tagID":22,"tag":"您有肢体麻木或固定部位疼痛的感觉吗?"},{"tagID":23,"tag":"您面部或鼻部有油腻感或者油亮发光吗?"},{"tagID":24,"tag":"您面色或目眶晦黯，或出现褐色斑块/斑点吗?"},{"tagID":25,"tag":"您有皮肤湿疹、疮疖吗?"},{"tagID":26,"tag":"您感到口干咽燥、总想喝水吗？"},{"tagID":27,"tag":"您感到口苦或嘴里有异味吗?"},{"tagID":28,"tag":"您腹部肥大吗?"},{"tagID":29,"tag":"您吃(喝)凉的东西会感到不舒服或者怕吃(喝)凉的东西吗？"},{"tagID":30,"tag":"您有大便黏滞不爽、解不尽的感觉吗?"},{"tagID":31,"tag":"您容易大便干燥吗?"},{"tagID":32,"tag":"您舌苔厚腻或有舌苔厚厚的感觉吗?"},{"tagID":33,"tag":"您舌下静脉瘀紫或增粗吗？"}]'),
			QuestionTagsWithSepacilOptionName = jQuery.parseJSON('["2","4","5","13"]'), //需要反向计分的问题列表
			currentQuestion = 1,
			allQuestionNum = Questions.length,
			maximumOffset;
		$(Questions).each(function(i) {
			if(in_array(this.tagID, QuestionTagsWithSepacilOptionName))
				var questionHtml = makeQuestionHtml(i + 1, this.tagID, this.tag, allQuestionNum, 4, '总是', '经常', '有时', '很少', '没有');
			else
				var questionHtml = makeQuestionHtml(i + 1, this.tagID, this.tag, allQuestionNum, 4, '没有', '很少', '有时', '经常', '总是');

			if(i == 0)
				$('#questions').append(addSectionHeader('请根据您最近一年的体验和感觉回答', ''));
			$('#questions').append(questionHtml);
		});

		$('#questions').find('.question[question-no="1"]').removeClass('disabled'); /*初始化*/
		$('#questions').find('.question[question-no="1"]').addClass('active');

		//CLICK OPTION!
		$(".question-options li").on('click', function() {
			//控制题目显示状态
			if($(this).parents('.question').attr('question-no') == currentQuestion) {
				$(this).parents('.question').attr('class', 'question normal');

				if(currentQuestion < allQuestionNum) {
					$('#questions').find('[question-no="' + (currentQuestion + 1) + '"]').attr('class', 'question active');
					$(window).scrollTop($('#questions').find('[question-no="' + (currentQuestion + 1) + '"]').offset().top - 60);
					$('body').find('.section_header').removeClass('fixed');
					$(this).parents('.question').prev('.section_header').addClass('fixed');
				};

				currentQuestion++;
			};
			//操作选项
			var thisTag = $(this).parents('.question').attr('question-tag');
			$('input[name="question[' + thisTag + ']"]').attr("value", $(this).attr("value"));

			$(this).parent().find('li').removeClass('active');
			$(this).addClass('active');
//			maximumOffset = $('.basicinfo-container').offset().top - 70;
		});

		$(".question-options li").on('tap', function() {
			$(this).css('background', '#E57990');
		});

		$(".dontknow").on('tap', function() {
			$(this).css('background', '#AAA');
		});

		//提交，检测表单完成情况
		$('#submitButton').click(function() {
			var alreadyTested = $('#questions').find('input[value]').length;
			var isErrorComing = false;

			//答题完成度检测
			if(alreadyTested < allQuestionNum && !isErrorComing) {
				if(alreadyTested == 0) {
					$(window).scrollTop($('.question:first').offset().top);
					alert('请先完成测试再提交！');
				} else {
					$(window).scrollTop($('#questions').find('.question[question-no="' + (currentQuestion - 1) + '"]').offset().top);
					alert('你还有题目尚未回答！');
				}
				isErrorComing = true;
			}

			if(isErrorComing == true) {
				return false;
			} else {
				//各个体质对应的问题
				var qixuTagArr = ['2', '3', '4', '14'],
					yangxuTagArr = ['11', '12', '13', '29'],
					yinxuTagArr = ['10', '21', '26', '31'],
					tanshiTagArr = ['9', '16', '28', '32'],
					shireTagArr = ['23', '25', '27', '30'],
					xueyuTagArr = ['19', '22', '24', '33'],
					qiyuTagArr = ['5', '6', '7', '8'],
					tebingTagArr = ['15', '17', '18', '20'],
					pingheTagArr = ['1', '2', '4', '5', '13'];

				var qixu = 0,
					yangxu = 0,
					yinxu = 0,
					tanshi = 0,
					shire = 0,
					xueyu = 0,
					qiyu = 0,
					tebing = 0,
					pinghe = 0;

				var resultArr = [];
				var arrStatus = ['平和质', '气虚质', '阳虚质', '阴虚质', '痰湿质', '湿热质', '血瘀质', '气郁质', '特禀质'];
				var majorStatus = minorStatus = '';

				qixuTagArr.forEach(function(item, index) {
					qixu += parseInt($('input[name="question[' + item + ']"]').val());
				});
				yangxuTagArr.forEach(function(item, index) {
					yangxu += parseInt($('input[name="question[' + item + ']"]').val());
				});
				yinxuTagArr.forEach(function(item, index) {
					yinxu += parseInt($('input[name="question[' + item + ']"]').val());
				});
				tanshiTagArr.forEach(function(item, index) {
					tanshi += parseInt($('input[name="question[' + item + ']"]').val());
				});
				shireTagArr.forEach(function(item, index) {
					shire += parseInt($('input[name="question[' + item + ']"]').val());
				});
				xueyuTagArr.forEach(function(item, index) {
					xueyu += parseInt($('input[name="question[' + item + ']"]').val());
				});
				qiyuTagArr.forEach(function(item, index) {
					qiyu += parseInt($('input[name="question[' + item + ']"]').val());
				});
				tebingTagArr.forEach(function(item, index) {
					tebing += parseInt($('input[name="question[' + item + ']"]').val());
				});
				pingheTagArr.forEach(function(item, index) {
					pinghe += parseInt($('input[name="question[' + item + ']"]').val());
				});
				resultArr.push(pinghe, qixu, yangxu, yinxu, tanshi, shire, xueyu, qiyu, tebing);
				console.log(resultArr);
				if(resultArr[0] >= 17) {
					resultArr.splice(0, 1);
					majorStatus = arrStatus[0];
					if(Math.max.apply(null, resultArr) < 8) {
						minorStatus = '';
					} else if(Math.max.apply(null, resultArr) < 10) {
						resultArr.forEach(function(item, index) {
							if(item >= 9) {
								minorStatus += arrStatus[index + 1] + ',';
							}
						});
					} else {
						var oloca1 = find_array(Math.max.apply(null, resultArr), resultArr);
						majorStatus = arrStatus[oloca1 + 1];
						resultArr.splice(oloca1, 1);
						resultArr.forEach(function(item, index) {
							if(item >= 9) {
								if(index > oloca1) {
									minorStatus += arrStatus[index + 2] + ',';
								} else {
									minorStatus += arrStatus[index + 1] + ',';
								}
							}
						});
					}
				} else {
					resultArr.splice(0, 1);
					if(Math.max.apply(null, resultArr) >= 11) {
						var oLoca = find_array(Math.max.apply(null, resultArr), resultArr);
						majorStatus = arrStatus[oLoca + 1];
						resultArr.splice(oLoca, 1);
						resultArr.forEach(function(item, index) {
							if(item >= 9) {
								if(index > oLoca) {
									minorStatus += arrStatus[index + 2] + ',';
								} else {
									minorStatus += arrStatus[index + 1] + ',';
								}
							}
						});
					} else {
						alert('您提交的答案不科学~');
					}
				}
				////////////////////////////////////////////////////////
			}
		});

		minimumOffset = $('.section_header').first().offset().top;

		$(window).scroll(function(event) {
			maximumOffset = $('.option-container').offset().top - 70;
			var currentScrollTop = $(this).scrollTop();
			if(currentScrollTop < minimumOffset || currentScrollTop > maximumOffset) {
				$('body').find('.section_header').removeClass('fixed');
			} else {
				$('.section_header:visible').each(function() {
					if(currentScrollTop >= $(this).offset().top) {
						if(!$(this).hasClass('fixed')) {
							$('body').find('.section_header').removeClass('fixed');
							$(this).addClass('fixed');
						}
					}
				});
			}
		});
	});
})();