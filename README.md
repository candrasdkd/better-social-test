## A. Topik: Komunikasi dengan Manajer Produk. 

1. Apakah kita perlu menambahkan button "Less" jika sudah membuka detail teks? dan apakah perlu membatasi ukuran tinggi dan menggunakan fitur scroll jika text yg dimiliki panjang?
2. Kenapa kita tidak mengimplementasikan sistem komentar di halaman feed?

## C1. Pendekatan Penerapan Fitur "Orang yang Mungkin Anda Kenal"
#### 1. Struktur Data:
   - User Data: <br>
      Setiap pengguna memiliki data profil yang mencakup informasi seperti ID pengguna, nama, daftar teman/koneksi, dan komunitas yang diikuti.
   - Komunitas Data: <br>
      Setiap komunitas memiliki ID, nama, dan daftar anggota.
#### 2. Penanganan Kasus Ekstrim:
   - Tidak Ada Pengguna/Komunitas Terkait:<br>
   Sediakan pesan atau tampilan yang ramah untuk memberi tahu pengguna bahwa tidak ada saran untuk saat ini.
   - Terlalu Banyak Pengguna/Komunitas Terkait:<br>
   Prioritaskan saran berdasarkan sejumlah faktor seperti kecocokan minat. Kemudian filter untuk mempersempit hasil yang disarankan.
#### 3. Algoritma Saran:
   - Keterlibatan Teman:<br>
   Prioritaskan koneksi pertemanan yang aktif di dalam aplikasi.
   - Hubungan Kedua Derajat:<br>
   Sarankan pengguna yang terhubung dengan teman dari teman pengguna, menciptakan hubungan kedua derajat.
   - Komunitas yang Sama:<br>
   Jika pengguna adalah anggota komunitas tertentu, sarankan pengguna lain dari komunitas yang sama.
   - Kecocokan Minat:<br>
   Evaluasi kecocokan minat berdasarkan aktivitas pengguna, konten yang disukai, atau postingan yang sering dilihat.
#### 4. Penanganan Data Skala Besar:
   - Pembatasan Hasil:<br>
   Terapkan pembatasan pada jumlah hasil yang akan disarankan untuk menghindari overhead.
#### 5. Uji Coba Fitur:
   - Uji Fungsional:<br>
   Pastikan fitur memberikan hasil yang akurat dan relevan berdasarkan koneksi pengguna dan komunitas.
   - Uji Beban:<br>
   Uji fitur di lingkungan yang meniru skala besar untuk memastikan kinerja dan responsibilitas yang baik.
   - Uji Kasus Ekstrim:<br>
   Uji fitur dengan skenario ekstrim, seperti pengguna dengan banyak koneksi atau pengguna yang memiliki sedikit atau tidak ada koneksi.

## C2. Algoritma Untuk Menemukan Saran Terbaik
#### 1. **Pertimbangkan Pertemanan:**
   - Pemberian bobot yang lebih tinggi untuk teman yang sering berinteraksi dengan pengguna.

#### 2. **Evaluasi Komunitas yang Diikuti Pengguna:**
   - Identifikasi komunitas yang diikuti pengguna.
   - Pilih pengguna lain yang juga anggota komunitas yang sama.

#### 3. **Hubungan Kedua Derajat:**
   - Identifikasi teman dari teman pengguna.
   - Berikan skor berdasarkan seberapa erat hubungan kedua derajat ini dengan pengguna.

#### 4. **Analisis Kecocokan Minat:**
   - Tinjau aktivitas pengguna seperti postingan, suka, atau komentar.
   - Identifikasi minat pengguna dan cari pengguna lain dengan minat serupa.
   - Berikan skor berdasarkan kesamaan minat.

#### 5. **Pertimbangkan Aktivitas Terbaru:**
   - Prioritaskan pengguna yang telah aktif dalam waktu yang relatif dekat.
   - Gunakan timestamp aktivitas untuk mengukur seberapa baru aktivitas tersebut.

#### 6. **Batas Hasil:**
   - Batasi jumlah pengguna yang akan disarankan untuk menghindari kelebihan informasi.
   - Terapkan strategi pemfilteran untuk memilih pengguna terbaik dari hasil yang mungkin lebih besar.

#### 7. **Evaluasi Umpan Balik Pengguna:**
   - Berikan pengguna mekanisme untuk memberikan umpan balik terhadap saran yang diberikan.
   - Gunakan umpan balik ini untuk meningkatkan dan mempersonalisasi rekomendasi di masa mendatang.

#### 8. **Analisis Kinerja dan Iterasi:**
   - Pantau kinerja algoritma dengan mengukur tingkat keberhasilan rekomendasi.
   - Lakukan pembaruan berdasarkan pola penggunaan dan umpan balik untuk meningkatkan akurasi rekomendasi.
