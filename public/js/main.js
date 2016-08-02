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
     show: false,
     edit: false
   },

   methods: {
       fetchArticles: function () {
           this.$http.get('/api/articles', function (data) {
               this.$set('articles', data);
           });
       },

       showArticle: function (id) {
           this.show = true;
           //this.edit = true;
           this.$http.get('/api/articles/' + id, function (data) {
               this.newArticle.id = data.id;
               this.newArticle.title = data.title;
               this.newArticle.content = data.content;
           });
           //this.show = false;
       },

       editArticle: function (id) {
           this.edit = true;
           var article = this.newArticle;
           this.newArticle = { id: '', title: '', content: '' };
           self = this;
           this.$http.patch('/api/articles/' + id, article, function (data) {
               this.fetchArticles();
               self.show = false;
               self.edit = false;
           });


       },

       back: function () {
           this.show = false;
           this.edit = false;
           this.fetchArticles();
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
       }
   },

   ready: function () {
       this.fetchArticles();
   }
});