<?php

namespace App\Http\Controllers;

use App\Models\ClientUser;
use Illuminate\Http\Request;

class ClientUserController extends Controller
{
    public function findClientUserById($id)
    {
        $user = ClientUser::find($id);
        return response()->json(['user' => $user], 200);
    }

    public function createClientUser(Request $request)
    {
        $user = ClientUser::create([
            "name" => $request->name,
            "email" => $request->email,
            "tlf" => $request->tlf,
            "profile_img" => $request->profile_img,
            "address" => $request->address,
            "password" => encrypt($request->password)
        ]);
        $user->save();
    }

    public function updateClientUser(Request $request)
    {
            $clientUser = ClientUser::find($request->id);
            $clientUser->name = $request->name;
            $clientUser->email = $request->email;
            $clientUser->tlf = $request->tlf;
            $clientUser->profile_img = $request->profile_img;
            $clientUser->address= $request->address;
            $clientUser->password = encrypt($request->password);
            $clientUser->save();
    }
}
