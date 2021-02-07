<template>
  <nav class="columns is-centered is-medium">
    <ul v-for="link in navLinks" :key="link.text" class="tab">
      <li>
        <router-link class="column mx-4 px-4" :to="link.to">
          {{ link.text }}
        </router-link>
      </li>
    </ul>
  </nav>
  <main class="main">
    <router-view />
  </main>
  <Footer class="footer"></Footer>
</template>

<script lang="ts">
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
  },
  data() {
    return {
      navLinks: [
        {
          to: "/",
          text: "Home",
        },
        {
          to: "/youtube",
          text: "Youtube",
        },
        {
          to: "/spotify",
          text: "Spotify",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@300;400&display=swap");
@import "~bulma";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.main {
  height: 100%;
  min-height: 80vh;
    background: linear-gradient(
    140deg,
    rgba(221, 154, 163, 0.35) 0%,
    rgba(188, 114, 236, 0.2) 1%,
    rgba(255, 224, 156, 0.5) 30%,
    rgba(212, 155, 155, 0.25) 100%
  );
}

.column {
  margin: 2%;
  display: flex;
}

.footer {
  height: 10vh;
  display: block;
  background-color: rgba(240, 240, 230, 1);
}

.is-medium {
  height: 10vh;
  background-color: rgba(240, 240, 230, 1);
  display: flex;
  margin: auto;
}

.columns:not(:last-child) {
  margin-bottom: 0;
}

.tab {
  font-size: 1.3rem;
}

.router-link-exact-active,
.router-link-active {
    color: red;
  }

</style>
