<?php

namespace App\Services\Repositories;

use App\Services\Repositories\Interfaces\IErrorRepository;
use App\Models\Error;

class ErrorRepository implements IErrorRepository
{
    protected $error;

    public function __construct(Error $error)
    {
        $this->error = $error;
    }

    public function createError(array $data)
    {   
        $this->error->create($data);
        return response()->json(['message' => 'Error notificado correctamente']);
    }
}
