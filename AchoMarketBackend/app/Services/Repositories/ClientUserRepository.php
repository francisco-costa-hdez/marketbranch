<?php

namespace App\Services\Repositories;

use App\Models\ClientUser;
use Illuminate\Http\Request;

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

    public function createClientUser(Request $request)
    {
        $this->user->create([
            "name" => $request->name,
            "email" => $request->email,
            "tlf" => $request->tlf,
            "profile_img" => $request->profile_img,
            "address" => $request->address,
            "password" => encrypt($request->password)
        ])->assignRole('client_user');
    }

    public function updateClientUser(Request $request)
    {
            $this->user->find($request->id)->update([
                'name' => $request->name,
                'email' => $request->email,
                'tlf' => $request->tlf,
                'profile_img' => $request->profile_img,
                'address'=> $request->address,
                'password' => encrypt($request->password),
            ]);

    }

    public function deleteClientUser(int $id)
    {
        $this->user->destroy($id);
    }

}
