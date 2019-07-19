
(function() {

	//console.log(data);
	//console.log(window.hubaction);
	var layout = $('.layout-tree-container');
	
	var section_delimiter = $('.widget.section_delimiter', layout);

	if(data.action == 'section'){

		var section = data.section;
		if(section == 'header') {
			//_layoutrow = 0;
			var row = $('.widget.section_delimiter:eq(0)', layout);
			row.css('background-color','#33475b');
		} else if(section == 'footer') {
			//_layoutrow = 4;
			var row = $('.widget.section_delimiter:eq(1)', layout);
			row.css('background-color','#35516d');		
		} else if(section == 'all') {
			//_layoutrow = '0,2,4';widget module_155433662851654 section_delimiter is--widget-selected is--parent-root
			$('.widget.section_delimiter:eq(0)', layout).css('background-color','#33475b');
			$('.widget.section_delimiter:eq(1)', layout).css('background-color','#6086ab');		
		}	
	} else if(data.action == 'set_widgets'){
		var _widget = data.widget_name;
		window.hubaction.setbg(_widget);
	} else if(data.action == 'clear_widgets'){
		var _widget = data.widget_name;
		window.hubaction.resetbg(_widget, 'widgets');
	}



})();