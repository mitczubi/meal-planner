<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-3">
      <meal-card v-for="meal in meals" :key="meal._id" :meal="meal"></meal-card>
    </div>
    <hr>
    <button v-if="!formActive" @click="activateForm" class="btn btn-primary btn-block mb-4">Add Meal</button>
    <div v-if="formActive">
      <form @submit.prevent="submitMeal">
        <div class="form-group">
          <label for="name">Meal Name</label>
          <input class="form-control" type="text" name="name" id="name" v-model.trim="mealForm.mealName"/>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" type="text" name="description" id="description" v-model.trim="mealForm.description"></textarea>
        </div>
        <div class="form-group">
          <label for="diet">Diet</label>
          <select class="form-control" name="diet" v-model="mealForm.diet">
            <option value="vegitarian">Vegitarian</option>
            <option value="vegan" selected>Vegan</option>
            <option value="omnivore">Omnivore</option>
          </select>
        </div>
        <div>
          <button type="submit" class="btn btn-primary btn-block" name="button">Add Meal</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../http-common';
import MealCard from '../UI/MealCard.vue'
  export default {
    data() {
      return {
        meals: [],
        formActive: false,
        mealForm: {
          mealName: '',
          description: '',
          diet: '',
          nutrition: {
            calories: Number,
            protein: Number,
            carbs: Number
          }
        },
        invalidInput: false,
        errors: []
      }
    },
    methods: {
      loadMeals() {
        HTTP.get('/meals')
        .then(response => {
          if (response.data.success) {
              this.meals = response.data.data;
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      submitMeal() {
        if (this.mealForm.mealName === '') {
          this.invalidInput = true;
          return;
        }
        this.invalidInput = false;

        HTTP.post('/meals', {
          name: this.mealForm.mealName,
          description: this.mealForm.description,
          diet: this.mealForm.diet,
          nutrition: {
            calories: this.mealForm.nutrition.calories,
            protein: this.mealForm.nutrition.protein,
            carbs: this.mealForm.nutrition.carbs
          }
        })
        .then(response => {
          if (response.ok) {
            // ...
          } else {
            throw new Error('Could not save data...');
          }
        })
        .catch(error => {
          this.errors.push(error.message);
        })
        this.formActive = false;
        this.loadMeals();
      },
      activateForm() {
        this.formActive = true;
      }
    },
    mounted() {
      this.loadMeals();
    },
    components: {
      MealCard
    }
  }
</script>

<style lang="css" scoped>
</style>
