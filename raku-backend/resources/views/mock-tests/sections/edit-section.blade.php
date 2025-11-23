@extends('master')

@section('contents')

<div class="bg-white rounded-3 shadow-sm border p-6">
    <!-- Header -->
    <div class="text-2xl font-bold text-gray-800 border-b pb-3 mb-5 flex items-center gap-2">
        <p class="p-2 rounded-full bg-indigo-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.7134 9.12811L19.4668 9.69379C19.2864 10.1079 18.7136 10.1079 18.5331 9.69379L18.2866 9.12811C17.8471 8.11947 17.0555 7.31641 16.0677 6.87708L15.308 6.53922C14.8973 6.35653 14.8973 5.75881 15.308 5.57612L16.0252 5.25714C17.0384 4.80651 17.8442 3.97373 18.2761 2.93083L18.5293 2.31953C18.7058 1.89349 19.2942 1.89349 19.4706 2.31953L19.7238 2.93083C20.1558 3.97373 20.9616 4.80651 21.9748 5.25714L22.6919 5.57612C23.1027 5.75881 23.1027 6.35653 22.6919 6.53922L21.9323 6.87708C20.9445 7.31641 20.1529 8.11947 19.7134 9.12811ZM6 5C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V12H22V17C22 19.2091 20.2091 21 18 21H6C3.79086 21 2 19.2091 2 17V7C2 4.79086 3.79086 3 6 3H13V5H6Z"></path>
            </svg>
        </p>
        Edit Section
    </div>

    <!-- Form -->
    <form action="{{ route('mock-tests.section.update', $section->id) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div class="row g-4">
            <!-- Mock Test Selection -->
            <div class="col-md-12">
                <label class="form-label fw-semibold">Select Mock Test Modules</label>
                <select name="mock_test_module_id" class="form-select form-select-lg shadow-sm rounded-2" required>
                    <option value="">-- Select a Module --</option>

                    @foreach($modules as $examTitle => $group)
                        <optgroup label="{{ $examTitle }}">
                            @foreach($group as $module)
                                <option value="{{ $module->id }}" 
                                    {{ (old('mock_test_module_id', $section->mock_test_module_id) == $module->id) ? 'selected' : '' }}>
                                    {{ $module->exam->title }} - {{ $module->name }}
                                </option>
                            @endforeach
                        </optgroup>
                    @endforeach
                </select>

                @error('mock_test_module_id')
                <small class="text-danger">{{ $message }}</small>
                @enderror
            </div>
        </div>

        <!-- Section Title -->
        <div class="row g-4 pt-4">
            <div class="col-md-12">
                <label class="form-label fw-semibold">Section Title</label>
                <input
                    type="text"
                    name="title"
                    value="{{ old('title', $section->title) }}"
                    class="form-control form-control-lg shadow-sm rounded-2"
                    placeholder="e.g. Photo description" />
                @error('title')
                <small class="text-danger">{{ $message }}</small>
                @enderror
            </div>
        </div>

        <!-- Section Slug -->
        <div class="row g-4 pt-4">
            <div class="col-md-12">
                <label class="form-label fw-semibold">Section Slug</label>
                <input
                    type="text"
                    name="slug"
                    value="{{ old('slug', $section->slug) }}"
                    class="form-control form-control-lg shadow-sm rounded-2"
                    placeholder="e.g. photo-description" />
                @error('slug')
                <small class="text-danger">{{ $message }}</small>
                @enderror
            </div>
        </div>

        <div class="row g-4 pt-4">
            <div class="col-md-12">
                <label class="form-label fw-semibold">Question Limit <span class="text-red-600">*</span></label>
                <input
                    type="number"
                    name="question_limit"
                    value="{{ old('question_limit',$section->question_limit) }}"
                    class="form-control form-control-lg shadow-sm rounded-2"
                    placeholder="e.g. 10" />
                @error('question_limit')
                <small class="text-danger">{{ $message }}</small>
                @enderror
            </div>
        </div>
        
        <!-- Sample Question (TinyMCE editor) -->
        <div class="mt-4">
            <label for="sample_question" class="form-label fw-semibold">Sample Question</label>
            <textarea
                id="editor"
                name="sample_question"
                class="form-control form-control-lg shadow-sm rounded-2"
                placeholder="Write the sample question here...">{{ old('sample_question', $section->sample_question) }}</textarea>
            @error('sample_question')
            <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

         <div class="row ">
            <div class="col-md-6 mt-6">
                <label class="form-label fw-semibold">Sample Image </label>
                <input
                    type="file"
                    name="sample_image"
                    class="form-control form-control-lg shadow-sm rounded-2"
                    placeholder="e.g. Samle Image" />
                <!-- @error('title')
                <small class="text-danger">{{ $message }}</small>
                @enderror -->
                <img src="{{$section->sample_image}}" alt="" class="col-12">
            </div>
         <div class="col-md-6 mt-6">
                <label class="form-label fw-semibold">Sample Audio</label>
                <input
                    type="file"
                    name="sample_audio"
                    class="form-control form-control-lg shadow-sm rounded-2"
                    placeholder="e.g. Samle Audio" />
                <!-- @error('title')
                <small class="text-danger">{{ $message }}</small>
                @enderror -->
                <audio src="{{$section->sample_audio}}" class="col-12"></audio>
            </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
            <button type="submit"
                class="w-full md:w-auto px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4" fill="currentColor">
                    <path d="M7 19V13H17V19H19V7.82843L12 0.828427L5 7.82843V19H7ZM9 21H3C2.44772 21 2 20.5523 2 20V7.82843C2 7.29799 2.21071 6.78929 2.58579 6.41421L9.58579 -0.585786C10.3668 -1.36684 11.6332 -1.36684 12.4142 -0.585786L19.4142 6.41421C19.7893 6.78929 20 7.29799 20 7.82843V20C20 20.5523 19.5523 21 19 21H13V15H11V21H9Z"></path>
                </svg> Update Section
            </button>
        </div>
    </form>
</div>

@endsection

@push('js')
<script type="text/javascript">
tinymce.init({
  selector: '#editor',
  menubar: false,
  toolbar: 'bold italic furigana code',
  extended_valid_elements: 'ruby,rt,rp',
  setup: function (editor) {
    editor.ui.registry.addButton('furigana', {
      text: 'Furigana',
      onAction: function () {
        editor.windowManager.open({
          title: 'Add Furigana',
          body: {
            type: 'panel',
            items: [
              { type: 'input', name: 'kanji', label: 'Kanji' },
              { type: 'input', name: 'reading', label: 'Furigana' }
            ]
          },
          buttons: [
            { type: 'cancel', text: 'Close' },
            { type: 'submit', text: 'Insert', primary: true }
          ],
          onSubmit: function (api) {
            const data = api.getData();
            editor.insertContent(`<ruby>${data.kanji}<rt>${data.reading}</rt></ruby>`);
            api.close();
          }
        });
      }
    });
  }
});
</script>
<script>
// Auto-generate slug from title
document.querySelector('input[name="title"]').addEventListener('input', function() {
    const slugInput = document.querySelector('input[name="slug"]');
    const slug = this.value.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');
    slugInput.value = slug;
});
</script>
@endpush