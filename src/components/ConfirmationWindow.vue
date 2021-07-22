<template>
  <el-dialog
      title="Confirm"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :before-close="()=>$emit('close-confirm')">
    <span>Do you want to {{ dialogText }} ?</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handlers.cancel">Cancel</el-button>
    <el-button type="primary" @click="handlers.confirm">Confirm</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "ConfirmationWindow",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogText: {
      type: String,
      default: ''
    },
    handlers: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>

</style>
