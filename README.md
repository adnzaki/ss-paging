# ss-paging-vue
ss-paging adalah plugin pagination untuk Vue.js yang fokus pada sisi server. Semua pemrosesan data dilakukan di sisi server dan ss-paging bertindak sebagai pengirim request via ajax dan menampung response untuk kemudian disimpan ke dalam data state.

## Fitur
ss-paging telah dilengkapi sekumpulan fungsi yang siap digunakan untuk mengolah data pagination diantaranya:<br>
- `execGetData()` untuk mengupdate data pagination setelah adanya update data seperti `INSERT` atau `UPDATE` 
- `nav()` untuk melakukan navigasi halaman 
- `filter()` untuk melakukan filter pencarian data berdasarkan ketikan pengguna (misalnya textbox)
- `reloadData()` untuk merefresh data 
- `sortData()` untuk melakukan sorting data berdasarkan field tertentu
- `showPerPage()` untuk menampilkan data dalam jumlah baris tertentu
- `getData()` untuk mengambil data dan membuat perhitungan pagination
- `rowRange` untuk menampilkan informasi jumlah baris

## Cara penggunaan
ss-paging bekerja pada sisi server sehingga membutuhkan data dari server untuk dapat berjalan. Untuk menjalankan fitur-fitur yang ada pada ss-paging, tentu anda harus terlebih dahulu memasukkan Vue.js ke dalam source code. Silakan baca dokumentasi Vue.js di [sini](https://vuejs.org/) jika anda belum berpengalaman dengan Vue.js. Jika telah selesai dengan bagian server dan instalasi Vue.js, maka yang pertama dilakukan adalah melakukan inisialisasi menggunakan fungsi `getData()`. Kemudian untuk mengeksekusi fungsi yang ada di ss-paging, cukup sisipkan setiap fungsi ke dalam `event` yang sudah tersedia di Vue.js, misalnya `v-on:click` atau dengan pintasan `@click` untuk menjalankan fungsi saat suatu elemen HTML di-klik. Untuk contoh lengkap bisa dilihat pada folder <strong>example </strong> dalam repository ini (menggunakan framework CodeIgniter).

## Ketergantungan dan keterbatasan
ss-paging adalah plugin untuk Vue.js sehingga diperlukan Vue.js untuk menjalankannya. ss-paging tidak terpaku pada library Javascript lain seperti jQuery. URL yang disupport ss-paging adalah yang berkonsep <strong>segment-based</strong>, misalnya `http://mywebsite.com/controller/method/param1/param2/param3` dan belum mendukung URL dengan query string.

## Referensi fungsi
`(method) execGetData(): void`<br>
Fungsi untuk mengeksekusi getData() agar mencegah terjadinya kesalahan perhitungan offset setelah menyimpan atau update data<br><br>
`(method) nav(page: any): void`<br>
Fungsi navigasi halaman pagination<br><br>
`(method) filter(): void`<br>
Pencarian data berdasarkan parameter pencarian pada textbox / kotak pencarian<br><br>
`(method) reloadData(): void`<br>
Refresh data<br><br>
`(method) sortData(orderBy: string): void` <br>
Fungsi untuk sorting data berdasarkan kolom yang ada di tabel<br><br>
`(method) showPerPage(): void`<br>
Opsi untuk menampilkan jumlah data per halaman<br><br>
`(method) runPaging(): void`<br>
Menjalankan fungsi ambil data berdasarkan current state / state yang sedang aktif saat ini<br><br>
`(method) getData(options: any): void`<br>
Ambil data untuk pagination <br>Options: limit, offset, url, orderBy, searchBy, sort, search, linkNum, activeClass, linkClass<br><br>
`(method) activeLink(link: number): any`<br>
Fungsi untuk menandai link yang sedang aktif<br><br>
`(method) reset(): void`
Mengembalikan ss-paging ke pengaturan awal<br><br>
`(method) rowRange(): string` <br>
`computed property` - untuk menampilkan informasi jumlah baris

## Milestone
Kami memproyeksikan ss-paging untuk dapat mendukung <i>component-based template</i> sehingga memberikan opsi bagi mereka yang menginginkan kemudahan dalam membuat pagination berikut struktur tabelnya. Rencana untuk penamaan component adalah `<ss-paging></ss-paging>`. Untuk dapat mewujudkan itu, kami sangat terbuka untuk menerima kontribusi dari anda.

