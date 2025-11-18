<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\CenterController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\MockTestController;
use App\Http\Controllers\PracticeController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\AccountingController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\DemoQuestionController;
use App\Http\Controllers\MockTestModuleController;
use App\Http\Controllers\BusinessSettingController;
use App\Http\Controllers\CertificateClaimContoller;
use App\Http\Controllers\FeatureController;

Route::get('/login', [LoginController::class, 'login'])->name('login');
Route::post('/do-login', [LoginController::class, 'doLogin'])->name('doLogin');
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/', [DashboardController::class, 'showDashboard'])->name('user.dashboard');

    Route::group(['prefix' => 'roles', 'as' => 'user.roles.', 'module' => 'Role'], function () {
        Route::get('/', [RoleController::class, 'index'])->name('list')->middleware('checkPermission:user.roles.list');
        Route::get('/create', [RoleController::class, 'create'])->name('create')->middleware('checkPermission:user.roles.create');
        Route::post('/store', [RoleController::class, 'store'])->name('store')->middleware('checkPermission:user.roles.store');
        Route::get('/edit/{id}', [RoleController::class, 'edit'])->name('edit')->middleware('checkPermission:user.roles.edit');
        Route::post('/update/{id}', [RoleController::class, 'update'])->name('update')->middleware('checkPermission:user.roles.update');
        Route::post('{id}/toggle-status', [RoleController::class, 'toggleStatus'])->name('toggleStatus')->middleware('checkPermission:user.roles.toggleStatus');
    });

    Route::group(['prefix' => 'business-settings', 'as' => 'business-settings.', 'module' => 'Business-Settings'], function () {
        Route::get('/edit/{id}', [BusinessSettingController::class, 'showEditPage'])->name('edit');
        Route::post('/general', [BusinessSettingController::class, 'updateGeneralInfo'])->name('general');
        Route::post('/legal', [BusinessSettingController::class, 'updateLegalInfo'])->name('legal');
        Route::post('/social', [BusinessSettingController::class, 'updateSocialLinks'])->name('social');
        Route::post('/policies', [BusinessSettingController::class, 'updatePolicies'])->name('policies');
    });

    Route::group(['prefix' => 'users', 'as' => 'users.', 'module' => 'users'], function () {
        Route::get('/', [UserController::class, 'index'])->name('list');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('{id}/toggle-status', [UserController::class, 'toggleStatus'])->name('toggleStatus');
        Route::post('/create', [UserController::class, 'store'])->name('store');
        Route::get('/view/{id}', [UserController::class, 'show'])->name('edit');
        Route::get('/profile', [UserController::class, 'profile'])->name('profile');
        Route::post('/update/{id}', [UserController::class, 'update'])->name('update'); // Using POST instead of PUT/PATCH
        Route::delete('/delete/{id}', [UserController::class, 'destroy'])->name('destroy');
    });

    Route::group(['prefix' => 'candidate', 'as' => 'candidate.', 'module' => 'Candidate'], function () {
        Route::get('/', [CandidateController::class, 'list'])->name('list');
        Route::get('/create', [CandidateController::class, 'showRegistration'])->name('create');
        Route::post('/store', [CandidateController::class, 'register'])->name('store');
        Route::get('/edit/{id}', [CandidateController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [CandidateController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [CandidateController::class, 'destroy'])->name('delete');
        Route::post('{id}/toggle-status', [CandidateController::class, 'toggleStatus'])->name('toggleStatus');
        Route::get('/{candidate_id}/applications', [CandidateController::class, 'candidateApplications'])->name('applications');
    });

    // Route::group(['prefix' => 'exam', 'as' => 'exam.', 'module' => 'Exam'], function () {

    // });


    Route::group(['prefix' => 'payment', 'as' => 'payment.', 'module' => 'payment'], function () {
        Route::get('/', [PaymentController::class, 'list'])->name('list');
    });


    Route::group(['prefix' => 'mock-tests', 'as' => 'mock-tests.', 'module' => 'mock-tests'], function () {
        Route::get('/', [ExamController::class, 'list'])->name('exam.list');
        Route::get('/create', [ExamController::class, 'showCreateExam'])->name('exam.create');
        Route::post('/store', [ExamController::class, 'store'])->name('exam.store');
        Route::get('/edit/{id}', [ExamController::class, 'edit'])->name('exam.edit');
        Route::post('/update/{id}', [ExamController::class, 'update'])->name('exam.update');
        Route::post('{id}/toggle-status', [ExamController::class, 'toggleStatus'])->name('exam.toggleStatus');










        Route::get('/question-list', [MockTestController::class, 'questionList'])->name('question.list');
        Route::get('/module-info', [MockTestController::class, 'index'])->name('module-section.info');
        Route::get('/sections/fetch-modules', [MockTestController::class, 'sectionsWithModules'])->name('sections-with-modules.fetch');

        Route::get('/question-setup-form', [MockTestController::class, 'questionSetupForm'])->name('question-setup.form');
        Route::post('/question-setup', [MockTestController::class, 'questionSetup'])->name('question-setup.post');

        Route::get('/section-create', [MockTestController::class, 'createSection'])->name('section.create');
        Route::post('/section-store', [MockTestController::class, 'storeSection'])->name('section.store');

        Route::get('/section-edit/{id}', [MockTestController::class, 'editSection'])->name('section.edit');
        Route::post('/section-update/{id}', [MockTestController::class, 'updateSection'])->name('section.update');
        Route::get('/edit-question/{id}', [MockTestController::class, 'editQuestion'])->name('edit.question');
        Route::post('/update-question/{id}', [MockTestController::class, 'updateQuestion'])->name('question.update');
        Route::delete('/delete-question/{id}', [MockTestController::class, 'deleteQuestion'])->name('question.delete');
        Route::post('/update-question-group/{id}', [MockTestController::class, 'updateQuestionGroup'])->name('question-group.update');
        Route::get('/reports/list', [MockTestController::class, 'getReportsData'])->name('reports.list');


        // ajax dependent dropdown routes
        Route::get('/modules/{examId}', [MockTestController::class, 'getModulesByExam'])->name('modules.byExam');
        Route::get('/sections/{moduleId}', [MockTestController::class, 'getSectionsByModule'])->name('sections.byModule');

    });

    Route::group(['prefix' => 'review', 'as' => 'review.', 'module' => 'review'], function () {
        Route::get('/', [ReviewController::class, 'list'])->name('list');
        Route::get('/create', [ReviewController::class, 'create'])->name('create');
        Route::post('/store', [ReviewController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [ReviewController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [ReviewController::class, 'update'])->name('update');
        Route::post('{id}/toggle-status', [ReviewController::class, 'toggleStatus'])->name('toggleStatus');

    });


    Route::group(['prefix' => 'partner', 'as' => 'partner.', 'module' => 'partner'], function () {
        Route::get('/', [PartnerController::class, 'list'])->name('list');
        Route::post('/store', [PartnerController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [PartnerController::class, 'edit'])->name('edit');
        Route::put('/{id}', [PartnerController::class, 'update'])->name('update');
        Route::delete('/{id}', [PartnerController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/toggle-status', [PartnerController::class, 'toggleStatus'])->name('toggleStatus');

    });

    Route::group(['prefix' => 'faq', 'as' => 'faq.', 'module' => 'FAQ'], function () {
        Route::get('/', [FaqController::class, 'list'])->name('list');
        Route::get('/create', [FaqController::class, 'showCreateFaq'])->name('create');
        Route::post('/store', [FaqController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [FaqController::class, 'showEditPage'])->name('edit');
        Route::post('/update/{id}', [FaqController::class, 'update'])->name('update');
        Route::post('{id}/toggle-status', [FaqController::class, 'toggleStatus'])->name('toggleStatus');
        Route::delete('/delete/{id}', [FaqController::class, 'destroy'])->name('delete');
    });


    Route::group(['prefix' => 'news', 'as' => 'news.', 'module' => 'news'], function () {
        Route::get('/', [NewsController::class, 'list'])->name('list');
        Route::get('/create', [NewsController::class, 'create'])->name('create');
        Route::post('/store', [NewsController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [NewsController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [NewsController::class, 'update'])->name('update');
        Route::get('/delete/{id}', [NewsController::class, 'delete'])->name('delete');
        Route::post('{id}/toggle-status', [NewsController::class, 'toggleStatus'])->name('toggleStatus');
    });

    Route::group(['prefix' => 'features', 'as' => 'features.', 'module' => 'features'], function () {
        Route::get('/', [FeatureController::class, 'list'])->name('list');
        Route::get('/create', [FeatureController::class, 'create'])->name('create');
        Route::post('/store', [FeatureController::class, 'store'])->name('store');
        Route::get('/edit/{id}', [FeatureController::class, 'edit'])->name('edit');
        Route::put('/update/{id}', [FeatureController::class, 'update'])->name('update');
        Route::get('/delete/{id}', [FeatureController::class, 'delete'])->name('destroy');
        Route::post('{id}/toggle-status', [FeatureController::class, 'toggleStatus'])->name('toggleStatus');
    });

    Route::resource('packages', PackageController::class);
    Route::resource('mock-test-modules', MockTestModuleController::class);
    Route::post('mock-test-modules/{id}/toggle-status', [MockTestModuleController::class, 'toggleStatus'])
    ->name('mock-test-modules.toggleStatus');

    // Extra routes
    Route::post('packages/{package}/buy', [PackageController::class, 'buy'])->name('packages.buy');
    Route::post('packages/attend/{detail}', [PackageController::class, 'attendExam'])->name('packages.attend');

    Route::resource('roadmaps', RoadmapController::class);
    Route::resource('practices', PracticeController::class);
    Route::get('/practices/create/{stage_id}', [PracticeController::class, 'createPractice'])->name('practices.create.stage');


    Route::resource('stages', StageController::class);
    Route::post('/stages/{stage}/toggle-status', [StageController::class, 'toggleStatus'])->name('stages.toggleStatus');

});
