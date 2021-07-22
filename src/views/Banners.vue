<template>
  <div id="banners">
    <TopRow
        withoutSearch
        btn-background="#ED1C24"
        btn-text="+ Add New Banner"
        @btn-click="showUploadBanners = true"
    />
    <BannersGalery
        :banners="$store.state.banners.data"
    />
    <add-banner
        v-if="showUploadBanners"
        v-model="showUploadBanners"
    />
  </div>
</template>

<script>
import TopRow from "@/components/helpers/TopRow";
import BannersGalery from "@/components/BannersGalery";
import AddBanner from "@/components/banners/AddBanner";

export default {
  name: "Banners",
  components: {BannersGalery, AddBanner, TopRow},
  data() {
    return {
      showUploadBanners: false,
    }
  },
  async created() {
    await this.$store.dispatch('getBanners')
  }
}
</script>

<style>

</style>
