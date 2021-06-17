export default {
    data () {
        return {
            loadingDelete: false,
            dialogVisible: false
        }
    },
    methods: {
        closeConfirmWindow(){
            this.loadingDelete = false
            this.dialogVisible = false
        },
        openConfirmWindow(){
            this.loadingDelete = true
            this.dialogVisible = true
        }
    }
}
