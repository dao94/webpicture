<?php

namespace App\Http\Controllers\artworks;

use App\User;
use App\Models\ArtworkColorModel;
use Validator;
use Request;
use App\Http\Controllers\Controller;


class ArtworkColorController extends Controller
{
    public function getShow (Request $req){
        try {
            $Data =  ArtworkColorModel::orderBy('priority')->get()->toArray();
        } catch (Exception $e) {
            $this->error = true;
            $this->error_message = "Lỗi kết nối máy chủ, vui lòng thử lại !";
            return $this->ResponseData();
        }
        $this->error = false;
        $this->error_message = "Thành công";
        return $this->ResponseData($Data);
    }
}

