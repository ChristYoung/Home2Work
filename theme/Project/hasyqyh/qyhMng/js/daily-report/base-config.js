$(function() {
	var
		$adjustBtn = $('.j-adjust-btn'),
		$postBtn = $('.j-post-btn'),
		$baseInput1 = $('.j-base-input1'),
		$baseInput2 = $('.j-base-input2'),
		$timeModal1 = $('#timeModal1'),
		$timeModal2 = $('#timeModal2');

	$timeModal1.on('click', '.timeModal-item', function() {
		$baseInput1.val($(this).html());
		$timeModal1.modal('hide');
	});

	$timeModal2.on('click', '.timeModal-item', function() {
		$baseInput2.val($(this).html());
		$timeModal2.modal('hide');
	});
});