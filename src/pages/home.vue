<template>
  <div>
    <Header></Header>
    <!-- Page Content -->
    <div class="container container-body">
      <div class="row">
        <div class="col-12">
          <form class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
              <input
                type="text"
                class="form-control"
                id=""
                placeholder="Username"
              />
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <select class="form-control">
                <option>QTD de repositório</option>
                <option>maior ou igual a 10</option>
                <option>maior ou igual a 20</option>
                <option>maior ou igual a 50</option>
              </select>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <select class="form-control">
                <option>QTD de seguidores</option>
                <option>maior ou igual a 10</option>
                <option>maior ou igual a 20</option>
                <option>maior ou igual a 50</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary mb-2">
              Pesquisar
            </button>
          </form>
        </div>
        <div class="col-4" v-for="profile in profiles" :key="profile.id">
          <div class="card" style="margin-top: 50px; margin-bottom: 20px">
            <img :src="profile.avatar_url" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ profile.login }}</h5>
              <a
                :href="profile.html_url"
                target="_blank"
                class="btn btn-primary"
                >Ver perfil</a
              >
            </div>
          </div>
        </div>
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

export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapState({
      profiles: (state) => state.home.profile,
    }),
  },

  data() {
    return {
      listProfile: {},
      page: 1,
      queryString: "",
      paginate: "",
    };
  },
  beforeMount() {
    this.getInitialUsers();
  },
  created() {},
  mounted() {
    this.getNextUser();
  },
  methods: {
    ...mapActions({
      add: "getInitialUsers",
      addNext: "getNextUsers",
    }),
    getInitialUsers() {
      //let queryString = `users?q=tom&per_page=20&page=${this.page}`;
      this.queryString = `users?q=bruno in:login`;
      this.paginate = `&per_page=20&page=${this.page}`;
      this.add(this.queryString + this.paginate);
      //this.$store.dispatch("getInitialUsers", this.queryString + this.paginate);
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
            this.paginate = `&per_page=21&page=${this.page}`;
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
        //this.$store.dispatch("getNextUsers", this.queryString + this.paginate);
      }, 100);
    },
  },
};
</script>