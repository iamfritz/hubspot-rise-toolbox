'use strict';

/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'alert("popup")' });
});*/

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  ([currentTab]) => {
    const url = new URL(currentTab.url);
    const domain = url.hostname;
    if(domain != 'app.hubspot.com') {
    	// disabled
    	document.getElementById('modal-icons').remove();
    }
  }
);

(function() {

  if (window.hubspot && hubspot.define) {
    hubspot.define('jQuery', [], function() { return window.jQuery; });
    hubspot.define('jquery', [], function() { return window.jQuery; });
  }
  
});
jQuery(document).ready(function () {
  
  /*window.wdata = {
                  global_group:"Global group", 
                  custom_widget:"Custom Widget", 
                  header: "Header", 
                  page_footer: "Page Footer",
                  form:"Form",
                  image: "Image",
                  call_to_action: "Call-to-Action",
                  follow: "Follow Me",
                  logo: "Logo",
                  menu: "Menu",
                  simple_menu: "Simple Menu",
                  image_gallery: "Image Gallery",
                  one_line_text:"One Line of Text",
                  rich_text: "Rich Text"};
  var wdata = window.wdata;

  var x;
  for (x in wdata) {    
    $('#widget_name').append('<option value="'+x+'">'+wdata[x]+'</option>');
  }*/

  var allmodules = {};
  var cstorage = {
      getbg: function(data_id){
        chrome.storage.sync.get([data_id], function(result) {
          $('#widger_color').val(result[data_id]);
          $('#widger_color').attr('style', 'background-color: #'+result[data_id]+' !important');          
        }); 
      },
      storebg: function(data_id, _color){
        var save = {};
        save[data_id] = _color;

        chrome.storage.sync.set(save, function() {
            //console.log('Settings saved, '+data_id);
            cstorage.notification('Setting saved');

            cstorage.actiontab("var data = {action:'set_widgets',widget_name:'"+data_id+"',widget_color:'"+_color+"'};");
            /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              
              chrome.tabs.executeScript({
                  code: "var data = {action:'set_widgets',widget_name:'"+data_id+"',widget_color:'"+_color+"'};"
              }, function () {
                  chrome.tabs.executeScript(tabs[0].id,{
                      file: "js/inject.js"
                  });
              });

            });*/

        }); 
      },
      resetbg: function(data_id){
        $('#widger_color').val('');
        $('#widger_color').attr('style', 'background: none');          

        chrome.storage.sync.remove(data_id, function() {
            //console.log('Settings removed, '+data_id);     
            cstorage.notification('Setting removed');
            cstorage.actiontab("var data = {action:'clear_widgets',widget_name:'"+data_id+"'};");
        }); 

      },
      actiontab: function(pass_code){
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            
            chrome.tabs.executeScript({
                code: pass_code
            }, function () {
                chrome.tabs.executeScript(tabs[0].id,{
                    file: "js/inject.js"
                });
            });

          });
      },
      notification: function(_msg){
        $('#cstoragenotification').html('<div class="cstoragemessage">'+_msg+'</div>');
        setTimeout(function() {
          $('#cstoragemessage').hide();  
          $('#cstoragenotification').html('');  
        }, 2000);       
      },
      selectmodule: function(data_id){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {todo: "selectmodule", module: data_id });
        });
      },
      getallmodule: function(){        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {todo: "getallmodule" }, function(response){
            var wdata = response;
            var x;
            for (x in wdata) {    
              $('#widget_name').append('<option value="'+x+'">'+wdata[x]+'</option>');
            }            
          });
        });        
      }
  } //cstorage

  cstorage.getallmodule();
  
 

	jQuery('.chrome_action').click(function(){
		var _section = jQuery(this).attr('data-section');
		if(_section == 'all') {
			jQuery('.chrome_action').addClass('sectionmark');
		} else {
			jQuery(this).addClass('sectionmark');
		}
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  
			chrome.tabs.executeScript({
			    code: "var data = {action:'section',section:'"+_section+"'};"
			}, function () {
			    chrome.tabs.executeScript(tabs[0].id,{
			        file: "js/inject.js"
			    });
			});

		});

	});

  jQuery('#widget_name').on('change', function(){
    var _widget = $(this).val();
    cstorage.getbg(_widget);    
  });

  jQuery('#abutton_setcolor').click(function(){
    var _widget   = $('#widget_name').val();
    var _color    = $('#widger_color').val();
    
    cstorage.storebg(_widget, _color);

  });

  jQuery('#abutton_resetcolor').click(function(){
    var _widget = $('#widget_name').val();
      
    cstorage.resetbg(_widget);

  });

  jQuery('#abutton_select').click(function(){
    var _widget = $('#widget_name').val();
    
    if(_widget == '') {
      cstorage.notification('No Module Selected');
      return false;
    }

    var selected = cstorage.selectmodule(_widget);

    /*if($(this).hasClass('selected')) {
      $(this).removeClass('selected')
      cstorage.unselect(_widget);
    } else {
      $(this).addClass('selected')
      cstorage.select(_widget);
    }*/

  });  

});