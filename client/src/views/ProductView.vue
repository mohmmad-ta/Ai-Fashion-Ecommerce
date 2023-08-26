<script setup>
import ShopCard from "@/components/ShopCard.vue";
import axios from "axios";
import {onMounted, ref, watch} from "vue";
import {RouterLink, useRoute, useRouter} from "vue-router";
const allProduct = ref([])
const product = ref([])
const user = ref([])
const color = ref('')
const sizeProduct = ref('')
const pageNum = ref(1)
const route = useRoute();
const router = useRouter();
const imagesCover= ref()
const productId= ref()

const emit = defineEmits(['booking'])
const bookingProduct = ()=>{
  emit('booking', product.value.id, product.value.user.id, color.value, sizeProduct.value)
}
watch(() => route.params.id, async (newParams, oldParams) => {
  await api(newParams)
  window.scrollTo({ top: 0 });
});

const api = onMounted(async (id)=>{
  window.scrollTo({ top: 0, behavior: 'smooth' });
  productId.value = id || route.params.id;
  const {data} = (await axios.get(`product/${productId.value}`))
  console.log(data.data)
  product.value = data.data
  user.value = data.data.user
  sizeProduct.value = data.data.sizes[0]
  color.value = data.data.colors[0]
  imagesCover.value = product.value.imageCover
  if (product.value === []){
    router.push('/error')
  }
  const response = await axios.get(`product/filterProduct`, {
    params: {
      class: data.data.class,
    }
  })
  allProduct.value = response.data.data
})

// const scrollContainer = ref()
// watch(scrollContainer, (newParams, oldParams) => {
//   if (newParams >= document.documentElement.scrollHeight){
//     setTimeout(async function() {
//       pageNum.value++
//       console.log(pageNum.value)
//       const response = await axios.get(`product`, {
//         params: {
//           class: pageNum.value
//         }
//       })
//       response.data.data.map(e=> allProduct.value.push(e))
//     }, 1000);
//   }
// });
// window.addEventListener('scroll',  function() {
//   scrollContainer.value = window.pageYOffset + window.innerHeight
// });



const toggleImage = (num)=>{
  imagesCover.value = product.value.images[num]
  console.log(product.value.images)
  color.value = product.value.colors[num]
}
</script>

<template>
  <div class="w-full container">
    <div class="flex w-full min-h-screen py-20 md:py-0 justify-center items-center">
      <div class="shadow-sm w-full lg:w-4/5 md:max-h-[85vh] rounded-md md:p-5 grid grid-cols-5 gap-4 md:items-center items-start">

        <div class="rounded-sm h-full  overflow-hidden col-span-5 md:col-span-2">
          <Transition>
            <img crossorigin="anonymous" :src="imagesCover" class="w-full h-auto max-h-full" alt="">
          </Transition>
        </div>

        <div class="col-span-5 md:col-span-3 flex flex-col gap-3 md:px-8 py-2">
          <div class="w-full p-2 flex flex-wrap items-center justify-between">
            <div>
              <h3 class="font-bold text-gray-500  text-md">{{ product.class }}</h3>
              <h2 class="text-gray-700 font-semibold text-3xl">{{product.name}}</h2>
              <p class="text-gray-500 text-xs mt-1.5 font-semibold"><i class="fa-solid fa-heart text-red-600"></i> 20+ Love</p>
            </div>
            <h2 class="text-gray-400 md:w-auto w-full text-right font-semibold text-2xl my-3">${{product.price}}<sup class="text-sm">US</sup></h2>
          </div>

          <div class="px-2">
            <h3 class="font-semibold text-gray-500 text-sm">Colors</h3>
            <div class="flex flex-wrap gap-3 bg-white items-center py-1.5">
              <div v-for="colors in product.colors">
                <div @click="toggleImage(product.colors.indexOf(colors))" :style="color === colors ? `border: 2px solid #${colors}`: `border: 2px solid #ccc`" class="cursor-pointer w-6 h-6 flex items-center p-[1.5px] justify-center rounded-full overflow-hidden">
                  <span class="w-full h-full rounded-full" :style="`background: #${colors}`"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="px-2">
            <h3 class="font-semibold text-gray-500 text-sm">Size</h3>
            <div class="flex flex-wrap gap-3 bg-white items-center py-1.5">
              <div v-for="size in product.sizes" :key="product.id">
                <span @click="sizeProduct = size" :class="sizeProduct === size? 'bg-gray-800 text-amber-400': 'bg-gray-50 text-slate-950'" class="duration-150 cursor-pointer w-8 justify-center flex items-center h-full rounded-sm border border-gray-400 py-1 font-bold text-sm">{{size}}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center w-full gap-2 px-2 pt-5 border-t-2">
            <img src="@/assets/a1.jpg" alt="" class="w-10 h-10 rounded-full">
            <h2 class="text-gray-700 font-bold mt-[-5px] text-lg">{{ user.name }}</h2>
          </div>

          <div class="px-2">
            <h3 class="font-semibold text-gray-500 text-sm">Description</h3>
            <p class="text-gray-700 text-sm h-28 scrollbar-hide overflow-y-scroll overflow-hidden">{{product.description}}</p>
          </div>

          <div class="flex justify-center items-center pb-3">
            <p @click="bookingProduct" class="bg-slate-950 rounded-sm text-white px-10 py-2.5 mt-4 cursor-pointer">Add to cart</p>
          </div>

        </div>
      </div>
    </div>
<!--  list  -->
    <div class="py-10 w-full overflow-hidden columns-2 md:columns-2 lg:columns-3 xl:columns-4 justify-center gap-4">
      <div v-for="products in allProduct">
        <RouterLink :to="`/product/${products.id}`">
          <ShopCard :product="products" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>