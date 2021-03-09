export default {
    data () {
        return {
            file: null,
            base64Img: null
        }
    },
    methods: {
        onChangeFileUpload (event) {
            this.file = event.target.files[0]
            this.encodeImage(this.file)
        },
        encodeImage (input) {
            if(input) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.base64Img = e.target.result
                }
                reader.readAsDataURL(input)
            }
        }
    }
}
