<template>
  <div>
    <modal-window
        deleteButton
        @close="closeModal"
        @btn-click="saveChanges"
        @delete-product="confirmDelete=true"
        :value="value">
      <template #title>
        Edit Category
      </template>
      <template #default>
        <div class="main-block">
          <div class="image-block">
            <img v-if="base64Img" class="image" :src="base64Img" alt="">
            <img v-else-if="image" class="image" :src="image" alt="">
            <div v-else class="image"></div>
            <label class="image-cropper" for="file">Upload new image</label>
            <input style="display: none" type="file" id="file" @change="onChangeFileUpload"/>
          </div>
          <div class="info">
            <div class="info-row">
              <InputWithLabel
                  title="Name"
                  v-model="name"
                  :width="50"
                  :error="$v.name.$error"
              />
              <InputWithLabel
                  title="Arabic Name"
                  align="right"
                  v-model="arName"
                  :width="50"
                  :error="$v.arName.$error"
              />
            </div>
          </div>
        </div>
      </template>
      <template
          #button>Save changes</template>
    </modal-window>

    <confirmation-delete
        v-if="confirmDelete"
        v-model="confirmDelete"
        @delete-product="deleteCategory"
    />
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
import encodeImage from "@/mixins/encodeImage";
import InputWithLabel from "@/components/helpers/InputWithLabel";
import ConfirmationDelete from "../helpers/ConfirmationDelete";
import {required} from 'vuelidate/lib/validators'

export default {
  name: "EditCategory",
  components: {ConfirmationDelete, InputWithLabel, ModalWindow},
  data () {
    return {
      name: '',
      arName: '',
      image: null,
      confirmDelete: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    categoryId: {
      type: String
    }
  },
  validations: {
    name: {required},
    arName: {required}
  },
  async created() {
    this.$store.commit('setLoading')

    await this.$store.dispatch('getSelectedCategory', this.categoryId)
    .then(()=>{
      this.name = this.getSelectedCategory.title
      this.arName = this.getSelectedCategory.titleAr
      this.image = this.getSelectedCategory.imageUri
    })
    this.$store.commit('unsetLoading')
  },
  computed: {
    getSelectedCategory () {
      return this.$store.getters.getSelectedCategory
    }
  },
  mixins: [encodeImage],
  methods: {
    async saveChanges () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let id = this.categoryId
        let formdata = null
        if (this.file) {
          formdata = new FormData()
          formdata.append('File', this.file)
        }
        let data = {
          title: this.name,
        }
        let dataAr = {
          title: this.arName
        }
        await this.$store.dispatch('putCategory', {data, formdata,dataAr, id})
        this.$emit('input', false)
      }
    },
    async deleteCategory () {
      await this.$store.dispatch('deleteCategory', this.categoryId)
      this.$emit('input', false)
    },
    closeModal() {
      this.$store.commit('setSelectedCategory', {})
      this.$emit('input', false)
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.main-block{
  display: flex;
  flex-direction: column;
  width: 100%;
  @include fontPoppins(12px, 400, 20px);
  .image-block{
    display: flex;
    margin-bottom: 30px;
    justify-content: center;
  }
  .image{
    width: 150px;
    //height: 100px;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  }
  .image-cropper {
    width: 150px;
    height: 100px;
    //background: yellow;
    border: 1px dashed #E7E6E6;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    color: #2F3741;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
    &-row {
      margin-top: 10px;
      display: flex;
      &.descriptions{
        //justify-content: space-between;
      }
    }
  }
}
</style>
