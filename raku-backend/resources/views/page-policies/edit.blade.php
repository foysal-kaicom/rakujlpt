@extends('master')

@section('contents')
<div class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6">Manage Policies</h1>

    @if(session('success'))
        <div class="bg-green-100 text-green-800 p-3 rounded mb-4">
            {{ session('success') }}
        </div>
    @endif

    {{-- Privacy Policy --}}
    <div class="mb-8 p-6 border rounded">
        <h2 class="text-xl font-semibold mb-4">Privacy Policy</h2>
        <form action="{{ route('business-settings.updatePrivacy') }}" method="POST">
            @csrf
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">English</label>
                        <textarea name="content_en" class="form-control tinymce">
                            {{ old('content_en', $privacy->content['en'] ?? '') }}
                        </textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">Bangla</label>
                        <textarea name="content_bn" class="form-control tinymce">
                            {{ old('content_bn', $privacy->content['bn'] ?? '') }}
                        </textarea>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary">Update Privacy Policy</button>
        </form>
    </div>

    {{-- Terms & Conditions --}}
    <div class="mb-8 p-6 border rounded">
        <h2 class="text-xl font-semibold mb-4">Terms & Conditions</h2>
        <form action="{{ route('business-settings.updateTerms') }}" method="POST">
            @csrf
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">English</label>
                        <textarea name="content_en" class="form-control tinymce">
                            {{ old('content_en', $terms->content['en'] ?? '') }}
                        </textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">Bangla</label>
                        <textarea name="content_bn" class="form-control tinymce">
                            {{ old('content_bn', $terms->content['bn'] ?? '') }}
                        </textarea>
                    </div>
                </div>
            </div>
            
            <button class="btn btn-primary">Update Terms & Conditions</button>
        </form>
    </div>

    {{-- Return Policy --}}
    <div class="mb-8 p-6 border rounded">
        <h2 class="text-xl font-semibold mb-4">Return Policy</h2>
        <form action="{{ route('business-settings.updateReturn') }}" method="POST">
            @csrf
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">English</label>
                        <textarea name="content_en" class="form-control tinymce">
                            {{ old('content_en', $return->content['en'] ?? '') }}
                        </textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-4">
                        <label class="block mb-1">Bangla</label>
                        <textarea name="content_bn" class="form-control tinymce">
                            {{ old('content_bn', $return->content['bn'] ?? '') }}
                        </textarea>
                    </div>
                </div>
            </div>
            
            
            <button class="btn btn-primary">Update Return Policy</button>
        </form>
    </div>
</div>
@endsection
@push('js')
<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js"></script>
<script>
    tinymce.init({
        selector: 'textarea.tinymce',
        height: 350,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
            'undo redo | formatselect | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | help',
        forced_root_block: false
    });
</script>
@endpush
