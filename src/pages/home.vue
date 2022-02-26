<template>
  <div>
    <header>
      <!-- Navigation -->
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vuefood">
        <div class="container">
          <a class="navbar-brand" href="#">
            <h3>Caiena Github</h3>
          </a>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <div class="container container-body">
      <div class="row">
        <div class="col-4" v-for="profile in profiles" :key="profile.id">
          <div class="card" style="margin-top: 50px; margin-bottom: 20px">
            <img :src="profile.avatar_url" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ profile.login }}</h5>
              <a :href="profile.respo_url" class="btn btn-primary"
                >Ver perfil</a
              >
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-3 bg-vuefood">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; {{ date }}</p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapState({
      profiles: (state) => state.home.profile,
    }),
  },

  data() {
    return {
      listProfile: {},
      valueOrder: 0,
      valueDeposit: 0,
      date: null,
      page: 1,
    };
  },
  beforeMount() {
    this.getInitialUsers();
  },
  created() {
    this.date = new Date().getFullYear();
  },
  mounted() {
    this.getNextUser();
  },
  methods: {
    ...mapActions(["logout"]),

    getInitialUsers() {
      let queryString = `users?q=tom&per_page=20&page=${this.page}`;
      this.$store.dispatch("getInitialUsers", queryString);
      //"q=" + encodeURIComponent("tom+repos:%3E42+followers:%3E1000");
    },
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.page += 20;
          let queryString = `users?q=tom&per_page=20&page=${this.page}`;
          this.$store.dispatch("getNextUsers", queryString);
        }
      };
    },
    order() {
      let params = {
        account: this.account,
        value: this.valueOrder,
        fator: -1,
      };

      this.$store.dispatch("order", params);
    },

    deposit() {
      let params = {
        account: this.account,
        value: this.valueDeposit,
        fator: 1,
      };

      this.$store.dispatch("order", params);
    },
  },
};
</script>