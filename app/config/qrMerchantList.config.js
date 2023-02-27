module.exports = {
  get cityList () {
    return [{code: 'all', name: 'All'},
      {code: 1088, name: 'Aceh Barat'},
      {code: 1087, name: 'Aceh Besar'},
      {code: 1030, name: 'Aceh Jaya'},
      {code: 1032, name: 'Aceh Tengah'},
      {code: 1034, name: 'Aceh Timur'},
      {code: 715, name: 'Aceh Utara'},
      {code: 306, name: 'Ambon'},
      {code: 931, name: 'Badung'},
      {code: 307, name: 'Balikpapan'},
      {code: 1090, name: 'Banda Aceh'},
      {code: 308, name: 'Bandar Lampung'},
      {code: 309, name: 'Bandung'},
      {code: 1092, name: 'Bangka'},
      {code: 310, name: 'Banjar'},
      {code: 311, name: 'Banjarbaru'},
      {code: 312, name: 'Banjarmasin'},
      {code: 1093, name: 'Banjarnegara'},
      {code: 313, name: 'Bantul'},
      {code: 1094, name: 'Banyuwangi'},
      {code: 1122, name: 'Batam'},
      {code: 314, name: 'Batang'},
      {code: 13832, name: 'Batulicin'},
      {code: 1095, name: 'Bau-Bau'},
      {code: 315, name: 'Bekasi'},
      {code: 933, name: 'Belitung'},
      {code: 1096, name: 'Belu'},
      {code: 316, name: 'Bengkulu'},
      {code: 317, name: 'Bengkulu Tengah'},
      {code: 1097, name: 'Berau'},
      {code: 1098, name: 'Biak'},
      {code: 1099, name: 'Bima'},
      {code: 1100, name: 'Bitung'},
      {code: 318, name: 'Blitar'},
      {code: 1101, name: 'Blora'},
      {code: 319, name: 'Bogor'},
      {code: 1102, name: 'Bojonegoro'},
      {code: 1103, name: 'Bondowoso'},
      {code: 1104, name: 'Bone'},
      {code: 1105, name: 'Bontang'},
      {code: 1106, name: 'Boyolali'},
      {code: 320, name: 'Brebes'},
      {code: 321, name: 'Bukittinggi'},
      {code: 1131, name: 'Buleleng'},
      {code: 1133, name: 'Bungo'},
      {code: 322, name: 'Ciamis'},
      {code: 923, name: 'Cianjur'},
      {code: 14774, name: 'Cibubur'},
      {code: 1135, name: 'Cikampek'},
      {code: 323, name: 'Cilacap'},
      {code: 324, name: 'Cilegon'},
      {code: 1134, name: 'Cimahi'},
      {code: 325, name: 'Cirebon'},
      {code: 326, name: 'Denpasar'},
      {code: 327, name: 'Depok'},
      {code: 13750, name: 'Dompu'},
      {code: 1144, name: 'Dumai'},
      {code: 2524, name: 'Ende'},
      {code: 328, name: 'Garut'},
      {code: 1149, name: 'Gianyar'},
      {code: 329, name: 'Gorontalo'},
      {code: 330, name: 'Gresik'},
      {code: 1150, name: 'Indramayu'},
      {code: 331, name: 'Jakarta Barat'},
      {code: 332, name: 'Jakarta Pusat'},
      {code: 333, name: 'Jakarta Selatan'},
      {code: 334, name: 'Jakarta Timur'},
      {code: 335, name: 'Jakarta Utara'},
      {code: 336, name: 'Jambi'},
      {code: 337, name: 'Jayapura'},
      {code: 338, name: 'Jember'},
      {code: 339, name: 'Jepara'},
      {code: 1156, name: 'Jombang'},
      {code: 1157, name: 'Kaimana'},
      {code: 1158, name: 'Karanganyar'},
      {code: 340, name: 'Karawang'},
      {code: 1159, name: 'Karimun'},
      {code: 341, name: 'Kediri'},
      {code: 13650, name: 'Kefamenanu'},
      {code: 1162, name: 'Kendari'},
      {code: 342, name: 'Kertasura'},
      {code: 1163, name: 'Ketapang'},
      {code: 1164, name: 'Klaten'},
      {code: 343, name: 'Klungkung'},
      {code: 344, name: 'Kolaka'},
      {code: 13836, name: 'Kotabaru'},
      {code: 1165, name: 'Kotamobagu'},
      {code: 1166, name: 'Kotawaringin Barat'},
      {code: 345, name: 'Kotawaringin Timur'},
      {code: 346, name: 'Kudus'},
      {code: 347, name: 'Kuningan'},
      {code: 351, name: 'Kupang'},
      {code: 14829, name: 'kuta'},
      {code: 352, name: 'Labuhanbatu'},
      {code: 1168, name: 'Labuhanbatu Selatan'},
      {code: 1169, name: 'Lahat'},
      {code: 353, name: 'Lamongan'},
      {code: 354, name: 'Lampung Barat'},
      {code: 355, name: 'Lampung Selatan'},
      {code: 356, name: 'Lampung Tengah'},
      {code: 934, name: 'Lebak'},
      {code: 1172, name: 'Lhokseumawe'},
      {code: 13732, name: 'Lombok'},
      {code: 1173, name: 'Lombok Barat'},
      {code: 1174, name: 'Lubuklinggau'},
      {code: 1175, name: 'Luwu'},
      {code: 13861, name: 'Luwuk'},
      {code: 358, name: 'Madiun'},
      {code: 359, name: 'Magelang'},
      {code: 360, name: 'Magetan'},
      {code: 361, name: 'Makassar'},
      {code: 380, name: 'Malang'},
      {code: 2395, name: 'Malinau'},
      {code: 1179, name: 'Maluku Tenggara'},
      {code: 1180, name: 'Maluku Utara'},
      {code: 1181, name: 'Mamuju'},
      {code: 384, name: 'Manado'},
      {code: 1183, name: 'Manokwari'},
      {code: 385, name: 'Mataram'},
      {code: 386, name: 'Medan'},
      {code: 1191, name: 'Merauke'},
      {code: 387, name: 'Metro'},
      {code: 1193, name: 'Minahasa'},
      {code: 388, name: 'Minahasa Selatan'},
      {code: 389, name: 'Mojokerto'},
      {code: 1206, name: 'Muaro Jambi'},
      {code: 13855, name: 'Ngabang'},
      {code: 1207, name: 'Nganjuk'},
      {code: 1208, name: 'Nunukan'},
      {code: 1209, name: 'Ogan Komering Ulu'},
      {code: 390, name: 'Ogan Komering Ulu Timur'},
      {code: 391, name: 'Padang'},
      {code: 392, name: 'Padang Sidempuan'},
      {code: 13793, name: 'Pagar Alam'},
      {code: 1216, name: 'Palangka Raya'},
      {code: 393, name: 'Palembang'},
      {code: 1217, name: 'Palopo'},
      {code: 394, name: 'Palu'},
      {code: 1218, name: 'Pamekasan'},
      {code: 396, name: 'Pangkal Pinang'},
      {code: 13846, name: 'Pangkalan Bun'},
      {code: 13768, name: 'Pangkalan Kerinci'},
      {code: 397, name: 'Pasuruan'},
      {code: 1219, name: 'Pati'},
      {code: 1220, name: 'Payakumbuh'},
      {code: 398, name: 'Pekalongan'},
      {code: 399, name: 'Pekanbaru'},
      {code: 1221, name: 'Pemalang'},
      {code: 400, name: 'Pematangsiantar'},
      {code: 1222, name: 'Polewali Mandar'},
      {code: 1223, name: 'Ponorogo'},
      {code: 401, name: 'Pontianak'},
      {code: 1224, name: 'Poso'},
      {code: 402, name: 'Prabumulih'},
      {code: 424, name: 'Pringsewu'},
      {code: 1226, name: 'Probolinggo'},
      {code: 426, name: 'Purbalingga'},
      {code: 427, name: 'Purwakarta'},
      {code: 428, name: 'Purwokerto'},
      {code: 429, name: 'Purworejo'},
      {code: 13858, name: 'Putussibau'},
      {code: 430, name: 'Salatiga'},
      {code: 431, name: 'Samarinda'},
      {code: 13843, name: 'Sampit'},
      {code: 13851, name: 'Sangatta'},
      {code: 1229, name: 'Sanggau'},
      {code: 1230, name: 'Sawahlunto'},
      {code: 13737, name: 'Selong'},
      {code: 432, name: 'Semarang'},
      {code: 13670, name: 'Sengkang'},
      {code: 433, name: 'Serang'},
      {code: 1047, name: 'Sidoarjo'},
      {code: 1231, name: 'Sikka'},
      {code: 1235, name: 'Singkawang'},
      {code: 1237, name: 'Sintang'},
      {code: 1046, name: 'Situbondo'},
      {code: 434, name: 'Sleman'},
      {code: 435, name: 'Solo'},
      {code: 1239, name: 'Solok'},
      {code: 1240, name: 'Sorong'},
      {code: 436, name: 'Sragen'},
      {code: 938, name: 'Subang'},
      {code: 437, name: 'Sukabumi'},
      {code: 1243, name: 'Sukoharjo'},
      {code: 1262, name: 'Sumba Barat'},
      {code: 1263, name: 'Sumba Timur'},
      {code: 1264, name: 'Sumbawa'},
      {code: 1049, name: 'Sumenep'},
      {code: 438, name: 'Surabaya'},
      {code: 6788, name: 'Surakarta'},
      {code: 1268, name: 'Tabanan'},
      {code: 439, name: 'Tangerang'},
      {code: 440, name: 'Tangerang Selatan'},
      {code: 441, name: 'Tanggamus'},
      {code: 442, name: 'Tanjung Pinang'},
      {code: 1270, name: 'Tanjung Selor'},
      {code: 443, name: 'Tarakan'},
      {code: 444, name: 'Tasikmalaya'},
      {code: 445, name: 'Tebing Tinggi'},
      {code: 446, name: 'Tegal'},
      {code: 1271, name: 'Ternate'},
      {code: 447, name: 'Toli-Toli'},
      {code: 1273, name: 'Tomohon'},
      {code: 1275, name: 'Trenggalek'},
      {code: 1048, name: 'Tuban'},
      {code: 1276, name: 'Tulungagung'},
      {code: 1277, name: 'Wonosobo'},
      {code: 448, name: 'Yogyakarta'}
    ];
  }
};