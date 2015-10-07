<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use DB;
use App\Models\CityModel;
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

	public function getListcity() {
		$listCity = DB::table('system_city')->get();
		return $this->ResponseData($listCity);
	}

	public function postUpdate(Request $request) {
		$name        = $request->get('fullname');
		$age         = $request->get('age');
		$adress      = $request->get('adress');
		$sex         = $request->get('sex');
		$date        = $request->get('date');
		$description = $request->get('description');
		echo $date;
	}

}
