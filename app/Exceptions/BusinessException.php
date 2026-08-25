<?php
namespace  App\Exceptions;
use Exception;

class BusinessException extends Exception
{
    private int $statusCode;
    public function __construct($message = "", int $statusCode = 422, ?\Throwable $previous = null)
    {
        $this->statusCode = $statusCode;
        parent::__construct($message, 0, $previous);
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }
}
?>