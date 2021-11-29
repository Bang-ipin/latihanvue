<template>
  <div>
    <b-navbar toggleable="lg" type="light" >
      <b class="container">
        <b-navbar-brand to="/">Kulineran</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/foods">Foods</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/keranjang">Keranjang
            <b-icon icon="cart"></b-icon>
              <span class="badge badge-success">{{ updateOrders ? updateOrders.length : jumlah_order.length }}</span>
              </b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b>
    </b-navbar>

    
  </div>
</template>

<script>
import * as dataServices from "../services/data_service";
export default {
  name: "Navbar",
  data() {
    return {
      jumlah_order: [],
    };
  },
  props: ["updateOrders"],
  mounted() {
    this.loadKeranjang();
  },
  methods: {
    loadKeranjang: async function () {
      try {
        const response = await dataServices.getKeranjang();
        this.jumlah_order = response.data;
      } catch (error) {
        this.flashMessage.error({
          message: "Some error occured!, please refresh",
          time: 3000,
        });
      }
    },
  },
};
</script>

<style></style>
