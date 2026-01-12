<div id="sidebar"
    class="sidebar bg-white text-gray-800 min-h-screen space-y-3 shadow-lg overflow-y-auto max-h-screen flex flex-col justify-between">
    <div>
        <!-- Header Section -->
        <div class="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-2">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="relative">
                        <img src="{{ $settings->logo}}" alt="Logo"
                            class="h-10 w-10 rounded-xl shadow-md ring-2 ring-indigo-100 object-cover">
                        <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                        </div>
                    </div>
                    <div class="hidden lg:block">
                        <h2 class="text-sm font-bold text-slate-800">Agent Panel</h2>
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
                <a href="{{ route('agent.dashboard') }}"
                    class="menu-link group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 {{ request()->routeIs('agent.dashboard') ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50' }}">
                    <div
                        class="flex items-center justify-center w-9 h-9 rounded-lg {{ request()->routeIs('agent.dashboard') ? 'bg-white/20' : 'bg-gradient-to-br from-indigo-500 to-indigo-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                        <i class="fas fa-tachometer-alt text-sm"></i>
                    </div>
                    <span class="font-semibold text-sm">Dashboard</span>
                </a>
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
                            <span class="font-semibold text-sm">Mock Test</span>
                        </div>
                        <i
                            class="fas fa-chevron-down drop-arrow text-xs {{ $packagesActive ? 'text-white/80' : 'text-slate-400' }} transition-transform duration-300 {{ $packagesActive ? 'rotated' : '-rotate-90' }}"></i>
                    </div>
                </div>
                <div class="submenu mt-1 ml-12 space-y-1 {{ $packagesActive ? '' : 'hidden' }}"
                    data-target="packages">
         
                    <a href="{{ route('agent.exam.list') }}"
                        class="submenu-link flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 {{ request()->routeIs('packages.index') ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50' }}">
                        <i class="fas fa-file-alt text-xs"></i>
                        <span>Exam</span>
                    </a>
                </div>
            </div>

            <div>
                <a href="{{ route('user-payments') }}"
                    class="menu-link group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 {{ request()->routeIs('user-payments') ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50' }}">
                    <div
                        class="flex items-center justify-center w-9 h-9 rounded-lg {{ request()->routeIs('user-payments') ? 'bg-white/20' : 'bg-gradient-to-br from-orange-500 to-orange-600' }} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                        <i class="fas fa-credit-card text-sm"></i>
                    </div>
                    <span class="font-semibold text-sm">Example Route</span>
                </a>
            </div>

        </div>
    </div>

    <!-- Logout Section - Fixed at bottom -->
    <div class="sticky w-full bottom-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-2 py-1">
        <a href="{{ route('agent.logout') }}"
            class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200">
            <div
                class="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
                <i class="fas fa-sign-out-alt text-sm"></i>
            </div>
            <span class="font-semibold text-sm">Logout</span>
        </a>
    </div>
</div>
