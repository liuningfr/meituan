<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my">我的美团</nuxt-link>
        <dd>
          <dl>
            <nuxt-link to="/my">我的订单</nuxt-link>
          </dl>
          <dl>
            <nuxt-link to="/my">我的收藏</nuxt-link>
          </dl>
          <dl>
            <nuxt-link to="/my">我的抵用券</nuxt-link>
          </dl>
          <dl>
            <nuxt-link to="/my">账户设置</nuxt-link>
          </dl>
        </dd>
      </li>
      <li class="list">
        <nuxt-link to="/app">手机APP</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>

