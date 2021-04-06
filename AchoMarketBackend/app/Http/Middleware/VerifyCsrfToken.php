<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'products/create',
        'products/delete/{id}',
        'product/uploadImage',
        'shop/create',
        'shop/update',
        'clientuser/create',
        'clientuser/update',
        'shopuser/create',
        'shopuser/update',
    ];
}
