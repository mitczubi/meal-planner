<template lang="html">
  <div class="col mb-4">
    <div class="card h-100 w-100">
      <div class="card-body">
        <h5 class="card-title">{{ meal.name }}</h5>
        <p class="card-text">{{ meal.description }}</p>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="(value, name) in meal.nutrition" :key="name">{{ name }}: {{ value }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['meal']
}
</script>

<style lang="css" scoped>
</style>
