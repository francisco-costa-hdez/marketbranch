<?php

namespace App\Services;

use App\Services\Interfaces\IErrorService;
use App\Services\Repositories\ErrorRepository;

class ErrorService implements IErrorService
{
    protected $errorRepository;

    public function __construct(ErrorRepository $er)
    {
        $this->errorRepository = $er;
    }

    public function createError(array $data) 
    {
        return $this->errorRepository->createError($data);
    }

}