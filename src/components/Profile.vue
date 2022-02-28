<template>
  <div>
    <div class="row">
      <div :class="grid" v-for="profile in profiles" :key="profile.id">
        <div class="card" style="margin-top: 50px; margin-bottom: 20px">
          <img :src="profile.avatar_url" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ profile.login }}</h5>
            <a :href="profile.html_url" target="_blank" class="btn btn-danger"
              >Ver perfil</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  props: ["profiles"],
  computed: {
    grid() {
      if (this.profiles.length > 1) {
        return "col-4";
      } else {
        return "col-12";
      }
    },
  },
};
</script>
    
<style></style>
