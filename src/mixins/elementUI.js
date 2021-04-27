export default {
    data () {
        return {
            loading: {}
        }
    },
    methods: {
        initLoading() {
            this.loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
    }
}
