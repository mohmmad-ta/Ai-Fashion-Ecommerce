<script setup>
import {ref} from "vue";
import {RouterLink} from "vue-router";
const s = defineProps({
  product: {
    type: Array
  }
})
const overlay = ref(false)
</script>

<template>
  <div @mouseover="overlay = true" @mouseleave="overlay = false" class="cursor-pointer bg-slate-950 w-full mt-4 rounded-sm relative overflow-hidden" >
    <img crossorigin="anonymous" :src="product.imageCover" alt="" class="h-full w-full">
    <Transition>
      <div v-if="overlay" :class="overlay" class="w-full h-full absolute z-[2] top-0 left-0 bg-gradient-to-t from-slate-900 flex items-end py-2 px-3 justify-between">
        <div class="flex gap-2">
          <img crossorigin="anonymous" :src="product.user.photo" alt="" class="h-10 w-10 rounded-full">
          <div class="mt-[-3px]">
            <h2 class="text-white font-semibold text-md">{{product.user.name}}</h2>
            <p class="text-white text-sm">{{product.user.role}}</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>

</template>
