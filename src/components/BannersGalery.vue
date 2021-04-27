<template>
  <div class="banners-galery">
    <div class="banners-galery_item"
         v-for="banner of banners"
         :key="banner.id"
    >
      <span class="delete" @click="openDeleteBannerWindow(banner.id)"></span>
      <img :src="banner.photo" alt="">
    </div>
    <confirmation-delete
        v-if="confirmDelete"
        v-model="confirmDelete"
        @delete-product="deleteBanner"
    />
  </div>
</template>

<script>
import ConfirmationDelete from "@/components/helpers/ConfirmationDelete";
export default {
  name: "BannersGalery",
  components: {ConfirmationDelete},
  props: {
    banners: {
      type: Array
    }
  },
  data () {
    return {
      confirmDelete: false,
      deletedBannerId: ''
    }
  },
  methods: {
    openDeleteBannerWindow (id) {
      this.deletedBannerId = id
      this.confirmDelete = true
    },
    async deleteBanner () {
      this.confirmDelete = false
      this.$emit('delete-banner', this.deletedBannerId)
      this.deletedBannerId = ''
    }
  }
}
</script>

<style scoped lang="scss">
.banners-galery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  &_item {
    margin: 20px auto;
    position: relative;
    .delete{
      position: absolute;
      display: block;
      width: 32px;
      height: 32px;
      background: url('../assets/icons/delete.svg');
      top:0;
      right: 0;
      cursor: pointer;
    }
    img {
      max-width: 290px;
      max-height: 163px;
    }
  }
}
</style>
