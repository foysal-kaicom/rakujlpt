<?php
namespace App\Http\View\Composers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use App\Models\BusinessSetting;

class BusinessSettingComposer
{
    public function compose(View $view): void
    {
        try {
            $settings = Cache::rememberForever('business_settings', function () {
                if (Schema::hasTable('business_settings')) {
                    return BusinessSetting::first();
                }
                return null;
            });

            $view->with('settings', $settings);
        } catch (\Throwable $e) {
            \Log::warning('Failed to load cached business settings: ' . $e->getMessage());
            $view->with('settings', null);
        }
    }
}