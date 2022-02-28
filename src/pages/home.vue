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
            <button @click="search" class="btn btn-danger mb-2">
              Pesquisar
            </button>
          </form>
        </div>
        <Profile v-if="this.isLoaded" :profiles="profiles"></Profile>
      </div>
      <div>
        <b-alert
          :show="dismissCountDown"
          dismissible
          variant="warning"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
          <p>Nenhum registro encontrado</p>
          <b-progress
            variant="warning"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
          ></b-progress>
        </b-alert>
      </div>

      <div>
        <div v-if="isLoading" class="loading"></div>
        <img v-show="isLoaded" :src="imgsrc" width="400" @load="loaded" />
      </div>
      <go-top bg-color="#b63132"></go-top>
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
import GoTop from "@inotom/vue-go-top";

export default {
  components: {
    Header,
    Footer,
    Profile,
    GoTop,
  },
  mounted() {
    this.getNextUser();
  },
  computed: {
    ...mapState({
      profiles: (state) => state.home.profile,
    }),
  },
  data() {
    return {
      listProfile: {},
      page: 0,
      per_page: 20,
      limit_search: 10,
      queryString: "",
      paginate: "",
      username: null,
      repos: 0,
      followers: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      isLoaded: false,
      isLoading: false,
      imgsrc: "",
      btntext: "Show Image",
    };
  },
  watch: {
    profiles() {
      if (this.profiles.length == 0) {
        this.page = 1;
        this.showAlert();
      }
    },
  },
  methods: {
    ...mapActions({
      add: "getInitialUsers",
      addNext: "getNextUsers",
    }),
    loaded() {
      this.isLoaded = true;
      this.isLoading = false;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    search(event) {
      event.preventDefault();
      this.page = 1;

      let timeout;
      if (timeout) {
        clearTimeout(timeout);
      }

      this.isLoaded = false;
      this.isLoading = true;

      timeout = setTimeout(() => {
        this.loaded();
        this.queryString = "users";
        let qs = "?q=";
        if (!this.username && this.repos === 0 && this.followers === 0) {
          this.queryString = "users?q=ewjiieuieewi";
          this.paginate = "";
          this.getInitialUsers(false);
          this.showAlert();
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
          this.paginate = `&per_page=${this.per_page}&page=${this.page}`;

          this.queryString += qs;
          this.getInitialUsers();
        }
      }, 1000);
    },
    getInitialUsers(params = true) {
      this.page += 1;
      if (!params) {
        this.add(params);
      } else {
        this.add(this.queryString + this.paginate);
      }
    },
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          if (this.page >= 1) {
            this.page += 1;
            if (this.page <= this.limit_search) {
              this.paginate = `&per_page=${this.per_page}&page=${this.page}`;
              this.debounce();
            }
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