<?php

namespace App\Services\Repositories;

use App\Models\ClientUser;
use App\Services\Repositories\Interfaces\IClientUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ClientUserRepository implements IClientUserRepository
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
            "password" => Hash::make($request->password)
        ])->assignRole('client_user');
        $token = $user->createToken('client_user', ['client_user', 'user'])->plainTextToken;
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
            return response(['message' => 'credenciales no válidas']);
        } else if (!$user->confirmed) {
            return response(['message' => 'Verifica tu cuenta de correo electrónico para iniciar sesión']);
        }

        $token = $user->createToken('client_user')->plainTextToken;
        $response = [
            'message' => 'Sesión iniciada',
            'user' => $user->name,
            'user_id' => $user->id,
            'profile_img' => $user->profile_img,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        $this->user->find($request->id)->tokens()->delete();
        return ['message' => 'logged out'];
    }

    public function updateClientUser(Request $request, array $data)
    {
        if ($request->email != $this->user->find($request->id)->email) {
            Mail::send('emails.confirmation_code', $data, function ($message) use ($data) {
                $message->to($data['email'], $data['name'])->subject('Por favor confirma tu correo');
            });
            $this->user->find($request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'tlf' => $request->tlf,
                'profile_img' => $request->profile_img,
                'confirmed' => false,
                'confirmation_code' => $data['confirmation_code'],
                'address' => $request->address
            ]);
        } else {
            $this->user->find($request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'tlf' => $request->tlf,
                'profile_img' => $request->profile_img,
                'address' => $request->address
            ]);
        }

        return response()->json(['message' => 'Los datos se han actualizado correctamente']);
    }

    public function updatePassword(Request $request)
    {
        $user = $this->user->find(auth()->user()->id);
        if (Hash::check($request->password, $user->password)) {
            $user->update([
                'password' => Hash::make($request->new_password)
            ]);
            return response()->json(['message' => 'La contraseña se ha actualizado correctamente']);
        }
        return response()->json(['message' => 'La contraseña anterior no es correcta']);
    }

    public function deleteClientUser(int $id)
    {
        $this->user->destroy($id);
        return response()->json(['message' => 'El usuario se ha borrado correctamente']);
    }
}
