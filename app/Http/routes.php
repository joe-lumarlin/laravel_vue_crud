<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::resource('/', 'ArticleController');

// API
Route::resource('/api/articles', 'ApiArticlesController');


//Route::get('/api/items', function () {
//    return
////    $results = \App\Article::latest();
//
////    ->paginate(4);
//
////    $response = [
////        'pagination' => [
////            'total' => $results->total(),
////            'per_page' => $results->perPage(),
////            'current_page' => $results->currentPage(),
////            'last_page' => $results->lastPage(),
////            'from' => $results->firstItem(),
////            'to' => $results->lastItem()
////        ],
////        'data' => $results
////    ];
////    return $response;
//});