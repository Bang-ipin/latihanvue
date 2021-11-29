<template>
  <div class="food-detail">
    <Navbar />
    <div class="container">
      <!--- Breadcrumb --->
      <div class="row mt-5">
        <div class="col-md-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ product.nama }}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <img
            :src="'../assets/img/' + product.gambar"
            class="img-fluid shadow"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong> {{ product.nama }} </strong>
          </h2>
          <hr />
          <h4>
            <strong> Harga : {{ product.harga }} </strong>
          </h4>
          <form class="mt-4" @submit.prevent="buatPesanan">
            <div class="form-group">
              <div class="mb-3">
                <label for="jumlah_pemesanan" class="form-label"
                  >Jumlah Pesan</label
                >
                <input
                  v-model="form.jumlah_pemesanan"
                  type="number"
                  class="form-control"
                  id="jumlah_pemesanan"
                  placeholder="input jumlah"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="mb-3">
                <label for="keterangan" class="form-label">Keterangan</label>
                <textarea
                  v-model="form.keterangan"
                  rows="2"
                  class="form-control"
                  id="keterangan"
                  placeholder="input keterangan pemesanan"
                >
                </textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-success">
              <b-icon-cart></b-icon-cart> Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dataServices from "../services/data_service";
import Navbar from "../components/Navbar.vue";
export default {
  name: "FoodDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      product: {},
      form: {},
    };
  },
  mounted() {
    this.loadDetailProducts();
  },
  methods: {
    loadDetailProducts: async function () {
      try {
        const response = await dataServices.DetailProduct(
          this.$route.params.id
        );
        this.product = response.data;
      } catch (error) {
        this.flashMessage.error({
          message: "Some error occured!, please refresh",
          time: 3000,
        });
      }
    },
    buatPesanan: async function () {
      if (this.form.jumlah_pemesanan) {
        this.form.products = this.product;
        try {
          await dataServices.createOrder(this.form);
          this.$router.push({path:"/keranjang"});
          this.$toast.success(
            "Pesanan berhasil dimasukkan ke keranjang, Ayo tambah lagi.",
            {
              type: "success",
              position: "bottom-right",
              duration: 3000,
              dismissible: true,
            }
          );
          this.form = {
            jumlah_pemesanan: "",
            keterangan: "",
          };
        } catch (error) {
          switch (error.response.data) {
            case 422:
              this.errors = error.response.data.errors;
              break;
            default:
              this.flashMessage.error({
                message: "Some error occured!, please refresh",
                time: 3000,
              });
              break;
          }
        }
      } else {
        this.flashMessage.error({
          message: "Jumlah pemesanan masih kosong. Masukkan jumlah pemesanan !",
          time: 3000,
        });
      }
    },
  },
};
</script>

<style></style>
