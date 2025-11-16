<?php

namespace App\Services\SMS;

use App\Interfaces\SmsGatewayInterface;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BulkSmsBdGatewayService implements SmsGatewayInterface
{
    protected string $apiUrl;
    protected string $apiKey;
    protected string $senderId;

    public function __construct()
    {
        $this->apiUrl  = config('sms.bulk_sms_bd.url', 'https://bulksmsbd.net/api/smsapi');
        $this->apiKey  = config('sms.bulk_sms_bd.api_key');
        $this->senderId = config('sms.bulk_sms_bd.sender_id');
    }

    public function send($to, string $message): bool
    {
        $recipients = is_array($to) ? implode(',', $to) : $to;

        try {
            
            $response = Http::asForm()->post($this->apiUrl, [
                'api_key'  => $this->apiKey,
                'senderid' => $this->senderId,
                'number'   => $recipients,
                'message'  => $message,
            ]);

            // Log::info('BulkSMSBD Response', [
            //     'recipients' => $recipients,
            //     'body' => $response->body(),
            // ]);

            // API returns "SUCCESS" or "FAILED"
            if ($response->successful()) {
                $body = $response->body();
                $data = json_decode($body, true);

                if (isset($data['response_code']) && $data['response_code'] == 202) {
                    return true;
                }

                // Log or handle custom API error
                Log::error('API Error: ' . ($data['error_message'] ?? 'Unknown error'));
            }

            return false;
        } catch (\Throwable $e) {
            Log::error('BulkSMSBD send failed', ['error' => $e->getMessage()]);
            return false;
        }
    }
}
