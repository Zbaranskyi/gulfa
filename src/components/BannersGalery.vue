<template>
  <div class="banners-galery">
    <div class="banners-galery_item" v-for="banner of banners" :key="banner.id">
      <span class="delete" @click="openDeleteBannerWindow(banner.id)"></span>
      <img :src="banner.photo" alt="">
    </div>
    <confirmation-window
        dialogText="delete current banner"
        :dialogVisible="dialogVisible"
        :handlers="{cancel: closeConfirmWindow, confirm: deleteBanner}"
    />
  </div>
</template>

<script>
import ConfirmationWindow from "@/components/ConfirmationWindow";
import confirmation from "@/mixins/confirmation";
export default {
  name: "BannersGalery",
  components: {
    ConfirmationWindow,
  },
  props: {
    banners: {
      type: Array
    }
  },
  data () {
    return {
      deletedBannerId: ''
    }
  },
  mixins: [confirmation],
  methods: {
    openDeleteBannerWindow (id) {
      this.deletedBannerId = id
      this.dialogVisible = true
    },
    async deleteBanner () {
      await this.$store.dispatch('deleteBanner', this.deletedBannerId)
      this.closeConfirmWindow()
      this.deletedBannerId = ''
    }
  }
}
</script>

<style>
</style>
