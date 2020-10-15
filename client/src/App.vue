<template>
  <div id="app">
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a href="#" class="navbar-brand col-sm-3 col-md-2 mr-0">Meal Planner</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item" @click="componentName = 'Dashboard'">
                <a class="nav-link active">
                  <span data-feather="home"></span>
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item" @click="componentName = 'Meals'">
                <a class="nav-link active">
                  <span data-feather="home"></span>
                  Meals <span class="sr-only">(current)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <component v-bind:is="componentName"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Meals from './components/Meals.vue'
export default {
  name: 'App',
  data() {
    return {
      componentName: Dashboard
    }
  },
  components: {
    Dashboard: Dashboard,
    Meals: Meals
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
