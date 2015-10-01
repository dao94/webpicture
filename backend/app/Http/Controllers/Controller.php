<?php namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Validator;
use Redis;
use Config;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use \Firebase\JWT\JWT;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public $error         = false;
	public $message       = '';
	public $error_message = '';

    public function __construct() {
    	
    }

    public function ResponseData($data) {
    	$Workflow = [
			'error'         => $this->error,
			'message'       => $this->message,
			'error_message' => $this->error_message,
			'data'          => $data
    	];
    	return response()->json($Workflow);
    	
    }

    public function getUser($request){  
        $user = $request->get('user_decoded')->data;
        if(!$user) 
            return false;
        return $user;   
    }

    public function getUserId($request) {
        $userId = $this->getUser($request)->id;
        if(!$userId) 
            return false;
        return $userId;
    }
}

