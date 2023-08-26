<script setup>
import ShopCard from "@/components/ShopCard.vue";
import axios from "axios";
import {onMounted, ref, watch} from "vue";
import {RouterLink} from "vue-router";
const allProduct = ref([])
const pageNum = ref(1)

const api = async ()=>{
  const {data} = await axios.get(`product?fields=user,imageCover`, {
    params: {
      page: pageNum.value,
      limit: 30,
    }
  })
  console.log(data.data)
  data.data.map(e=> allProduct.value.push(e))
}
onMounted(api)

const scrollContainer = ref()
watch(scrollContainer, (newParams, oldParams) => {
  if (newParams >= document.documentElement.scrollHeight){
    setTimeout(async function() {
      pageNum.value++
      console.log(pageNum.value)
      const response = await axios.get(`product`, {
        params: {
          page: pageNum.value,
          limit: 30
        }
      })
      response.data.data.map(e=> allProduct.value.push(e))
    }, 1000);
  }
});
window.addEventListener('scroll',  function() {
  scrollContainer.value = window.pageYOffset + window.innerHeight
});
</script>

<template>
  <main class="w-full py-10 overflow-hidden">
    <div class="container py-8 columns-2 md:columns-2 lg:columns-3 xl:columns-4 justify-center gap-4">
      <div v-for="product in allProduct" :key="product.id">
        <RouterLink :to="{ name: 'Product', params: { id: product.id } }">
          <ShopCard v-if="product.imageCover" :product="product" />
        </RouterLink>
      </div>
    </div>
  </main>
</template>
