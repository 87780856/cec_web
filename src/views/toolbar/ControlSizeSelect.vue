<template>
  <el-dropdown trigger='click'
    @command='__setControlSize'>
    <div>
      <svg-icon class='size-svg'
        icon-name='size' />
      <i class="el-icon-arrow-down el-icon--right iconarrow" />
    </div>
    <el-dropdown-menu slot='dropdown'>
      <el-dropdown-item :disabled="controlSize==='medium'"
        command='medium'>Medium</el-dropdown-item>
      <el-dropdown-item :disabled="controlSize==='small'"
        command='small'>Small</el-dropdown-item>
      <el-dropdown-item :disabled="controlSize==='mini'"
        command='mini'>Mini</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SvgIcon from '@/components/Widgets/SvgIcon'
export default {
  name: 'ControlSizeSelect',
  components: { SvgIcon },
  computed: {
    ...mapState({
      'controlSize': state => state.app.controlSize,
    }),
  },
  methods: {
    __setControlSize(size) {
      this.$ELEMENT.size = size
      this.$store.dispatch('setControlSize', size)
      this.$message({
        message: '转换控件大小成功',
        type: 'success'
      })
    },
  }

}
</script>

<style scoped>
.size-svg {
  cursor: pointer;
  width: 16px;
  height: 16px;
}
.iconarrow {
  height: 16px;
}
</style>

