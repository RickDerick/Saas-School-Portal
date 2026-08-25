<?php
namespace App\Services;
use App\Exceptions\AuthenticationException;
use App\Exceptions\BusinessException;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\Admin;
use App\Notifications\ResetPasswordNotification;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
    private const RESET_TOKEN_EXPIRY_MINUTES = 60;

    public function sendPasswordResetLink(string $email): void
    {
        $admin = Admin::where('email', $email)->first();

        if (! $admin) {
            throw new BusinessException('We could not find an admin with that email address.', 404);
        }

        PasswordReset::where('email', $email)->delete();

        $token = Str::random(64);

        PasswordReset::create([
            'email' => $email,
            'token' => Hash::make($token),
            'created_at' => Carbon::now(),
        ]);
        try {
            $admin->notify(new ResetPasswordNotification($token, $email));
        } catch (\Exception $e) {
            Log::error('Failed to send password reset notification: ' . $e->getMessage());
            throw new BusinessException('Failed to send password reset notification.', 500);
        }

        $admin->notify(new \App\Notifications\ResetPasswordNotification($token, $email));
    }

    public function resetPassword(string $email, string $token, string $password): void
    {
        $reset = PasswordReset::where('email', $email)->first();

        if (! $reset || ! Hash::check($token, $reset->token)) {
            throw new BusinessException('This password reset token is invalid.', 400);
        }

        if ($reset->created_at->addMinutes(self::RESET_TOKEN_EXPIRY_MINUTES)->isPast()) {
            $reset->delete();
            throw new BusinessException('This password reset token has expired.', 400);
        }

        $admin = Admin::where('email', $email)->first();

        if (! $admin) {
            throw new BusinessException('We could not find an admin with that email address.', 404);
        }

        $admin->update(['password' => Hash::make($password)]);

        $reset->delete();
    }
}

?>
