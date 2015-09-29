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
			$this->error_message = 'Thông tin không chính xác hoặc không đầy đủ, vui lòng thử lại!';
			goto next;
		}

		$email    =  $request->get('email');
		$name     =  $request->get('name');
		$password =  md5(md5($request->get('password')));
		try {
			$checkEmail = User::existsEmail($email);
			if($checkEmail) {
				$this->error = true;
				$this->error_message = 'Xin lỗi email này đã tồn tại vui lòng thử lại !';
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
				$this->message = 'Đăng ký tài khoản thành công !';
			}
		} catch (Exception $e) {
			$this->error   = true;
			$this->message = $e->getMessage();
		}

		next:
		return $this->ResponseData($data);
	}

	public function postLogin(Request $request) {
		$v = Validator::make($request->all(),[
				'email' => 'required',
				'password' => 'required'
		]);

		if($v->fails()) {
			$this->error = true;
			$this->error_message = 'Thông tin không chính xác hoặc không đầy đủ, vui lòng thử lại!';
			goto next;
		}

		$email    = $request->get('email');
		$password = $request->get('password');
		
		goto next;
		return $this->ResponseData($data);

	}

}
