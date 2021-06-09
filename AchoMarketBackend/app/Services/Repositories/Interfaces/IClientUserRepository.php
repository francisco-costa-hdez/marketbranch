<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IClientUserRepository
{
    public function findClientUserById(int $id);

    public function createClientUser(Request $request, String $confirmation_code);

    public function login(Request $request);

    public function logout(Request $request);

    public function updateClientUser(Request $request, array $data);

    public function updatePassword(Request $request);

    public function deleteClientUser(int $id);
}