<template>
  <div class="table">
    <div class="titles">
      <h2 class="item"
          :style="width"
          v-for="(title, index) of titles"
          :key="index">
        {{ title }}
      </h2>
    </div>
    <div class="content">
      <div class="item" v-for="(row, n) of sortedInfo" :key="n">
        <span
            :class="{details: orders && (name === `details`) }"
            v-for="(prop, name) in row"
            :style="width"
            @click="showDetails(row.id, name)"
            :key="`${prop+name}`">
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
    },
    value: {
      type: String,
      default: ''
    },
    orders: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    width () {
      let num = this.titles.length
      return {width: `${100 / num}%`}
    },
    sortedInfo () {
      let sort = []
      if(this.value) {
        for(let item of this.info) {
          for(let prop in item) {
            if(String(item[prop]).toLowerCase().includes(this.value.toLowerCase())) {
              sort.push(item)
              break;
            }
          }
        }
      } else return this.info
      return sort
    }
  },
  methods: {
    showDetails (id, name) {
      if(this.orders && name === 'details') {
        this.$emit('show-details', id)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/variables";

.table {
  padding: 20px 15px;
  .titles{
    display: flex;
    text-align: center;
    background: #D2F4FF;
    border-radius: 10px;
    @include fontPoppins(12px, 600, 18px);
    color: $color-background-blue;
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
      span.details {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
