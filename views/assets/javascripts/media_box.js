!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(i,a){this.$element=e(i),this.options=e.extend({},t.DEFAULTS,e.isPlainObject(a)&&a),this.init()}var i=e("body"),a=e(document),n=window.Mustache,o="qor.medialibrary",s="qor.bottomsheets",r="click."+o,d="enable."+o,l="disable."+o,c="reload."+s,m=".qor-select__select-icon",h=".qor-selectmany__hint",f=".qor-field__mediabox",u=".qor-field__mediabox-list",p=".qor-field__mediabox-item",b=".qor-field__mediabox-data",g=".qor-bottomsheets",_="is_selected",y="is_deleted",S="textarea.qor-file__options",v=".qor-cropper__toggle--delete",E=".qor-cropper__toggle--undo",I="qor-bottomsheets__mediabox";return t.prototype={constructor:t,init:function(){var e=this.$element;this.SELECT_MEDIABOX_UNDO_TEMPLATE=e.find('[name="media-box-undo-delete"]').html(),this.bind()},bind:function(){a.on(r,"[data-mediabox-url]",this.openBottomSheets.bind(this)).on(c,"."+I,this.reloadData.bind(this)),this.$element.on(r,v,this.deleteSelected.bind(this)).on(r,E,this.undoDeleteSelected.bind(this)).on("change.qor.cropper",S,this.imageCrop.bind(this))},deleteSelected:function(t){var i=e(t.target),a=i.closest(p);return a.addClass(y).append(this.SELECT_MEDIABOX_UNDO_TEMPLATE).find(".qor-file__list").hide(),this.updateMediaLibraryData(i.closest(u)),!1},undoDeleteSelected:function(t){var i=e(t.target),a=i.closest(p);return a.removeClass(y).find(".qor-file__list").show(),this.updateMediaLibraryData(i.closest(u)),i.closest(".qor-fieldset__alert").remove(),!1},imageCrop:function(t){var i=e(t.target).closest(p);this.syncImageCrop(i)},openBottomSheets:function(t){var a,n=e(t.target).closest("[data-mediabox-url]"),o=n.data();o.isDisabled||(this.BottomSheets=i.data("qor.bottomsheets"),this.bottomsheetsData=o,this.$parent=a=n.closest(f),this.$selectFeild=a.find(u),o.url=o.mediaboxUrl,this.SELECT_MANY_SELECTED_ICON=e('[name="select-many-selected-icon"]').html(),this.SELECT_MANY_HINT=e('[name="select-many-hint"]').html(),this.SELECT_MEDIABOX_TEMPLATE=a.find('[name="media-box-template"]').html(),this.SELECT_MEDIABOX_UNDO_TEMPLATE=a.find('[name="media-box-undo-delete"]').html(),this.BottomSheets.open(o,this.handleSelectMany.bind(this)))},initItem:function(){var t,i,a,n=this.$selectFeild,o=n.find(p).not("."+y),s=e(g).find("tbody tr"),r=this;o.each(function(){a=e(this).data().primaryKey,t=s.filter('[data-primary-key="'+a+'"]').addClass(_),r.changeIcon(t,!0)}),s.each(function(){t=e(this),i=t.find(".qor-table--ml-slideout p img").first(),t.find(".qor-table__actions").remove(),i.length&&(t.find(".qor-table--medialibrary-item").css("background-image","url("+i.prop("src")+")"),i.parent().remove())}),"1"!=this.bottomsheetsData.maxItem&&this.updateHint(this.getSelectedItemData())},reloadData:function(){this.initItem()},renderSelectMany:function(e){return n.render(this.SELECT_MEDIABOX_TEMPLATE,e)},renderHint:function(e){return n.render(this.SELECT_MANY_HINT,e)},getSelectedItemData:function(t){var i,a=t?t:this.$selectFeild,n=a.find(p).not("."+y),o=[];return n.size()&&n.each(function(){i=e(this).data(),o.push({ID:i.primaryKey,Url:i.originalUrl.replace(/.original.(\w+)$/,".$1")})}),{files:o,selectedNum:o.length}},updateHint:function(t){var i;e.extend(t,this.bottomsheetsData),i=this.renderHint(t),e(h).remove(),e(g).find(".qor-page__body").before(i)},updateMediaLibraryData:function(e){var t=e?e.find(b):this.$selectFeild.find(b),i=this.getSelectedItemData(e);t.val(JSON.stringify(i.files))},changeIcon:function(t,i){var a=t.find(".qor-table--medialibrary-item"),n=a.size()?a:t.find("td:first");t.find(m).remove(),i&&("one"==i&&e("."+I).find(m).remove(),n.prepend(this.SELECT_MANY_SELECTED_ICON))},syncImageCrop:function(t,i){var a,n,o=JSON.parse(t.find(S).val()),s=t.data().mediaLibraryUrl,r={},d=["Width","Height"],l=t.find("img[data-size-name]");delete o.ID,delete o.Url,o.Sizes={},l.each(function(){n=e(this).data(),o.Sizes[n.sizeName]={};for(var t=0;t<d.length;t++)a="sizeResolution"+d[t],o.Sizes[n.sizeName][d[t]]=n[a]}),r.MediaOption=JSON.stringify(o),e.ajax({type:"PUT",url:s,data:JSON.stringify(r),contentType:"application/json",dataType:"json",success:function(a){r.MediaOption=JSON.parse(a.MediaOption),i&&e.isFunction(i)&&i(r,t)}})},showHiddenItem:function(e){e.removeClass(y).find(".qor-file__list").show(),e.find(".qor-fieldset__alert").remove()},removeItem:function(e){var t=e.primaryKey;this.$selectFeild.find('[data-primary-key="'+t+'"]').remove(),this.changeIcon(e.$clickElement)},addItem:function(t,i){var a=e(this.renderSelectMany(t)),n=a.find(".qor-file__input"),o=n.closest(p),s=this.$selectFeild.find('[data-primary-key="'+t.primaryKey+'"]'),r=this.bottomsheetsData.maxItem,d=this.getSelectedItemData().selectedNum,l=this;if(i||(1==r?this.changeIcon(t.$clickElement,"one"):this.changeIcon(t.$clickElement,!0)),r&&d>=r){if(1!=r)return void window.alert(this.bottomsheetsData.maxItemHint);this.$selectFeild.find(p).remove()}return s.size()?(this.showHiddenItem(s),void(1==r&&setTimeout(function(){l.BottomSheets.hide()},1e3))):(a.appendTo(this.$selectFeild),t.MediaOption.CropOptions&&this.resetImages(t,a),a.find(S).val(JSON.stringify(t.MediaOption)),a.trigger("enable"),t.MediaOption.CropOptions||n.data("qor.cropper").load(t.MediaOption.URL,function(){l.syncImageCrop(o,l.resetImages)}),void((i||1==r)&&setTimeout(function(){l.BottomSheets.hide()},150)))},resetImages:function(t,i){var a=t.MediaOption.CropOptions,n=Object.keys(a),o=t.MediaOption.OriginalURL;if(/original/.test(o)){for(var s=n.length-1;s>=0;s--)a[n[s]].URL=o.replace(/original/,n[s]);i.find("img").each(function(){var t=e(this),i=t.data().sizeName;i&&"original"!=i&&a[i]&&t.prop("src",a[i].URL)})}},handleSelectMany:function(){var t=e(g),i={formatOnSelect:this.formatSelectResults.bind(this),formatOnSubmit:this.formatSubmitResults.bind(this)};t.qorSelectCore(i).addClass(I),this.initItem()},formatSelectResults:function(e,t){this.formatResults(e,t)},formatSubmitResults:function(e,t){this.formatResults(e,t,!0)},formatResults:function(t,i,a){var n=i.url||i.mediaLibraryUrl,o=this,s=i;a?(s.MediaOption=JSON.parse(i.MediaOption),this.handleFormat(t,s,a)):e.getJSON(n,function(i){i.MediaOption=JSON.parse(i.MediaOption),e.extend(s,i),o.handleFormat(t,s)})},handleFormat:function(e,t,i){var a,n=t.$clickElement;return t.mediaLibraryUrl||i||(t.mediaLibraryUrl=t.url),i?(t.mediaLibraryUrl=this.bottomsheetsData.mediaboxUrl+"/"+t.primaryKey,this.addItem(t,i),void this.updateDatas()):(n.toggleClass(_),a=n.hasClass(_),a?this.addItem(t):this.removeItem(t),void this.updateDatas())},updateDatas:function(){"1"!=this.bottomsheetsData.maxItem&&this.updateHint(this.getSelectedItemData()),this.updateMediaLibraryData()}},t.plugin=function(i){return this.each(function(){var a,n=e(this),s=n.data(o);if(!s){if(/destroy/.test(i))return;n.data(o,s=new t(this,i))}"string"==typeof i&&e.isFunction(a=s[i])&&a.apply(s)})},e(function(){var i='[data-toggle="qor.mediabox"]';e(document).on(l,function(a){t.plugin.call(e(i,a.target),"destroy")}).on(d,function(a){t.plugin.call(e(i,a.target))}).triggerHandler(d)}),t});