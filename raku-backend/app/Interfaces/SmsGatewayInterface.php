<?php

namespace App\Interfaces;

interface SmsGatewayInterface
{
    public function send($to, string $message): bool;

}
