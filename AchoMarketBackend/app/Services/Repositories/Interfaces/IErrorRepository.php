<?php

namespace App\Services\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IErrorRepository
{
    public function createError(array $data);
}