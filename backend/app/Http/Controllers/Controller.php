<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller extends BaseController
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
}

