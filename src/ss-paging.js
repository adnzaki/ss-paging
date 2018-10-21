/**
 * Smartscore Pagination
 * Sebuah paket library untuk mengolah data pagination
 *
 * @package     Pagination
 * @author      Adnan Zaki
 * @type        Libraries
 * @version     2.0.4
 */

const SSPaging = {
    data: {
        pageLinks: [], limit: 10, offset: 0,
        prev: 0, next: 0, first: 0,
        last: 0, totalRows: 0,
        numLinks: true, activeClass: '', linkClass: '',
        showPaging: true, search: '', data: [],
        orderBy: '', searchBy: '', sort: 'ASC',
        url: '', ascendingSort: false, linkNum: 0,
        rows: 10, // custom limit
    },
    methods: {
        /**
         * Fungsi untuk mengeksekusi getData() agar mencegah
         * terjadinya kesalahan perhitungan offset
         * setelah menyimpan atau update data
         * 
         * @return void
         */
        execGetData() {
            let start = this.offset / this.limit
            var exec = num => {
                this.offset = num
                this.runPaging()
            }
            exec(start)
            setTimeout(() => {
                if (this.data.length === 0) {
                    start -= 1
                    exec(start)
                }
            }, 500)
        },
        /**
         * Fungsi navigasi halaman pagination
         * 
         * @param {int} page 
         */
        nav(page) {
            this.offset = page
            this.runPaging()
        },
        /**
         * Pencarian data berdasarkan parameter pencarian pada 
         * textbox / kotak pencarian
         */
        filter() {
            this.offset = 0
            this.runPaging()
        },
        /**
         * Refresh data
         */
        reloadData() {
            this.offset = (this.activePage - 1)
            this.runPaging()
        },
        /**
         * Fungsi untuk sorting data berdasarkan kolom
         * yang ada di tabel
         * 
         * @param {string} orderBy 
         */
        sortData(orderBy) {
            (this.sort === 'ASC') ? this.ascendingSort = true: this.ascendingSort = false
            if (this.ascendingSort) {
                this.ascendingSort = false
                this.sort = 'DESC'
            } else {
                this.ascendingSort = true
                this.sort = 'ASC'
            }
            this.orderBy = orderBy
            this.runPaging()
        },
        /**
         * Opsi untuk menampilkan jumlah data per halaman 
         */
        showPerPage() {
            this.limit = parseInt(this.rows)
            this.offset = 0
            this.runPaging()
        },
        /**
         * Menjalankan fungsi ambil data berdasarkan current state / 
         * state yang sedang aktif saat ini
         */
        runPaging() {
        	this.getData({
        		limit: this.limit,
        		offset: this.offset,
        		orderBy: this.orderBy,
        		searchBy: this.searchBy,
        		sort: this.sort,
        		search: this.search,
        		url: this.url,
        		linkNum: this.linkNum,
        		activeClass: this.activeClass,
        		linkClass: this.linkClass,
        	})
        },
        /**
         * Ambil data untuk pagination
         * Options: limit, offset, url, orderBy, searchBy, sort, 
         *          search, linkNum, activeClass, linkClass
         * 
         * @param {object} options 
         */
        getData(options) {
            this.url = options.url
        	this.limit = options.limit
            this.offset = options.offset * options.limit
            this.orderBy = options.orderBy
            this.searchBy = options.searchBy
            this.sort = options.sort
            this.search = options.search
            var xhr = new XMLHttpRequest()
            xhr.open('GET', `${options.url}${this.limit}/${this.offset}/${this.orderBy}/${this.searchBy}/${this.sort}/${this.search}`, true)
            xhr.responseType = 'json'
            xhr.onload = () => {
                this.data = xhr.response['container']
                this.create({
                	rows: xhr.response['totalRows'],
                	start: options.offset,
                	linkNum: options.linkNum,
                	activeClass: options.activeClass,
                	linkClass: options.linkClass
                })
            }
            xhr.send()
        },
        /**
         * Generate Pagination
         * 
         * @param {object} settings 
         * @param #settings.rows, setting.start, settings.activeClass, settings.linkClass, settings.linkNum
         */
        create(settings) {
            this.totalRows = settings.rows
            this.activeClass = settings.activeClass
            this.linkClass = settings.linkClass
            this.linkNum = settings.linkNum
            // reset links
            this.pageLinks = []

            // hitung jumlah halaman yang dibutuhkan untuk link pagination
            let countLink = settings.rows / this.limit
            countLink = Math.ceil(countLink)

            // deklarasi nomor awal link
            let startLink

            // cek apakah akan menampilkan nomor link (1, 2, 3 dst.) atau tidak
            if(settings.linkNum === false) {
                this.numLinks = false
            } 
            
            // generate startLink...
            if (settings.linkNum > countLink || settings.linkNum < 1) {
                startLink = 1
            } else {
                if (settings.linkNum % 2 !== 0) {
                    startLink = settings.linkNum - 1
                } else {
                    startLink = settings.linkNum
                }
                startLink = this.activePage - (startLink / 2)
                if (startLink < 1) {
                    startLink = 1
                }
            }  
            
            // generate link pagination....
            for (let i = startLink; i <= countLink; i++) {
                this.pageLinks.push(i)
                if (this.pageLinks.length === settings.linkNum) {
                    break;
                }
            }     
            
            // halaman terakhir sama dengan jumlah link
            this.last = countLink

            // generate link halaman sebelumnya dan selanjutnya
            settings.start === (this.last -= 1) ? this.next = settings.start : this.next = settings.start + 1
            settings.start === this.first ? this.prev = settings.start : this.prev = settings.start - 1
        },
        /**
         * Fungsi untuk menandai link yang sedang aktif 
         * 
         * @param {number} link 
         */
        activeLink(link) {   
            if (link === this.activePage) {
                return this.activeClass
            } else {
                return ''
            }      
        },
        /**
         * Mengembalikan ss-paging ke pengaturan awal
         */
        reset() {
            this.data = []
            this.pageLinks = []
            this.limit = 10
            this.offset = 0
            this.prev = 0
            this.next = 0
            this.first = 0
            this.last = 0
            this.totalRows = 0
        }
    },
    computed: {
        activePage() {
            return ((this.offset / this.limit) + 1)
        },
        dataTo() {
            let currentPage = this.offset / this.limit,
                range
            if (this.pageLinks.length === 0) {
                range = 0
            } else {
                if (currentPage === this.last) {
                    range = this.totalRows
                } else {
                    range = this.offset + this.limit
                }
            }

            return range
        },
        dataFrom() {
            let from
            if (this.pageLinks.length === 0) {
                from = 0
            } else {
                if (this.offset === 0) {
                    from = 1
                } else {
                    from = this.offset + 1
                }
            }

            return from
        },
        rowRange() {
            if(this.pageLinks.length === 0) {
                this.showPaging = false
                return 'Tidak ada data yang ditampilkan'
            } else {
                this.showPaging = true
                return `Menampilkan baris ${this.dataFrom} - ${this.dataTo} dari ${this.totalRows} baris`
            }
        }
    }
}