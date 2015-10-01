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
// group router use authenticate
Route::group(['prefix' => 'api/v1','middleware' => ['auth']], function()
{
    Route::controller('home', 'HomeController');
});

// group router not use authenticate
Route::group(['prefix' => 'api/v1'],function() {
	Route::controller('login', 'LoginController');
});

