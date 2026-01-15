<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MockTestRecords;
use Illuminate\Http\Request;
use PDF;

class CertificateController extends Controller
{
    public function download(Request $request)
    {
        $validated = $request->validate([
            'mockTest_id' => 'required|integer|exists:mock_test_records,id',
        ]);

        $data = $this->getCertificateData($validated['mockTest_id']);

        $pdf = Pdf::loadView('certificate.certificate', $data)
            ->setOption([
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled' => true,
                'dpi' => 96,
            ]);

        return $pdf->download("certificate-{$data['name']}-{$data['examName']}.pdf");
    }

    public function verifyCertificate(Request $request)
    {
        $validated = $request->validate([
            'mockTest_id' => 'required|integer|exists:mock_test_records,id',
        ]);
    
        $data = $this->getCertificateData($validated['mockTest_id']);
    
        return $this->responseWithSuccess($data, 'Mock test data retrieved for certificate.');
    }

    private function getCertificateData($mockTestId)
    {
        $mock_test = MockTestRecords::with(['candidate', 'exam'])->findOrFail($mockTestId);
    
        $obtainedMarks = (int) ($mock_test->total_correct * $mock_test->per_question_mark);
    
        return [
            'name'           => $mock_test->candidate->FullName,
            'examName'       => $mock_test->exam->title,
            'score'          => $obtainedMarks,
            'totalPoint'     => $mock_test->exam->total_point,
            'date'           => now()->format('F j, Y'),
            'verifyUrl'      => rtrim(config('app.frontend.url'), '/') . '/certificate?mock_test_id=' . $mock_test->id,
        ];
    }
    
}
