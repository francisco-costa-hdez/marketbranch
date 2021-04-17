<?php

namespace App\Http\Controllers;

use App\Models\ClientUser;
use App\Services\ClientUserService;
use Illuminate\Http\Request;

class ClientUserController extends Controller
{
    protected $user;

    public function __construct(ClientUserService $cs)
    {
        $this->user = $cs;
    }

    public function findClientUserById(int $id)
    {
        $user = $this->user->findClientUserById($id);
        return response()->json(['user' => $user], 200);
    }

    public function createClientUser(Request $request)
    {
        $this->user->createClientUser($request);
    }

    public function updateClientUser(Request $request)
    {
        $this->user->updateClientUser($request);
    }

    public function deleteClientUser(int $id)
    {
        $this->user->deleteClientUser($id);
    }
}
