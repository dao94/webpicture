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

Route::get('/', function () {
    return view('welcome');
});

// group router use authenticate
Route::group(['prefix' => 'api/v1'], function()
{
    Route::controller('home', 'HomeController');
    Route::controller('login', 'LoginController');
});

Route::group(['prefix' => 'admin'], function()
{	
	Route::controller('', 'Admin\MainController');

});
