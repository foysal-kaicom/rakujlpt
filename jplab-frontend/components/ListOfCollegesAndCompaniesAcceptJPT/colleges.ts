const colleges = [
  // Hokkaido
  {
    prefecture: "Hokkaido",
    name: "Sapporo University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Seisa Dohto University",
    classification: "University",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Hokuyo University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Wakkanai Hokusei Gakuen University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Asahikawa Welfare Professional Training College",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Sapporo AOBA Vocational College Department of Japanese Language",
    classification: "Vocational School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "IAY International Academy Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Soken Gakuen Kan-yobi Japanese Language Course",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Higashikawa Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Hokkaido HSL Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Hokkaido Japanese Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Yu Language Academy Sapporo",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Hokkaido",
    name: "Japan International Language Academy Hakodate School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Aomori
  {
    prefecture: "Aomori",
    name: "Aomori Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Iwate
  {
    prefecture: "Iwate",
    name: "Fuji University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Iwate",
    name: "Morioka Japanese Language School",
    classification: "Vocational School",
    score: "*",
    website: "",
  },

  // Miyagi
  {
    prefecture: "Miyagi",
    name: "TOKYO IT PROGRAMMING & ACCOUNTING COLLEGE SENDAI",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "TOKYO LAW PUBLIC SERVANT COLLEGE SENDAI",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "Tohoku Foreign Language & Tourism College",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "Tohoku Computer College",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "Tohoku Medical Care College",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "Sendai Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "Sendai International School of Japanese",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "Toyo International Culture Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "Tohoku Tabunka Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Miyagi",
    name: "International Academy Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Akita
  {
    prefecture: "Akita",
    name: "JLCC at North Asia University	",
    classification: "University",
    score: "least 415 points",
    website: "",
  },

  // Yamagata
  {
    prefecture: "Yamagata",
    name: "Tohoku Bunkyo College",
    classification: "University",
    score: "*",
    website: "",
  },

  // Fukushima
  {
    prefecture: "Fukushima",
    name: "Koriyama Institute of Health Sciences",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Fukushima",
    name: "Shinshirakawa International Education Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Fukushima",
    name: "Fukushima Japanese School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Ibaraki
  {
    prefecture: "Ibaraki",
    name: "LILY ACADEMY OF NURTURE AND WELLNESS",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Ibaraki",
    name: "Jyonan International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Ibaraki",
    name: "Tsukuba Foreign Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Ibaraki",
    name: "Japanese language school Tsukuba Smile",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Ibaraki",
    name: "Tone International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Ibaraki",
    name: "MIRAI Japanese Language Schhol",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Ibaraki",
    name: "Noutatsu International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Tochigi
  {
    prefecture: "Tochigi",
    name: "Sakushin Gakuin University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo/Tochigi",
    name: "Teikyo University Examination in China",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo/Tochigi",
    name: "Teikyo University Entrance Examinations for International Students",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tochigi",
    name: "Bunsei University of Art",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tochigi",
    name: "Ashikaga Community College Japanese Language Course",
    classification: "Vocational School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Tochigi",
    name: "ATYS International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Tochigi",
    name: "Utsunomiya Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Tochigi",
    name: "TOCHIGI International Education Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Tochigi",
    name: "MOKA MIRAI Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Gunma
  {
    prefecture: "Gunma",
    name: "Aoyama Nippongo Gakuinn",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Gunma",
    name: "USUI International School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Saitama
  {
    prefecture: "Saitama",
    name: "Josai University Special Course Japanese Language Course /Japanese Culture Course",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Saitama International Language School",
    classification: "Japanese Language School",
    score: "least 480 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Chuo Computer and Communication College",
    classification: "Vocational School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "TOKYO IT ACCOUNTING & PUBLIC SERVANT COLLEGE OMIYA",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Asahi Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Kounosu International College",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Saitama International School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Saitama briller japanese language school",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Sakitama International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Seikou Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Tokyo Nichigo Gakuin",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Hiki Academy Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Fukaya International Foreign Languages Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Saitama",
    name: "Musashi Urawa Japanese Language Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Chiba
  {
    prefecture: "Chiba",
    name: "Keiai University",
    classification: "University",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Josai International University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Josai International University Japanese Studies Program",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "CHIBA INSTITUTE OF SCIENCE",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Josai International University",
    classification: "Graduate School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "TOKYO IT ACCOUNTING & PUBLIC SERVANT COLLEGE CHIBA",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "3H Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Ken Japanese Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Active Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Ichikawa Japanese Language Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Tokyo Japan Liberal Arts College",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Narashino institute of Foreign Languages",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Nihongo Kokusai Gakuin",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Matsudo International School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Miyabi International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Mate Japanese Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Meiyuu Japanese Language",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Chiba",
    name: "Tokyo Bridge Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Tokyo
  {
    prefecture: "Tokyo",
    name: "Aoyama Gakuin University Exchange Program",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Sugino Fashion College",
    classification: "University",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Soka University Undergraduate Admissions for International Students",
    classification: "University",
    score: "least 600 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Soka University Undergraduate Transfer Admissions",
    classification: "University",
    score: "least 800 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Soka University Undergraduate Non-Degree Program",
    classification: "University",
    score: "least 600 points",
    website: "",
  },
  {
    prefecture: "Tokyo,Tochigi",
    name: "Teikyo University Examination in China",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo,Tochigi",
    name: "Teikyo University Entrance Examinations for International Students",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Digital Hollywood University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Tokyo University and Graduate School of Social Welfare",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Nihon Wellness sports University",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Fukuoka/Tokyo/Hyogo",
    name: "Japan University of Economics",
    classification: "University",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Musashino University Japanese Language Program for International Students",
    classification: "University",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "J.F.Oberlin University Graduate Admissions",
    classification: "Graduate School",
    score: "least 660 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Graduate School of Musashino University",
    classification: "Graduate School",
    score: "least 660 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Teikyo University Junior College Examination in China",
    classification: "Junior College",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Showa Women’s University SWU Academic Program",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "JAPAN RAILWAY & SPORTS BUSINESS COLLEGE 21",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "JAPAN RAILWAY & SPORTS BUSINESS COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "JAPAN ANIMAL COLLEGE 21",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "TOKYO IT PROGRAMMING & ACCOUNTING COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "TOKYO IT PROGRAMMING & ACCOUNTING COLLEGE SUGINAMI",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Sunshine College of Social & Child Welfare Japanese Course",
    classification: "Vocational School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "TOKYO LAW PUBLIC SERVANT COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "TOKYO LAW PUBLIC SERVANT COLLEGE SUGINAMI",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "JAPAN ANIMAL COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "Waseda Foreign Language College",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "AKB Tokyo International School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "International Conversation Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Tokyo",
    name: "IECC Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Kanagawa
  {
    prefecture: "Kanagawa",
    name: "Kanagawa Dental University School of Dentistry",
    classification: "University",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "YMCA College of Human Servises,Department of Japanese Language",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Kawasaki YMCA Global Business College,Department of Japanese Language",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Arts college YOKOHAMA for International Students",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Yokohama YMCA College,Department of Japanese Language",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Yokohama College of Medical technologies Department of Japanese Language",
    classification: "Vocational School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "YOKOHAMA PUBLIC SERVANT & IT ACCOUNTING COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Yokohama Design College",
    classification: "Vocational School",
    score: "*",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "IPA International Education Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "KOYO Japanese Communication Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "LIBERTY Odawara Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Aishin International Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Aishin Hodogaya Institute Japanese Language Education",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Asia International Language Center",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Asuka Gakuin Language Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Alice Japanese Language School Yokohama Campus",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Kanagawa Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Kanagawa",
    name: "Sagami International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Niigata
  {
    prefecture: "Niigata",
    name: "Niigata University of Rehabilitation",
    classification: "University",
    score: "least 525 points",
    website: "",
  },

  // Toyama
  {
    prefecture: "Toyama",
    name: "College of Business and Welfare Hokuriku",
    classification: "Vocational School",
    score: "*",
    website: "",
  },

  // Ishikawa
  {
    prefecture: "Ishikawa",
    name: "Kinjo College Preparation program for Foreign students",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Ishikawa",
    name: "Alice International College Kaga Campus",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Ishikawa",
    name: "Alice International College Kanazawa Campus",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Ishikawa",
    name: "Kanazawa Japanese Language School",
    classification: "Vocational School",
    score: "least 315 points",
    website: ""
  },

  // Fukui
  {
    prefecture: "Fukui",
    name: "Fukui Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Yamanashi
  {
    prefecture: "Yamanashi",
    name: "Fujiyama Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Nagano
    {
    prefecture: "Nagano",
    name: "Shinshu University Master’s Program at the Graduate School of Science and Technology Department of Agriculture",
    classification: "Graduate School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Nagano",
    name: "Saku University Shinshu Junior College",
    classification: "Junior College",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Nagano",
    name: "Nagano Business and Language College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Nagano",
    name: "Nagano International Culture College",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Nagano",
    name: "Matsumoto International Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Gifu
  {
    prefecture: "Gifu",
    name: "International Student at Asahi University",
    classification: "University",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Gifu",
    name: "Hotsuma International School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Gifu",
    name: "Subaru Language School, Ogaki",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Gifu",
    name: "Subaru Language School, Motosu",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Gifu",
    name: "Mirait Japanese Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Shizuoka
  {
    prefecture: "Shizuoka",
    name: "Shizuoka Professional College of Automobile Technology",
    classification: "Vocational School",
    score: "least 430 points",
    website: ""
  },
  {
    prefecture: "Shizuoka",
    name: "Grandeur Global Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Shizuoka",
    name: "Shizuoka International School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Aichi
 {
    prefecture: "Aichi",
    name: "Toyohashi University of Technology（2023～）",
    classification: "University",
    score: "*",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Toyohashi Sozo College",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Nagoya University of The Arts",
    classification: "University",
    score: "*",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Toyohashi Sozo Junior College",
    classification: "Junior College",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "TOKYO IT PROGRAMMING & ACCOUNTING COLLEGE NAGOYA",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "TOKYO LAW PUBLIC SERVANT COLLEGE NAGOYA",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Nagoya Management & Accounting College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "NAGOYA ANIMAL COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Nagoya Future Technical College",
    classification: "Vocational School",
    score: "least 430 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "I.C.NAGOYA",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Koubun International",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Nagoya Internatinal Foreign Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Nagoya Fukutoku Japanese Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "Hotsuma International Nagoya School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Aichi",
    name: "ECC Japanese Language Institute Shinjuku School Nagoya school",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Mie
  {
    prefecture: "Mie",
    name: "Humanitec Life Design College",
    classification: "Vocational School",
    score: "*",
    website: "",
  },

  // Shiga
  {
    prefecture: "Shiga",
    name: "Shiga Junior College",
    classification: "Junior College",
    score: "*",
    website: "",
  },

  // Kyoto
  {
    prefecture: "Kyoto",
    name: "Kyoto University of Foreign Studies",
    classification: "University",
    score: "*",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Seika University",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Doshisha University Faculty of Global Comunications Japanese Course",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Seika University",
    classification: "Graduate School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto University of the Arts Correspondence Education",
    classification: "University",
    score: "least 660 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto YMCA College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto College of Nutritional & Medical Sciences",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "KYOTO PUBLIC SERVANT & IT ACCOUNTING COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Pastry & Bakery Art College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Culinary Art College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto College of Hotel, Tourism & Bridal Management",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "ISI Language College Kyoto Campus",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "SCG Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "YIC Kyoto Japanese Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "KAMEI GAKUEN Japanese Language School ㏌ Kyoto",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Gengo Bunka Gakuin",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "The Kyoto Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Minsai Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Reigaku International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Japan International Language Academy Kyoto School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Kyoto",
    name: "Kyoto Iroha Japanese language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Osaka
  {
    prefecture: "Osaka",
    name: "Osaka Sangyo University Graduate School of Economics",
    classification: "University",
    score: "least 550 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Otemon Gakuin University",
    classification: "University",
    score: "least 600 points",
    website: ""
  },
  {
    prefecture: "Osaka/Hyogo",
    name: "Kobe University of Welfare",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Takarazuka University of Medical and Health Care Japanese Language Program for International Students",
    classification: "University",
    score: "least 350 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Yamato University",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "OSAKA IT PROGRAMMING & ACCOUNTING COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "OSAKA IT PROGRAMMING & ACCOUNTING COLLEGE TENNOJI",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Osaka College of Technology",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Osaka Animal College",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Osaka Animal College Tennoji Campus",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "OSAKA LAW PUBLIC SERVANT COLLEGE",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "OSAKA LAW PUBLIC SERVANT COLLEGE TENNOJI",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Nihon Medical Welfare Institute",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Nihon Riko-Jyoho Institute",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Osaka YMCA International school",
    classification: "Vocational School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Asia International Education Culture Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Japanese Communication International School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "JIN OSAKA Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "JVC Academy Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "EARTH Institute of Language",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Ehle Institute Japanese Language school",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Osaka YMCA Japanese Language School",
    classification: "Japanese Language School",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Osaka Japanese Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Osaka Meisei International Japanese School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Kinki Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Clover Language Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Sakura Kotonoha Japanese Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Howdy Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Daiwa Institute Education",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Hotsuma International Osaka School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Manwa International Education Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "MERIC Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Language School of Morinomiyairyo Gakuen",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Yuchi International Japanese Langhage School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "T&Y Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "Higashi Osaka Mirai Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Osaka",
    name: "ACC Japanese Language Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Hyogo
  {
    prefecture: "Hyogo",
    name: "Ashiya University",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Osaka/Hyogo",
    name: "Kobe University of Welfare",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Fukuoka/Tokyo/Hyogo",
    name: "Japan University of Economics",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Japan Engineering College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Hanshin Institute of Technology",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "ECC Japanese Language Institute Kobe School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Nest21 Japanese Language Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "SBC Himeji Japanease Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Asian Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Arist Foreign Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Kansai International Education Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Kobe Shin Nagata Japanese Language Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Kobe KR Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Kobe Nichigo Japanese Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "KOBE TOYO Japanese college",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Kasuga Japanese Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Kobe Sumiyoshi international Japanese language school",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Communica Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hyogo",
    name: "Sayo Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Nara
  {
    prefecture: "Nara",
    name: "Yamato International College",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },
  {
    prefecture: "Nara",
    name: "Yamato Mahoroba Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Wakayama
  {
    prefecture: "Wakayama",
    name: "Wakayama College of Foreign Studies",
    classification: "Vocational School",
    score: "*",
    website: "",
  },

  // Tottori
  // {
  //   prefecture: "Tottori",
  //   name: "Tottori University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Tottori",
  //   name: "Tottori Language School",
  //   classification: "Japanese Language School",
  //   score: "least 460 points",
  //   website: "",
  // },

  // Shimane
  // {
  //   prefecture: "Shimane",
  //   name: "Shimane University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Shimane",
  //   name: "Shimane Vocational Institute",
  //   classification: "Vocational School",
  //   score: "least 470 points",
  //   website: "",
  // },

  // Okayama
    {
    prefecture: "Okayama",
    name: "Okayama University of Science Intensive college entrance exam",
    classification: "University",
    score: "*",
    website: ""
  },
  {
    prefecture: "Okayama",
    name: "Okayama University of Science Intensive Japanese Language Program",
    classification: "University",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okayama",
    name: "Okayama Institute of Languages",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okayama",
    name: "JAPAN IT BUSINESS COLLEGE",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Hiroshima
   {
    prefecture: "Hiroshima",
    name: "Fukuyama International Academy of Languages",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Hiroshima",
    name: "IGL Medical and Welfare College Japanese Language Department",
    classification: "Vocational School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hiroshima",
    name: "Hiroshima International Business College Japanese Language Course",
    classification: "Vocational School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Hiroshima",
    name: "Mihara International Academy of Languages",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Yamaguchi
  {
    prefecture: "Yamaguchi",
    name: "Ube Frontier University",
    classification: "University",
    score: "*",
    website: "",
  },

  // Tokushima
  // {
  //   prefecture: "Tokushima",
  //   name: "Tokushima University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Tokushima",
  //   name: "Tokushima Vocational School",
  //   classification: "Vocational School",
  //   score: "least 470 points",
  //   website: "",
  // },

  // Kagawa
  // {
  //   prefecture: "Kagawa",
  //   name: "Kagawa University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Kagawa",
  //   name: "Kagawa Language School",
  //   classification: "Japanese Language School",
  //   score: "least 460 points",
  //   website: "",
  // },

  // Ehime
  // {
  //   prefecture: "Ehime",
  //   name: "Ehime University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Ehime",
  //   name: "Ehime Vocational School",
  //   classification: "Vocational School",
  //   score: "least 470 points",
  //   website: "",
  // },

  // Kochi
  // {
  //   prefecture: "Kochi",
  //   name: "Kochi University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Kochi",
  //   name: "Kochi Language School",
  //   classification: "Japanese Language School",
  //   score: "least 460 points",
  //   website: "",
  // },

  // Fukuoka
    {
    prefecture: "Fukuoka",
    name: "Kyushu Sangyo University",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Kurume University Intensive Japanese Course",
    classification: "University",
    score: "*",
    website: ""
  },
  {
    prefecture: "Fukuoka/Tokyo/Hyogo",
    name: "Japan University of Economics",
    classification: "University",
    score: "least 525 points",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Aso Foreign Language Tourism And Patissier College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Aso College of Business & Information Japanese Language Course",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Aso College of Automotive Engineering And Technology Japanese Language Course",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Fukuoka Foreign Language College",
    classification: "Vocational School",
    score: "*",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "IROHA Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Nishinihon International Education Institute",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Japan International Language Academy Fukuoka School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Fukuoka International Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Fukuoka",
    name: "Fukuoka Japanese School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },

  // Saga
  {
    prefecture: "Saga",
    name: "Kyushu Ryukoku Junior College",
    classification: "Junior College",
    score: "*",
    website: "",
  },
  {
    prefecture: "Saga",
    name: "Japanese Cultural Education Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Nagasaki
  {
    prefecture: "Nagasaki",
    name: "Nagasaki University Japanese Language and Culture Program",
    classification: "University",
    score: "*",
    website: "",
  },
  {
    prefecture: "Nagasaki",
    name: "Asahi Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: "",
  },

  // Kumamoto
  // {
  //   prefecture: "Kumamoto",
  //   name: "Kumamoto University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Kumamoto",
  //   name: "Kumamoto Language School",
  //   classification: "Japanese Language School",
  //   score: "least 460 points",
  //   website: "",
  // },

  // Oita
  {
    prefecture: "Oita",
    name: "Ritsumeikan Asia Pacific University",
    classification: "University",
    score: "*",
    website: "",
  },

  // Miyazaki
  // {
  //   prefecture: "Miyazaki",
  //   name: "Miyazaki University",
  //   classification: "University",
  //   score: "*",
  //   website: "",
  // },
  // {
  //   prefecture: "Miyazaki",
  //   name: "Miyazaki Language School",
  //   classification: "Japanese Language School",
  //   score: "least 460 points",
  //   website: "",
  // },

  // Kagoshima
  {
    prefecture: "Kagoshima",
    name: "The International University of Kagoshima",
    classification: "University",
    score: "least 525 points",
    website: "",
  },
  {
    prefecture: "Kagoshima",
    name: "Kagoshima Womens Junior College",
    classification: "Junior College",
    score: "least 525 points",
    website: "",
  },

  // Okinawa
  {
    prefecture: "Okinawa",
    name: "University of the Ryukyus General Education Courses",
    classification: "University",
    score: "least 500 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "College of Okinawa Academy Department of Japanese Language",
    classification: "Vocational School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "SAELU Gakuin",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "Japan Institute of Culture and Economics by Gores Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "Nichia Foreign Language Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "Step World Japanese Language School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "JSL Nippon Academy,Okinawa",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "Cross Cultural Communication Center Japanese School",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
  {
    prefecture: "Okinawa",
    name: "Okinawa JCS Academy",
    classification: "Japanese Language School",
    score: "least 315 points",
    website: ""
  },
];

export { colleges };
