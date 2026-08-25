<?php

namespace App\Exceptions;

class AuthorizationException extends BusinessException
{
    public function __construct(string $message = 'Unauthorized.', ?\Throwable $previous = null)
    {
        parent::__construct($message, 403, $previous);
    }
}
