﻿(function ($) {
	
	var Settings = {

		
		page: {
			length: 11,
		},
		
		items: 94,	
		
	}

    
    //define item model
    var Item = Backbone.Model.extend(
    {
		validate: function(item) {
			params = ["id", "name", "made", "price", "weight","type"];
			for (x = 0; x < 8; x++)
			{eval(params[x] + " = item." + params[x]) }
			directory != undefined ? ids = directory.collection.pluck("id") : ids = [];
			
			// ID validation
			if (id == ""){return "ID is required"}
			else if ($.isNumeric(id) && $("form.itemForm").attr("id") !== "EditItem") {
				if (((String(id).indexOf(".") != -1) || (String(id).indexOf("-") != -1))
				|| (ids.indexOf(id) != -1))				
				{return "ID: Please, enter a whole, positive, unique number";}
			}
			
			// Name validation
			if (name == ""){return "Name is required"}
			else if (Number(name) || !/^[a-zA-Z ]+$/.test(name))
			{return "Name must contain of only alphabet caracters and a space."}
			
			// type validation
			if (type == ""){return "type is required"}
			
			if (weight != ""){
				if (!$.isNumeric(weight)){return "Weight must be a number"} 
				if (!/^[0-9]/.test(weight)){return "Weight must be a positive number";}
				if (!/^[0-9]+\.[0-9]{2}/.test(weight)){return "Weight must be a decimal number with 2 decimal spaces";}	
			}
		
			// Date validation
			if (made != "")
			{
				 if(!/^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}(\.)?$/.test(made)||
				 String(new Date(made.split(".")[1] + "/" + made.split(".")[0] + "/" + made.split(".")[2])) == "Invalid Date")		 
				{return "Please enter a valid date in format dd.mm.yyyy"}
			}
			
			
			// adding a leading zero to days / months, stripping a trailing dot
			if (made.split(".")[0].length < 2) 
			{item.made = "0" + made.split(".")[0] + "." + made.split(".")[1] + "." + made.split(".")[2]} 
			if (made.split(".")[1].length < 2) 
			{item.made = made.split(".")[0] + "." + "0" + made.split(".")[1] + "." + made.split(".")[2]}
			if(/\.$/.test(made)){item.made = made.replace(/\.$/, "");}

			
			// Price validation
			if (price == ""){return "Price is required"}
			else if (!$.isNumeric(price)){return "Price must be a number"} 
			else if (!/^[0-9]/.test(price)){return "Price must be a positive number";}
			else if (!/^[0-9]+\.[0-9]{2}/.test(price)){return "Price must be a decimal number with 2 decimal spaces";}
				

							
		},
		
		initialize: function(){
		
			this.bind("error", function(model, error){
				$("#overlay form fieldset.root").css("border", "1px dotted #f32");
				alert(error);
			});	

			
		}
	},
	{
		// formating date to string
		made: function(date){						
			date.getDate() > 9 ? b_day = String(date.getDate()) : b_day = "0" + date.getDate();
			date.getMonth() >= 9 ? b_month = String(date.getMonth() + 1) : b_month = "0" + (date.getMonth() + 1);
			return b_day + "." + b_month + "." + date.getFullYear();				
		}
	});
////////////////////// done Item model


    //define items collection (super-model, contains all the items)
    var Collection = Backbone.Collection.extend({
        model: Item,
        pageSize: Settings.page.length,
        rlength: 4, // radial length of pagination menu (max number of page links on each side of current page)
        pagerLength: function(){ // complete number of pages
			return Math.ceil((this.length + this.pageSize) / this.pageSize) - 1;
		},
		

		paginate: function(){
			var that = this;	
			return this.groupBy(function(item){
				/* 
				 * formula for getting page number of an item from index number of item 
				 * in collection and wanted page size (number of items per page)
				 * needed numbers must be offset by 1
				 */		
				return Math.ceil((1 + that.indexOf(item) + that.pageSize) / that.pageSize) - 1;	
			});
		},
		
	},
	

	
	{		
		//demo data - Static method   
	    multiplyItems: function(){
			var x = Settings.items;
			var result = [];
			var types = ["type1", "type2", "stype3", "stype4", "typeSXL"];
			var partners = Settings.partners;
			var names = ["Model1", "Model3", "SoM4", "M5", "MX-col", "urx5", "Exxo"];
			for (i = 0; i<x; i++){
				item = {id : String(i)};
					item.name = names[Math.floor(Math.random()*7)];
					item.type = types[Math.floor(Math.random()*4)];
					item_made = new Date(parseInt(Math.random() * 18000000000) + 1130000000000);
					// uses Item static method 
					item.made = Item.made(item_made);
					item.mother = names[Math.floor(Math.random()*7)] + "_" + Math.floor(Math.random()*4);
					item.price = parseInt(Math.random() * 1200) + 400 + ".00"
					item.weight = parseInt(Math.random() * 1000) + 200 + ".00";
					item.item_class = "It_Class" + Math.floor(Math.random()*20);			
				result.push(item);
			}
			return result;
		}, 
		
		comparators: {
				id: function(item) {
				  return Number(item.get("id"));
				},
				
				d_id: function(item) {
				  return -Number(item.get("id")); // descending
				},
				
				name: function(item) {
				  return item.get("name");
				},
				
				d_name: function(item) {
				  return String.fromCharCode.apply(String, _.map(item.get("name").split(""), function (c) {
						return 0xffff - c.charCodeAt();
				        })
				  );
				},

				
				type: function(item) {
				  return item.get("type");
				},
				
				d_type: function(item) {
				  return String.fromCharCode.apply(String, _.map(item.get("type").split(""), function (c) {
						return 0xffff - c.charCodeAt();
				        })
				  );
				},
				
				price: function(item) {
				  return Number(item.get("price"));
				},
				
				d_price: function(item) {
				  return -item.get("price");
				},
				
				weight: function(item) {
				  return Number(item.get("weight"));
				},
				
				d_weight: function(item) {
				  return -item.get("weight");
				}

		}
		  		
        
    });
    
    

    /*
     * defines overlay form view
     * has its render method; renderForm method 
     * for rendering the input form,
     * and has events registered for interaction
     * 
     */
      
    var FormView = Backbone.View.extend({
		template: $("#itemFormTemplate").html(),
		templateNew: $("#itemFormNewTemplate").html(),
        tagName: "div",
        id: "overlay",
        className: "item_form_cont",
        
        render: function() {
            var template = _.template(this.templateNew);
            var el = $(this.el);
            $('body').prepend(el).addClass("hideOverflow");
            $("#overlay").hide().html(template()).fadeIn(400);
            
			$("img.close", "#overlay").bind("click", function(){ 
				$("#overlay").fadeOut(800).remove();
				$('body').removeClass("hideOverflow");				
			});
		},
        
        renderExisting: function() {
            var template = _.template(this.template);
            var el = $(this.el);
            var item = this.model.toJSON();
            $('body').prepend(el).addClass("hideOverflow");
            $("#overlay").hide().html(template(item)).fadeIn(400);
            
            
			$("img.close", "#overlay").bind("click", function(){ 
				$("#overlay").fadeOut(800).remove();
				$('body').toggleClass("hideOverflow");				
			});	
		}, 
		
		formToJson: function(jq_form)
		{
		    var f = {};
		    var a = jq_form.serializeArray();
		    $.each(a, function() {
				
				
		        if (f[this.name] !== undefined) {
		            if (!f[this.name].push) {
		                f[this.name] = [f[this.name]];
		            }
		            f[this.name].push(this.value || '');
		        } else {
		            f[this.name] = this.value || '';
		        }
		        
		        
		    });
		    return f;
		},
		
		events: {
			"click #NewItem img.save": "SaveNew",
			"click #EditItem img.save": "SaveExisting",
			"click #EditItem img.delete": "DeleteExisting",
			"click img.close": "QuitNew",
		},		
		
		SaveNew: function(){
			var that = this;
			var form = $("#NewItem");
			var item = new Item();
			if (item.set(that.formToJson(form)))
			{						
				directory.collection.add(item);
				sort_parameter = directory.sort_parameter;
				page = directory.page;
				directory.collection.sort();
				directory.render(page, sort_parameter);
				$("#overlay").fadeOut(800).remove();
				$('body').removeClass("hideOverflow");
			}
			

		},		
		
		SaveExisting: function(){
			var that = this;
			var form = $("#EditItem");
			this.model.set(that.formToJson(form));
			var sort_parameter = directory.sort_parameter;
			var page = directory.page;
			directory.render(page, sort_parameter);
			$("#overlay").fadeOut(800).remove();
			$('body').removeClass("hideOverflow");

		},
		
		DeleteExisting: function(){
			var that = this;
			if (confirm("Delete this item?")){
				this.model.collection.remove(this.model);
				this.remove();
				var sort_parameter = directory.sort_parameter;
				var page = directory.page;
				directory.render(page, sort_parameter);
				$("#overlay").fadeOut(800).remove();
				$('body').removeClass("hideOverflow");			 	
            }
		},	
		
			
		QuitNew: function(){
			$("#overlay").remove();
		},
	
	
	}); // END FormView
	
   
/*
 * Individual item view for every item in a table, with registered events & its own model
 * 
 */  
    
    
    var ItemView = Backbone.View.extend({
        tagName: "tr",
        className: "item_view",
        template: $("#itemTemplate").html(),
        formTemplate: $("#itemFormTemplate").html(),
        
        
        render: function () {
            var tmpl = _.template(this.template);
            $(this.el).html(tmpl(this.model.toJSON()));
            return this;
        },
        
        events: {
		  "click .edit": "renderEditItem",
		  "click .delete": "deleteItem",
		},

		/*
		 * renders other, FormView, for clicked item edit button, 
		 * called from click event of this, pageView
		 */
        renderEditItem: function (e) {
            var editItemView = new FormView({
                model: this.model
            });
            editItemView.renderExisting();
        },

		/*
		 * delete item, model + view.
		 * 
		 */
        deleteItem: function (e) {
            if (confirm("Delete this item?")){
				var model = this.model;
				model.collection.remove(model);
				this.remove();	
				var sort_parameter = directory.sort_parameter;
				var page = directory.page;
				directory.render(page, sort_parameter);
				directory.renderPie(directory.collection);
			    directory.renderBars(directory.collection);
				$("#overlay").fadeOut(800).remove();
				$('body').removeClass("hideOverflow");			 	
            }
        },


    });
    
    /*

    /* 
     * define page view
     */
    var pageView = Backbone.View.extend({
        el: $("#table_container"),
        template: $("#itemsTemplate").html(),
        pagerTemplate: $("#pagerTemplate").html(),


        initialize: function (page, sort_parameter, new_initialize ) {
			var that = this;
			this.sort_parameter = sort_parameter;
			this.page = page;

			if (new_initialize == true){
				this.collection = new Collection(Collection.multiplyItems());
			}

            this.collection.comparator = Collection.comparators[sort_parameter];
            this.collection.sort();
			this.pagerLength = this.collection.pagerLength();
            this.render(page, sort_parameter);
        },
        


			
		
		

		
		/*
		 * returns a list of subsets of the collection
		 * (paginated)
		 * 
		 * - uses underscore .groupBy method
		 * 
		 */
		 
		paginate: function(){			
            var that = this;
			return that.collection.groupBy(function(item){
				/* 
				 * formula for getting page number of an item from index number of item 
				 * in collection and wanted page size (number of items per page)
				 * needed numbers must be offset by 1
				 */		
				return Math.ceil((1 + that.collection.indexOf(item) + that.collection.pageSize) / that.collection.pageSize) - 1;	
			});
		},  
			    
		/*
		 * main renderer of a single page, calls sub renderers, renderItem and renderPager
		 * *sort_parameter = id, name, type, weight, price
		 */
		 
        render: function (current_page, sort_parameter) {
			this.page = current_page;
            var that = this;
			var tmpl = _.template(this.template);
            this.$el.html(tmpl());
            _.each(this.collection.paginate()[current_page], function(v, k){			
					an_view = that.renderItem(v);				
					$("table.main", this.el).append(an_view.el);				
			}); 
			var pager = that.renderPager(current_page);
			$("table.main", this.el).prepend(pager);
			
			var s = sort_parameter;
			sorter = ((s[1] == "_") ? s.split("_")[1] : s);
			order = (s[1] == "_") ? "desc" : "asc";
			$("th." + sorter).attr("id", "sortby");
			
			$("table.main tr th p").addClass("asc");
			if (order == "desc"){
				$("th." + sorter + " p").removeClass("asc").addClass("desc");				
			}
			
			$("th.sorting").each(function(index) {
				var title = $(this).attr("class").split(" ")[0];
			    $(this).attr("title", "sort by " + title);
			});
			
            
            
        },

		/*
		 * renders other, ItemView, for every item, 
		 * called from render method of this, pageView
		 */
        renderItem: function (item) {
            var itemView = new ItemView({
                model: item,
                id: "an_" + item.id,
            });
            return itemView.render();
        },
        

        
        /* 
         * renders the pagination nav
         */
         
        renderPager: function (page) {
			var that = this;
			var tmpl = _.template(this.pagerTemplate);
			var pageSize = this.collection.pageSize;
			var rlength = this.collection.rlength;			
			var length = that.pagerLength;
			var currentPage = page;
			var nums ="<span class='nums'>";			
			var numbPagesToRender = [];
			if (length < 5){ // if number of pages < 5, render all page links
	            _.each(that.paginate(), function(v, k){		
					nums += "<span class='pager_link" + (k == currentPage ? " current" : "") + "'>" + k +"</span>";	
					numbPagesToRender.push(k);			
				}); 
			} else {
	            _.each(that.paginate(), function(v, k){ // if number of pages >= 5, render only links of current page + rlength number of prev / next pages links - rlength defined in Collection
					if ((k >= (currentPage - rlength)) && (k <= (currentPage + rlength))){
						nums += "<span class='pager_link" + (k == currentPage ? " current" : "") + "'>" + k +"</span>";
						numbPagesToRender.push(k);			
					}
				});
				
			}
			
			nums += "</span>";
			

			/*
			 * 
			 * this if loop outputs "prev", "next", "first", "last" links in pagin. nav and "..." abbreviations
			 * 
			 */

				
				if (numbPagesToRender[numbPagesToRender.length -1] < length){
					nums += "<span> ... </span>";
				}
				
				if (numbPagesToRender[0] > 1){
					nums = "<span> ... </span>" + nums;
				}
				
				if (currentPage > 1){
					if (currentPage > 2){
						prev = "<span class='icon-first pager_first' title='first page' aria-hidden='true'></span>&nbsp;<span class='icon-previous pager_prev' title='previous page'></span>";
					} else {
						prev = "<span class='icon-first pager_first' title='first page' aria-hidden='true'></span>";
					}
				} else {prev = "";}
					
				if (currentPage < length){
					if (currentPage < (length - 1)){
						next = "<span class='icon-last pager_last' title='last page' aria-hidden='true'></span>&nbsp;<span class='icon-next pager_next' title='next page'></span>";
					} else {
						next = "<span class='icon-last pager_last' title='last page' aria-hidden='true'></span>";
					}
				} else {next = "";}
				

			

			
			return tmpl({prev: prev, nums: nums, next: next});
						
		},
		
		
		events: {
		"click .pager_link": "pgclick",
		"click .pager_first": "firstclick",
		"click .pager_last": "lastclick",
		"click .pager_prev": "prevclick",
		"click .pager_next": "nextclick",
		 
		"click img.create": "NewItem", 
		
		"click table.main th.sorting": "sort",
		
		
		
		},
		
		pgclick: function( event ){
			var target = event.currentTarget;
			pageRequested = Number($(target).html());
			this.render(pageRequested, this.sort_parameter);
		},
		
		firstclick: function( event ){
			this.render(1, this.sort_parameter);
		},

		lastclick: function( event ){
			last = this.pagerLength;
			this.render(last, this.sort_parameter);
		},

		prevclick: function( event ){
			page = this.page - 1;
			this.render(page, this.sort_parameter);
		},  
		
		nextclick: function( event ){
			page = this.page + 1;
			this.render(page, this.sort_parameter);
		},  
		

		/*
		 * renders other, FormView, for clicked item edit button, 
		 * called from click event of this, pageView
		 */
        NewItem: function (e) {
            var editItemView = new FormView({
            });
            editItemView.render();
        }, 
        
		/*
		 * sorts according to data in th.class
		 */
		sort: function( event ){
			var th = $(event.currentTarget);
			th_class = th.attr("class").split(" ")[0];
			req_order = (function(th){
				toggler = {"asc" : 0, "desc" : 1}
				current = th.find("p").attr("class");
				return ["d_", ""][toggler[current]];
			})(th);	
			this.initialize(1, req_order + th_class, false);		
		},       		
    });




    //create instance of master view
    var directory = new pageView(1, "id", true);

} (jQuery));


