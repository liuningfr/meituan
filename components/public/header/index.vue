<template>
  <el-row :gutter="20" class="m-header">
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <Geo/>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <User/>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import Geo from "./geo";
import User from "./user";

export default {
  components: {
    Geo,
    User
  }
};
</script>

<style lang="scss">
@import "@/assets/css/public/layout.scss";
</style>


