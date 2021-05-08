<?php

namespace App\Services\Repositories;

use App\Models\ClientUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ClientUserRepository
{
    protected $user;

    public function __construct(ClientUser $user)
    {
        $this->user = $user;
    }

    public function findClientUserById(int $id)
    {
        return $this->user->find($id);
    }

    public function createClientUser(Request $request, $confirmation_code)
    {
        $user = $this->user->create([
            "name" => $request->name,
            "email" => $request->email,
            "confirmation_code" => $confirmation_code,
            "tlf" => $request->tlf,
            "profile_img" => $request->profile_img,
            "address" => $request->address,
            "password" => bcrypt($request->password)
        ])->assignRole('client_user');
        $token = $user->createToken('client_user',['client_user','user'])->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token,
            'message' => 'Se ha registrado correctamente'
        ];
        $user->cart()->create();
        return response($response, 201);
    }

    public function login(Request $request)
    {
        $user = $this->user->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response(['message' => 'credenciales no válidas'], 401);
        }

        $token = $user->createToken('client_user')->plainTextToken;
        $response = [
            'message' => 'Sesión iniciada',
            'user' => $user->name,
            'user_id' => $user->id,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        $this->user->find($request->id)->tokens()->delete();
        return ['message' => 'logged out'];
    }

    public function updateClientUser(Request $request)
    {
        $this->user->find($request->id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'tlf' => $request->tlf,
            'profile_img' => $request->profile_img,
            'address' => $request->address,
            'password' => bcrypt($request->password),
        ]);
        return response()->json(['message' => 'Los datos se han actualizado correctamente']);
    }

    public function deleteClientUser(int $id)
    {
        $this->user->destroy($id);
        return response()->json(['message' => 'El usuario se ha borrado correctamente']);
    }
}
