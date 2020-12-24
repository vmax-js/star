<template>
  <div class="index">
    <div class="card">
      <card />
    </div>
    <div class="cart">
      <chart />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import Chart from '@/components/Chart.vue';

export default {
  components: { Card, Chart },
};
</script>

<style scoped>

</style>
