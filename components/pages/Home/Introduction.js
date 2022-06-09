import Image from 'next/image';
import styles from '~/styles/components/pages/Home/Introduction.module.css';

function Introduction() {
  return (
    <div className={styles.introduction}>
      <h4>PENGANTAR INSTRUMEN</h4>
      <p>
        Perkenalkan saya <b>Mohamad Zaenuri Arif</b>, Mahasiswa tingkat akhir Program Studi Magister
        Administrasi Pendidikan, Fakultas Ilmu Pendidikan, Universitas Pendidikan Indonesia. Saya sedang
        melakukan penelitian tentang topik <b>&quot;Kompetensi Digital&quot;</b> sebagai kemampuan yang harus
        dimiliki setiap individu di era digital seperti saat ini. Didalamnya tidak hanya menyangkut Literasi
        Digital saja, tetapi secara komprehensif menerapkan kompetensi/kemampuan seseorang untuk dapat
        belajar, berkomunikasi, maupun bekerja pada era digital. Namun perlu kita sadari bahwa penerapan
        kompetensi digital tidak akan sempurna jika tidak masuk kedalam ranah Pendidikan Formal sedari dini,
        dengan begitu kompetensi digital yang dimiliki setiap individu akan disertai dengan pembentukan
        karakter yang sesuai dengan tujuan pendidikan bangsa. Tentunya penerapan dalam pendidikan tidak lepas
        dari peran Guru yang berada pada garda terdepan pendidikan.
      </p>
      <p>
        Oleh karena itu, saya ingin mengetahui pendapat dan opini Bapak/Ibu Guru tentang Konseptual dari
        Kompetensi Digital yang saya coba adaptasi dan rangkum dari berbagai macam framework negara lain atau
        dunia internasional. Asesmen yang bapak/ibu guru isi ini akan menjadi acuan penting dalam penelitian
        saya kedepan tentang pengembangan dan penerapan Kompetensi Digital baik untuk Guru maupun Siswa pada
        kurikulum nantinya. Pastikan Bapak/Ibu Guru mengisi Asesmen ini dengan baik dan sesuai dengan
        pengalaman, kondisi, pendapat/opini yang bapak/ibu guru miliki
      </p>
      <p>Cara mengisi Survey:</p>
      <p>
        Survey ini terdiri dari 3 bagian dengan total ± 40 menit waktu yang dibutuhkan untuk mengisi
        keseluruhan asesmen, pastikan bapak/ibu guru ada dalam kondisi yang cocok untuk mengisi Asesmen.
      </p>
      <ol>
        <li>
          Bagian pertama adalah <b>Asesmen Kompetensi Digital</b>. Sebelum mengisi Asesmen Kompetensi Digital,
          bapak/ibu guru akan diminta untuk <b>membaca/melihat</b> kemudian <b>memahami informasi</b> terkait{' '}
          <b>Konsep Kompetensi Digital untuk Guru</b>. Setelah membaca dan memahami informasi tersebut,
          bapak/ibu guru dapat mengisi Biodata dan kemudian melanjutkan ke Asesmen Kompetensi Digital. Isi
          nama, email dan nomor telepon dengan jelas dan lengkap, karena data tersebut akan menjadi
          identifikasi keseluruh bagian Instrumen. Bapak/Ibu Guru diharapkan dapat membaca pertanyaan dan
          jawaban asesmen dengan seksama dan mengisi asesmen tersebut dengan baik, karena akan ada
          Result/Hasil tentang Tingkat Kecakapan Teknologi Digital dan Detail Pencapaian Kecakapan Digital di
          setiap Jenis Kecakapan yang diambil, bapak/ibu guru harus mengingat/menyimpan hasil tersebut untuk
          bagian instrument berikutnya.
        </li>
        <li>
          Bagian ke-2, bapak/ibu guru akan mengisi Survey Teknologi Digital yang digunakan untuk pemetaan
          kemampuan serta teknologi digital yang bapak/ibu guru gunakan dalam pembelajaran. Mohon{' '}
          <b>isi kembali</b> <b>email</b> dan <b>nomor telepon</b> untuk identifikasi ulang data, dan{' '}
          <b>hasil Asesmen Kompetensi Digital</b> yang pada bagian pertama bapak/ibu guru dapatkan. Bapak/Ibu
          Guru dapat mengisi beberapa pertanyaan terkait dengan Teknologi Digital yang digunakan selama ini
          baik dari jenis aplikasi, cara akses, dan lainnya. Ada 6 sub bagian yang akan membagi pertanyaan
          kedalam jenis-jenis Kompetensi yang ada dalam konsep. Jika aplikasi/software/perangkat keras yang
          bapak/ibu guru gunakan tidak tertera, bisa memilih pilihan &quot;lainnya...&quot; dan menuliskan apa
          aplikasi/software yg digunakan.
        </li>
        <li>
          Bagian ke-3, bapak/ibu guru akan diminta mengisi keterangan kebersediaan menjadi responden wawancara
          yang lebih mendalam terkait Kompetensi Digital ini, namun Bapak/Ibu guru tidak wajib melakukan
          interview/wawancara dan hanya untuk yang bersedia dan memiliki waktu agar saya bisa menghubungi
          bapak/ibu Guru untuk wawancara. Pilih opsi ya untuk kebersediaan mengikuti interview/wawancara dan
          pilih juga jadwal yang telah disediakan. Saya akan memberi informasi lengkap tentang wawancara ini,
          dan notifikasi melalui email dan nomor telepon yang sudah bapak/ibu input.
        </li>
      </ol>
      <p>
        Demikian kata pengantar dari saya untuk bapak/ibu guru dapat baca dan ikuti dalam mengisi Survey
        Pendahuluan ini. Selamat mengisi survey.
      </p>
      <h4>INFORMASI KOMPETENSI DIGITAL</h4>
      <div className={styles.image}>
        <p>Gambar 1 - Kerangka Kompetensi Digital</p>
        <Image width={1106} height={590} src="/images/image1.jpg" alt="image1" />
      </div>
      <p>
        Dalam konsep tersebut, terbagi menjadi 3 domain serta 6 kategori kompetensi yang dijelaskan
        berdasarkan proses pengembangannya. Pertama adalah domain Profesionalisme Guru yang secara langsung
        harus dimiliki setiap orang guru sebagai dasar pengembangan kompetensi digital lainnya seperti
        komunikasi, kolaborasi, dan pengembangan profesionalisme diri. Pada domain{' '}
        <i>Pedagogic Competences</i>, terdapat 4 kategori kompetensi yaitu kompetensi <i>Digital Resources</i>{' '}
        yang memuat kemampuan guru dalam mengelola, mencari, dan membuat konten pembelajaran digital,{' '}
        <i>Teaching and Learning</i> yang secara umum sama dengan kemampuan dasar Manajemen Pembelajaran,
        namun pada platform <i>digital</i>, <i>Assessment</i> yaitu kemampuan dalam menggunakan teknologi
        digital dalam strategi evaluasi dan asesmen siswa, serta <i>Empowering Learners</i> yaitu kemampuan
        guru dalam meningkatkan inklusifitas pembelajaran, dan personalisasi pembelajaran yang aktif untuk
        siswa. Terakhir domain eksternal yang menentukan apakah guru dapat memfasilitasi siswa dalam
        pengembangan kompetensi digitalnya ada pada domain <i>Learner&apos;s Competences</i>. Pada domain ini,
        guru juga dituntut untuk mampu menggunakan kompetensi digitalnya agar siswa dapat secara kreatif dan
        bertanggung jawab dalam menggunakan teknologi informasi, komunikasi, kreasi konten, keamanan
        penggunaan media digital, serta <i>problem-solving</i> menggunakan media digital (Redecker, 2017).
      </p>
      <div className={styles.image}>
        <p>Gambar 2 - Model Perkembangan Kecakapan/Kompetensi Digital</p>
        <Image width={733} height={313} src="/images/image2.png" alt="image2" />
      </div>
      <p>
        Tujuan dari model tingkatan kecakapan digital diatas adalah untuk membantu guru memahami tentang
        kekuatan dan kelemahan mereka dalam kompetensi digital dengan mendeskripsikan tingkatan pengembangan
        kompetensi digital. Model perkembangan kompetensi digital tingkatan memiliki 6 kecakapan yang dimulai
        dari Keingintahuan dan Kesadaran, Eksplorasi, Integrasi, Keahlian/Kemampuan, Kepemimpinan, dan
        Inovasi. Setiap tingkat juga memiliki indikator di setiap jenis kecakapan sehingga Guru dapat melihat
        Langkah-langkah perkembangan kemampuan digital dan kepercayaan dirinya masing-masing. Tingkatan ini
        kemudian diurutkan dari A1 (Pemula) sampai C2 (Pelopor).
      </p>
      <div className={styles.image}>
        <p>Gambar 3 - Indikator Kecakapan Digital pada Model Perkembangan Kompetensi Digital</p>
        <Image width={900} height={1188} src="/images/image3.png" alt="image3" />
      </div>
      <ol>
        <li>
          <p>
            <b>Pemula (A1)</b>
          </p>
          <p>
            Para pemula menyadari tentang potensi teknologi digital pada peningkatan praktek pedagogi dan
            profesional sebagai guru. Namun, mereka masih memiliki interaksi yang minim dengan teknologi
            digital dan hanya menggunakannya dalam tahapan persiapan pembelajaran, administrasi, atau
            komunikasi organisasi saja. Para pemula membutuhkan bimbingan dan dorongan untuk memperluas
            repertoar mereka dan untuk menerapkan kompetensi digital mereka yang ada di ranah pedagogis.
          </p>
        </li>
        <li>
          <p>
            <b>Eksplorasi (A2)</b>
          </p>
          <p>
            Para Eksplorer/penjelajah sadar tentang potensi teknologi digital dan mereka teratarik untuk
            menjelajahi/mengeksplorasinya untuk meningkatkan praktek pedagogi dan profesional mereka. Mereka
            sudah memulai menggunakan teknologi digital di beberapa area kompetensi digital dengan tanpa
            mengikuti pendekatan yang konsisten dan komprehensif. Para penjelajah ini membutuhkan dorongan,
            wawasan, dan inspirasi baik dari contoh/petunjuk yang diberikan kolega lainnya, atau yang ada
            dalam praktek pertukaran ilmu secara kolaboratif.
          </p>
        </li>
        <li>
          <p>
            <b>Integrator (B1)</b>
          </p>
          <p>
            Para integrator bereksperimen dengan teknologi digital dalam konteks dan tujuan yang beragam, dan
            mengintegrasikannya dalam banyak praktek pembelajaran. Mereka secara kreatif menggunakan teknologi
            tersebut untuk meningkatkan beragam aspek dari keterlibatan profesional mereka. Namun mereka masih
            megnusahakan untuk memahami alat digital mana yang terbaik di situasi-situasi pembelajaran dan
            menyesuaikannya untuk strategi dan metode pedagogi. Integrator hanya membutuhkan sedikit banyak
            waktu untuk bereksperimen dan berefleksi, dan juga melengkapinya dengan dorongan kolaboratif serta
            saling bertukar ilmu dengan kolega untuk menjadi seorang Ahli.
          </p>
        </li>
        <li>
          <p>
            <b>Ahli (B2)</b>
          </p>
          <p>
            Para Ahli menggunakan teknologi digital dengan percaya diri, kreatif, dan kritis dalam peningkatan
            kegiatan profesional mereka. Mereka sengaja memilih teknologi digital untuk situasi tertentu, dan
            mencoba memahami keunggulan serta kelemahan dari strategi penggunaan teknologi digital tersebut.
            Mereka penasaran dan terbuka dengan ide-ide baru, dan mengetahui banyak hal yang belum mereka
            coba. Mereka menggunakan eksperimen sebagai sarana untuk memperluas, penataan, dan konsolidasi
            strategi pembelajaran mereka. Ahli merupakan tulang punggung sebuah organisasi Pendidikan dalam
            hal praktik inovasi.
          </p>
        </li>
        <li>
          <p>
            <b>Pemimpin (C1)</b>
          </p>
          <p>
            Pemimpin memiliki pendekatan yang konsisten dan komprehensif untuk menggunakan teknologi digital
            dalam peningkatan praktek profesional dan pedagogi mereka. Mereka mengandalkan repertoar strategi
            digital yang luas dari pengetahuan mereka tentang pemilihan strategi dan teknologi digital mana
            yang tepat untuk situasi tertentu. Mereka secara terus menerus berefleksi dan mengembangkan lebih
            lanjut praktik mereka. Berbagi dan bertukar ilmu dengan sesamanya, mereka juga terus <i>update</i>{' '}
            terhadap ide dan pengembangan teknologi baru. Mereka adalah sumber inspirasi untuk semua, kepada
            orang-orang yang akan mewariskan keahlian mereka.
          </p>
        </li>
        <li>
          <p>
            <b>Pelopor (C2)</b>
          </p>
          <p>
            Pelopor mempertanyakan tentng kecukupan dari prakik digital kontemporer dan pedagogi dimana mereka
            menjadi seorang Pemimpin disana. Mereka mengkhawatirkan tentang kendala atau kekurangan dari
            praktik pembelajaran dengan menggunakan teknologi digital ini, dan didorong oleh dorongan untuk
            berinovasi dalam Pendidikan lebih jauh. Pelopor bereksperimen dengan tingkat teknologi dan inovasi
            yang tinggi dan atau mengembangkan pendekatan pedagogis baru. Pelopor itu unik dan sangat langka.
            Mereka memimpin inovasi dan menjadi panutan/<i>role model</i>
            bagi guru-guru muda.
          </p>
        </li>
      </ol>
    </div>
  );
}

export default Introduction;
