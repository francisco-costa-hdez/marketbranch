<?php

namespace App\Http\Controllers;

use App\Services\ErrorService;
use Illuminate\Http\Request;

class ErrorController extends Controller
{
    protected $errorService;

    public function __construct(ErrorService $es)
    {
        $this->errorService = $es;
    }

    public function createError(Request $request) 
    {
        return $this->errorService->createError($request->all());
    }
}
