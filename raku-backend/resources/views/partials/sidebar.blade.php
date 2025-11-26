<div id="sidebar"
    class="sidebar bg-white text-gray-800 min-h-screen space-y-3 shadow-lg overflow-y-auto max-h-screen flex flex-col justify-between">
    <div>
        <!-- Header Section -->
        <div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-2">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <img src="{{ url($settings->logo) }}" alt="Logo"
                            class="h-10 w-10 rounded-xl shadow-md ring-2 ring-indigo-100 object-cover">
                        <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                        </div>
                    </div>
                    <div class="hidden lg:block">
                        <h2 class="text-sm font-bold text-slate-800">Admin Panel</h2>
                        <p class="text-xs text-slate-500">Management</p>
                    </div>
                </div>
                <button id="closeSidebar"
                    class="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all duration-200 active:scale-95">
                    <i class="fas fa-times text-slate-600 text-sm"></i>
                </button>
            </div>
        </div>

        <div
            class="flex-1 overflow-y-auto px-2 py-1 space-y-1 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">

            <!-- Dashboard -->
            <div>
                <a href="{{ route('user.dashboard') }}"
                    class="menu-link group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 {{ request()->routeIs('user.dashboard') ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                    <div
                        class="flex items-center justify-center w-9 h-9 rounded-lg {{ request()->routeIs('user.dashboard') ? 'bg-white/20' : 'bg-gradient-to-br from-indigo-500 to-indigo-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                        <i class="fas fa-tachometer-alt text-sm"></i>
                    </div>
                    <span class="font-semibold text-sm">Dashboard</span>
                </a>
            </div>

            <!-- Candidates -->
            @php
                $candidateActive = request()->routeIs('candidate.*');
            @endphp
            <div class="menu-section" data-toggle="candidate">
                <div class="cursor-pointer">
                    <div
                        class="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 {{ $candidateActive ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <div class="flex items-center gap-3">
                            <div
                                class="flex items-center justify-center w-9 h-9 rounded-lg {{ $candidateActive ? 'bg-white/20' : 'bg-gradient-to-br from-purple-500 to-purple-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                                <i class="fas fa-users text-sm"></i>
                            </div>
                            <span class="font-semibold text-sm">Candidates</span>
                        </div>
                        <i
                            class="fas fa-chevron-down drop-arrow text-xs {{ $candidateActive ? 'text-white/80' : 'text-slate-400' }} transition-transform duration-300 {{ $candidateActive ? 'rotated' : '-rotate-90' }}"></i>
                    </div>
                </div>

                <div class="submenu mt-1 ml-12 space-y-1 {{ $candidateActive ? '' : 'hidden' }}"
                    data-target="candidate">
                    @hasPermission('candidate.list')
                    <a href="{{ route('candidate.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('candidate.list') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-user-friends text-xs"></i>
                        <span>All Candidates</span>
                    </a>
                    @endHasPermission
                    @hasPermission('candidate.create')
                    <a href="{{ route('candidate.create') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('candidate.create') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-user-plus text-xs"></i>
                        <span>Create New</span>
                    </a>
                    @endHasPermission
                </div>
            </div>

            <!-- CMS -->
            @php
                $cmsActive =
                    request()->routeIs('review.*') ||
                    request()->routeIs('partner.*') ||
                    request()->routeIs('faq.*') ||
                    request()->routeIs('news.*') ||
                    request()->routeIs('features.*');
            @endphp
            <div class="menu-section" data-toggle="cms">
                <div class="cursor-pointer">
                    <div
                        class="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 {{ $cmsActive ? 'bg-pink-500 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <div class="flex items-center gap-3">
                            <div
                                class="flex items-center justify-center w-9 h-9 rounded-lg {{ $cmsActive ? 'bg-white/20' : 'bg-gradient-to-br from-pink-500 to-pink-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                                <i class="fas fa-broom text-sm"></i>
                            </div>
                            <span class="font-semibold text-sm">CMS</span>
                        </div>
                        <i
                            class="fas fa-chevron-down drop-arrow text-xs {{ $cmsActive ? 'text-white/80' : 'text-slate-400' }} transition-transform duration-300 {{ $cmsActive ? 'rotated' : '-rotate-90' }}"></i>
                    </div>
                </div>
                <div class="submenu mt-1 ml-12 space-y-1 {{ $cmsActive ? '' : 'hidden' }}" data-target="cms">
                    @hasPermission('review.list')
                    <a href="{{ route('review.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('review.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-solid fa-comment text-xs"></i>
                        <span>Reviews</span>
                    </a>
                    @endHasPermission
                    @hasPermission('partner.list')
                    <a href="{{ route('partner.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('partner.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-handshake text-xs"></i>
                        <span>Partners</span>
                    </a>
                    @endHasPermission
                    @hasPermission('faq.list')
                    <a href="{{ route('faq.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('faq.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-info-circle text-xs"></i>
                        <span>FAQ</span>
                    </a>
                    @endHasPermission
                    @hasPermission('news.list')
                    <a href="{{ route('news.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('news.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-newspaper text-xs"></i>
                        <span>News</span>
                    </a>
                    @endHasPermission
                    @hasPermission('features.list')
                    <a href="{{ route('features.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('features.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-box-open text-xs"></i>
                        <span>Features</span>
                    </a>
                    @endHasPermission
                    @hasPermission('our-team.list')
                    <a href="{{ route('our-team.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('our-team.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-solid fa-code"></i>
                    <span>Our Team</span>
                </a>
                @endHasPermission
                </div>
            </div>

            <!-- Mock Test -->
            @php
                $mockActive = request()->routeIs('mock-tests.*') || request()->routeIs('mock-test-modules.*');
            @endphp
            <div class="menu-section" data-toggle="mocktest">
                <div class="cursor-pointer">
                    <div
                        class="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 {{ $mockActive ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <div class="flex items-center gap-3">
                            <div
                                class="flex items-center justify-center w-9 h-9 rounded-lg {{ $mockActive ? 'bg-white/20' : 'bg-gradient-to-br from-cyan-500 to-cyan-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                                <i class="fa-solid fa-headphones text-sm"></i>
                            </div>
                            <span class="font-semibold text-sm">Mock Test</span>
                        </div>
                        <i
                            class="fas fa-chevron-down drop-arrow text-xs {{ $mockActive ? 'text-white/80' : 'text-slate-400' }} transition-transform duration-300 {{ $mockActive ? 'rotated' : '-rotate-90' }}"></i>
                    </div>
                </div>

                <div class="submenu mt-1 ml-12 space-y-1 {{ $mockActive ? '' : 'hidden' }}" data-target="mocktest">
                    @hasPermission('mock-tests.exam.list')
                    <a href="{{ route('mock-tests.exam.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('mock-tests.exam.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-file-alt text-xs"></i>
                        <span>Exams</span>
                    </a>
                    @endHasPermission
                    @hasPermission('mock-test-modules.index')
                    <a href="{{ route('mock-test-modules.index') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('mock-test-modules.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-solid fa-layer-group text-xs"></i>
                        <span>Modules</span>
                    </a>
                    @endHasPermission
                    @hasPermission('mock-tests.module-section.info')
                    <a href="{{ route('mock-tests.module-section.info') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('mock-tests.module-section.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-solid fa-cubes-stacked text-xs"></i>
                        <span>Modules & Sections</span>
                    </a>
                    @endHasPermission
                    @hasPermission('mock-tests.question.list')
                    <a href="{{ route('mock-tests.question.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('mock-tests.question.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-regular fa-circle-check text-xs"></i>
                        <span>Questions Setup</span>
                    </a>
                    @endHasPermission
                    @hasPermission('mock-tests.reports.list')
                    <a href="{{ route('mock-tests.reports.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('mock-tests.reports.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-regular fa-circle-check text-xs"></i>
                        <span>Mock Test Reports</span>
                    </a>
                    @endHasPermission
                </div>
            </div>

            <!-- Practices -->
            @php
                $practicesActive = request()->routeIs('roadmaps.*') || request()->routeIs('stages.*');
            @endphp
            <div class="menu-section" data-toggle="roadmap">
                <div class="cursor-pointer">
                    <div
                        class="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 {{ $practicesActive ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <div class="flex items-center gap-3">
                            <div
                                class="flex items-center justify-center w-9 h-9 rounded-lg {{ $practicesActive ? 'bg-white/20' : 'bg-gradient-to-br from-emerald-500 to-emerald-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                                <i class="fas fa-road text-sm"></i>
                            </div>
                            <span class="font-semibold text-sm">Practices</span>
                        </div>
                        <i
                            class="fas fa-chevron-down drop-arrow text-xs {{ $practicesActive ? 'text-white/80' : 'text-slate-400' }} transition-transform duration-300 {{ $practicesActive ? 'rotated' : '-rotate-90' }}"></i>
                    </div>
                </div>
                <div class="submenu mt-1 ml-12 space-y-1 {{ $practicesActive ? '' : 'hidden' }}"
                    data-target="roadmap">
                    @hasPermission('roadmaps.index')
                    <a href="{{ route('roadmaps.index') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('roadmaps.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-list text-xs"></i>
                        <span>Roadmaps</span>
                    </a>
                    @endHasPermission
                    @hasPermission('stages.index')
                    <a href="{{ route('stages.index') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('stages.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-list text-xs"></i>
                        <span>Stages</span>
                    </a>
                    @endHasPermission
                </div>
            </div>

            <!-- Settings -->
            @php
                $settingsActive =
                    request()->routeIs('user.roles.*') ||
                    request()->routeIs('users.*') ||
                    request()->routeIs('business-settings.*');
            @endphp
            <div class="menu-section" data-toggle="account-settings">
                <div class="cursor-pointer">
                    <div
                        class="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 {{ $settingsActive ? 'bg-slate-600 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <div class="flex items-center gap-3">
                            <div
                                class="flex items-center justify-center w-9 h-9 rounded-lg {{ $settingsActive ? 'bg-white/20' : 'bg-gradient-to-br from-slate-500 to-slate-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                                <i class="fas fa-cog text-sm"></i>
                            </div>
                            <span class="font-semibold text-sm">Settings</span>
                        </div>
                        <i
                            class="fas fa-chevron-down drop-arrow text-xs {{ $settingsActive ? 'text-white/80' : 'text-slate-400' }} transition-transform duration-300 {{ $settingsActive ? 'rotated' : '-rotate-90' }}"></i>
                    </div>
                </div>
                <div class="submenu mt-1 ml-12 space-y-1 {{ $settingsActive ? '' : 'hidden' }}"
                    data-target="account-settings">
                    @hasPermission('user.roles.list')
                    <a href="{{ route('user.roles.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('user.roles.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-user-shield text-xs"></i>
                        <span>Role</span>
                    </a>
                    @endHasPermission 
                    @hasPermission('users.list')
                    <a href="{{ route('users.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('users.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-user text-xs"></i>
                        <span>User</span>
                    </a>
                    @endHasPermission 
                    @hasPermission('business-settings.edit')
                    <a href="{{ route('business-settings.edit', 1) }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('business-settings.*') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-briefcase text-xs"></i>
                        <span>Business Setting</span>
                    </a>
                    @endHasPermission
                </div>
            </div>

            <!-- Packages -->
            @php
                $packagesActive = request()->routeIs('packages.*');
            @endphp
            <div class="menu-section" data-toggle="packages">
                <div class="cursor-pointer">
                    <div
                        class="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 {{ $packagesActive ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <div class="flex items-center gap-3">
                            <div
                                class="flex items-center justify-center w-9 h-9 rounded-lg {{ $packagesActive ? 'bg-white/20' : 'bg-gradient-to-br from-amber-500 to-amber-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                                <i class="fa-solid fa-box-open text-sm"></i>
                            </div>
                            <span class="font-semibold text-sm">Packages</span>
                        </div>
                        <i
                            class="fas fa-chevron-down drop-arrow text-xs {{ $packagesActive ? 'text-white/80' : 'text-slate-400' }} transition-transform duration-300 {{ $packagesActive ? 'rotated' : '-rotate-90' }}"></i>
                    </div>
                </div>
                <div class="submenu mt-1 ml-12 space-y-1 {{ $packagesActive ? '' : 'hidden' }}"
                    data-target="packages">
                    @hasPermission('packages.index')
                    <a href="{{ route('packages.index') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('packages.index') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-solid fa-list text-xs"></i>
                        <span>All Packages</span>
                    </a>
                    @endHasPermission
                    @hasPermission('packages.create')
                    <a href="{{ route('packages.create') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('packages.create') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fa-solid fa-plus text-xs"></i>
                        <span>Add Package</span>
                    </a>
                    @endHasPermission
                </div>
            </div>

            <div>
                <a href="{{ route('user-payments') }}"
                    class="menu-link group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 {{ request()->routeIs('user-payments') ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50' }}">
                    <div
                        class="flex items-center justify-center w-9 h-9 rounded-lg {{ request()->routeIs('user-payments') ? 'bg-white/20' : 'bg-gradient-to-br from-orange-500 to-orange-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                        <i class="fas fa-credit-card text-sm"></i>
                    </div>
                    <span class="font-semibold text-sm">User Payments</span>
                </a>
            </div>

        </div>
    </div>

    <!-- Logout Section - Fixed at bottom -->
    <div class="sticky w-full bottom-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-2 py-1">
        <a href="{{ route('logout') }}"
            class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
            <div
                class="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                <i class="fas fa-sign-out-alt text-sm"></i>
            </div>
            <span class="font-semibold text-sm">Logout</span>
        </a>
    </div>
</div>
