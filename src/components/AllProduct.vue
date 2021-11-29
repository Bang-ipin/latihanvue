<template>
  <div>
    <div>
      <div class="card shadow mb-5 card-product">
        <img :src="'assets/img/'+product.gambar" class="card-img-top mb2" :alt="product.nama" style="width:100%"/>
        <div class="card-body">
          <h5 class="card-title">{{ product.nama }}</h5>
          <p class="card-text">
           Harga Rp. {{ product.harga}}
          </p>
          <router-link :to="'/foods/'+product.id" class="btn btn-success"><b-icon-cart></b-icon-cart> Pesan </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllProduct",
  props: ["product"],
};
</script>

<style>

</style>