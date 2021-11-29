<template>
  <div class="hero">
    <div class="d-md-block d-none">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong> Delicious Foods</strong>,<br />
                In Your Gadget
              </h2>
              <p>Segera pesan makanan favoritmu sekarang juga</p>
              <router-link class="btn-link" to="/foods">
                <button class="btn btn-lg btn-success">
                  <b-icon-arrow-right></b-icon-arrow-right> Pesan
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img src="../assets/img/hero.png" width="100%" height="100%" />
        </div>
      </div>
    </div>
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="d-sm-block d-sm-none">
          <div class="col-md-6 mb-5">
            <img src="../assets/img/hero.png" width="100%" height="100%" />
          </div>
          <div class="col-md-6">
            <div class="d-flex h-100">
              <div class="justify-content-center align-self-center">
                <h2>
                  <strong> Delicious Foods</strong>,<br />
                  In Your Gadget
                </h2>
                <p>Segera pesan makanan favoritmu sekarang juga</p>
                <router-link class="btn-link" to="/foods">
                  <button class="btn btn-lg btn-success">
                    <b-icon-arrow-right></b-icon-arrow-right> Pesan
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
};
</script>

<style>
</style>