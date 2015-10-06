<?php namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Models as Models;
class MainController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	
	public function __construct()
	{	
		$this->abc = 2;
	}

	public function getIndex() {
		return view('index');
	}


}
