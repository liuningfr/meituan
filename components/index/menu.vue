<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,idx) in menu" :key="idx" @mouseenter="mouseenter ">
        <i :class="item.type"/>
        {{item.title}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{item.title}}</h4>
        <span v-for="child in item.child" :key="child.title">{{child}}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "",
      timer: null,
      menu: [
        {
          type: "food",
          title: "美食",
          child: [
            {
              title: "美食1",
              child: ["饮品", "小吃"]
            },
            {
              title: "美食2",
              child: ["饮品", "小吃"]
            }
          ]
        },
        {
          type: "takeout",
          title: "外卖",
          child: [
            {
              title: "外卖",
              child: ["饮品", "小吃"]
            }
          ]
        }
      ]
    };
  },
  computed: {
    curdetail() {
      return this.menu.filter(item => item.type === this.kind)[0];
    }
  },
  methods: {
    mouseleave() {
      console.log("mouseleave");
      this.timer = setTimeout(() => {
        this.kind = "";
      }, 150);
    },
    mouseenter(e) {
      console.log("mouseenter");
      this.kind = e.target.querySelector("i").className;
    },
    sover() {
      console.log("sover");
      clearTimeout(this.timer);
    },
    sout() {
      console.log("sout");
      this.kind = "";
    }
  }
};
</script>

<style lang="scss">
</style>


