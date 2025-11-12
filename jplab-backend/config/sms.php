<?php

return [
    'default' => env('SMS_GATEWAY', 'bulk_sms_bd'),

    'bulk_sms_bd' => [
        'url'        => 'https://bulksmsbd.net/api/smsapi',
        'api_key'    => env('BULKSMS_API_KEY','ycdPpeQjfNGS7wwfHCL5'),
        'sender_id'  => env('BULKSMS_SENDER_ID','8809648904247'),
    ],


    // 'twillow' => [
    //     'url' => env('SMS_URL', 'https://twillow.net/api/smsapi'),
    //     'username' => env('SMS_USER'),
    //     'password' => env('SMS_PASS'),
    //     'sender' => env('SMS_SENDER'),
    // ]
];
