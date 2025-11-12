<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CandidateRequest;
use App\Http\Resources\CandidateResource;
use App\Jobs\SendRegistrationEmail;
use App\Jobs\SendRegistrationEmailJob;
use App\Models\Booking;
use App\Models\Candidate;
use App\Notifications\CandidateNotification;
use App\Services\FileStorageService;
use App\Services\SMS\SmsService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Throwable;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

use function PHPUnit\Framework\throwException;

class CandidateController extends Controller
{

    public $fileStorageService;
    public function __construct(FileStorageService $file_storage_service)
    {
        $this->fileStorageService = $file_storage_service;
    }

    public function register(CandidateRequest $request)
    {
        $data = $request->validated();

        try {
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');

                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'candidate');
                $data['photo'] = $imageUploadResponse['public_path'];
            }

            // phone number needs to sanitize
            $data['password'] = bcrypt($data['password']);

            $candidate = Candidate::create($data);

            //send congratulation email with password
            dispatch(new SendRegistrationEmailJob($candidate));

            return $this->responseWithSuccess($candidate, "Candidate registered successfully", 201);
        } catch (Throwable $e) {
            return $this->responseWithError($e->getMessage(), 'Something went wrong.');
        }
    }


    public function doLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email_or_phone' => 'required|string',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return $this->responseWithError('Something went wrong.', $validator->getMessageBag());
        }

        $email_or_phone = $request->input('email_or_phone');
        $field = filter_var($email_or_phone, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone_number';


        $candidate = Candidate::where($field, $email_or_phone)->first();

        if ($candidate && $candidate->status == 'active' && Hash::check($request->password, $candidate->password)) {
            try {
                $token = JWTAuth::fromUser($candidate);

                return response()->json([
                    'data' => $candidate,
                    'message' => 'Login successful',
                    'token' => $token,
                ]);
            } catch (JWTException $e) {
                return $this->responseWithError('Could not create token.', $e->getMessage());
            }
        } elseif ($candidate && $candidate->status == 'frozen') {
            return $this->responseWithError('Your account is frozen. Please contact with administrator.');
        } else {
            return $this->responseWithError('Invalid credentials');
        }
    }

    public function logout()
    {
        try {

            $token = JWTAuth::getToken();

            if ($token) {
                JWTAuth::invalidate($token);
            }

            return $this->responseWithSuccess([], 'Logout successful');
        } catch (\Exception $e) {
            return $this->responseWithSuccess([], 'Failed to logout or token missing.');
        }
    }

    public function profile()
    {
        $candidate = Candidate::find(auth('candidate')->user()->id);

        return $this->responseWithSuccess(CandidateResource::make($candidate), 'Candidate Profile.');
    }

    public function dashboard()
    {

        $data = [
            'total_bookings' => 0,
            'total_success_payments' => 0,
            'pending_booking' => 0,
            'total_results_published' => 0
        ];

        return $this->responseWithSuccess($data, 'Candidate Dashboard.');
    }


    public function update(Request $request)
    {
        $candidate = Candidate::findOrFail(auth('candidate')->user()->id);

        $validator = Validator::make($request->all(), [
            'first_name'    => 'required|string|max:100',
            'last_name'     => 'required|string|max:100',
            'email'         => [
                'nullable',
                'email',
                'max:150',
                Rule::unique('candidates')->ignore($candidate->id),
                function ($attribute, $value, $fail) use ($candidate) {
                    if ($candidate->email) {
                        $fail('Email cannot be updated.');
                    }
                },
            ],
            'phone_number'  => [
                'nullable',
                'string',
                'max:20',
                Rule::unique('candidates')->ignore($candidate->id),
                function ($attribute, $value, $fail) use ($candidate) {
                    if ($candidate->phone_number) {
                        $fail('Phone number cannot be updated.');
                    }
                },
            ],
            'date_of_birth' => 'nullable|date',
            'gender'        => 'nullable|in:male,female',
            'photo'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'address'       => 'nullable|string|max:255',
            'social_facebook'       => 'nullable|string',
            'social_linkedin'       => 'nullable|string',
            'about'       => 'nullable|string',
        ]);


        $candidate = Candidate::findOrFail(auth('candidate')->user()->id);

        // Get validated data from CandidateRequest
        $data = $validator->validated();

        // Handle photo upload/update
        if ($request->hasFile('photo')) {
            if ($candidate->photo) {
                // Update existing file in cloud
                $newFile = $request->file('photo');
                $fileToDelete = $candidate->photo;
                $imageUploadResponse = $this->fileStorageService->updateFileFromCloud($fileToDelete, $newFile);
                $data['photo'] = $imageUploadResponse['public_path'];
            } else {
                // Upload new image
                $image = $request->file('photo');

                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'candidate');
                $data['photo'] = $imageUploadResponse['public_path'];
            }
        }

        // Update candidate
        $candidate->update($data);

        return $this->responseWithSuccess($candidate, 'Candidate profile updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $candidate = Candidate::findOrFail(auth('candidate')->user()->id);

        // Validate input
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed', // Must match new_password_confirmation
        ]);

        // Optional: Verify current password
        if (!Hash::check($request->input('current_password'), $candidate->password)) {
            return $this->responseWithError('Current password is incorrect.');
        }

        // Update password
        $candidate->password = Hash::make($request->input('new_password'));
        $candidate->save();

        return $this->responseWithSuccess($candidate, 'Candidate password updated successfully.');
    }

    public function verifyPhoneNumber(): JsonResponse
    {

        try {
            $candidate = auth('candidate')->user();

            if ($candidate->is_phone_verified) {

                return $this->responseWithError('Mobile number already verified.', ["Already Verified."]);
            } elseif ($candidate->otp && $candidate->otp_expired_at > now()) {

                return $this->responseWithError('OTP already sent. Please Check Your Mobile.', ['otp_expired_at' => $candidate->otp_expired_at]);
            } else {

                $otp = rand(100000, 999999);
                $candidate->update([
                    'otp' => $otp,
                    'otp_expired_at' => Carbon::now()->addMinutes(3),
                ]);

                //for now sending otp to email- it should be using sms

                Mail::send([], [], function ($message) use ($candidate) {
                    $message->to($candidate->email)
                        ->subject("JPT-BD Phone verification code.")
                        ->html('<h1>Welcome!</h1><p>Your mobile OTP is: ' . $candidate->otp . '.</p>');
                });

                return $this->responseWithSuccess($candidate, "OTP sent to your mobile number.");
            }
        } catch (Throwable $ex) {
            return $this->responseWithError($ex->getMessage(), "Something went wrong.");
        }
    }


    public function postVerifyPhoneNumber(Request $request): JsonResponse
    {

        $validator = Validator::make($request->all(), [
            'otp' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return $this->responseWithError('OTP is required.', $validator->getMessageBag());
        }

        $candidate = Candidate::where('otp', $request->otp)->first();

        if ($candidate) {

            if (!$candidate->is_phone_verified) {

                if ($candidate->otp_expired_at > now()) {

                    $candidate->update([
                        'otp' => null,
                        'otp_expired_at' => null,
                        'is_phone_verified' => 1
                    ]);


                    $data = [
                        'title' => "Phone Verification Success",
                        'message' => "Your phone numbner verified successfully. Now you can place booking. ",
                        'url' => '',

                    ];
                    $candidate->notify(new CandidateNotification($data));

                    return $this->responseWithSuccess($candidate, 'Verification success.');
                }

                return $this->responseWithError('OTP Expired.', ['please resend OTP']);
            }
            return $this->responseWithError('Aleady verified.');
        }

        return $this->responseWithError('Invalid OTP');
    }

    public function sendPasswordResetOtp(Request $request)
    {
        $request->validate([
            'identifier' => 'required',
        ]);

        $identifier = $request->input('identifier');
        $isEmail = filter_var($identifier, FILTER_VALIDATE_EMAIL);

        $candidate = $isEmail
            ? Candidate::where('email', $identifier)->first()
            : Candidate::where('phone_number', $identifier)->first();

        if (!$candidate) {
            return $this->responseWithError('Account not found or inactive.', []);
        }

        // Check if OTP already sent and still valid
        if (
            $candidate->otp &&
            $candidate->otp_expired_at &&
            Carbon::parse($candidate->otp_expired_at)->isFuture()
        ) {
            return $this->responseWithError('OTP already sent. Please wait before requesting again.', []);
        }

        $otp = rand(100000, 999999);
        $expiry = Carbon::now()->addMinutes(5);

        DB::beginTransaction();

        try {
            $candidate->otp = $otp;
            $candidate->otp_expired_at = $expiry;
            $candidate->save();

            // Send OTP
            if ($isEmail) {
                Mail::send('emails.forgot-password', [
                    'otp' => $otp,
                    'candidate_name' => $candidate->full_name,
                ], function ($message) use ($candidate) {
                    $message->to($candidate->email)
                        ->subject('Your Password Reset OTP');
                });

               
            } else {
                $sanitizeNumber = sanitizePhoneNumber($candidate->phone_number);
                if (!$sanitizeNumber) {
                    throw new \Exception("Invalid phone number");
                }

                $message = "Your password reset OTP is {$otp}";
                $sms = new SmsService();

                if (!$sms->send($sanitizeNumber, $message)) {
                    Log::warning("Failed to send OTP to {$candidate->phone_number}");
                    throw new \Exception("Failed to send OTP SMS");
                }
            }

            DB::commit();
            return $this->responseWithSuccess(['otp_expired_at'=>$candidate->otp_expired_at], 'OTP sent successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to send OTP: ' . $e->getMessage());
            return $this->responseWithError('Failed to send OTP. Please try again later.', []);
        }
    }



    public function verifyResetPasswordOtp(Request $request)
    {
        $request->validate([
            'identifier' => 'required',
            'otp' => 'required|digits:6',
            'password' => 'required|min:6|confirmed',
        ]);

        $identifier = $request->input('identifier');
        $isEmail = filter_var($identifier, FILTER_VALIDATE_EMAIL);

        $candidate = $isEmail
            ? Candidate::where('email', $identifier)->first()
            : Candidate::where('phone_number', $identifier)->first();

        if (!$candidate) {
            return $this->responseWithError('Account not found.', []);
        }

        if (
            !$candidate->otp ||
            $candidate->otp !== $request->otp ||
            Carbon::parse($candidate->otp_expired_at)->isPast()
        ) {
            return $this->responseWithError('Invalid or expired OTP.', []);
        }

        $candidate->password = bcrypt($request->password);
        $candidate->otp = null;
        $candidate->otp_expired_at = null;
        $candidate->save();

        return $this->responseWithSuccess([], 'Password has been reset successfully.');
    }
}
