<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>Daftar Makanan</h2>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control input-lg"
              placeholder="Cari Makanan"
              aria-label="Search"
              aria-describedby="basic-addon1"
              @keyup="SearchProducts"
            />
            <span class="input-group-text" id="basic-addon1"
              ><b-icon-search></b-icon-search
            ></span>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <AllProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dataServices from "../services/data_service";
import Navbar from "../components/Navbar.vue";
import AllProduct from "../components/AllProduct.vue";

export default {
  name: "Foods",
  components: {
    Navbar,
    AllProduct,
  },
  data() {
    return {
      products: [],
      search: "",
    };
  },
  mounted() {
    this.loadAllProducts();
    this.SearchProducts();
  },
  methods: {
    loadAllProducts: async function () {
      try {
        const response = await dataServices.loadAllProducts();
        this.products = response.data;
      } catch (error) {
        console.log("Gagal", error);
      }
    },
    SearchProducts: async function () {
      try {
        const response = await dataServices.loadSearchProducts(this.search);
        this.products = response.data;
      } catch (error) {
        console.log("Gagal", error);
      }
    },
  },
};
</script>

<style>
</style>