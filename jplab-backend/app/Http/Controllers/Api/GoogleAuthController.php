<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SendRegistrationEmailJob;
use App\Models\Candidate;
use Google_Client;
use Illuminate\Http\Request;
use Throwable;

class GoogleAuthController extends Controller
{
    public function googleLogin(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        try {
            $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID','58987890991-4o70bs990d6crfiat31jopqd18ek888k.apps.googleusercontent.com')]);
            $payload = $client->verifyIdToken($request->token);

            if (!$payload) {
                return response()->json(['error' => 'Invalid Google token'], 401);
            }

            $email = $payload['email'];
            $name = $payload['name'] ?? '';

            // Find or create candidate
            $candidate = Candidate::firstOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => bcrypt(rand(111111, 999999)),
                ]
            );

            // Send welcome email only for new users
            if ($candidate->wasRecentlyCreated) {
                dispatch(new SendRegistrationEmailJob($candidate));
            }

            // Generate Sanctum token
            $token = $candidate->createToken('google-login')->plainTextToken;

            return response()->json([
                'data' => $candidate,
                'message' => 'Login successful',
                'token' => $token,
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'error' => 'Something went wrong.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
