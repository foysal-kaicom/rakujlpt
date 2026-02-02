<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\CandidateRegistrationEmailJob;
use App\Models\Candidate;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Throwable;

class GoogleAuthController extends Controller
{
    public function googleLogin(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'image' => 'nullable|string',
            'token' => 'required|string', // Google access token
        ]);

        if ($validated->fails()) {
            Log::info($validated->getMessageBag());
            return $this->responseWithError("Validation failed", $validated->getMessageBag());
        }

        try {
            // $response = Http::get("https://www.googleapis.com/oauth2/v3/userinfo", [
            //     'access_token' => $request->token,
            // ]);

            // if (!$response->ok()) {
            //     Log::info($response);
            //     return $this->responseWithError("Error", "Invalid Google token");

            // }

            // $googleUser = $response->json();

            $fullName = $request->name ?? 'Unknown User';

            // Split on the first space
            $nameParts = explode(' ', $fullName, 2);
            $firstName = $nameParts[0];            // "Arif"
            $lastName  = $nameParts[1] ?? ''; 
            // Find or create candidate
            $candidate = Candidate::updateOrCreate(
                ['email' => $request->email],
                [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'google_id' =>  Str::uuid(),
                    'photo' =>  $request->image ?? null,
                ]
            );

            // Send welcome email only for new users
            if ($candidate->wasRecentlyCreated) {
                $candidate->password = bcrypt(Str::random(12));
                $candidate->candidate_code = strtoupper(Str::random(7));
                $candidate->save();
                dispatch(new CandidateRegistrationEmailJob($candidate));
            }

        $token = auth('candidate')->login($candidate);

            return response()->json([
                'data' => $candidate,
                'message' => 'Login successful',
                'token' => $token,
            ]);
        } catch (Throwable $e) {
            Log::error($e->getMessage());
            return response()->json([
                'error' => 'Something went wrong.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
