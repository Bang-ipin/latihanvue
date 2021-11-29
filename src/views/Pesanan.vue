<template>
  <div class="pesanan">
    <Navbar />
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col text-center">
            <img src="../assets/img/success.png" alt="order success"  class="shadow" width="400">
            <h2 class="mt-4">Pesanan <strong> Sukses</strong></h2>
            <h4 class="mt-4">Pesanan anda akan segera di proses , Silakan menunggu </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "Pesanan",
  components: {
    Navbar,
  },
};
</script>

<style>
</style>