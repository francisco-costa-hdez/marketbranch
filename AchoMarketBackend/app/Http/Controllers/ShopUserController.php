<?php

namespace App\Http\Controllers;

use App\Models\ShopUser;
use App\Services\ShopUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ShopUserController extends Controller
{
    protected $user;

    public function __construct(ShopUserService $ss)
    {
        $this->user = $ss;
    }

    public function findShopUserById(int $id)
    {
        if(auth()->user()->id == $id && auth()->user()->tokenCan('shop_user'))
        {
            $user = $this->user->findShopUserById($id);
            return response()->json(['user' => $user], 200);
        }
        return response()->json(['message'=>'No tienes acceso a esta página']);
    }

    public function createShopUser(Request $request)
    {
        $data['confirmation_code'] = Str::random(25);
        $data['email'] = $request->email;
        $data['name'] = $request->admin_name;
        $validator = Validator::make($request->all(), [
            'admin_name' => 'required',
            'email' => 'required|email|unique:shop_users,email|unique:client_users,email',
            "nif" => 'required|unique:shop_users,nif|max:9',
            "profile_img" => 'required',
            "password" => 'required|min:8|max:16'
        ]);
        if ($validator->fails()) 
        {
            return response()->json($validator->errors());
        }
        Mail::send('emails.confirmation_code-2', $data, function ($message) use ($data) {
            $message->to($data['email'], $data['name'])->subject('Por favor confirma tu correo');
        });
        return $this->user->createShopUser($request,$data['confirmation_code']);
    }

    public function login(Request $request)
    {
        return $this->user->login($request);
    }

    public function logout(Request $request)
    {
        return $this->user->logout($request);
    }

    public function updateShopUser(Request $request)
    {
        $data['confirmation_code'] = Str::random(25);
        $data['email'] = $request->email;
        $data['name'] = $request->name;
        if($request->email != auth()->user()->email && $request->nif != auth()->user()->nif){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:client_users,email|unique:shop_users,email',
                "nif" => 'required|unique:shop_users,nif',
                "profile_img" => 'required'
            ]);
        }else if($request->email != auth()->user()->email){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:client_users,email|unique:shop_users,email',
                "nif" => 'required',
                "profile_img" => 'required'
            ]);
        }else if($request->nif != auth()->user()->nif){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required',
                "nif" => 'required|unique:shop_users,nif',
                "profile_img" => 'required'
            ]);
        }
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        if(auth()->user()->id == $request->id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->user->updateShopUser($request, $data);  
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
    }

    public function updatePassword(Request $request)
    {
        if(auth()->user()->id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->user->updatePassword($request);  
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
    }
    
    public function deleteShopUser(int $id)
    {
        if(auth()->user()->id == $id && auth()->user()->tokenCan('shop_user'))
        {
            return $this->user->deleteShopUser($id);  
        }
        else return response()->json(['message'=>'Usuario no autorizado']);
    }

    public function verify(string $confirmation_code)
    {
        $user = ShopUser::where('confirmation_code', $confirmation_code)->first();
        $user->update([
            'confirmed' => true,
            'confirmation_code' => null
        ]);
        return view('emails.confirmed');
    }
}
