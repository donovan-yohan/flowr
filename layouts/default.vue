<template>
  <v-app>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
      color="white"
    >
      <v-toolbar-title v-text="title" class="text-capitalize" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-nav
      :active.sync="title"
      :value="true"
      fixed
      color="white"
      mandatory
      ref="bottomNav"
    >
      <v-btn
        color="red"
        flat
        value="grades"
        to="grades"
        nuxt
      >
        <span>Grades</span>
        <v-icon>spellcheck</v-icon>
      </v-btn>

      <v-btn
        color="orange"
        flat
        value="tasks"
        to="/"
        exact
        nuxt
      >
        <span>Tasks</span>
        <v-icon>list</v-icon>
      </v-btn>

      <v-btn
        color="yellow"
        flat
        value="calendar"
        to="calendar"
        nuxt
      >
        <span>Calendar</span>
        <v-icon>calendar_today</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ''
    }
  },
  mounted() {
        const bottomNav = this.$refs.bottomNav.$el;
        const navValue = bottomNav.querySelector("a.v-btn--active").getAttribute("value");
        this.title = navValue;
      }
}
</script>

<style scoped>
  .v-btn__content span {
    font-size: 12px;
    color: gray;
  }
  .v-btn--active span {
    color: black;
  }

  .v-item-group.v-bottom-nav .v-btn--active {
    padding-top: 8px;
  }

</style>
