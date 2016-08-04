/**
 * Created by joe on 30.07.16.
 */
var vm = new Vue({

    http: {
        root: '/root',
        headers: {
            'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
        }
    },

   el: '#Articles',

   data: {
     newArticle: {
         id: '',
         title: '',
         content: ''
     },

     pagination: {
           total: 0,
           per_page: 4,
           from: 1,
           to: 0,
           current_page: 1
       },
     offset: 4,// left and right padding from the pagination <span>,just change it to see effects
     items: [],

     show: false,
     edit: false,
     add: false,
     success: false
     //empty: tr
   },

   methods: {

       isEmpty: function (ob) {
           return ob.length;
       },

       //fetchArticles: function () {
       //    this.$http.get('/api/articles/', function (data) {
       //        this.$set('articles', data);
       //        this.empty = this.isEmpty(data);
       //    });
       //},
       fetchArticles: function (page) {
           var data = {page: page};
           self = this;
           this.$http.get('/api/articles', data).then(function (response) {
               //look into the routes file and format your response
               console.log(response.data.data.data);
               self.$set('articles', response.data.data.data);
               self.$set('pagination', response.data.pagination);
               self.isEmpty(response.data.data.data);
           }, function (error) {
               // handle error
           });
       },
       changePage: function (page) {
           this.pagination.current_page = page;
           this.fetchArticles(page);
       },

       showArticle: function (id) {
           this.show = true;
           this.$http.get('/api/articles/' + id, function (data) {
               this.newArticle.id = data.id;
               this.newArticle.title = data.title;
               this.newArticle.content = data.content;
           });
       },

       editArticle: function (id) {
           this.edit = true;
           var article = this.newArticle;
           this.newArticle = { id: '', title: '', content: '' };
           self = this;
           this.$http.patch('/api/articles/' + id, article, function (data) {
               this.fetchArticles(1);
               self.show = false;
               self.edit = false;
           });
       },

       createNewArticle: function () {
         this.add = true;
       },

       addArticle: function () {
           var article = this.newArticle;
           this.$http.post('/api/articles/', article, function () {
               self = this;
               this.success = true;
               setTimeout(function () {
                   self.success = false
               }, 5000);
               this.back();
           });

       },

       removeArticle: function (id) {
           var confirmBox = confirm("Do you really want to delete this article?");
           if(confirmBox) {
               this.$http.delete('/api/articles/' + id, function () {
                   this.fetchArticles(1);
               });

           }
       },

       back: function () {
           this.show = false;
           this.edit = false;
           this.add = false;
           this.newArticle = { id: '', title: '', content: '' };
           this.fetchArticles(1);
       },

       toEdit: function () {
           this.edit = true;
       }
   },

   computed: {
       validation: function () {
           return {
               title: !!this.newArticle.title.trim(),
               content: !!this.newArticle.content
           }
       },

       isValid: function () {
           var validation = this.validation;
           return Object.keys(validation).every(function (key) {
               return validation[key]
           });
       },

       isActived: function () {
           return this.pagination.current_page;
       },
       pagesNumber: function () {
           if (!this.pagination.to) {
               return [];
           }
           var from = this.pagination.current_page - this.offset;
           if (from < 1) {
               from = 1;
           }
           var to = from + (this.offset * 2);
           if (to >= this.pagination.last_page) {
               to = this.pagination.last_page;
           }
           var pagesArray = [];
           while (from <= to) {
               pagesArray.push(from);
               from++;
           }
           return pagesArray;
       }
   },

   ready: function () {
       this.fetchArticles(1);
   }
});