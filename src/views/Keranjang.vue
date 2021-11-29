<template>
  <div class="keranjang">
    <Navbar :updateOrders="orders" />
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
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-6">
          <h2>Keranjang <strong> Saya</strong></h2>
        </div>
        <div class="col-md-6 text-right">
          <router-link to="/foods"
            ><button class="btn btn-success">
              <b-icon-plus-circle-fill></b-icon-plus-circle-fill> Tambah Pesanan
            </button></router-link
          >
        </div>
        <div class="table-responsive mt-3">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Makanan</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Harga</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in orders" :key="order.id">
                <th>{{ index + 1 }}</th>
                <td>
                  <img
                    :src="'../assets/img/' + order.products.gambar"
                    class="shadow"
                    style="width: 80px; height: 60px"
                  />
                </td>
                <td>{{ order.products.nama }}</td>
                <td>{{ order.keterangan ? order.keterangan : "-" }}</td>
                <td>{{ order.jumlah_pemesanan }}</td>
                <td align="right">Rp. {{ order.products.harga }}</td>
                <td align="right">
                  <strong>
                    {{ order.jumlah_pemesanan * order.products.harga }}
                  </strong>
                </td>
                <td align="center">
                  <button
                    @click="deletePesanan(order)"
                    class="btn btn-sm btn-danger"
                  >
                    <b-icon-trash></b-icon-trash>
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="6" align="right"><strong> Total Harga</strong></td>
                <td colspan="2" align="right">
                  <strong> Rp {{ totalHarga }}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row justify-content-end">
        <div class="col-md-6">
          <form class="mt-4" @submit.prevent="checkout">
            <div class="form-group">
              <div class="mb-3">
                <label for="noMeja" class="form-label">Nomor Meja</label>
                <input
                  v-model="form.noMeja"
                  type="text"
                  class="form-control"
                  id="noMeja"
                  placeholder="input nomor Meja"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <textarea
                  v-model="form.nama"
                  rows="2"
                  class="form-control"
                  id="nama"
                  placeholder="input nama anda"
                >
                </textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-success float-right">
              <b-icon-cart></b-icon-cart> Selesaikan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import * as dataServices from "../services/data_service";

export default {
  name: "Keranjang",
  components: {
    Navbar,
  },
  data() {
    return {
      orders: [],
      form: {},
    };
  },
  mounted() {
    this.loadKeranjang();
  },
  methods: {
    loadKeranjang: async function () {
      try {
        const response = await dataServices.getKeranjang();
        this.orders = response.data;
      } catch (error) {
        this.flashMessage.error({
          message: "Some error occured!, please refresh",
          time: 3000,
        });
      }
    },
    deletePesanan(order) {
      this.$swal
        .fire({
          title: `kamu yakin ingin menghapus ${order.products.nama}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya Hapus",
          cancelButtonText: "Batal",
        })
        .then((result) => {
          if (result.value) {
            try {
              dataServices.deleteOrder(order.id);
              this.$swal.fire({
                title: "Success!",
                text: "Data sukses dihapus",
                icon: "success",
                timer: 1000,
              });

              const response = dataServices.getKeranjang();
              this.orders = response.data;
              this.loadKeranjang();
            } catch (error) {
              this.flashMessage.error({
                message: "Some error occured!, please refresh",
                time: 5000,
              });
            }
          }
        });
    },
    checkout: async function () {
      if (this.form.noMeja && this.form.nama) {
        this.form.keranjangs = this.orders;
        try {
          await dataServices.createCheckout(this.form);
          // Hapus Semua Keranjang
          this.orders.map(function (item) {
            return dataServices.deleteOrder(item.id);
          });
          this.$router.push({ path: "/pesanan" });
          this.$toast.success(
            "Pesanan anda akan segera di proses, silakan tunggu.",
            {
              type: "success",
              position: "bottom-right",
              duration: 3000,
              dismissible: true,
            }
          );
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
          message: "Pesanan tidak dapat diproses. silakan ulangi kembali !",
          time: 3000,
        });
      }
    },
  },
  computed: {
    totalHarga() {
      return this.orders.reduce(function (item, data) {
        return item + data.products.harga * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>
