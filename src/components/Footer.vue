<template>
  <!-- Footer -->
  <footer class="py-3 bg-vue">
    <div class="container">
      <p class="m-0 text-center text-white">Copyright &copy; {{ date }}</p>
    </div>
    <!-- /.container -->
  </footer>
</template>
    
<script>
export default {
  data() {
    return {
      date: null,
    };
  },
  created() {
    this.date = new Date().getFullYear();
  },
};
</script>
    
<style></style>
