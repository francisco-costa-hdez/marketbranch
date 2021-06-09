<?php

namespace App\Http\Controllers;

use App\Models\ClientUser;
use App\Services\ClientUserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ClientUserController extends Controller
{
    protected $user;

    public function __construct(ClientUserService $cs)
    {
        $this->user = $cs;
    }

    public function findClientUserById(int $id)
    {
        if (auth()->user()->id == $id && auth()->user()->tokenCan('client_user')) {
            $user = $this->user->findClientUserById($id);
            return response()->json(['user' => $user], 200);
        }
        return response()->json(['message' => 'No tienes acceso a esta página']);
    }

    public function createClientUser(Request $request)
    {
        $data['confirmation_code'] = Str::random(25);
        $data['email'] = $request->email;
        $data['name'] = $request->name;

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:client_users,email|unique:shop_users,email',
            "tlf" => 'required|unique:client_users,tlf',
            "address" => 'required',
            "password" => 'required|min:8|max:16'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        Mail::send('emails.confirmation_code', $data, function ($message) use ($data) {
            $message->to($data['email'], $data['name'])->subject('Por favor confirma tu correo');
        });
        return $this->user->createClientUser($request, $data['confirmation_code']);
    }

    public function login(Request $request)
    {
        return $this->user->login($request);
    }

    public function logout(Request $request)
    {
        return $this->user->logout($request);
    }

    public function updateClientUser(Request $request)
    {
        $data['confirmation_code'] = Str::random(25);
        $data['email'] = $request->email;
        $data['name'] = $request->name;
        if($request->email != auth()->user()->email && $request->tlf != auth()->user()->tlf){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:client_users,email|unique:shop_users,email',
                "tlf" => 'required|unique:client_users,tlf',
                "address" => 'required'
            ]);
        }else if($request->email != auth()->user()->email){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:client_users,email|unique:shop_users,email',
                "tlf" => 'required',
                "address" => 'required'
            ]);
        }else if($request->tlf != auth()->user()->tlf){
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required',
                "tlf" => 'required|unique:client_users,tlf',
                "address" => 'required'
            ]);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        if (auth()->user()->id == $request->id && auth()->user()->tokenCan('client_user')) {
            return $this->user->updateClientUser($request,$data);
        } else return response()->json(['message' => 'Usuario no autorizado']);
    }

    public function updatePassword(Request $request)
    {
        if (auth()->user()->id && auth()->user()->tokenCan('client_user')) {
            return $this->user->updatePassword($request);
        } else return response()->json(['message' => 'Usuario no autorizado']);
    }

    public function deleteClientUser(int $id)
    {
        if (auth()->user()->id == $id && auth()->user()->tokenCan('client_user')) {
            return $this->user->deleteClientUser($id);
        } else return response()->json(['message' => 'Usuario no autorizado']);
    }

    public function verify(string $confirmation_code)
    {
        $user = ClientUser::where('confirmation_code', $confirmation_code)->first();
        $user->update([
            'confirmed' => true,
            'confirmation_code' => null
        ]);
        return view('emails.confirmed');
    }
}
