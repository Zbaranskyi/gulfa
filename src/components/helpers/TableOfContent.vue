<template>
  <div class="table">
    <div class="titles">
      <h2 class="item"
          :style="`width: ${width}%`"
          v-for="(title, index) of titles"
          :key="index">
        {{ title }}
      </h2>
    </div>
    <div class="content">
      <div class="item" v-for="(row, n) of info" :key="n">
        <span
            :style="`width: ${width}%`"
            v-for="(prop, index) in row"
            :key="index">
          {{prop}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableOfContent",
  props: {
    titles: {
      type: Array
    },
    info: {
      type: Array
    }
  },
  computed: {
    width () {
      let num = this.titles.length
      return 100/num
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.table {
  border-top: 1px solid #E8E8E8;
  padding: 20px 15px;
  margin: 10px 30px;
  .titles{
    display: flex;
    text-align: center;
    background: #D2F4FF;
    border-radius: 10px;
    @include fontPoppins(12px, 600, 18px);
    color: #005CB9;
    .item{
      padding: 10px 0;
    }
  }
  .content{
    @include fontPoppins(12px, 400, 18px);
    color: #2F3741;
    .item{
      display: flex;
      text-align: center;
      padding: 10px 0;
      &:hover{
        border: 1px solid #E8E8E8;
        border-radius: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>
