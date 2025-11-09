<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use App\Models\Roadmap;
use App\Models\Practice;
use Illuminate\Http\Request;
use App\Models\MockTestSection;
use Google\Service\Forms\Question;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class PracticeController extends Controller
{
    public function index(Request $request)
    {
        $query = Practice::with(['stage.roadmap']);

        // Filter by search term (stage or roadmap)
        if ($request->filled('title')) {
            $search = $request->title;
            $query->whereHas('stage', function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                ->orWhereHas('roadmap', fn($r) => $r->where('title', 'like', "%{$search}%"));
            });
        }

        // Filter by date range
        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        // Latest first
        $practices = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return view('practices.index', compact('practices'));
    }
    public function createPractice($stageId)
    {
        return view('practices.create', compact('stageId'));
    }


    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'stage_id' => 'required|exists:stages,id',
    //         'questions' => 'required|array|min:1',
    //     ]);

    //     $questions = [];

    //     foreach ($request->questions as $index => $q) {
    //         $questionText = $q['question'];

    //         // Handle image upload if needed
    //         if ($q['question_type'] === 'image' && isset($q['question']) && $q['question'] instanceof \Illuminate\Http\UploadedFile) {
    //             $path = $q['question']->store('practice_questions', 'public');
    //             $questionText = $path;
    //         }

    //         $questions[] = [
    //             'proficiency_level' => strtoupper($q['proficiency_level']),
    //             'question_type' => $q['question_type'],
    //             'question' => $questionText,
    //             'options' => $q['options'],
    //             'answer' => $q['answer'],
    //             'hints' => $q['hints'] ?? null,
    //             'explanation' => $q['explanation'] ?? null,
    //         ];
    //     }

    //     Practice::create([
    //         'stage_id' => $request->stage_id,
    //         'questions' => json_encode($questions),
    //     ]);

    //     return redirect()->route('practices.index')->with('success', 'Practice questions created successfully!');
    // }
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'stage_id' => 'required|exists:stages,id',
    //         'question.proficiency_level' => 'required|in:N4,N5',
    //         'question.question_type' => 'required|in:text,image',
    //         'question.question' => 'required',
    //         'question.options' => 'required|array|size:4',
    //         'question.answer' => 'required|in:1,2,3,4',
    //     ]);

    //     $questionData = $request->input('question');

    //     // Handle image upload if question type is image
    //     $questionContent = $questionData['question'];
    //     if ($questionData['question_type'] === 'image' && $request->hasFile('question.question')) {
    //         $file = $request->file('question.question');
    //         $path = $file->store('practice_questions', 'public'); // storage/app/public/practice_questions
    //         $questionContent = $path;
    //     }

    //     // Store single question as JSON array
    //     $questions = [[
    //         'proficiency_level' => strtoupper($questionData['proficiency_level']),
    //         'question_type' => $questionData['question_type'],
    //         'question' => $questionContent,
    //         'options' => $questionData['options'],
    //         'answer' => $questionData['answer'],
    //         'hints' => $questionData['hints'] ?? null,
    //         'explanation' => $questionData['explanation'] ?? null,
    //     ]];

    //     // Create practice
    //     Practice::create([
    //         'stage_id' => $request->stage_id,
    //         'questions' => json_encode($questions),
    //     ]);

    //     return redirect()->route('practices.index')->with('success', 'Practice question created successfully!');
    // }
    //with audio
    // public function store(Request $request)
    // {
    //     // $request->validate([
    //     //     'stage_id' => 'required|exists:stages,id',
    //     //     'question.proficiency_level' => 'required|in:N4,N5',
    //     //     'question.question_type' => 'required|in:text,image,audio',
    //     //     'question.question' => 'required_if:question.question_type,text,image',
    //     //     'question.options' => 'required|array|size:4',
    //     //     'question.answer' => 'required|in:1,2,3,4',
    //     //     'question.audio_file' => 'required_if:question.question_type,audio|file|mimes:mp3,wav,ogg',
    //     //     'question.audio_image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp',
    //     // ]);
    //     // dd($request->all());
    //     $request->validate([
    //         'stage_id' => 'required|exists:stages,id',
    //         'question.proficiency_level' => 'required|in:N4,N5',
    //         'question.question_type' => 'required|in:text,image,audio',
    //         'question.question' => 'required_if:question.question_type,text,image',
    //         'question.options' => 'required|array|size:4',
    //         'question.answer' => 'required|in:1,2,3,4',

    //         // Audio file (only when question_type is audio)
    //         'question.audio_file' => [
    //             function ($attribute, $value, $fail) use ($request) {
    //                 if (($request->input('question.question_type') ?? '') === 'audio') {
    //                     if (!$request->hasFile('question.audio_file')) {
    //                         $fail('The audio file field is required when question type is audio.');
    //                     }
    //                 }
    //             },
    //             'nullable',
    //             'file',
    //             'mimes:mp3,wav,ogg',
    //         ],

    //         // Audio image (optional, sometimes)
    //         'question.audio_image' => 'sometimes|nullable|file|image|mimes:jpeg,png,jpg,gif,webp',
    //     ]);




    //     $questionData = $request->input('question', []);
    //     $questionContent = ''; // main question field
    //     $audioFilePath = null;
    //     $audioImagePath = null;

    //     // Handle Text or Image question
    //     if (($questionData['question_type'] ?? '') === 'text') {
    //         $questionContent = $questionData['question'] ?? '';
    //     }

    //     if (($questionData['question_type'] ?? '') === 'image' && $request->hasFile('question.question')) {
    //         $file = $request->file('question.question');
    //         $questionContent = $file->store('practice_questions/images', 'public');
    //     }

    //     // Handle Audio question
    //     if (($questionData['question_type'] ?? '') === 'audio') {
    //         // Audio file
    //         if ($request->hasFile('question.audio_file')) {
    //             $audioFilePath = $request->file('question.audio_file')->store('practice_questions/audio', 'public');
    //         }

    //         // Audio image
    //         if ($request->hasFile('question.audio_image')) {
    //             $audioImagePath = $request->file('question.audio_image')->store('practice_questions/audio_images', 'public');
    //         }

    //         // We can still use the question text as a title
    //         $questionContent = $questionData['question'] ?? '';
    //     }

    //     $questions = [[
    //         'proficiency_level' => strtoupper($questionData['proficiency_level'] ?? ''),
    //         'question_type' => $questionData['question_type'] ?? 'text',
    //         'question' => $questionContent,
    //         'audio_file' => $audioFilePath,
    //         'audio_image' => $audioImagePath,
    //         'options' => $questionData['options'] ?? [],
    //         'answer' => $questionData['answer'] ?? 1,
    //         'hints' => $questionData['hints'] ?? null,
    //         'explanation' => $questionData['explanation'] ?? null,
    //     ]];

    //     Practice::create([
    //         'stage_id' => $request->stage_id,
    //         'questions' => json_encode($questions),
    //     ]);

    //     return redirect()->route('stages.index')->with('success', 'Practice question created successfully!');
    // }

    public function store(Request $request)
    {
        $request->validate([
            'stage_id' => 'required|exists:stages,id',
            'question.proficiency_level' => 'required|in:N4,N5',
            'question.question_type' => 'required|in:text,image,audio',
            'question.options' => 'required|array|size:4',
            'question.answer' => 'required|in:1,2,3,4',

            // Main question field
            'question.question' => [
                function ($attribute, $value, $fail) use ($request) {
                    $type = $request->input('question.question_type');

                    if ($type === 'text') {
                        if (empty($value)) {
                            $fail('The question field is required for text type.');
                        }
                    }

                    if (in_array($type, ['image', 'audio'])) {
                        if (!$request->hasFile('question.question')) {
                            $fail('The question field must be an image file for image or audio type.');
                        } else {
                            $file = $request->file('question.question');
                            if (!$file->isValid() || !in_array($file->extension(), ['jpeg','png','jpg','gif','webp','avif'])) {
                                $fail('The question field must be a valid image file (jpeg,png,jpg,gif,webp,avif).');
                            }
                        }
                    }
                }
            ],

            // Audio file for audio type
            'question.audio_file' => [
                function ($attribute, $value, $fail) use ($request) {
                    if (($request->input('question.question_type') ?? '') === 'audio') {
                        if (!$request->hasFile('question.audio_file')) {
                            $fail('The audio file field is required when question type is audio.');
                        }
                    }
                },
                'nullable',
                'file',
                'mimes:mp3,wav,ogg',
            ],
        ]);


        $questionData = $request->input('question', []);
        $questionContent = null;
        $audioFilePath = null;

        // Handle text
        if (($questionData['question_type'] ?? '') === 'text') {
            $questionContent = $questionData['question'] ?? '';
        }

        // Handle image or audio (main question is image)
        if (in_array($questionData['question_type'] ?? '', ['image', 'audio']) && $request->hasFile('question.question')) {
            $file = $request->file('question.question');
            $questionContent = $file->store('practice_questions/images', 'public');
        }

        // Handle audio file separately
        if (($questionData['question_type'] ?? '') === 'audio' && $request->hasFile('question.audio_file')) {
            $audioFilePath = $request->file('question.audio_file')->store('practice_questions/audio', 'public');
        }

        $questions = [[
            'proficiency_level' => strtoupper($questionData['proficiency_level'] ?? ''),
            'question_type' => $questionData['question_type'] ?? 'text',
            'question' => $questionContent,
            'audio_file' => $audioFilePath,
            'options' => $questionData['options'] ?? [],
            'answer' => $questionData['answer'] ?? 1,
            'hints' => $questionData['hints'] ?? null,
            'explanation' => $questionData['explanation'] ?? null,
        ]];

        Practice::create([
            'stage_id' => $request->stage_id,
            'questions' => json_encode($questions),
        ]);

        // return redirect()->route('stages.index')->with('success', 'Practice question created successfully!');
        return redirect()->route('stages.show', $request->stage_id)->with('success', 'Practice question created successfully!');

    }

    public function edit($id)
    {
        $practice = Practice::findOrFail($id);
        $stages = Stage::with('roadmap')->get();

        // Decode JSON questions to array for the view
        $practice->questions_array = json_decode($practice->questions, true);

        return view('practices.edit', compact('practice', 'stages'));
    }


    //ongoing
    // public function update(Request $request, $id)
    // {
    //     $practice = Practice::findOrFail($id);

    //     $request->validate([
    //         'stage_id' => 'required|exists:stages,id',
    //         'question.proficiency_level' => 'required|in:N4,N5',
    //         'question.question_type' => 'required|in:text,image,audio',
    //         'question.question' => 'required_if:question.question_type,text,image',
    //         'question.options' => 'required|array|size:4',
    //         'question.answer' => 'required|in:1,2,3,4',
    //         'question.audio_file' => 'required_if:question.question_type,audio|file|mimes:mp3,wav,ogg',
    //         'question.audio_image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp',
    //     ]);

    //     $data = $request->input('question', []);
    //     $questionContent = '';
    //     $audioFilePath = null;
    //     $audioImagePath = null;

    //     if (($data['question_type'] ?? '') === 'text') {
    //         $questionContent = $data['question'] ?? '';
    //     }

    //     if (($data['question_type'] ?? '') === 'image' && $request->hasFile('question.question')) {
    //         $questionContent = $request->file('question.question')->store('practice_questions/images', 'public');
    //     }

    //     if (($data['question_type'] ?? '') === 'audio') {
    //         if ($request->hasFile('question.audio_file')) {
    //             $audioFilePath = $request->file('question.audio_file')->store('practice_questions/audio', 'public');
    //         }
    //         if ($request->hasFile('question.audio_image')) {
    //             $audioImagePath = $request->file('question.audio_image')->store('practice_questions/audio_images', 'public');
    //         }
    //         $questionContent = $data['question'] ?? '';
    //     }

    //     $questions = [[
    //         'proficiency_level' => strtoupper($data['proficiency_level'] ?? ''),
    //         'question_type' => $data['question_type'] ?? 'text',
    //         'question' => $questionContent,
    //         'audio_file' => $audioFilePath,
    //         'audio_image' => $audioImagePath,
    //         'options' => $data['options'] ?? [],
    //         'answer' => $data['answer'] ?? 1,
    //         'hints' => $data['hints'] ?? null,
    //         'explanation' => $data['explanation'] ?? null,
    //     ]];

    //     $practice->update([
    //         'stage_id' => $request->stage_id,
    //         'questions' => json_encode($questions),
    //     ]);

    //     return redirect()->route('stages.index')->with('success', 'Practice question updated successfully!');
    // }
    public function update(Request $request, $id)
    {
        $practice = Practice::findOrFail($id);
        
        $request->validate([
            'stage_id' => 'required|exists:stages,id',
            'question.proficiency_level' => 'required|in:N4,N5',
            'question.question_type' => 'required|in:text,image,audio',
            'question.options' => 'required|array|size:4',
            'question.answer' => 'required|in:1,2,3,4',

            // Main question field
            'question.question' => [
                function ($attribute, $value, $fail) use ($request) {
                    $type = $request->input('question.question_type');

                    if ($type === 'text') {
                        if (empty($value)) {
                            $fail('The question field is required for text type.');
                        }
                    }

                    // For image/audio, file is optional in edit (can keep existing)
                    if (in_array($type, ['image', 'audio']) && $request->hasFile('question.question')) {
                        $file = $request->file('question.question');
                        if (!$file->isValid() || !in_array($file->extension(), ['jpeg','png','jpg','gif','webp','avif'])) {
                            $fail('The question field must be a valid image file (jpeg,png,jpg,gif,webp,avif).');
                        }
                    }
                }
            ],

            // Audio file for audio type
            'question.audio_file' => [
                'nullable',
                'file',
                'mimes:mp3,wav,ogg',
            ],
        ]);

        $questionData = $request->input('question', []);
        $existingQuestions = json_decode($practice->questions, true);
        $existingQuestion = $existingQuestions[0] ?? [];
        
        $questionContent = $existingQuestion['question'] ?? null;
        $audioFilePath = $existingQuestion['audio_file'] ?? null;

        // Handle text
        if (($questionData['question_type'] ?? '') === 'text') {
            $questionContent = $questionData['question'] ?? '';
        }

        // Handle image or audio (main question is image)
        if (in_array($questionData['question_type'] ?? '', ['image', 'audio'])) {
            if ($request->hasFile('question.question')) {
                // Delete old image if exists
                if (!empty($existingQuestion['question']) && Storage::disk('public')->exists($existingQuestion['question'])) {
                    Storage::disk('public')->delete($existingQuestion['question']);
                }
                
                $file = $request->file('question.question');
                $questionContent = $file->store('practice_questions/images', 'public');
            }
            // If no new file uploaded, keep existing
        }

        // Handle audio file separately
        if (($questionData['question_type'] ?? '') === 'audio') {
            if ($request->hasFile('question.audio_file')) {
                // Delete old audio if exists
                if (!empty($existingQuestion['audio_file']) && Storage::disk('public')->exists($existingQuestion['audio_file'])) {
                    Storage::disk('public')->delete($existingQuestion['audio_file']);
                }
                
                $audioFilePath = $request->file('question.audio_file')->store('practice_questions/audio', 'public');
            }
            // If no new file uploaded, keep existing
        } else {
            // If type changed from audio to something else, delete audio file
            if (!empty($existingQuestion['audio_file']) && Storage::disk('public')->exists($existingQuestion['audio_file'])) {
                Storage::disk('public')->delete($existingQuestion['audio_file']);
            }
            $audioFilePath = null;
        }

        // If type changed from image/audio to text, delete image file
        if (($questionData['question_type'] ?? '') === 'text' && in_array($existingQuestion['question_type'] ?? '', ['image', 'audio'])) {
            if (!empty($existingQuestion['question']) && Storage::disk('public')->exists($existingQuestion['question'])) {
                Storage::disk('public')->delete($existingQuestion['question']);
            }
        }

        $questions = [[
            'proficiency_level' => strtoupper($questionData['proficiency_level'] ?? ''),
            'question_type' => $questionData['question_type'] ?? 'text',
            'question' => $questionContent,
            'audio_file' => $audioFilePath,
            'options' => $questionData['options'] ?? [],
            'answer' => $questionData['answer'] ?? 1,
            'hints' => $questionData['hints'] ?? null,
            'explanation' => $questionData['explanation'] ?? null,
        ]];

        $practice->update([
            'stage_id' => $request->stage_id,
            'questions' => json_encode($questions),
        ]);

        return redirect()->route('stages.show', $request->stage_id)->with('success', 'Practice question created successfully!');

        // return redirect()->route('stages.index')->with('success', 'Practice question updated successfully!');
    }


    public function destroy(Practice $practice)
    {
        $practice->delete();
        return redirect()->route('practices.index')->with('success', 'Practice deleted successfully.');
    }

}
