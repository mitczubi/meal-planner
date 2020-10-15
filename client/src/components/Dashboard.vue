<template>
  <div class="container">
    <p>Here is the dashboard</p>
    <button class="btn btn-primary" type="button" @click="getRandomMeal">Get Random Meal</button>
    <div class="row row-cols-1 row-cols-md-3" v-if="meal">
      <meal-card :meal="meal"></meal-card>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../http-common';
import MealCard from '../UI/MealCard.vue'
export default {
  data() {
    return {
      meal: null
    }
  },
  methods: {
    getRandomMeal() {
      HTTP.get('/meals/meal/getRandomMeal')
      .then(response => {
        if (response.data.success) {
           this.meal = response.data.data;
        }
      })
    }
  },
  components: {
    MealCard
  }
}
</script>

<style lang="css" scoped>
</style>
