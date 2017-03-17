$(function() {
	var currentQuestion = 1; //当前回答的问题
	var allQuestionNum = 12; //题目总量
	$(".question-options li").on('click', function() {
		if($(this).parents('.question').attr('question-no') == currentQuestion) { //控制题目显示状态
			$(this).parents('.question').attr('class', 'question normal');
			if(currentQuestion < allQuestionNum) {
				$('#questions').find('[question-no="' + (currentQuestion + 1) + '"]').attr('class', 'question active');
				//$(window).scrollTop($('#questions').find('[question-no="' + (currentQuestion + 1) + '"]').offset().top);
			};
			currentQuestion++;
		};

		var thisTag = $(this).parents('.question').attr('question-tag'); //操作选项,将每一题对应选项的值放到隐藏表单中
		$('#questionsInput_' + thisTag).val($(this).attr("data-value"));

		$(this).parent().find('li').removeClass('active');
		$(this).addClass('active');

	});

	$('#submitButton').click(function() { //提交，检测表单完成情况
		var unTested = $('#questions').find('.disabled').length;
		if(unTested > 0) {
			if(unTested == (allQuestionNum - 1)) {
				$(window).scrollTop($('.question:first').offset().top);
				alert('请先完成测试再提交！');
			} else {
				$(window).scrollTop($('#questions').find('.question[question-no="' + (currentQuestion - 1) + '"]').offset().top);
				alert('你还有题目尚未回答！');
			}
			return false;
		}
	});
});