<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
class LoginController extends Controller {

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

	public function postRegister(Request $request) {
		$v = Validator::make($request->all(),[
			'name'     => 'required',
			'password' => 'required',
			'email'    => 'email:required|max:255',
		]);
		$data = '';
		if($v->fails()) {
			$this->error = true;
			$this->error_message = 'Form validate is fails , please check again !';
			goto next;
		}

		$email    =  $request->get('email');
		$name     =  $request->get('name');
		$password =  md5(md5($request->get('password')));
		try {
			$checkEmail = User::existsEmail($email);
			if($checkEmail) {
				$this->error = true;
				$this->error_message = 'Sorry, your email already registered in system';
				goto next;
			}

			$newUser = array(
				'email'    => $email,
				'password' => $password,
				'name'     => $name
    		);

			$insertId    = User::insertGetId($newUser);	
			if($insertId) {
				$data = ['id' => $insertId];
				$this->message = 'Add user the complete !';
			}
		} catch (Exception $e) {
			$this->error   = true;
			$this->message = $e->getMessage();
		}

		next:
		return $this->ResponseData($data);
	}

}
