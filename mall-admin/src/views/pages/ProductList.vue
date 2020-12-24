<template>
    <div class="product-list">
        <div class="product-search">
            <search @submit="searchSubmit"/>
        </div>
        <div class="product-show">

        </div>
    </div>
</template>

<script>
import Search from '@/components/Search.vue';

export default {
  components: { Search },
  methods: {
    searchSubmit(form) {
      console.log('---', form);
    },
  },
};
</script>
