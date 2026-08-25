<?php

namespace App\Exceptions;

class AuthenticationException extends BusinessException
{
    public function __construct(string $message = 'Invalid credentials.', ?\Throwable $previous = null)
    {
        parent::__construct($message, 401, $previous);
    }
}
