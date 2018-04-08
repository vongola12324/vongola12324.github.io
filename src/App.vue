<template>
  <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <router-view/>
        </div>
      </div>
      <div class="hero-foot">
        <div class="container">
          <p class="has-text-centered">Copyright &copy; 2018 Vongola</p>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .hero-foot {
    background-color: dimgrey;
    color: white;
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
</style>
