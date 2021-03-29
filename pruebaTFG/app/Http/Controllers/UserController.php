<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(Request $request){
        User::create($request->all());

    }
    public function view(){
       return view('crear');
        
    }
}
