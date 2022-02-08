<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
/* import pageSearch from '@/components/page-search' */
import pageContent from '@/components/page-content'
export default defineComponent({
  name: 'xh-menu',
  components: {
    /* pageSearch, */
    pageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
