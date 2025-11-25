<?php

use App\Models\Package;
use App\Models\Roadmap;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CMSController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\CenterController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\RoadmapController;
use App\Http\Controllers\Api\SupportController;
use App\Http\Controllers\Api\MockTestController;
use App\Http\Controllers\Api\CandidateController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\DemoQuestionController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\CandidateProgressController;
use App\Http\Controllers\Api\SslCommerzPaymentController;

Route::prefix('v1')->group(function () {
        
    Route::post('/login', [CandidateController::class, 'doLogin']);
    Route::post('/google-login', [GoogleAuthController::class, 'googleLogin']);

    Route::post('/test', [HomeController::class, 'test']);

    Route::get('/roadmaps', [RoadmapController::class, 'getRoadmaps']);
    Route::get('/roadmaps/{slug}/stages', [RoadmapController::class, 'getStages']);
    Route::get('/subscriptions', [PackageController::class, 'show']);


    Route::get('/settings', [HomeController::class, 'settingsData']);
    Route::post('/candidate/register', [CandidateController::class, 'register']);

    Route::group(['prefix' => 'exam', 'as' => 'exam.'], function () {
        Route::get('/list', [ExamController::class, 'list']);
        Route::get('/view/{slug}', [ExamController::class, 'view']);
    });

    Route::get('/faq/list', [CMSController::class, 'getFaqList']);

    Route::get('/news/list', [CMSController::class, 'getNewsList']);
    Route::get('/news/{slug}', [CMSController::class, 'viewSingleNews']);

    Route::get('/review/list', [CMSController::class, 'getReviewList']);

    Route::get('/partner/list', [CMSController::class, 'getPartnerList']);

    Route::get('/feature/list', [CMSController::class, 'getFeatureList']);

    Route::get('/our-member/list', [CMSController::class, 'getTeamMemberList']);


    // Route::group(['prefix' => 'center', 'as' => 'center.'], function () {
    //     Route::get('/list', [CenterController::class, 'list']);
    //     Route::get('/view/{center_id}', [CenterController::class, 'view']);
    // });


    Route::group(['middleware' => 'auth:candidate'], function () {

        Route::post('/subscribe', [PackageController::class, 'subscribe']);

        Route::group(['prefix' => 'candidate', 'as' => 'candidate.'], function () {
            Route::get('/dashboard', [CandidateController::class, 'dashboard']);
            Route::put('/update', [CandidateController::class, 'update']);
            Route::get('/logout', [CandidateController::class, 'logout']);
            Route::get('/profile', [CandidateController::class, 'profile']);
            Route::post('/update-password', [CandidateController::class, 'updatePassword']);
            Route::get('/verify-phone', [CandidateController::class, 'verifyPhoneNumber']);
            Route::post('/post-verify-phone', [CandidateController::class, 'postVerifyPhoneNumber']);

            Route::post('/subscription-renew', [PackageController::class, 'renewSubscription']);
            Route::get('/subscription-details', [PackageController::class, 'subscriptionDetails']);
    
        });

        // Route::group(['prefix' => 'exam', 'as' => 'exam.'], function () {
        //     Route::post('/booking/store/{slug}', [BookingController::class, 'book']);
        // });


        Route::group(['prefix' => 'notifications', 'as' => 'notifications.'], function () {
            Route::get('/list', [NotificationController::class, 'index']);
            Route::get('/{id}/read', [NotificationController::class, 'markAsRead']);
            Route::get('/read-all', [NotificationController::class, 'markAllAsRead']);
        });

        Route::group(['prefix' => 'mock-test', 'as' => 'mock-test.', 'middleware' => ['checkSubscription'] ], function () {
            Route::get('/get-questions', [MockTestController::class, 'getQuestions']);
            Route::post('/submit-answer', [MockTestController::class, 'evaluateAnswers']);
        });

        Route::group(['prefix' => 'mock-test', 'as' => 'mock-test.' ], function () {
            Route::get('/results', [MockTestController::class, 'getTestResult']);
            Route::get('/active-user-subscription', [MockTestController::class, 'activeUserSubscriptionDetails']);
        });

        Route::get('/stages/{stageId}/start', [CandidateProgressController::class, 'showStage']);
        Route::post('/stages/{stageId}/complete', [CandidateProgressController::class, 'completeStage']);
        Route::get('/candidate/current-roadmap', [RoadmapController::class, 'get_current_roadmap']);

    });

    Route::post('/success', [SslCommerzPaymentController::class, 'success'])->name('ssl.success');
    Route::post('/fail', [SslCommerzPaymentController::class, 'fail'])->name('ssl.fail');
    Route::post('/cancel', [SslCommerzPaymentController::class, 'cancel'])->name('ssl.cancel');
    
    Route::post('/send-password-reset-otp', [CandidateController::class, 'sendPasswordResetOtp']);
    Route::post('/verify-password-reset-otp', [CandidateController::class, 'verifyResetPasswordOtp']);


    Route::post('/pay', [SslCommerzPaymentController::class, 'index']);
    Route::post('/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']);



    Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);
    //SSLCOMMERZ END

});
