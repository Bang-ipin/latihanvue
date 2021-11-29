<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <Hero />
      <div class="row mt-4">
        <div class="col-md-6">
          <h2>Best <strong>Foods</strong></h2>
        </div>
        <div class="col-md-6">
          <router-link to="/foods" class="btn btn-success float-right"
            ><b-icon-eye></b-icon-eye> Load More</router-link
          >
        </div>
      </div>
      
      <div class="row mt-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
        
          <BestProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dataServices from "../services/data_service";
import Navbar from "@/components/Navbar.vue";
import Hero from "../components/Hero.vue";
import BestProduct from "../components/BestProduct.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Hero,
    BestProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    loadBestProducts: async function () {
      try {
        const response = await dataServices.loadBestProducts();
        this.products = response.data;
      } catch (error) {
        console.log("Gagal", error);
      }
    },
  },
  mounted() {
    this.loadBestProducts();
  },
};
</script>
