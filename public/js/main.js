/**
 * Created by joe on 30.07.16.
 */
var vm = new Vue({
   el: '#Articles',

   methods: {
       fetchArticles: function () {
           this.$http.get('/api/articles', function (data) {
               console.log(data);
               //this.$set('articles', data);
           });
       }
   },

   ready: function () {
       this.fetchArticles();
   }
});