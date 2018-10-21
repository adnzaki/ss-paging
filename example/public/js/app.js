const app = new Vue({
    el: '#app',
    mixins: [SSPaging],
    data: {
        source: `${baseUrl}index.php/Karyawan/`,
    },
    mounted() {
        this.reset()
        setTimeout(() => {
            this.getKaryawan()
        }, 200);
    },
    methods: {
        getKaryawan() {
            this.getData({
                limit: 10,
                offset: 0,
                orderBy: 'nama',
                searchBy: 'nama-umur-jabatan',
                sort: 'ASC',
                search: '',
                url: `${this.source}get/`,
                linkNum: 4,
                activeClass: 'active',
                linkClass: 'page-item',
            })
        }
    }
})