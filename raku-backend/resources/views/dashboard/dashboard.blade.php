@extends('master')

@section('contents')
    <div class="space-y-6">
        <!-- Header Section -->
        <section class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
                    Welcome {{ auth()->user()->name }}! 🎌
                </h1>
                {{-- <p class="text-gray-600 mt-1">Track site details</p> --}}
            </div>
        </section>

        <!-- Stats Cards -->
        {{-- <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <!-- Total Tests Completed -->
            <div
                class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-red-200">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm text-red-700 font-medium">Total Mock Tests Completed</p>
                        <p class="text-3xl font-bold text-red-900 mt-2">47</p>
                        <p class="text-xs text-red-600 mt-1">↑ 12 this month</p>
                    </div>
                    <div class="p-3 bg-red-600 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 15.172L19.192 5.979L20.607 7.393L10 18L3.636 11.636L5.05 10.222L10 15.172Z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Candidates in Japan -->
            <div
                class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-200">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm text-green-700 font-medium">Total Candidates</p>
                        <p class="text-3xl font-bold text-green-900 mt-2">{{ $candidates }}</p>
                        <p class="text-xs text-green-600 mt-1">Active learners</p>
                    </div>
                    <div class="p-3 bg-green-600 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Booking This Month -->
            <div
                class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm text-blue-700 font-medium">Booking This Month</p>
                        <p class="text-3xl font-bold text-blue-900 mt-2">8</p>
                        <p class="text-xs text-blue-600 mt-1">3 upcoming tests</p>
                    </div>
                    <div class="p-3 bg-blue-600 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Certificate Claimed -->
            <div
                class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-orange-200">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <p class="text-sm text-orange-700 font-medium">Total Practices Given</p>
                        <p class="text-3xl font-bold text-orange-900 mt-2">23</p>
                        <p class="text-xs text-orange-600 mt-1">5 candidates</p>
                    </div>
                    <div class="p-3 bg-orange-600 text-white rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M21 16L14.9968 22.0032L11.5 18.5064L12.9142 17.0922L14.9968 19.1748L19.5858 14.5858L21 16ZM11 18.9968V16.8287C10.6621 16.9415 10.3073 17 9.94189 17C9.44873 17 8.98472 16.8802 8.57418 16.6656C7.72304 17.4802 6.45272 18 5 18C3.54728 18 2.27696 17.4802 1.42582 16.6656C1.01555 16.8797 0.55207 17 0.0594569 17C0.0267662 17 0 16.9733 0 16.9406C0 15.2527 1.34308 13.8719 3.00777 13.8056C3.00259 13.8706 3 13.9362 3 14.0019C3 14.3376 3.03016 14.6662 3.08787 14.9852C2.41226 15.2325 1.84844 15.7191 1.5 16.3473C1.82463 16.7531 2.56459 17 3.5 17C4.43541 17 5.17537 16.7531 5.5 16.3473C5.82463 16.7531 6.56459 17 7.5 17C8.43541 17 9.17537 16.7531 9.5 16.3473C9.65537 16.5531 10.0525 16.7606 10.6153 16.9084C10.2191 16.0916 10 15.1691 10 14.2019C10 14.1362 10.0026 14.0706 10.0078 14.0056C8.34308 13.8719 7 15.2527 7 16.9406C7 16.9733 7.02677 17 7.05946 17C7.32447 17 7.57773 16.9479 7.81109 16.8528C8.22044 16.952 8.66829 17 9.14054 17C9.34241 17 9.53967 16.9853 9.73151 16.9571C9.90989 17.6412 10.1987 18.2772 10.5775 18.8438L11 18.9968ZM24 14.2019C24 16.9673 21.7614 19.2019 19 19.2019C16.2386 19.2019 14 16.9673 14 14.2019C14 11.4365 16.2386 9.20189 19 9.20189C21.7614 9.20189 24 11.4365 24 14.2019ZM5.94189 10C4.28628 10 2.94189 8.65575 2.94189 7C2.94189 5.34425 4.28628 4 5.94189 4C7.59764 4 8.94189 5.34425 8.94189 7C8.94189 8.65575 7.59764 10 5.94189 10ZM19 11.2019C17.3431 11.2019 16 12.545 16 14.2019C16 15.8587 17.3431 17.2019 19 17.2019C20.6569 17.2019 22 15.8587 22 14.2019C22 12.545 20.6569 11.2019 19 11.2019Z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </section> --}}

        
        <!-- Study Sections & Upcoming Tests -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Quick Study Sections -->
            <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-600" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M21 18H6C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20H21V22H6C4.34315 22 3 20.6569 3 19V4C3 2.89543 3.89543 2 5 2H21V18ZM5 16.05C5.16156 16.0172 5.32877 16 5.5 16H19V4H5V16.05ZM16 9H8V7H16V9Z">
                        </path>
                    </svg>
                    Latest Stats
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Reading Practice -->
                    <button
                        class="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border-2 border-pink-200 hover:border-pink-400 hover:shadow-md transition-all text-left group">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-pink-500 text-white rounded-lg group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H9C10.1947 3 11.2671 3.52375 12 4.35418C12.7329 3.52375 13.8053 3 15 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H13ZM20 19V5H15C13.8954 5 13 5.89543 13 7V19H20ZM11 19V7C11 5.89543 10.1046 5 9 5H4V19H11Z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800">Total Mock Tests</h3>
                                <p class="text-xs text-gray-600">{{ $exam_count }}</p>
                            </div>
                        </div>
                    </button>

                    <!-- Listening Practice -->
                    <button
                        class="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-md transition-all text-left group">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-cyan-500 text-white rounded-lg group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 5C15.8659 5 19 8.13401 19 12C19 15.866 15.8659 19 12 19V5ZM10 8.5V15.5C10 15.7761 9.77614 16 9.5 16C9.41634 16 9.33597 15.9738 9.27012 15.9257L6.8001 14.0757C6.2945 13.6892 6 13.1135 6 12.5037V11.4963C6 10.8865 6.2945 10.3108 6.8001 9.92426L9.27012 8.07426C9.47455 7.92084 9.76007 7.96301 9.91349 8.16745C9.96159 8.2333 9.98777 8.31367 9.98777 8.39733L10 8.5Z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800">Total Candidates</h3>
                                <p class="text-xs text-gray-600">{{ $candidate_count }}</p>
                            </div>
                        </div>
                    </button>

                    <!-- Writing Practice -->
                    <button
                        class="p-4 bg-gradient-to-br from-violet-50 to-violet-100 rounded-lg border-2 border-violet-200 hover:border-violet-400 hover:shadow-md transition-all text-left group">
                        <div class="flex items-center gap-3">
                            <div
                                class="p-2 bg-violet-500 text-white rounded-lg group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M6.94043 4.99886L15.0601 13.1185L13.6458 14.5328L5.52614 6.41312L6.94043 4.99886ZM17.8895 2.87753L19.3037 4.29175L16.4753 7.12014L15.0611 5.70593L17.8895 2.87753ZM8.35443 16.6564L5.52614 13.828L1.09802 18.2561L2.51223 19.6703L3.92644 18.2561L5.34066 19.6703L6.75487 18.2561L8.16909 19.6703L9.58331 18.2561L8.35443 16.6564ZM4.47065 20.4946L3.05643 19.0804L1.64222 20.4946L1.28601 21.9088L2.70023 22.2651L4.11444 20.8509L5.52865 22.2651L6.94287 20.8509L5.52865 19.4367L4.47065 20.4946ZM17.1208 7.82818L19.9492 5.0098L22.7776 7.83832L19.9492 10.6567L17.1208 7.82818Z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800">Total Practices</h3>
                                <p class="text-xs text-gray-600">{{ $practice_count }}</p>
                            </div>
                        </div>
                    </button>

                    <!-- Vocabulary Practice -->
                    <button
                        class="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-md transition-all text-left group">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-amber-500 text-white rounded-lg group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M5 15V17C5 18.0544 5.81588 18.9182 6.85074 18.9945L7 19H10V21H7C4.79086 21 3 19.2091 3 17V15H5ZM18 10L22.4 21H16.245L14.755 17H10V15H13.5L11.755 10.8L18 10ZM17 3C19.2091 3 21 4.79086 21 7V9H19V7C19 5.94564 18.1841 5.08183 17.1493 5.00549L17 5H14V3H17ZM9 5V7H5V13H3V7C3 4.79086 4.79086 3 7 3H9V5Z">
                                    </path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="font-bold text-gray-800">Total Active Packages</h3>
                                <p class="text-xs text-gray-600">{{ $package_count }}</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <!-- Upcoming Tests -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-600" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z">
                        </path>
                    </svg>
                    Recent Mock Tests
                </h2>
                <div class="space-y-3">
                    @foreach($recent_mock_tests as $key => $test)
                    <div data-index="{{ $key }}" class="p-3 {{$key==0 ? 'bg-red-50' : ''}}{{$key==1 ? 'bg-orange-50' : ''}}{{$key==2 ? 'bg-blue-50' : ''}} rounded-lg border border-red-200">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-1 {{$key==0 ? 'bg-red-600' : ''}}{{$key==1 ? 'bg-orange-600' : ''}}{{$key==2 ? 'bg-blue-600' : ''}} text-white text-xs font-bold rounded">{{ $test->name }}</span>
                            <span class="text-xs {{$key==0 ? 'text-red-700' : ''}}{{$key==1 ? 'text-orange-700' : ''}}{{$key==2 ? 'text-blue-700' : ''}} font-semibold">{{ $test->title }}</span>
                        </div>
                        <p class="text-xs text-gray-600">{{ \Carbon\Carbon::parse($test->created_at)->format('M j, Y • g:i A') }}</p>
                    </div>
                    @endforeach
                </div>
            </div>
        </section>

        <!-- Recent Activity Section -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Activity -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z">
                        </path>
                    </svg>
                    Recent Subscription Activity
                </h2>
                <div class="space-y-3">
                    @foreach($recent_subscriptions as $key => $activity)
                    <div class="flex items-start gap-3 p-3 rounded-lg border {{$activity->payment_status=='pending' ? 'bg-yellow-50 border-yellow-200' : ''}}{{$activity->payment_status=='success' ? 'bg-green-50 border-green-200' : ''}}{{$activity->payment_status=='failed' ? 'bg-red-50 border-red-200' : ''}}">
                        <div class="w-2 h-2 {{$activity->payment_status=='pending' ? 'bg-yellow-500' : ''}}{{$activity->payment_status=='success' ? 'bg-green-500' : ''}}{{$activity->payment_status=='failed' ? 'bg-red-500' : ''}} rounded-full mt-2 flex-shrink-0"></div>
                        <div class="flex-1">
                            <p class="text-sm font-semibold text-gray-800">{{$activity->candidate->first_name}} subscribed to {{$activity->package->name}}</p>
                            <p class="text-xs text-gray-600 mt-1">Payment Status: {{ucfirst($activity->payment_status)}} • {{ \Carbon\Carbon::parse($activity->created_at)->diffForHumans() }}</p>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <!-- JLPT Level Progress -->
            <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-purple-600" viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            d="M2 13H8V21H2V13ZM16 8H22V21H16V8ZM9 3H15V21H9V3ZM4 15V19H6V15H4ZM11 5V19H13V5H11ZM18 10V19H20V10H18Z">
                        </path>
                    </svg>
                    Mock Test Wise Candidates Participation
                </h2>
                <div class="space-y-4">
         
                    @foreach($exam_submission_count as $key => $exam)
                    @php
                        $colors = ['green','orange','yellow','red','teal','blue','indigo','violet','purple','pink'];
                        $color = $colors[$key % count($colors)];
                    @endphp

                    <div title="Total Candidates: {{ $exam['count'] }}" class="cursor-pointer">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-gray-700">{{ $exam['title'] }}</span>
                            <span class="text-sm font-bold text-{{ $color }}-600">{{ $exam['percentage'] }}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-{{ $color }}-500 h-2.5 rounded-full transition-all duration-300" style="width: {{ $exam['percentage'] }}%"></div>
                        </div>
                    </div>
                    @endforeach

                </div>
            </div>
        </section>

    </div>
@endsection
