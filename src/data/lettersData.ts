export interface FriendLetter {
  id: string;
  name: string;
  nickname?: string;
  avatarUrl?: string;
  photoWithCaca?: string;
  constellationCoords: { x: number; y: number };
  snippetQuote: string;
  letterMarkdown: string; // Formatted text extracted from [name].pdf
  pdfUrl?: string; // Formatted PDF path
  originalMedia?: {
    type: "pdf" | "image";
    url: string; // Path to original file (e.g., "/letters/Mui-original.jpg")
  };
  audioVoiceNoteUrl?: string;
  colorAccent?: string;
}

export interface MemoryPhoto {
  id: string;
  imageUrl: string;
}

export const FRIEND_LETTERS: FriendLetter[] = [
  {
    "id": "ason",
    "name": "Ason",
    "avatarUrl": "/photos/ason-avatar.svg",
    "photoWithCaca": "/photos/caca-ason.svg",
    "constellationCoords": {
      "x": 36,
      "y": 68
    },
    "snippetQuote": "Cuman mau say thank you udah temenan 10 tahun ini. Thank you udah kenalin gua ke Nat, semoga lu bisa cepet dapat jodoh. Thank you sudah mendengarkan curhatan gua dari awal kita kenal.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHAPPY BIRTHDAY CACA, WUATB Cuman mau say thank you udah temenan 10 tahun ini. Thank you udah kenalin gua ke Nat, semoga lu bisa cepet dapat jodoh. Thank you sudah mendengarkan curhatan gua dari awal kita kenal. Sorry kalo hubungan yang lu kasih ke gua gabisa gua jagain dengan baik. Sorry ya kalo selama temenan ada salah ngomong hehe. Wish aku tetap sayang keluarga dan orang–orang yang ada di sekitar. Jangan lupa sama aku karena gua orang paling keren, panjang umur,, sehat selalu, konten TikTok dan YouTube tetap lancar. GUA MASIH BERHARAP LU DATENG DI WISUDA GUA !!! HERMES!!! Ya intinya kalo lu ga bisa dateng juga gapapa yang penting doa SEMOGA CEPAT DAPAT JODOH!!!!",
    "pdfUrl": "/letters/Ason.pdf",
    "originalMedia": {
      "type": "image",
      "url": "/letters/Ason%20Original.JPG"
    },
    "colorAccent": "#38BDF8"
  },
  {
    "id": "bima",
    "name": "Bima",
    "avatarUrl": "/photos/bima-avatar.svg",
    "photoWithCaca": "/photos/caca-bima.svg",
    "constellationCoords": {
      "x": 48,
      "y": 62
    },
    "snippetQuote": "Lu salah satu cewek yang gua bisa percaya kalo gua di tempat yang aman buat cerita... Thank you for hijacking my existential crisis.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHappy Birthday Seng Lu si niat banget ya, minta gua buat tulis hal kebaikan yang udah lu lakuin. Makasih buat kamu yang udah dengerin keluh kesah aku di kehidupan Prabowo ini yang bentuknya dalam emosi. Lu salah satu cewek yang gua bisa percaya kalo gua di tempat yang aman buat cerita. Satu hal yang gua senengin itu kalo lu udah mulai cerita,kayak ada aja gitu cerita bodoh yang udah lu lakuin, jujur gua seneng banget ada topping di dunia gua yang hampa banget ini. Gua gapernah merasa terbebani sama hal itu tetep jadi kayak gitunya <3 Kesan lu ke gua si kebanyakan hal bodoh ya…… Jadi jujur gua gatau mau nulis apa. Thank you for hijacking my existential crisis. Sekali lagi, Happy Birthday Seng",
    "pdfUrl": "/letters/Bima.pdf",
    "originalMedia": {
      "type": "image",
      "url": "/letters/Kak%20Bima%20Original.jpg"
    },
    "colorAccent": "#F59E0B"
  },
  {
    "id": "ci-jane",
    "name": "Ci Jane",
    "avatarUrl": "/photos/ci-jane-avatar.svg",
    "photoWithCaca": "/photos/caca-ci-jane.svg",
    "constellationCoords": {
      "x": 62,
      "y": 66
    },
    "snippetQuote": "Selama aku kenal sama kamu, aku tau kamu orangnya ga fake sama sekali! Like honestly ga semua orang bisa punya that kind and genuine heart like yours.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHappy Birthday Caca\n\nhappyy birthday dear Cacaaaa my lovelyyy!!!! may this year’s birthday be a year filled with so many beautiful things, exciting opportunities, and moments that remind you how loved you are 🥹 if you’re asking me about apa momen kebaikan kamu, jujur my dory brain ga inget when and how… tapi for sure i pernah literally impressed by you hehe. kayanya it’s when you did something for someone is when i realized that YOU as a person km bener bener tuluuussss and your willingness to do kindness is what impressed me 🥹🥹 selama aku kenal sama kamu, aku tau kamu orangnya ga fake sama sekali!! never a single thought about that. like honestly ga semua orang bisa punya that kind and genuine heart like yours!!! ❤ jadi semoga semua hal baik yang kamu kasih ke orang lain, somehow finds its way back to you in the most unexpected and beautiful ways. i hope you will always be surrounded by people who appreciate you juga, celebrate you, and remind you how special you are. and i hope you never feel like you have to change parts of you just because the world can sometimes be unkind. stay genuine, never stop being YOU 🤎 so proud of you and everything you’ve become, and i can’t wait to see all the beautiful things waiting for you ahead!! love youuu alwaysss 🥹🫶🏻 happy birthday once again, cinta!! 🎂 ❤ loveee, Jane!!",
    "pdfUrl": "/letters/Ci%20Jane.pdf",
    "colorAccent": "#F59E0B"
  },
  {
    "id": "clea",
    "name": "Clea",
    "avatarUrl": "/photos/clea-avatar.svg",
    "photoWithCaca": "/photos/caca-clea.svg",
    "constellationCoords": {
      "x": 20,
      "y": 22
    },
    "snippetQuote": "Kak Caca punya kemampuan untuk bikin orang merasa nyaman jadi dirinya sendiri. Kak Caca ceria, random, dan membuat momen biasa jadi nggak terasa terlalu biasa.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nKak Cacaaa, Sebenarnya aku agak bingung mau mulai dari mana. Kita baru bener-bener deket setelah seproduksi di Rangers Maestro, and somehow dalam waktu yang menurutku nggak terlalu lama itu, ada cukup banyak momen sama Kak Caca yang sampai sekarang masih aku inget. Mungkin karena kebanyakan momennya juga random banget. Kayak jalan-jalan kecil nggak jelas, ketawa karena sesuatu yang sebenernya nggak lucu-lucu amat, tiba-tiba melakukan hal random, atau cuma ngobrol gajelas sampai lupa waktu. Dan salah satu yang paling aku inget ya subuh itu, waktu kita kelar makan burjo jam 4 pagi dan malah duduk di mobil sempit-sempitan di parkiran apart ka caca, bukannya balik malah disana. Udah gitu di teleponin UMN gara gara dikira ilang 😭😭😭 , sama-sama udah ngantuk parah, tapi masih sempet bacain surat dan review hadiah sama bunga ala influencer. Kalau dipikir sekarang, lucu banget demi, aku nulis ini sambil ngakak. We barely had any energy left, tapi masih aja ada bahan buat dibahas 😭 Dan mungkin justru dari hal-hal kecil kayak gitu aku merasa, “Oh, ternyata aku seneng ya punya Kak Caca di hidup aku.” Aku suka cara Kak Caca yang gampang banget bergaul dan gampang bikin suasana jadi hidup. Kak Caca juga tipe orang yang punya banyak cerita, dan somehow aku seneng aja bisa jadi salah satu orang yang Kak Caca ajak cerita. Walaupun Kak Caca lebih tua dari aku, aku nggak pernah merasa ada jarak yang bikin aku harus bersikap tertentu. Rasanya ya... ngobrol aja. Kayak teman. Dan I really appreciate that. Apalagi sekarang kalau dipikir-pikir, kita udah lama banget nggak ketemu, terakhir pas di sms makan acaii and life update. Sejak Kak Caca lulus dan balik ke Batam, rasanya hidup masing-masing juga jalan terus. Jadi mungkin ada banyak hal tentang hidup Kak Caca yang sekarang aku nggak tahu lagi. Aku cuma tau kakak ngapain dari ig story full review itu AHHAHAHA. Tapi lucunya, meskipun kita nggak terlalu lama kenal dan sekarang juga udah jarang ketemu, ada beberapa momen sama Kak Caca yang masih gampang banget muncul di kepala aku. I guess some people don't need that much time to leave an impression. Kalau balik ke pertanyaan dari surat ini, tentang kalau suatu hari ini benar-benar jadi hari terakhir Kak Caca, (sumpah nangis dikit nulis ini) aku rasa yang paling ingin aku bilang adalah: thank you for making the relatively short time we had together feel meaningful. Aku nggak punya cerita bertahun-tahun tentang Kak Caca. Nggak punya ratusan kenangan yang bisa aku ceritain satu-satu. Tapi yang aku punya adalah beberapa momen kecil yang genuinely aku nikmati.\n\nDan menurutku, itu juga salah satu bentuk keberartian seseorang. Kadang kita nggak perlu mengenal seseorang selama bertahun-tahun untuk bisa merasa senang pernah bertemu mereka. Kadang cukup dengan beberapa jalan kecil, obrolan random, ketawa karena hal bodoh, dan beberapa malam yang harusnya dipakai pulang tapi malah dihabiskan buat randomsss. Kak Caca mungkin nggak sadar, tapi menurutku Kak Caca punya kemampuan untuk bikin orang merasa nyaman jadi dirinya sendiri. Kak Caca ceria, random, gampang dekat sama orang, dan punya cara sendiri untuk membuat momen biasa jadi nggak terasa terlalu biasa. And I'm glad I got to experience that. Aku juga nggak tahu apakah selama kenal sama aku, ada sesuatu dari aku yang berarti buat Kak Caca. Tapi kalau dari sisi aku, Kak Caca definitely left something. Bukan sesuatu yang besar atau dramatis. Just good memories. Memories yang kalau tiba-tiba keinget bikin aku senyum sendiri dan mikir, “anjir, dulu gue sama Kak Caca pernah serandom itu ya.” Dan mungkin kalau suatu hari nanti kita ketemu lagi setelah lama banget nggak ketemu, aku harap rasanya masih sama. Masih bisa ngobrol random, ketawa karena hal nggak jelas, dan catch up seolah jaraknya nggak pernah sejauh itu. So, Kak Caca, thank you. Thank you for the stories, the random moments, the little walks, the stupid laughs, and for treating me like a good friend. Aku mungkin nggak mengenal Kak Caca selama orang-orang lain di hidup Kak Caca, tapi aku cukup beruntung pernah ada di salah satu bagian kecil dari perjalanan hidup Kak Caca. And honestly, I'm really glad that I was. Love you, Kak Caca. Jangan lupa kalau di sini ada satu manusia yang masih inget sama kelakuan random kita 😭 ❤ . Luv youuu so muchh ka cacaaa. Missed uuuu! P.s Plis jangan kasih tema gini lagi.. ga mau banget mikir gitu 🥹 (Semoga segera dapet jodoh, nikah amin) Last but not least. Please, kalau hari itu datang, jangan berubah terlalu banyak ya Kak! Tetap jadi Kak Caca yang random, ceria, suka cerita, dan somehow selalu punya cara untuk bikin momen biasa jadi menyenangkan.\n\nAku harap di umur yang baru ini, Kak Caca ketemu banyak hal baik, banyak alasan untuk ketawa, banyak orang yang sayang sama Kak Caca, dan tentunya banyak momen random yang nantinya bisa diceritain lagi. I hope life is kind to you, Kak. Wherever you are, whatever you’re doing, semoga Kak Caca selalu punya alasan untuk merasa bahwa hidup ini worth living and worth celebrating. And maybe someday, kita bisa ketemu lagi, catch up tentang hidup masing-masing, terus somehow berakhir ketawa karena sesuatu yang nggak jelas seperti dulu. Until then, take care, Kak. Happy birthday, Kak Caca. 🥳 ❤ Thank you for existing, and thank you for letting me be a small part of your story. I’m really, really glad I got to know you. Love you always, [Clea] <3",
    "pdfUrl": "/letters/Clea.pdf",
    "colorAccent": "#EC4899"
  },
  {
    "id": "diana",
    "name": "Diana",
    "avatarUrl": "/photos/diana-avatar.svg",
    "photoWithCaca": "/photos/caca-diana.svg",
    "constellationCoords": {
      "x": 82,
      "y": 38
    },
    "snippetQuote": "Mungkin aku ga pernah bilang tapi aku tuh banyak belajar dari kamu... super caring ke orang lain padahal tingkahnya suka kayak bocil. Chacha tuh orang yang kalo gaada dia ya jadi sepi gitu lhoo.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHi Chaca! First of all, HAPPY BIRTHDAY <3 Semoga lebih banyak lagi momen bahagianya di umur yang sekarang sehat-sehat Cha… Jujur kangen deh 😞 What if “It’s your Funeral Day?” Amit-amit Hal yang paling aku kangenin pasti yappingan kamu yang gaada abisnya itu, your silly acts too. Ada aja deh tingkah di luar nalarnya. Mungkin aku ga pernah bilang tapi aku tuh banyak belajar dari kamu. Tentang gimana bersikap bodo amat tentang hal–hal yang ga perlu terlalu dipeduliin, cara Chaca temenan sama siapapun, super caring ke orang lain padahal tingkahnya suka kayak bocil. Chaha tuh orang yang kalo gaada dia ya jadi sepi gitu lhoo #ASEK UNFORTGETTABLE MOMENT Waktu kita ke Blok M!! SOO FUM. Dari terang terus kita ke danau cuman duduk dan ngobrolin apapun itu. Simple tapi aku suka. Please take care of yourself and be happy as much as you can cha! Long live Chaa,, males ah perandaian kayak gitu euyy",
    "pdfUrl": "/letters/Diana.pdf",
    "originalMedia": {
      "type": "pdf",
      "url": "/letters/Kak%20Diana%20Original.pdf"
    },
    "colorAccent": "#FB7185"
  },
  {
    "id": "fabian",
    "name": "Fabian",
    "avatarUrl": "/photos/fabian-avatar.svg",
    "photoWithCaca": "/photos/caca-fabian.svg",
    "constellationCoords": {
      "x": 68,
      "y": 22
    },
    "snippetQuote": "You are one of the reasons I’m still here in this world. You were there for me at my lowest... You inspired me to stay strong, kind, and honest and never give up.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nWhen I first met Kak Caca back in Agrabah, I only saw her from afar since I was still in the Blackman Division. My first impression was simply that she seemed like a good person. Then Wonka started, and as I got to know her more, my first impression turned out to be completely true: she really is that good, honest, and kind. She has always been a wonderful presence in my life. If you were sitting right here in front of me today, Kak, I would tell you that you are one of the reasons I’m still here in this world. You were there for me at my lowest. You inspired me to stay strong, kind, and honest and most importantly, to never give up, even when everything and everyone seems to be against you. You showed me that you can still choose to be a good person through it all. I’ve always admired how, even when life was falling apart around you, you remained loving and held onto your faith in Allah. That’s something I still struggle with myself, and it’s honestly one of the things I respect and love most about you. My biggest regret will always be not being able to see you one last time before you left. But I need you to know how deeply supportive, honest, loyal, funny, and incredible you were. I never want you to think for a second that you weren't enough, or that you were ever a bad friend. I love you, Kak Caca, and I always will. You are the most amazing friend I’ve ever had in this life. I miss you, and I pray you are at peace and resting easy over there. P.S there's an actual letter that I wrote but I will give it to you when you’re here.",
    "pdfUrl": "/letters/Fabian.pdf",
    "colorAccent": "#EAB308"
  },
  {
    "id": "husen",
    "name": "Husen",
    "avatarUrl": "/photos/husen-avatar.svg",
    "photoWithCaca": "/photos/caca-husen.svg",
    "constellationCoords": {
      "x": 70,
      "y": 40
    },
    "snippetQuote": "You’re the kind of person yang fun buat diajak hangout, tapi at the same time nggak pernah terasa melelahkan... being a good friend doesn’t always mean doing something extraordinary. Sometimes, you just being you was enough.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nCha, I think one of the first things I would remember is how easy it was to have you around. You’re the kind of person yang fun buat diajak hangout, tapu at the same time nggak pernah terasa melelahkan. Bahkan kalau cuman duduk, ngobrol random, ketawa karena hal nggak penting, atau even just spending time bareng, somehow it’s always enough. I think that's a really special quality to have in a friendship, because not everyone can make you feel like you don’t have to do anything or be anyone else to enjoy their presence. And I know you’re a good person. Maybe I don’t always say it and maybe you don’t even realize how much the little things you do can mean to people around you. So if one day I had to talk about you and everything you meant to me, I’d say that I’m grateful I got to know you. Grateful that somewhere along the way, you became one of those people whose presence I could just enjoy without having to think too much about it. And I hope you know that being a good friend doesn’t always mean doing something extraordinary. Sometimes, you just being you was enough.",
    "pdfUrl": "/letters/Husen.pdf",
    "originalMedia": {
      "type": "image",
      "url": "/letters/Husen%20Original.jpg"
    },
    "colorAccent": "#10B981"
  },
  {
    "id": "jes",
    "name": "Jes",
    "avatarUrl": "/photos/jes-avatar.svg",
    "photoWithCaca": "/photos/caca-jes.svg",
    "constellationCoords": {
      "x": 32,
      "y": 24
    },
    "snippetQuote": "Ci Cha tuh salah satu orang yang bener-bener bawa warna... Jiwa Ci Cha tuh polos dan ceria banget. Kayak di mana pun Ci Cha ada, pasti ada aja sesuatu yang bikin suasana jadi cair.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nCi Cha, kalo beneran ini surat yang aku tulis untuk Ci Cha yang udah pergi, jujur aku masih nggak tau harus mulai dari mana. Rasanya aneh harus nulis surat untuk orang yang biasanya masih bisa diajak ngobrol, ketawa, tapi sekarang cuma bisa aku inget lewat kenangan. First of all, Ci Cha tuh salah satu orang yang menurut aku gampang banget bikin suasana jadi lebih enak. Humble, manis, gampang diajak temenan, selalu support apa pun yang orang lain lakuin, dan somehow selalu punya cara sendiri buat bikin orang ketawa. Bahkan tingkah bodoh dan ceroboh Ci Cha yang kadang bikin geleng kepala itu yang bikin Ci Cha beda dan gampang diinget wkwkwk. Aku juga kadang mikir, kok bisa orang punya energi sebanyak itu? Jiwa Ci Cha tuh polos dan ceria banget. Kayak di mana pun Ci Cha ada, pasti ada aja sesuatu yang bikin suasana jadi cair. Apalagi dulu pas kita masih sering bareng di radio. Sekarang malah udah jarang banget ketemu dan udah nggak seintens dulu:( Kalau ngomongin hal yang menginspirasi, mungkin bukan sesuatu yang besar. Tapi lebih ke cara Ci Cha jalani hidup dengan sederhana, jadi diri sendiri, dan tetap bisa bawa energi positif ke orang-orang di sekitar. Ci Cha mungkin nggak sadar, tapi keberadaan Ci Cha tuh punya cara sendiri buat bikin orang ngerasa nyaman dan happy. Dan kalau beneran ini hari terakhir Ci Cha di dunia, aku cuma berharap satu hal: semoga selama hidup Ci Cha, Ci Cha tahu kalau Ci Cha seberharga itu. Semoga Ci Cha juga udah ketemu belahan jiwa sebelum hari ini datang. Seseorang yang benar-benar sayang, perhatian, dan bisa menghargai Ci Cha sepenuhnya. Karena menurut aku, Ci Cha pantas banget dapet orang yang bisa menjaga dan menyayangi Ci Cha sebesar orang-orang di sekitar Ci Cha menyayangi Ci Cha. Dan kalau akhirnya Ci Cha memang udah pergi, aku yakin banget Ci Cha pasti masih main-main di atas sana dan ketawa. Senyum Ci Cha juga pasti bakal jadi salah satu hal yang orang inget. So... kalau surat ini memang dibaca Ci Cha di hari seperti itu, aku cuma mau bilang thank you. Thank you udah pernah jadi Ci Cha yang seperti ini. Yang lucu, ceria, polos, supportive, humble, dan kadang agak bodoh juga wkwkwk. Thank you udah pernah hadir dan bikin banyak momen jadi lebih seru. Tapi untungnya sekarang belum waktunya surat ini jadi surat perpisahan beneran yaa wkwkw. Happy birthday ya, Ci Cha Hope you always stay exactly like this. Tetap jadi Ci Cha yang ceria, random, baik, dan bisa bikin orang-orang di sekitar Ci Cha ikut happy. Semoga tahun ini dan tahun\" berikutnya banyak banget hal baik yang datang ke Ci Cha. And please, jangan berubah terlalu banyak ya. Karena Ci Cha yang sekarang aja udah seberharga itu buat orang-orang yang sayang sama Ci Cha",
    "pdfUrl": "/letters/Jes.pdf",
    "originalMedia": {
      "type": "pdf",
      "url": "/letters/Jes%20Original.pdf"
    },
    "colorAccent": "#A855F7"
  },
  {
    "id": "ka-echa",
    "name": "Ka Echa",
    "avatarUrl": "/photos/ka-echa-avatar.svg",
    "photoWithCaca": "/photos/caca-ka-echa.svg",
    "constellationCoords": {
      "x": 30,
      "y": 40
    },
    "snippetQuote": "Caca itu gak pelit sama sekali dan gak pernah pamrih, semua materi dan perhatian yang diberikan sama kamu, kamu gak meminta imbalan... aku sebagai temen kamu bangga dan itu bisa jadi hal yang menginspirasi.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHalo Caca yang gak lebih cantik dari gua Selamat ulang tahun yaa sebelumnya, ini gua kasih wish dulu yaa sebelum ke requestan lu. Semoga lu panjang umur, dilimpahi kesehatan, perlindungan, semoga di hari-hari yang lagi tidak mengenakan atau hari hari yang berat, kamu selalu diberikan kekuatan. Semoga kamu semakin dewasa di umur yang baru ini. Nikmatin dulu masa masa muda ini yeah, gausah terlalu khawatir dengan banyak hal, hal baik akan datang sendiri selama kita menanam yang baik juga. Semoga dalam karir kamu, kamu diberikan berkat dan karir yang bagus juga, semoga soon bisa diberikan pekerjaan yang cocok ya ca! Semoga dalam kehidupanmu, dijauhkan dari orang orang yang ingin menyakiti kamu (Amin bgt ini mah). dan terakhir semoga kita semua bisa temenan sampai tua yaaaaaaa!!! Mungkin gua belom terlalu lama temenan sm lu. tapi yaa boleh lah. Dari awal ketemu sebagai intern jujur kok kek susah di ajak ngmg, ternyata emg agak tolol aja (becanda). Tapi setelah tau beberapa hal tentang kamu dan kehidupanmu dari ke-oversharingan mu itu wkwkwkwkwk aku tau kamu anak dengan pribadi yang kuat, yang gak gampang nyerah juga walaupun kamu bisa aja nyerah tp kamu masih mau mengusahakan sesuatu, caca itu gak pelit sama sekali dan gak pernah pamrih, semua materi dan perhatian yang diberikan sama kamu, kamu gak meminta imbalan. Kamu salah satu orang yang ceria dan gampang sedih bersamaan (tapi kamu balut sm bercanda dan ketawa lagi karena mungkin itu coping kamu). Salah satu orang yang pinter bersosialisasi juga, kadang suka amazed karena kayak kok bisa ya tbtb deket dan ngobrol sm banyak orang jadi gampang nyari channel LOL. Selama temenan dengan kamu, mungkin aku belom pernah tau sepenuhnya tentang kamu ca tp aku yakin dengan segala masalah keluarga, cinta, dan struggle pribadi kamu, kamu gak mencoba kabur dari semua itu dan aku sebagai temen kamu bangga dan itu bisa jadi hal yang menginspirasi. Kamu selalu menghadapi itu dengan tegar. Apapun yang kamu alami di hidup ini, percaya deh itu akan berbuah indah dan jangan lupa bersyukur setiap harinya juga yaaaaa sama Tuhan. Aku juga amazed sama kamju yang selalu perhatian sama orang lain dan kamu mempunyai kapasitas itu apalagi ke orang2 yang deket sama kamu. Pokoknya salah satu orang yang gak banyak ribet dan gak macem2. Aku bangga kamu sudah menjalani hidup ini dengan baikk, jadi jangan lupa juga menghargai diri sendiri ya caaa!!!!! Babayyy sampai ketemu kapan kapan gril Love ya, xoxo",
    "pdfUrl": "/letters/Ka%20Echa.pdf",
    "originalMedia": {
      "type": "pdf",
      "url": "/letters/Ka%20Echa%20Original.pdf"
    },
    "colorAccent": "#F97316"
  },
  {
    "id": "ka-pier",
    "name": "Ka Pier",
    "avatarUrl": "/photos/ka-pier-avatar.svg",
    "photoWithCaca": "/photos/caca-ka-pier.svg",
    "constellationCoords": {
      "x": 18,
      "y": 36
    },
    "snippetQuote": "Intinya adalah saya bersyukur punya teman yg baik bgt dan sangat outgoing... kekurangan lu merupakan kekuatan anda dimana anda bisa bawa santai segala hal dan bikin orang cair.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nselamat pagi (tergantung timezone) Caca yg kocak, Ini saya Pier, Semoga di usia kamu yg TUA ini... makin sehat makin bijak dan makin baik Maaf ya anda minta tulisan fisik, tp jujur males hehe Intinya adalah saya bersyukur punya teman yg baik bgt dan sangat outgoing. Sebagai teman jujur lu menyenangkan bgt, baek jg... Tp jujur nih ya salah satu pengalaman paling gua kesel sama lu adalah pada saat Dara, Suci sama Owen pertama datang dimana lu serius bgt alias BECANDA SEHARIAN yg bikin kesannya ni kantor kaga serius, dan itu membuat gua kesel bgt karena jadi susah bgt ngasih tau Owen buat kerja yg bener...Tp in a way kekurangan lu merupakan kekuatan anda dimana anda bisa bawa santai segala hal dan itu bagus. Karena lu bisa bgt ngebuat org2 cair dengan sikap lu itu. Keep being the life of the party yes dan keep being kind dan royal asek. Selalu senang ketika lu randomly beli2 makan buat kita di kantor, I think that's the testament of how kind u are. Jujur kaga tau struggle lu apah karena kita agak jarang ngobrol lagi tp apapun itu gua harap lu bisa melewati dengan baik. Pertanyaan2 tentang masa depan ttg pekerjaan, jodoh (YG KAYAKNYA INI GARIS BAWAH BGT DAN MENGHIBUR BGT SUMPAH BERKAITAN DENGAN LU), keluarga, finansial dan yg lain. I genuinely hope you may have not only a happy life, but also meaningful one okeh? Anjay keren ga gua. Apapun cita2 lu ke depan gua berdoa Tuhan berkati jg. Salam untuk ms. Yani.",
    "pdfUrl": "/letters/Ka%20Pier.pdf",
    "originalMedia": {
      "type": "pdf",
      "url": "/letters/Kak%20Pier%20Original.pdf"
    },
    "colorAccent": "#6366F1"
  },
  {
    "id": "mui",
    "name": "Mui",
    "avatarUrl": "/photos/mui-avatar.svg",
    "photoWithCaca": "/photos/caca-mui.svg",
    "constellationCoords": {
      "x": 42,
      "y": 79
    },
    "snippetQuote": "Dihari ke 26 ni, terima kasih selalu menjadi orang yang baik. Pas tu aku masuk rumah sakit kamu mau bantu jaga sama rawat aku, makasi ya... Terima kasih sudah pernah hadir di dunia ini.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nBanyak kali request mu babi. Happy birthday! Wish you best at all!! Dihari kematian mu yang ke 26 ni, terima kasih selalu menjadi orang yang baik. Selalu menjadi dirimu sendiri yang freak. Kamu keknya orang baik kok 🙂 ... selalu mau bantu teman keknya. Tapi pas tu aku masuk rumah sakit kamu mau bantu jaga sama rawat aku, makasi ya. Kita juga saling support each other which is aku husein kamu. Definisi we listen we don't judge..Tapi kami bedua judge kamu sih 😌 Kau tak menginspirasi orang la Cha jangan apa kali kan. Tapi mungkin ada sikit 󰴵 gatau buat siapa yang merasa aja. Sebagai teman yang baik dan keren, akan ku hantam orang yang menjelek-jelekan mu setelah kamu mati karena seharusnya ga ada. Tak banyak yang bisa ku ucapkan karena jujur bingung juga kalau dah mati yauda la namanya juga hidup. Terima kasih sudah perna hadir di dunia ini. Terima kasih sudah menjadi bagian dari temanku. Happy birthday Cha, semakin tua semakin berani ya! With love, Mui",
    "pdfUrl": "/letters/Mui.pdf",
    "originalMedia": {
      "type": "image",
      "url": "/letters/Mui%20Original.PNG"
    },
    "colorAccent": "#14B8A6"
  },
  {
    "id": "palen",
    "name": "Palen",
    "avatarUrl": "/photos/palen-avatar.svg",
    "photoWithCaca": "/photos/caca-palen.svg",
    "constellationCoords": {
      "x": 24,
      "y": 50
    },
    "snippetQuote": "Kak Caca, you may not know tp aku bnrn regen krn Kak Caca... I'm extra, really, very, extremely, ultra grateful that you are my friend and my sister.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHappy Birthday Kak Caca !!! I wanna start this letter off by saying happy birthday and obviously wishing only the best for you. If you dont remember, kita pertama kali (as far as i remember) ada interaction di radio itu pas makrab and i was your guardian angel. and obviously it was quite hard for me krn kita ga dekat pas itu and i found out that kamu trnyata dekat sm suc and ak jg dekat sm suc so i was basically trying to fit in there tp trnyata it was hard yaaaa wkwkkwwk But, all's good. tapi one fun but embarrassing fact was that pas itu aku sempat usulin ayo kita ber3 sekamar in that queen bed tp KAK CACANYA PINDAHHH, so i was q devastated abt that. tapi our second encounter was taylor's eras tour dan dr sana kita jd banyak ngobrol yaa. honestly there's a lot of thing im thankful for tapi ini yg paling most important and the first one. kak caca, you may not know tp aku bnrn regen krn kak caca. kak caca buat ak jd nyaman sm anak radio (well not all of them, but some) and i felt the fun that people kept saying ya because of youu. ya di masa itu aku masih blm bs sebut radio rumah krn i still feel distant from most lah dan jg dimasa itu aku jg blm sedekat itu sm kak caca tp i felt the fun in it that im willing to try for another year. so obviously it was really devastating when you left krn aku br banget nyaman. but all's good krn trnyata after you left radio, kita masih dekat dan i can say jadi makin dekatt. the second thing im really grateful for was the fact that kamu dan ason ngajak aku muluu buat hangouts n foods etc. disana meskipun aku ganyaman sm radio, tp aku nyamannnnn banget sm kak caca plus ason. kek i still remember the fun that we had pas itu. aku bnrn enjoy the time with youu. the third thing im grateful for was aku senanggg kak caca trust me sampai mau cerita hal\" ttg kak caca ke aku. it may seem like not a big deal, but it is for me. i was barely there di radio but you trusted me enough to tell things about you to me. dan im really grateful krn kak caca also became one of my trusted people jugaaa, aku nyaman banget cerita ke kak cacaa. lastly, im just extra, really, very, extremely, ultra grateful that you are my friend and my sister. i love you that much and i hope you know it. i may not tell you a lot of things now because of our distance, tp deep in my heart youre still the first few people that i wanna talk to. its not like i dont wanna talk to you, but i just dont wanna talk to anyone. and not because i hate anyone, but i just dont want people to feel the burden that im having. and i just hope you know that. i love you and hope you have the best life ahead. Sincerely, Adek 🫶",
    "pdfUrl": "/letters/Palen.pdf",
    "colorAccent": "#38BDF8"
  },
  {
    "id": "rara",
    "name": "Rara",
    "avatarUrl": "/photos/rara-avatar.svg",
    "photoWithCaca": "/photos/caca-rara.svg",
    "constellationCoords": {
      "x": 76,
      "y": 52
    },
    "snippetQuote": "You meant so much simply because you were there... someone I could be completely myself around, and someone who turned ordinary days into memories.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHAPPY BIRTHDAY, CACA To my dearest Sakinah , Kalau aku harus nulis surat ini dengan membayangkan hari di mana aku harus mengenang kamu, kayaknya hal pertama yang muncul di kepalaku adalah, “ Gila, ternyata aku punya banyak ya momen sama Caca, but all of it still not enough ”. Jujurr, aku udah lupa banget bagaimana kita bisa kenalan pas di UMN Radio. But, I will always remember how people at UMN Radio dulu selalu bilang kita mirip. Padahal ya kalau dipikir-pikir kayaknya cuma gara-gara kita sama-sama pakai kerudung dan kacamata WKWKWK. At fi rst, I saw you as someone yang pendiem, tapi ternyata setelah kita dekat...ya Allah, ternyata kita sefrekuensi banget 😭😭 . And I think that’s how our friendship bloomed. Aku masih suka ingat momen-momen kita di studio, nyanyi sampai jungkir balik buat lagu Taylor Swift dan Olivia Rodrigo. Terus somehow, kita juga jadi safe place for each other buat cerita soal...ekhm...percintaan masing-masing. Aku dengan cerita Rama, dan kamu dengan Husein WKWKWK. Dan aku nggak mungkin lupa waktu kamu beliin aku tiket buat nonton documentary Taylor Swift di IMAX. Till this day aku masih grateful banget karena kamu kasih aku kesempatan untuk bisa punya salah satu momen paling seru yang pernah kita lewatin bareng. Kita sing along, dancing, heboh bareng... LITERALLY such a core memory for me.\n\nAnd of course, meet-up kita lainnya yang scheduled dan dadakan, kayak (1) pas liputan di JxB; (2) ketemuan di Plaza Blok M pas aku balik dari internship yang aku susulin kamu dan “ cowok kandungmu ” itu dan sehabis itu kita curhat panjang lebar di vroom vroom kamu, and (3) pas nonton Inside Out so suddenly, but somehow we still made it happen after lots of rescheduling. Rasanya lucu kalau inget-inget betapa banyaknya momen random kita, tapi justru hal-hal itu lah yang sampai sekarang masih aku ingat. Dan salah satu hal yang sampai sekarang bikin aku senyum adalah waktu kamu kirim video Tante Yani ngucapin happy birthday buat aku. I was genuinely SO HAPPY. Rasanya kayak anjay ini random banget tapi di saat yang sama aku merasa really loved and remembered. Kalau ada satu hal yang menurutku paling berarti dari kamu, mungkin bukan satu kebaikan atau satu kejadian tertentu. Tapi bagaimana selama ini aku bisa menjadi diriku sendiri kalau sama kamu. Aku nggak merasa harus malu, harus mikirin apakah aku terlalu heboh, terlalu random, terlalu banyak cerita, atau apapun itu. I can just be Rara. And I hope kamu juga selalu bisa seperti itu kalau sama aku. I hope you know that you never have to be anyone else around me either. Aku sebenarnya senang banget karena kita punya banyak kesempatan untuk spend time together. But, rasanya masih kureeengg yeah. Masih banyak banget yang belum kita coba, lho!? Kita bahkan belum kesampaian untuk nginep sampai sekarang WKWKWK. Sekarang kamu udah far far away di Jambi dan aku nggak tahu kapan kita bisa punya kesempatan itu lagi. And I’m also sorry, Ca. Karena aku tahu kamu sering banget memulai chat dengan, “Rara, kamu lagi sibuk nggak?” dan sering banget aku kasih jawaban dengan alasan. Sometimes I wish I could’ve been there for more of those little moments.\n\nAnd if this really were my last chance to tell you what you mean to me, I hope you know this: You have meant so much to me, not because you did some huge, life-changing thing. You meant so much simply because you were there. You gave me someone to laugh with, someone to scream Taylor Swift and Olivia Rodrigo songs with, someone to talk about crushes with, someone I could be completely myself around, and someone who turned ordinary days into memories that I still remember years later. I think sometimes we underestimate how much our presence means to other people because we don’t get to see what happens to those little moments after they’re over. But I remember them Caa, and I will always remember you. And I’m really, really grateful that somewhere along the way, UMN Radio gave me a friend who turned out to be so much more than the quiet girl I initially thought you were. I hope you know how loved you are, how much your presence means to the people around you, and how many little moments you’ve left in people’s lives without even realizing it. Thank you for being one of those people in mine. I hope wherever life takes us, we keep fi nding our way back to each other. So, happy birthday, Caa. Here’s to more random meet-ups, more stories, and hopefully... fi nally that sleepover WKWKWKWK. Love you always, Rara 💛",
    "pdfUrl": "/letters/Rara.pdf",
    "colorAccent": "#EC4899"
  },
  {
    "id": "shena",
    "name": "Shena",
    "avatarUrl": "/photos/shena-avatar.svg",
    "photoWithCaca": "/photos/caca-shena.svg",
    "constellationCoords": {
      "x": 58,
      "y": 80
    },
    "snippetQuote": "You didn’t really have to involve yourself, but you chose to care anyway. Aku bersyukur bisa bertemu dengan seseorang yang bisa show me what true kindness can look like.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHello there Kak Caca, it’s Shena here! :3 I think it’s really a unique concept that you’re doing for your birthday. Aku inget how letters meant so much to you, so glad I could write you on one of your special day. First of all, happy birthday! I wish you all the good things in life and more exciting things that will come to you one day. I really mean that from my heart. Karena aku inget waktu kita spend time together, it was all fun and somehow it felt like you’re one of the people that I think is genuinely yourself, without hiding anything behind how you express yourself. Kamu orangnya apa adanya, creative, humble, and very fun to talk to, especially one-on-one gitu. It felt like you were one of those people yang terasa kayak a sister that I never had. We met in quite a brief time and we don’t really see each other that often. Most of the times we met were because we had activities together, mostly organization stuffs. But even in that short amount of time, there are still little things about you that stayed with me till now. If the day you read this letter was your funeral day (which I really hope not), I think I would remember how you were someone who genuinely wanted to help me when I was going through something. It was considerate of you kak. I still remember how you tried to bring me and bestieku clarongg to be closer to the people around us, just because you wanted things to be better for us. Maybe it was just one moment, but to me, it showed a side of you that I really appreciated. I think that kind of kindness is something that not everyone would think to do or something I'd see often. You didn’t really have to involve yourself, but you chose to care anyway. And somehow, that’s what I remember most about you. The truth is, there were probably a lot of consideration surrounding that situation, sorry if I let you down in any way possible. But I want you to know that I’ve dealt with it as life goes on. So when I look back at that specific moment now, I don’t really think about how things turned out anymore. I think about how you were kind enough to try helping. Aku bersyukur bisa bertemu dengan seseorang yang bisa show me what true kindness can look like. I think God has sent a lot of different people into my life, in different situations and at different times. But you, Kak Caca, are one of those people that will leave a hint of warmth in my life, even if we only met briefly. Maybe we didn’t have that much time together, but the kindness you showed me is something I’ll remember. I’ll miss you a lot, wherever you are, and wherever life puts you. Please always appreciate yourself, because you bring the people around you joy and believe that you’re worthy of many good things in the future ahead of you. Keep being the light to the people around you, just like how you’ve been one for me. I hope this little letter can put on a smile on your face. I’ll always support you from afar. Love you lots, kakk. Bila nanti ada waktu, let's go catch up again!",
    "pdfUrl": "/letters/Shena.pdf",
    "colorAccent": "#EAB308"
  },
  {
    "id": "suci",
    "name": "Suci",
    "avatarUrl": "/photos/suci-avatar.svg",
    "photoWithCaca": "/photos/caca-suci.svg",
    "constellationCoords": {
      "x": 80,
      "y": 24
    },
    "snippetQuote": "Mulai dari awal aja kamu udah ngalah sama aku jadinya aku bisa visual, terus ngebantuin bikinnya juga... Jadi tanpa kamu sadar Cak kamu meng-inspire aku buat out of the box!",
    "letterMarkdown": "### Dearest Kak Caca,\n\nOMG CAKKK, siapa sangka kita bakal sedeket ini?!!! Inget banget kita rebutan kelompok buat jadi visual, ,amafkan aq yhhh 😭🫰 Kalau kamu nanya kebaikan yang kamu lakuin ke aku, udah pasti bejibun banget rilll. Mulai dari awal aja kamu udah ngalah sama aku jadinya aku bisa visual, terus ngebantuin bikinnya juga. Abis itu selalu sepeduli itu, kocak dan saja yang dibahas jadi bisa punya temen cerita yang bener-bener sefrekuensi dan the real moodboster semua orang. Then kamu juga bener-bener kreatif!! Jadi tanpa kamu sadar Cak kamu meng-inspire aku buat out of the box!! Yang paling utama sih emang sikap random kamu yang bikin geleng kepala, karena berasa aku yang lebih tua kadang KAOWKWOW but in a good way yaaach. Lastnya, kamu bantu aku buat keterima magang dan dikenalin orang-orang keren. Aku beneran bersyukur banget bisa kenal dan deket sama kamu Cak. Thank youu ya Caaakkk, udah jadi temen yang deket banget sama aku dan sabar ngadepin aku. Semoga kamu selalu dikelilingi orang yang baik sama kamu, lancar rejekinya, dan yang paling wadidaw ialah semoga kamu bertemu dengan jodoh yang sangat setara. 😝🤟 Hepi bday anddddd loveee u smm Cakk!!!!",
    "pdfUrl": "/letters/Suci.pdf",
    "originalMedia": {
      "type": "image",
      "url": "/letters/Suci%20Original.JPG"
    },
    "colorAccent": "#F59E0B"
  },
  {
    "id": "andre",
    "name": "Andre",
    "constellationCoords": {
      "x": 50,
      "y": 24
    },
    "snippetQuote": "Gua rasa gua bisa kenal dan seproject dan berproses dan jadi dekat sama cewe itu adalah sebuah keberuntungan... Kebaikan menyertai dia selalu.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nJadi, gua kenal satu cewe. Tahun lahirnya di bawah gua setahun tapi kuliahnya beda 4 tahun sama gua kalo ga salah.\n\nAwalnya gua gatau dia ikut katak dan pernah jadi pengurus juga. Baru dipertemukannya di Agrabah. Dia jadi pemain gua. Dulu sempet ditolak casting dan akhirnya ditarik lagi karena ada anak2 bermasalah yang keluar. Faktor ketolaknya itu ada kekhawatiran kalau dia rumahnya jauh dan sering bolos latian karena harus pulang ke Batam. Turns out, kekhawatiran itu tidak terjadi.\n\nSetelah kenal, tadinya gua kira orangnya dieman, ga aktif, outcast gitu vibenya. Tapi setelah kejadian pendalaman karakter yang konsepnya “break your limit” itu (setelah itu bocahnya jadi litereli break) akhirnya jadi lebih deket, lebih terbuka, lebih gesrek dan bisa jadi temen seru-seruan.\n\nSampai sekarang saya masih merasa bersalah karena men-trigger sesuatu dalam diri dia yang membuat dia jadi punya semacam panic attack dalam situasi tertekan.\n\nSalah satu heartbreaking moment buat gua itu pas hari h dimana widiqidiw menginjak kaki cewe ini sampai cedera. Trus show 3 dia kena panic attack lagi dan collapse, padahal keluarganya datang nonton di show 4 AAAAAAAAAAAA!!!!! Tapi puji Tuhan dengan keajaiban, cewe kuat ini bangun dan bisa tampil di show 4 dengan baik. Disana berat hati saya menghilang dan terasa SANGATT LEGAAA….\n\nSemoga gejala-gejalanya panic attacknya bisa membaik dan bahkan hilang seiring waktu, Aminn…\n\nGua rasa gua bisa kenal dan seproject dan berproses dan jadi dekat sama cewe itu adalah sebuah keberuntungan.\n\nKebetulan hari ini cewe itu lagi ulang tahun. Selamat berulang tahun yang ke 26 tahun. Doa dari gua semoga dia diberi berkat panjang umur, sehat dan bahagia selalu, segala urusan dalam hidupnya dapat berjalan dengan baik dan lancar. Diberkati segenap keluarganya, dijauhi dan dilindungi dari segala sakit penyakit, bahaya maupun bencana. Semoga kapanpun dan dimanapun berada, cewe itu dapat jadi terang, berkat, dan manfaat untuk lingkungan di sekitarnya.\n\nKebaikan menyertai dia selalu.\n\nBtw, namanya Sakinah. Panggilannya Caca.",
    "pdfUrl": "/letters/Andre.pdf",
    "colorAccent": "#38BDF8"
  },
  {
    "id": "nima",
    "name": "Nima",
    "constellationCoords": {
      "x": 22,
      "y": 66
    },
    "snippetQuote": "Semoga anda selalu dikaruniai kesehatan, berlimpah rezeki, dan selalu bahagia dengan diri anda. Selamat ulang tahun!",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHalo, Kak Sakinah. Harusnya kak Sakinah sudah berusia 26 tahun saat membaca surat ini.\n\n**Doa umum:**\n1. Semoga anda selalu dikaruniai Kesehatan\n2. Berlimpah rezeki\n3. Semoga segala harapan dan keinginan dapat tercapai.\n\n**Doa yang gak umum:**\n1. Semoga vlog liburan dan TikTok anda bisa ramai dan anda menjadi influencer yang keren dan terkenal.\n2. Semoga saat anda liburan, banyak yang jastip ke anda dan tante Yani (maaf kalau salah namanya) jadi anda bisa makin kaya.\n3. Semoga anda bisa menjadi orang yang bermanfaat bagi diri anda dan juga orang - orang di sekitar anda.\n\n*( DOA SELANJUTNYA MOHON DIBACA DEPANNYA SESUAI KEHENDAK DAN KEINGINAN ANDA )*\n4. (Kalau mau punya pasangan) Semoga anda bisa mendapatkan pasangan yang baik, taat agama dan sayang kepada anda.\n5. (Kalau anda tidak mau punya pasangan) Semoga anda selalu bahagia dengan diri anda.\n\nItu saja doa - doa dari saya. Akhir kata, selamat ulang tahun.\n\nFrom: nanimonima",
    "pdfUrl": "/letters/Nima.pdf",
    "colorAccent": "#A855F7"
  },
  {
    "id": "marlino",
    "name": "Marlino",
    "constellationCoords": {
      "x": 72,
      "y": 82
    },
    "snippetQuote": "Habede, habede, habede. Info loker btw.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nDear Sakinah\n\nHabede, habede, habede. Info loker btw.\n\nFrom Marlino",
    "pdfUrl": "/letters/Marlino.pdf",
    "colorAccent": "#F59E0B"
  },
  {
    "id": "marsya",
    "name": "Marsya",
    "constellationCoords": {
      "x": 50,
      "y": 44
    },
    "snippetQuote": "Terima kasih ya, sudah selalu berusaha membuat orang lain tersenyum melihat tingkahmu atau celetukan anehmu yang terkadang terdengar absurd. Tolong untuk seterusnya begitu!",
    "letterMarkdown": "### Dearest Kak Caca,\n\nTo our dearest Kak Caca.\n\nHappiest birthday to you! I wish you a very wonderful days from today, through this year. It’s your new chapter of life right? Aku berharap kamu akan terus menjadi orang yang berbahagia dan senyumnya terus bersinar. Kamu akan terus memamerkan binar matamu kepada dunia bahwa kamu adalah orang yang paling berbahagia.\n\nTerima kasih ya, sudah selalu berusaha membuat orang lain tersenyum melihat tingkahmu atau celetukan anehmu yang terkadang terdengar absurd. Tolong untuk seterusnya begitu!\n\nHarapanku yang lain adalah semoga kamu bisa melalui fase kehidupan yang baru ini dengan suka cita, lebih pandai memandang duka menjadi sebuah pengalaman hidup, serta dilindunginya dirimu dengan keselamatan dunia dan kesehatan fisik dan batinmu.\n\nSekali lagi, selamat bertambah umur, Kak Caca!",
    "pdfUrl": "/letters/Marsya.pdf",
    "colorAccent": "#EC4899"
  },
  {
    "id": "novita",
    "name": "Novita",
    "constellationCoords": {
      "x": 78,
      "y": 68
    },
    "snippetQuote": "May you be surrounded by all the good things in this world, because you deserve them all <3",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHi Kacacaaaa!!\n\nHappiest birthday to you! May you be surrounded by all the good things in this world, because you deserve them all <3\n\nLong time no see & I MISS U! It’s so good to see from your TikTok that you’ve been traveling around the world with your mom or by yourself 🥹\n\nWish we could meet soon yaaaa! 🤍\n\nXx, Nop :-)",
    "pdfUrl": "/letters/Novita.pdf",
    "colorAccent": "#10B981"
  },
  {
    "id": "sammy",
    "name": "Sammy",
    "constellationCoords": {
      "x": 60,
      "y": 32
    },
    "snippetQuote": "Hope you’re always happyy, eat good food, travel to more countries, dan semoga gacor terus hidupnya. Semangat terus chaaaa, lovlov!",
    "letterMarkdown": "### Dearest Kak Caca,\n\nCHACHAABRINAA HAPPY BIRTHDAAYYYY!!!!\n\nPanjang umur sehat selalu, smoga gacor terus hidupnya. Main atuh sekali sekali kapan ke gs lagiiii? We should karaoke together lagii! Tinggal di gs ajasi?!\n\nAnyways hope you’re always happyy, eat good food, travel to more countries, dan semoga kita tibatiba dikasi undangan wedding 👀👀 hehe soalnya aku gatau km dah ada cowo ga, life update gas!\n\nSemangat terus chaaaa! Lovlov! Salam sama tante Yaniie!",
    "pdfUrl": "/letters/Sammy.pdf",
    "colorAccent": "#F59E0B"
  },
  {
    "id": "regina",
    "name": "Regina",
    "constellationCoords": {
      "x": 36,
      "y": 52
    },
    "snippetQuote": "Ka Caca adalah teman yang sangat pengertian, penuh keceriaan, penuh dengan positive vibes, dan semua hal baik di dunia itu melekat banget sama ka Caca di mataku.",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHalo Ka Caca!!! Selamat Ulang Tahunnn!!!!\n\nMungkin aku cerita dulu ya first impression aku akan seorang Ka Caca itu kayak gimana hehe. Waktu pertama kali aku ngelihat Ka Caca, aku kira Ka Caca orangnya agak cuek dan mungkin sebenernya baik tapi kalo udah deket gitu. Oleh karena itu, aku jadi pengen deh coba temenan sama Ka Caca lebih dekat.\n\nLalu ternyata pas Wonka kita malah dipertemukan sebagai pemain dan stage manager. Dari situ aku baru mulai melihat sisi Ka Caca yang sebelumnya belum pernah kelihatan buat aku. Ka Caca adalah teman yang sangat pengertian, penuh keceriaan, penuh dengan positive vibes, dan semua hal baik di dunia itu melekat banget sama Ka Caca di mataku.\n\nAku sangat bersyukur bisa menjadi salah satu orang yang bisa dengar cerita Ka Caca, candaan Ka Caca, dan mungkin sisi Ka Caca yang belum pernah ku lihat pada saat Agrabah dulu.\n\nSo aku mau mengucapkan the happiest birthday for you Ka Caca! Semoga semua hal baik selalu menemani Kaka. Dan semoga semua hal yang tidak membahagiakan untuk Ka Caca dijauhi oleh Allah.\n\nBest wishes for you Ka Caca, I hope to see you soon!! 🤍",
    "pdfUrl": "/letters/Regina.pdf",
    "colorAccent": "#A855F7"
  },
  {
    "id": "nungkie",
    "name": "Nungkie",
    "constellationCoords": {
      "x": 26,
      "y": 80
    },
    "snippetQuote": "Semoga kamu selalu diketemukan dengan orang orang baik dan kesempatan baik yang membuatmu berproses... I'm rooting for u always, and thankyou for existing yah great soul!",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHelauuuurr Kak Cacaaa! Nungkie disinii!\n\nHappy bday Kak Cacamaricaaw endulita senatero rayaa! 🐣💌\n\nSemoga panjang umur, sehat selalu dan semoga kamu selalu diketemukan dengan orang-orang baik dan kesempatan-kesempatan baik yang bisa membuatmu berproses menjadi versi diri Kak Caca yg paling manthap asoy endul petjah duar 🤯💗\n\nI'm rooting for u always, and thankyou for existing yah great soul 💐\n\nWish u all the best yap Kakk! 💌💌",
    "pdfUrl": "/letters/Nungkie.pdf",
    "colorAccent": "#F59E0B"
  },
  {
    "id": "jenni",
    "name": "Jenni",
    "constellationCoords": {
      "x": 64,
      "y": 50
    },
    "snippetQuote": "Happy birthday, kacaca a.k.a manusia setengah bunga matahari!! You’ve inspired me a lot, especially to be someone who shares happiness with others. Bahagia terus yaa!",
    "letterMarkdown": "### Dearest Kak Caca,\n\nHappy birthday, Kacaca a.k.a manusia setengah bunga matahari!! 🌻✨\n\nSemoga di umur yang baru ini semuanya makin dilancarkan yaa, hal-hal yang Kacaca pengenin bisa satu-persatu kejadian, dan semoga tahun ini banyak hal baik yang dateng ke Kacaca!\n\nMakasih ya udah jadi salah satu support system aku selama ini Kak… walaupun banyak diisi dengan aku yang ngerepotin dan aku tanya-tanyain perihal per-Katak-an serta per-DKV-an ini, intinya aku super duper beruntung banget bisa kenal Kacaca hehe.\n\nActually, you’ve inspired me a lot, Kak, especially to be someone who shares happiness with others xixixi! Semoga kita masih bisa ketemu yaa Kak, jujur aku kangen bingit loh… I’d love to hear berbagai macam life update Kacaca yang terlihat asik di story (jujur keren!).\n\nHave a good one, Kak!! Bahagia terus yaa 🤍\n\n— Jennifer",
    "pdfUrl": "/letters/Jenni.pdf",
    "colorAccent": "#EAB308"
  }
];

export const MEMORY_PHOTOS: MemoryPhoto[] = [
  {
    id: "caca-ason",
    imageUrl: "/photos/caca%20-%20ason.PNG"
  },
  {
    id: "caca-palen",
    imageUrl: "/photos/caca%20-%20palen.JPG"
  },
  {
    id: "caca-rara-suci",
    imageUrl: "/photos/caca%20-%20rara%20-%20suci.JPG"
  },
  {
    id: "caca-rara",
    imageUrl: "/photos/caca%20-%20rara.JPG"
  },
  {
    id: "caca-shena-2",
    imageUrl: "/photos/caca%20-%20shena%202.JPG"
  },
  {
    id: "caca-shena",
    imageUrl: "/photos/caca%20-%20shena.JPG"
  },
  {
    id: "caca-suci-2",
    imageUrl: "/photos/caca%20-%20suci%202.PNG"
  },
  {
    id: "caca-suci",
    imageUrl: "/photos/caca%20-%20suci.PNG"
  },
  {
    id: "difoto-marlino",
    imageUrl: "/photos/difoto%20marlino.jpeg"
  },
  {
    id: "mektum-agrabah",
    imageUrl: "/photos/mektum%20agrabah.jpeg"
  },
  {
    id: "wisuda-novita-and-caca-2",
    imageUrl: "/photos/wisuda%20novita%20and%20caca%202.jpeg"
  },
  {
    id: "wisuda-novita-and-caca",
    imageUrl: "/photos/wisuda%20novita%20and%20caca.jpeg"
  },
  {
    id: "img-20250320-wa0006",
    imageUrl: "/photos/IMG-20250320-WA0006.jpg"
  },
  {
    id: "img-20250320-wa0007",
    imageUrl: "/photos/IMG-20250320-WA0007.jpg"
  },
  {
    id: "img-20250506-wa0075",
    imageUrl: "/photos/IMG-20250506-WA0075.jpg"
  },
  {
    id: "img-20250529-wa0039",
    imageUrl: "/photos/IMG-20250529-WA0039.jpg"
  },
  {
    id: "img-20250622-wa0020",
    imageUrl: "/photos/IMG-20250622-WA0020.jpg"
  },
  {
    id: "img-20250622-wa0039",
    imageUrl: "/photos/IMG-20250622-WA0039.jpg"
  },
  {
    id: "img-20250622-wa0044",
    imageUrl: "/photos/IMG-20250622-WA0044.jpg"
  },
  {
    id: "whatsapp-image-2026-09-30-3-37-28-pm",
    imageUrl: "/photos/WhatsApp%20Image%202026-09-30%20at%203.37.28%20PM.jpeg"
  },
  {
    id: "whatsapp-image-2026-09-30-3-37-28-pmdsadas",
    imageUrl: "/photos/WhatsApp%20Image%202026-09-30%20at%203.37.28%20PMdsadas.jpeg"
  },
  {
    id: "whatsapp-image-2026-09-30-3-37-28-pdsdsdsm",
    imageUrl: "/photos/WhatsApp%20Image%202026-09-30%20at%203.37.28%20PdsdsdsM.jpeg"
  },
  {
    id: "whatsapp-image-2026-10-02-9-17-50-pm",
    imageUrl: "/photos/WhatsApp%20Image%202026-10-02%20at%209.17.50%20PM.jpeg"
  },
  {
    id: "whatdsadsadsasapp-image-2026-10-02-9-26-04-pm",
    imageUrl: "/photos/WhatdsadsadsasApp%20Image%202026-10-02%20at%209.26.04%20PM.jpeg"
  },
  {
    id: "whatssdadsadasapp-image-2026-10-02-9-26-04-pm",
    imageUrl: "/photos/WhatssdadsadasApp%20Image%202026-10-02%20at%209.26.04%20PM.jpeg"
  }
];

export const CONSTELLATION_LINKS: [string, string][] = [
  [
    "clea",
    "jes"
  ],
  [
    "clea",
    "ka-pier"
  ],
  [
    "jes",
    "ka-echa"
  ],
  [
    "ka-pier",
    "ka-echa"
  ],
  [
    "ka-pier",
    "palen"
  ],
  [
    "ka-echa",
    "palen"
  ],
  [
    "fabian",
    "suci"
  ],
  [
    "fabian",
    "husen"
  ],
  [
    "suci",
    "diana"
  ],
  [
    "husen",
    "diana"
  ],
  [
    "husen",
    "rara"
  ],
  [
    "diana",
    "rara"
  ],
  [
    "ason",
    "bima"
  ],
  [
    "bima",
    "ci-jane"
  ],
  [
    "ason",
    "mui"
  ],
  [
    "ci-jane",
    "shena"
  ],
  [
    "mui",
    "shena"
  ],
  [
    "bima",
    "shena"
  ],
  [
    "jes",
    "fabian"
  ],
  [
    "palen",
    "ason"
  ],
  [
    "rara",
    "ci-jane"
  ],
  [
    "ka-echa",
    "bima"
  ],
  [
    "husen",
    "bima"
  ],
  [
    "andre",
    "jes"
  ],
  [
    "andre",
    "fabian"
  ],
  [
    "andre",
    "marsya"
  ],
  [
    "marsya",
    "ka-echa"
  ],
  [
    "marsya",
    "husen"
  ],
  [
    "marsya",
    "bima"
  ],
  [
    "nima",
    "palen"
  ],
  [
    "nima",
    "ason"
  ],
  [
    "novita",
    "rara"
  ],
  [
    "novita",
    "ci-jane"
  ],
  [
    "novita",
    "marlino"
  ],
  [
    "marlino",
    "shena"
  ],
  [
    "sammy",
    "fabian"
  ],
  [
    "sammy",
    "husen"
  ],
  [
    "regina",
    "palen"
  ],
  [
    "regina",
    "ka-echa"
  ],
  [
    "nungkie",
    "nima"
  ],
  [
    "nungkie",
    "mui"
  ],
  [
    "jenni",
    "husen"
  ],
  [
    "jenni",
    "ci-jane"
  ]
];
