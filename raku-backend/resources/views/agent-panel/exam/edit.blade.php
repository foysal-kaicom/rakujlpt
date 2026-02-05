@extends('agent-panel.layout.agent_master')

@section('contents')

<div class="card shadow-lg border-0 rounded-3">
    <div class="rounded-top bg-indigo-300 px-8 pt-3">
        <h5 class="fs-5 fw-semibold mb-0 flex items-center gap-2 bg-white px-3 py-2 rounded-top w-fit">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8V12H19V9H14V4H5V20H11V22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM10 8H12V10H10V8ZM8 12H16V14H8V12ZM8 16H16V18H8V16Z"></path>
            </svg>
            Edit Mock Test
        </h5>
    </div>

    <form action="{{ route('agent.exam.update', $exam->id) }}" method="POST" enctype="multipart/form-data" class="p-4">
        @csrf
        <input type="hidden" name="type" value="agent">

        <div class="row g-4">
            {{-- Image --}}
            <div class="col-md-3 text-center">
                <div class="position-relative border rounded bg-light d-flex align-items-center justify-content-center shadow-sm h-[250px]">
                    <img id="customImagePreview"
                         src="{{ $exam->image ? asset($exam->image) : asset('imagePH.png') }}"
                         alt="Display Image"
                         class="w-100 h-[250px] object-fit-cover rounded" />
                    <button type="button" id="customRemoveImage"
                        class="btn btn-sm btn-light border shadow-sm position-absolute top-0 end-0 rounded-circle">×</button>
                </div>

                <input type="file" accept="image/*" id="customFileInput" name="image" class="d-none" />
                <label for="customFileInput" class="btn btn-outline-primary mt-3 w-100 rounded-pill flex items-center gap-2 justify-center">
                    Change Image
                </label>

                @error('image') <div class="text-danger small">{{ $message }}</div> @enderror
            </div>

            {{-- Fields --}}
            <div class="col-md-9">
                <div class="row g-3">

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Exam Title <span class="text-danger">*</span></label>
                        <input type="text" name="title" value="{{ old('title', $exam->title) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" required />
                        @error('title') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Select Exam Type <span class="text-danger">*</span></label>
                        <select name="name" class="form-control form-control-lg shadow-sm rounded-2" required>
                            <option value="" disabled>Select Short Name</option>
                            <option value="JLPT" {{ old('name', $exam->name) === 'JLPT' ? 'selected' : '' }}>JLPT</option>
                            <option value="JPT"  {{ old('name', $exam->name) === 'JPT'  ? 'selected' : '' }}>JPT</option>
                            <option value="NAT"  {{ old('name', $exam->name) === 'NAT'  ? 'selected' : '' }}>NAT</option>
                            <option value="JFT"  {{ old('name', $exam->name) === 'JFT'  ? 'selected' : '' }}>JFT</option>
                        </select>
                        @error('name') <div class="text-danger small">{{ $message }}</div> @enderror
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Duration (minutes)</label>
                        <input type="number" name="duration" min="1" value="{{ old('duration', $exam->duration) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Pass Point</label>
                        <input type="number" min="1" name="pass_point" value="{{ old('pass_point', $exam->pass_point) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Total Point</label>
                        <input type="number" min="1" name="total_point" value="{{ old('total_point', $exam->total_point) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Answer Value</label>
                        <input type="number" min="1" name="answer_value" value="{{ old('answer_value', $exam->answer_value) }}"
                            class="form-control form-control-lg shadow-sm rounded-2" />
                    </div>

                    {{-- Base exam + modules + sections (SERVER RENDERED) --}}
                    <div class="grid grid-cols-2 xl:grid-cols-3 gap-8 border p-3 capitalize bg-blue-50">

                        {{-- Base exam --}}
                        <div>
                            <label for="exam_select" class="form-label font-semibold">Select Exam</label>
                            <select name="exam_id" id="exam_select" class="border rounded p-2">
                                <option value="">-- Select an Exam --</option>
                                @foreach($exams as $baseExam)
                                    <option value="{{ $baseExam->id }}"
                                        {{ (string)old('exam_id', $selectedBaseExamId) === (string)$baseExam->id ? 'selected' : '' }}>
                                        {{ $baseExam->title }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        {{-- Modules --}}
                        <div id="modules_container" class="space-y-3 border-r {{ $modules->count() ? '' : 'hidden' }}">
                            <p class="form-label font-semibold">Select Module</p>

                            <div id="modules_list" class="pl-5">
                                @foreach($modules as $m)
                                    <div class="mb-2">
                                        <input type="checkbox"
                                               value="{{ $m->id }}"
                                               id="module_{{ $m->id }}"
                                               class="module-checkbox"
                                               {{ in_array((int)$m->id, old('modules', $selectedModuleIds ?? [])) ? 'checked' : '' }}>
                                        <label for="module_{{ $m->id }}">{{ $m->name }}</label>
                                    </div>
                                @endforeach
                            </div>
                        </div>

                        {{-- Sections --}}
                        <div id="sections_container" class="space-y-3 col-span-2 xl:col-span-1 {{ $sections->count() ? '' : 'hidden' }}">
                            <p class="form-label font-semibold">Select Section</p>

                            <div id="sections_list">
                                @foreach($sections as $s)
                                    @php
                                        $qty = old("module.{$s->mock_test_module_id}.section_weights.{$s->id}")
                                            ?? ($selectedWeights[$s->id] ?? null);

                                        $checked = $qty !== null && $qty !== '' && (int)$qty > 0;
                                    @endphp

                                    <div class="pl-5 flex justify-between items-center gap-2 mb-2 section-row"
                                         data-module="{{ $s->mock_test_module_id }}">
                                        <div class="w-[calc(100%-84px)] flex gap-1.5">
                                            <input type="checkbox"
                                                   id="section_{{ $s->id }}"
                                                   class="section-checkbox"
                                                   data-target-weight="#weight_{{ $s->id }}"
                                                   data-module="{{ $s->mock_test_module_id }}"
                                                   {{ $checked ? 'checked' : '' }}>
                                            <label class="w-[calc(100%-18px)]" for="section_{{ $s->id }}">{{ $s->title }}</label>
                                        </div>

                                        <input type="number"
                                               name="module[{{ $s->mock_test_module_id }}][section_weights][{{ $s->id }}]"
                                               id="weight_{{ $s->id }}"
                                               class="border rounded p-1 ml-2 w-20 bg-white"
                                               placeholder="quantity"
                                               value="{{ $checked ? $qty : '' }}"
                                               {{ $checked ? 'required' : 'disabled' }}>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <label class="form-label fw-semibold">Description</label>
                        <textarea name="description" rows="4" class="form-control shadow-sm rounded-2">{{ old('description', $exam->description) }}</textarea>
                    </div>
                </div>

                <div class="pt-4 flex justify-end">
                    <button type="submit"
                        class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                        Update Exam
                    </button>
                </div>

            </div>
        </div>
    </form>
</div>

<script>
    // image preview
    document.getElementById("customFileInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("customImagePreview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

    document.getElementById("customRemoveImage").addEventListener("click", function() {
        document.getElementById("customImagePreview").src = "{{ $exam->image ? asset($exam->image) : asset('imagePH.png') }}";
        document.getElementById("customFileInput").value = "";
    });

    // enable/disable qty input
    document.addEventListener('change', function(e) {
        if (!e.target.classList.contains('section-checkbox')) return;

        const targetId = e.target.getAttribute('data-target-weight');
        const input = document.querySelector(targetId);
        if (!input) return;

        if (e.target.checked) {
            input.disabled = false;
            input.required = true;
        } else {
            input.value = '';
            input.disabled = true;
            input.required = false;
        }
    });

    // hide/show sections based on selected modules (no ajax)
    document.addEventListener('change', function(e) {
        if (!e.target.classList.contains('module-checkbox')) return;

        const checkedModules = Array.from(document.querySelectorAll('.module-checkbox:checked'))
            .map(el => el.value);

        document.querySelectorAll('.section-row').forEach(row => {
            const moduleId = row.getAttribute('data-module');
            if (checkedModules.includes(moduleId)) {
                row.style.display = '';
            } else {
                // hide + uncheck + disable input
                row.style.display = 'none';
                const cb = row.querySelector('.section-checkbox');
                const input = row.querySelector('input[type="number"]');
                if (cb) cb.checked = false;
                if (input) { input.value=''; input.disabled=true; input.required=false; }
            }
        });
    });

    // initial module filter on page load
    window.addEventListener('load', function() {
        const event = new Event('change');
        document.querySelectorAll('.module-checkbox').forEach(cb => cb.dispatchEvent(event));
    });
</script>

@endsection
