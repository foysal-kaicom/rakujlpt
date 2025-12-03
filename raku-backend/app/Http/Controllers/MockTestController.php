<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMockTestRequest;
use App\Models\Candidate;
use App\Models\Exam;
use App\Models\MockTestModule;
use App\Models\MockTestQuestion;
use App\Models\MockTestQuestionGroup;
use App\Models\MockTestQuestionOption;
use App\Models\MockTestRecords;
use App\Models\MockTestSection;
use App\Services\FileStorageService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Throwable;

class MockTestController extends Controller
{

    public $fileStorageService;
    public function __construct(FileStorageService $fileStorageService)
    {
        $this->fileStorageService = $fileStorageService;
    }

    public function index()
    {
        // $modules = MockTestModule::with(['exam', 'sections'])
        //     ->orderBy('exam_id')
        //     ->get()
        //     ->groupBy('exam_id');
        // // return view('mock-tests.module_section_list', compact('modules'));

        return view('mock-tests.sections.module_section_list');
    }

    public function sectionsWithModules()
    {
        $modules = MockTestModule::with(['exam', 'sections'])
            ->orderBy('exam_id')
            ->get();


        $data = [];

        foreach ($modules as $module) {
            foreach ($module->sections as $section) {
                $data[] = [
                    'exam' => $module->exam->title,
                    'module' => $module->name,
                    'section' => $section->title,
                    'question_limit' => $section->question_limit,
                    'actions' => '<a href="' . route('mock-tests.section.edit', $section->id) . '" class="items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-green-500 text-white hover:bg-green-600 shadow-md transition">Edit</a>'
                ];
            }
        }

        return response()->json(['data' => $data]);
    }



    public function questionList(Request $request)
    {
        if ($request->ajax()) {

            $query = MockTestQuestion::with('section', 'mockTestQuestionGroup');

            
            if ($request->exam_id && $request->exam_id != 'all') {
                $query->whereHas('section.mockTestModule', function ($q) use ($request) {
                    $q->where('exam_id', $request->exam_id);
                });
            }

            if ($request->module_id && $request->module_id != 'all') {
                $query->whereHas('section', function ($q) use ($request) {
                    $q->where('mock_test_module_id', $request->module_id);
                });
            }
            if ($request->section_id && $request->section_id != 'all') {
                $query->where('mock_test_section_id', $request->section_id);
            }

            return datatables()->eloquent($query)
                ->addColumn('question', function ($q) {

                    $truncate = function ($text) {
                        return strlen(strip_tags($text)) > 40
                            ? mb_substr(strip_tags($text), 0, 40) . '...'
                            : strip_tags($text);
                    };

                    if ($q->mockTestQuestionGroup->group_type === 'audio') {

                        $audio = '
                            <audio controls style="width:250px; height:25px;">
                                <source src="' . e($q->mockTestQuestionGroup->content) . '" type="audio/mpeg">
                            </audio>
                        ';

                        if ($q->type !== 'image') {
                            return $audio . '<div>' . $truncate($q->title) . '</div>';
                        }
                        return $audio;
                    }
                    return $truncate($q->title);
                })


                ->addColumn('section', function ($q) {
                    $title = $q->section->title ?? '';
                    $set = $q->mockTestQuestionGroup->set_no > 0 ? ' - S' . $q->mockTestQuestionGroup->set_no : '';
                    return $title . $set;
                })

                ->addColumn('bundle_type', function ($q) {
                    return $q->mockTestQuestionGroup->type ?? '';
                })

                ->addColumn('action', function ($row) {

                    $buttons = '<div class="flex items-center gap-1">';
                    if (checkAdminPermission('mock-tests.edit.question')) {
                        $editUrl = route('mock-tests.edit.question', $row->id) . '?question_list_page=' . urlencode(request()->get('page', 1));

                        // EDIT button
                        $buttons .= '
                        <a href="' . $editUrl . '" 
                            class="px-3 py-2 rounded-lg text-xs font-medium bg-green-400 text-dark hover:bg-green-500 shadow-md transition me-2">
                            Edit
                        </a>
                        ';
                    }

                    if (checkAdminPermission('mock-tests.question.delete')) {
                        $deleteUrl = route('mock-tests.question.delete', $row->id);

                        // DELETE button
                        $buttons .= '
                        <form action="' . $deleteUrl . '" method="POST" style="display:inline-block;"
                            onsubmit="return confirm(\'Are you sure you want to delete this?\')">
                            ' . csrf_field() . method_field('DELETE') . '
                            <button type="submit"
                                class="px-3 py-2 rounded-lg text-xs font-medium bg-red-400 text-white hover:bg-red-500 shadow-md transition">
                                Delete
                            </button>
                        </form>
                        ';
                    }

                    return $buttons;
                })

                ->rawColumns(['question', 'action'])
                ->make(true);
        }

        $exams = Exam::with('mockTestModules.sections')->get();
        $sections = MockTestSection::all();
        return view('mock-tests.question-list', compact('exams', 'sections'));
    }



    // public function questionSetupForm()
    // {

    //     $mockTestSections = MockTestSection::with('mockTestModule')->get();

    //     return view('mock-tests.question-setup', compact('mockTestSections'));
    // }

    public function questionSetupForm()
    {
        $exams = Exam::with('mockTestModules.sections')->get();
        return view('mock-tests.question-setup', compact('exams'));
    }

    //Dropdown Data from question setup
    public function getModulesByExam($examId)
    {
        $modules = MockTestModule::where('exam_id', $examId)->get();

        return response()->json($modules);
    }

    public function getSectionsByModule($moduleId)
    {
        $sections = MockTestSection::where('mock_test_module_id', $moduleId)->get();
        return response()->json($sections);
    }




    public function createSection()
    {
        $modules = MockTestModule::with('exam')->get()
            ->groupBy('exam.title');
        return view('mock-tests.sections.create-section', compact('modules'));
    }

    public function storeSection(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'mock_test_module_id' => 'required|exists:mock_test_modules,id',
            'title'               => 'required|string|max:255',
            'slug'                => 'required|string|max:255|unique:mock_test_sections,slug',
            'question_limit'      => 'required|numeric|min:1',
            'sample_question'     => 'required|string',
            'sample_audio'        => 'nullable|file|mimes:mp3,wav',
            'sample_image'        => 'nullable|image|mimes:jpg,jpeg,png,webp',
        ]);

        if ($validator->fails()) {
            Toastr::error($validator->getMessageBag());
            return back()->withInput();
        }


        try {
            $data = [
                'mock_test_module_id' => $request->input('mock_test_module_id'),
                'title' => $request->input('title'),
                'slug' => $request->input('slug'),
                'question_limit' => $request->input('question_limit'),
                'sample_question' => $request->input('sample_question'),
            ];

            // sample_audio upload (if exists)
            if ($request->hasFile('sample_audio')) {
                $audio = $request->file('sample_audio');
                $awsAudioUploadResponse = $this->fileStorageService->uploadImageToCloud($audio, 'mock-test');
                $data['sample_audio'] = $awsAudioUploadResponse['public_path'];
            }

            // sample_image upload (if exists)
            if ($request->hasFile('sample_image')) {
                $image = $request->file('sample_image');
                $awsImageUploadResponse = $this->fileStorageService->uploadImageToCloud($image, 'mock-test');
                $data['sample_image'] = $awsImageUploadResponse['public_path'];
            }

            // Create
            MockTestSection::create($data);

            Toastr::success("Section created successfully.");
            return redirect()->route('mock-tests.module-section.info');
        } catch (Throwable $ex) {
            Toastr::error($ex->getMessage());
            return redirect()->back();
        }
    }

    // public function editSection($id){
    //     $section = MockTestSection::findOrFail($id);
    //     return view('mock-tests.edit-section', compact('section'));
    // }
    public function editSection($id)
    {
        $section = MockTestSection::with('mockTestModule.exam')->findOrFail($id);
        $modules = MockTestModule::with('exam')->get()
            ->groupBy('exam.title');
        return view('mock-tests.sections.edit-section', compact('section', 'modules'));
    }

    public function updateSection(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'mock_test_module_id' => 'required|exists:mock_test_modules,id',
            'title'               => 'required|string|max:255',
            'slug'                => 'required|string|max:255|unique:mock_test_sections,slug,' . $id,
            'question_limit'      => 'required|numeric|min:1',
            'sample_question'     => 'required|string',
            'sample_audio'        => 'nullable|file|mimes:mp3,wav',
            'sample_image'        => 'nullable|image|mimes:jpg,jpeg,png,webp',
        ]);

        if ($validator->fails()) {
            Toastr::error($validator->getMessageBag());
            return back()->withInput();
        }

        try {
            $section = MockTestSection::findOrFail($id);

            $data = [
                'mock_test_module_id' => $request->input('mock_test_module_id'),
                'title'               => $request->input('title'),
                'slug'                => $request->input('slug'),
                'question_limit'      => $request->input('question_limit'),
                'sample_question'     => $request->input('sample_question'),
            ];

            // -------------------------
            // Sample Audio
            // -------------------------
            if ($request->hasFile('sample_audio')) {
                $file = $request->file('sample_audio');

                if (!empty($section->sample_audio)) {
                    // Update existing file in cloud
                    $result = $this->fileStorageService->updateFileFromCloud($section->sample_audio, $file);
                } else {
                    // Upload new file
                    $result = $this->fileStorageService->uploadFileToCloud($file, 'mock-test/audio');
                }

                $data['sample_audio'] = $result['public_path'];
            }

            // -------------------------
            // Sample Image
            // -------------------------
            if ($request->hasFile('sample_image')) {
                $file = $request->file('sample_image');

                if (!empty($section->sample_image)) {
                    // Update existing image in cloud
                    $result = $this->fileStorageService->updateFileFromCloud($section->sample_image, $file);
                } else {
                    // Upload new image
                    $result = $this->fileStorageService->uploadImageToCloud($file, 'mock-test/image');
                }

                $data['sample_image'] = $result['public_path'];
            }


            // Update record
            $section->update($data);

            Toastr::success("Section updated successfully.");
            return redirect()->route('mock-tests.module-section.info');
        } catch (Throwable $ex) {
            Toastr::error($ex->getMessage());
            return back();
        }
    }


    // public function updateSection(Request $request, $id)
    // {
    //     $request->validate([
    //         'title' => 'required|string',
    //         'sample_question' => 'required|string',
    //     ]);

    //     $section = MockTestSection::findOrFail($id);

    //     $section->update([
    //         'title' => $request->input('title'),
    //         'sample_question' => $request->input('sample_question'),
    //     ]);

    //     Toastr::success("Question updated Successfully.");
    //     return redirect()->route('mock-tests.module-section.info');
    // }


    public function questionSetup(StoreMockTestRequest $request)
    {

      //  return response()->json($request->all());


        if ($request->group_by == 'audio') {
            //upload audio file to bucket and get the path

            if ($request->hasFile('passage_or_file')) {
                $file = $request->file('passage_or_file');

                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($file, 'audio');
                $content = $imageUploadResponse['public_path'];
            }
        } else {
            $content = $request->passage_or_file;
        }

        try {

            DB::beginTransaction();

            //insert data into question group
            $questionGroup = MockTestQuestionGroup::create([
                'mock_test_section_id' => $request->section_id,
                'type' => $request->group_type, //single or multiple
                'group_type' => $request->group_by, //i.e: group by : passages/audio
                'content' => $content,
                'question_quantity' => $request->question_quantity,
                'set_no' => $request->set_no,
                'remarks' => $request->remarks,
            ]);

            //store question into mockTestQuestion table
            foreach ($request->questions as $q) {

                // Handle question title
                $textOrImage = $q['question'];
                if ($q['question_type'] === 'image' && $textOrImage instanceof \Illuminate\Http\UploadedFile) {

                    $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($textOrImage, 'questons');
                    $textOrImage = $imageUploadResponse['public_path'];
                }

                // Create Question
                $question = MockTestQuestion::create([
                    'title' => $textOrImage,
                    'mock_test_section_id' => $request->section_id,
                    'proficiency_level' => strtoupper($q['proficiency_level']),
                    'mock_test_section_id' => $request->section_id,
                    'mock_test_question_group_id' => $questionGroup->id ?? null,
                    'type' => $q['question_type'],
                    'hints' => $q['hints'] ?? null,
                ]);

                // Create Options
                MockTestQuestionOption::create([
                    'mock_test_question_id' => $question->id,
                    'values' => json_encode($q['options']),
                    'correct_answer_index' => (string) $q['answer'],
                ]);
            }

            DB::commit();
            Toastr::success("Question Created Successfully.");
            return redirect()->route('mock-tests.question.list');
        } catch (Throwable $ex) {
            DB::rollBack();
            toastr()->error($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

    public function editQuestion($id)
    {
        $question = MockTestQuestion::with('mockTestQuestionGroup.mockTestSection.mockTestModule')->find($id);

        $module = optional(optional($question->mockTestQuestionGroup)->mockTestSection)->mockTestModule;

        $mockTestSections = MockTestSection::with('mockTestModule.exam')
            ->when($module, function ($query, $module) {
                $query->whereHas('mockTestModule', function ($q) use ($module) {
                    $q->where('exam_id', $module->exam_id)
                        ->where('id', $module->id);
                });
            })
            ->get();

        return view('mock-tests.edit-question', compact('question', 'mockTestSections'));
    }

    public function updateQuestionGroup(Request $request, $id)
    {

        $validate = Validator::make($request->all(), [
            'mock_test_section_id' => 'required|exists:mock_test_sections,id',
            'group_type' => 'nullable|in:passage,audio',
            'set_no' => 'required|integer',
            'content' => 'nullable|string',
            'audio-content' => 'nullable|file|mimes:mp3,ogg,wav',
            'remarks' => 'nullable|string',
        ]);

        if ($validate->fails()) {
            Toastr::error($validate->getMessageBag());
            return redirect()->back();
        }

        $questionGroup = MockTestQuestionGroup::findOrFail($id);

        $questionGroup->mock_test_section_id = $request->mock_test_section_id;

        $questionGroup->group_type = $request->group_type;
        $questionGroup->remarks = $request->remarks;

        if ($request->hasFile('audio-content')) {
            $file = $request->file('audio-content');
            $fileUploadResponse = $this->fileStorageService->uploadPdfFileToCloud($file, 'mock-question', 'audio');

            if ($fileUploadResponse) {
                $questionGroup->content = $fileUploadResponse['public_path'];
            } else {
                return back()->with('error', 'File upload failed.');
            }
        } elseif ($request->group_type == 'passage' && $request->input('content')) {
            $questionGroup->content = $request->input('content');
        }

        $questionGroup->set_no = $request->set_no;
        $questionGroup->save();

        $questionGroup->mockTestQuestion()->update([
            'mock_test_section_id' => $request->mock_test_section_id
        ]);

        Toastr::success("Question group information updated Successfully.");
        return back();
    }


    public function updateQuestion(Request $request, $id)
    {

        $validate = Validator::make($request->all(), [
            'question' => 'required|string',
            'proficiency_level' => 'required|in:N4,N5',
            'question_type' => 'required|in:text,image',
            'answer' => ['required', 'integer', 'in:1,2,3,4',
                function ($attribute, $value, $fail) use ($request) {
                    $options = $request->input('options', []);
                    if (!array_key_exists($value, $options)) {
                        return $fail("Selected answer is not a valid option.");
                    }
                    if (trim($options[$value]) === '') {
                        return $fail("The selected answer option cannot be empty.");
                    }
                }
            ],
            'options' => 'required|array|min:3|max:4',
            'options.1' => 'required|string',
            'options.2' => 'required|string',
            'options.3' => 'required|string',
            'options.4' => 'nullable|string',
            'question_image' => 'nullable|file|mimes:jpeg,jpg,png,gif|max:2048',
            'hints' => 'nullable|string',
        ]);

        if ($validate->fails()) {
            Toastr::error($validate->getMessageBag());
            return redirect()->back();
        }

        try {
            DB::beginTransaction();

            $question = MockTestQuestion::findOrFail($id);

            $question->hints = $request->hints;
            $question->title = $question->type === 'image' ? strip_tags($request->question) : $request->question;

            if ($request->question_type == 'image' && $request->hasFile('question_image')) {
                $imageUploadResponse = $this->fileStorageService->uploadImageToCloud($request->file('question_image'), 'questions');
                $question->title = strip_tags($imageUploadResponse['public_path']); // Store the image URL/path in the 'title' field
            }

            $question->proficiency_level = strtoupper($request->proficiency_level);
            $question->type = $request->question_type;
            $question->save();

            $options = $request->options;
            $correctAnswerIndex = $request->answer;

            $questionOption = $question->mockTestQuestionOption;
            $questionOption->values = json_encode($options);
            $questionOption->correct_answer_index = $correctAnswerIndex;
            $questionOption->save();

            DB::commit();

            Toastr::success("Question Updated Successfully.");
            return redirect()->route('mock-tests.question.list', ['page' => request()->get('question_list_page', 1)]);
        } catch (Throwable $ex) {
            DB::rollBack();
            toastr()->error($ex->getMessage());
            return redirect()->back()->withInput();
        }
    }

    public function deleteQuestion($id)
    {
        try {
            $question = MockTestQuestion::findOrFail($id);

            if ($question->mockTestQuestionOption) {
                $question->mockTestQuestionOption->delete();
            }

            if ($question->mockTestQuestionGroup) {
                $question->mockTestQuestionGroup->delete();
            }

            $question->delete();

            Toastr::success("Question deleted successfully.");
            return redirect()->back();
        } catch (\Throwable $ex) {
            Toastr::error("Failed to delete question: " . $ex->getMessage());
            return redirect()->back();
        }
    }

    public function getReportsData(Request $request)
    {
        $exams = Exam::all();
    
        $query = MockTestRecords::with('candidate', 'exam');
    
        if ($request->exam_id) {
            $query->where('exam_id', $request->exam_id);
        }
    
        if ($request->from_date) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }

        if ($request->to_date) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        if ($request->from_date && $request->to_date) {
            $query->whereBetween('created_at', [
                $request->from_date . ' 00:00:00',
                $request->to_date . ' 23:59:59'
            ]);
        }
    
        $records = $query->orderBy('created_at', 'desc')->paginate(20)->withQueryString();
    
        return view('mock-tests.reports.list', compact('records', 'exams'));
    }
    
    public function exportReportsCsv(Request $request)
    {
        $query = MockTestRecords::with(['candidate', 'exam']);
    
        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
    
        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }
    
        if ($request->filled('exam_id')) {
            $query->where('exam_id', $request->exam_id);
        }
    
        $records = $query->orderBy('id', 'desc')->get();

        $filename = "mock_test_reports_" . now()->format('Y-m-d_H-i-s') . ".csv";
    
        $headers = [
            "Content-Type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = [
            'ID',
            'Candidate',
            'Exam',
            'Question Set',
            'Reading Answered',
            'Correct Reading',
            'Wrong Reading',
            'Listening Answered',
            'Correct Listening',
            'Wrong Listening',
            'Created At'
        ];
    
        $callback = function() use ($records, $columns) {
            $file = fopen('php://output', 'w');
    
            fputcsv($file, $columns);
    
            foreach ($records as $r) {
                fputcsv($file, [
                    $r->id,
                    $r->candidate->full_name ?? '-',
                    $r->exam->title ?? '-',
                    $r->question_set,
                    $r->reading_answered,
                    $r->correct_reading_answer,
                    $r->wrong_reading_answer,
                    $r->listening_answered,
                    $r->correct_listening_answer,
                    $r->wrong_listening_answer,
                    $r->created_at->format('Y-m-d H:i'),
                ]);
            }
    
            fclose($file);
        };
    
        return response()->stream($callback, 200, $headers);
    }

}
