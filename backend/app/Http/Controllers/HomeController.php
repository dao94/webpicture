<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
class HomeController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	
	public function __construct()
	{	
		parent::__construct();
	}

	public function getList() {
		return response()->json(['name' => 'Abigail', 'state' => 'CA']);
	}

	public function postTest(Request $request) {
		$user =  $this->getUserId($request);
		var_dump($user);
	}

}
