<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
class ProfileController extends Controller {

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

	public function postUpdate(Request $request) {
		
	}

}
