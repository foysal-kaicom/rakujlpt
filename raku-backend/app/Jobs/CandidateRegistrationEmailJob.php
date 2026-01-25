<?php

namespace App\Jobs;

use App\Mail\CandidateRegiEmail;
use App\Models\Candidate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class CandidateRegistrationEmailJob implements ShouldQueue
{
    use Queueable;

    public $candidate;

    public function __construct(Candidate $candidate)
    {
        $this->candidate = $candidate;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->candidate->email)->send(new CandidateRegiEmail($this->candidate));

    }
}
