<?php

namespace App\Services\SMS;

use App\Interfaces\SmsGatewayInterface;
use Illuminate\Support\Facades\App;

class SmsService
{
    protected SmsGatewayInterface $gateway;

    public function __construct()
    {
        $default = config('sms.default', 'bulk_sms_bd');

        $this->gateway = match ($default) {
            'bulk_sms_bd' => App::make(BulkSmsBdGatewayService::class),
            // 'twilio' => App::make(TwilioGateway::class),
            // 'mutufun' => App::make(MutufunGateway::class),
            default => App::make(BulkSmsBdGatewayService::class),
        };
    }

    public function send($to, string $message): bool
    {
        return $this->gateway->send($to, $message);
    }
}
