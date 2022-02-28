<template>
  <div>
    <Header></Header>
    <!-- Page Content -->
    <div class="container container-body">
      <div class="row">
        <div class="col-12">
          <h3>Filtros</h3>
          <form class="form-inline form-card">
            <div class="form-group mx-sm-3 mb-2">
              <input
                v-model="username"
                type="text"
                class="form-control"
                id=""
                placeholder="Username"
              />
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <select class="form-control" v-model="repos">
                <option value="0">QTD de repositório</option>
                <option value="10">maior ou igual a 10</option>
                <option value="20">maior ou igual a 20</option>
                <option value="50">maior ou igual a 50</option>
              </select>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <select class="form-control" v-model="followers">
                <option value="0">QTD de seguidores</option>
                <option value="10">maior ou igual a 10</option>
                <option value="20">maior ou igual a 20</option>
                <option value="50">maior ou igual a 50</option>
              </select>
            </div>
            <button @click="search" class="btn btn-primary mb-2">
              Pesquisar
            </button>
          </form>
        </div>
        <Profile :profiles="profiles"></Profile>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Profile from "@/components/Profile";

export default {
  components: {
    Header,
    Footer,
    Profile,
  },
  computed: {
    ...mapState({
      profiles: (state) => state.home.profile,
    }),
  },
  mounted() {
    this.getNextUser();
  },
  data() {
    return {
      listProfile: {},
      page: 1,
      queryString: "",
      paginate: "",
      username: null,
      repos: 0,
      followers: 0,
    };
  },
  methods: {
    ...mapActions({
      add: "getInitialUsers",
      addNext: "getNextUsers",
    }),
    search(event) {
      event.preventDefault();

      this.queryString = "users";
      let qs = "?q=";

      if (this.username == null && this.repos === 0 && this.followers === 0) {
        //qs = "";
        console.log("nenhum registro");
      } else {
        if (this.username) {
          qs += `${this.username} in:login`;
        }

        if (this.repos > 0) {
          qs += `+repos:>=${this.repos}`;
        }

        if (this.followers > 0) {
          qs += `+followers:>=${this.repos}`;
        }
        this.paginate = `&per_page=20&page=${this.page}`;

        this.queryString += qs;
        this.getInitialUsers();
      }
    },
    getInitialUsers() {
      this.add(this.queryString + this.paginate);
      //"q=" + encodeURIComponent("tom+repos:%3E42+followers:%3E1000");
    },
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.page += 1;
          if (this.page <= 10) {
            this.paginate = `&per_page=20&page=${this.page}`;
            this.debounce();
          }
        }
      };
    },
    debounce() {
      let timeout;
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        this.addNext(this.queryString + this.paginate);
      }, 100);
    },
  },
};
</script>