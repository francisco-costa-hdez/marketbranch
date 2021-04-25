<?php

namespace App\Services;

use App\Services\Interfaces\IClientUserService;
use App\Services\Repositories\ClientUserRepository;
use Illuminate\Http\Request;

class ClientUserService implements IClientUserService
{
    protected $clientUserRepository;

    public function __construct(ClientUserRepository $clientUserRepository)
    {
        $this->clientUserRepository = $clientUserRepository;
    }

    public function findClientUserById(int $id)
    {
        return $this->clientUserRepository->findClientUserById($id);
    }

    public function createClientUser(Request $request)
    {
       return $this->clientUserRepository->createClientUser($request);
    }

    public function logout(Request $request)
    {
        return $this->clientUserRepository->logout($request);
    }
    
    public function login(Request $request)
    {
        return $this->clientUserRepository->login($request);
    }
    
    public function updateClientUser(Request $request)
    {
       return $this->clientUserRepository->updateClientUser($request);
    }

    public function deleteClientUser(int $id)
    {
       return $this->clientUserRepository->deleteClientUser($id);
    }
}
