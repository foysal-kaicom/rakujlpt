<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsLetter;
use Illuminate\Http\Request;
use Throwable;

class NotificationController extends Controller
{
    public function index()
    {
        $user = auth('candidate')->user();

        $allNotifications = $user->notifications()->latest()->get();

        $notifications = $allNotifications->map(function ($notification) {
            return [
                'id'       => $notification->id,
                'title'    => $notification->data['title'] ?? '',
                'message'  => $notification->data['message'] ?? '',
                'url'      => $notification->data['url'] ?? null,
                'time'     => $notification->created_at->diffForHumans(),
                'is_read'  => $notification->read_at ? true : false,
            ];
        })->values();

        $data = [
            'unread_count'  => $user->unreadNotifications->count(),
            'notifications' => $notifications,
        ];

        return $this->responseWithSuccess($data, 'Notifications fetched successfully');
    }


    // Mark a notification as read
    public function markAsRead(Request $request, $id)
    {
        try {

            $user = auth('candidate')->user();
            $notification = $user->notifications()->findOrFail($id);
            $notification->markAsRead();

            return $this->responseWithSuccess([], 'Notification marked as read.');
        } catch (Throwable $ex) {

            return $this->responseWithError('Notification not found.', $ex->getMessage());
        }
    }

    // Mark all as read
    public function markAllAsRead(Request $request)
    {

        try {

            $user = auth('candidate')->user();
            $user->unreadNotifications->markAsRead();

            return $this->responseWithSuccess([], 'All Notification marked as read.');
        } catch (Throwable $ex) {

            return $this->responseWithError('Notification not found.', $ex->getMessage());
        }
    }

    public function storeNewsLetter(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:news_letter,email',
        ]);

        $newsletter = NewsLetter::create([
            'email' => $request->email
        ]);

        return $this->responseWithSuccess($newsletter , 'Email subscribed successfully.');
    }
}
