define(["jquery","underscore","backbone","thorax","collections/collection","views/templatesloader","text!templates/app.handlebars","common","helper","lib-helper"],function(e,t,n,r,i,s,o,u,a,f){return r.View.extend({name:"app",template:Handlebars.compile(o),events:{},initialize:function(){if(this.name==="app")throw"formSchema.Name is not found.";if(!this.bootstrap)this.bootstrap=2;else if(this.bootstrap!==2&&this.bootstrap!==3)throw"Bootstrap Option can only be version 2 or 3.";this.validation=this.validation||{},this.render(),this.$form=this.$el.find("form#"+this.name);var n=this;if(!(this.fields instanceof Array))throw"formSchema.Fields should be an array!";this.initViewLogicFlag(),t.each(this.fields,function(r){n.checkViewLogicFlag(r);if(t.indexOf(u.fieldNotRequireName,r.type)===-1&&typeof r.name=="undefined")throw"Fields requires to have Name property!";if(typeof r.type=="undefined")throw"Fields requires to have Type property!";r.attributes=r.attributes||{},r.options=r.options||{};var i,o,l=t.extend({id:r.attributes&&r.attributes.id?r.attributes.id:r.name?r.name:"",attr:""},r),c=e("<div>",{"class":l.id+"-wrapper"});f.mergeValidationToField(l,n.validation),r.attributes&&t.each(r.attributes,function(e,t){l.attr+=t.toLowerCase()+'="'+e+'" '}),s.isRenderLabel(r.type)&&(i=s.getTemplate("label"),o=a.removeWhiteSpace(i(l)),c.append(o)),i=s.getTemplate(r.type,l),o=a.removeWhiteSpace(i(l)),n.injectHtmlMarkUp(r,c,o),l.id?a.addCssClassForInput(e("#"+l.id,c),l,n.bootstrap):c.removeClass("-wrapper").addClass(l.type+"-wrapper"),f.attachedJavaScript(n.$form,l)})},initViewLogicFlag:function(){this._renderButtonsInAction=!1},checkViewLogicFlag:function(e){switch(e.type){case"action":this._renderButtonsInAction=!0}},injectHtmlMarkUp:function(t,n,r){var i;switch(t.type){case"button":this._renderButtonsInAction&&(i=e("#form-render-actions",this.$el))}n.append(r),i?n.appendTo(i):this.$form.append(n)}})});