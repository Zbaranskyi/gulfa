<template>
<div id="banners">
  <TopRow
      withoutSearch
      btn-background="#ED1C24"
      :btn-text="btnText"
      @btn-click="showUploadBanners = true"
  />
  <BannersGalery
      :banners="banners"
      @delete-banner="deleteBanner"
  />
  <add-banner
      v-if="showUploadBanners"
      v-model="showUploadBanners"
      @add-banner="addNewBanner"
  />
</div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import AddBanner from "@/components/products/AddBanner";
import BannersGalery from "@/components/BannersGalery";
import api from "@/service/api";

export default {
  name: "Banners",
  components: {BannersGalery, AddBanner, TopRow},
  data() {
    return {
      btnText: '+ Add New Banner',
      showUploadBanners: false,
      banners: []
    }
  },
  async created() {
    await this.getBanners()
  },
  methods: {
    async getBanners() {
      await api.GET('/Banners')
          .then(res=> this.banners = res.data)
          .catch(err => console.log(err))
    },
    async deleteBanner(id) {
      await api.DELETE(`/banners?id=${id}`, 'token')
          .then(()=>{
            this.getBanners()
            this.$emit('success-action')
          })
          .catch(err=>console.dir(err))
    },
    async addNewBanner (formdata) {
      await api.POST(`/banners?Linq=http://www.syject.com/`, formdata, 'token', true)
          .then(()=>{
            this.showUploadBanners = false
            this.getBanners()
            this.$emit('success-action')
          })
          .catch(err=>console.dir(err))
    }
  }
}
</script>

<style scoped>

</style>
