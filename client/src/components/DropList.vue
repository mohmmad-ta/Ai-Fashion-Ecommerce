<script setup>
import {ref} from "vue";

const props = defineProps({
  items: {
    type: Array
  }
})
const open = ref(false)
const valueDrop = ref('')
valueDrop.value = props.items[0]
const toggleDrop = ()=>{
  open.value === true ? open.value=false : open.value=true;
}
</script>

<template>
<div class="relative">
  <button type="button" @click="toggleDrop" @focusout="toggleDrop" class="bg-slate-950 rounded-md text-white py-1 px-6 flex gap-2 items-center">
    {{valueDrop}}
    <i class="fa-solid fa-caret-down"></i>
  </button>
  <Transition>
    <div v-show="open" class="absolute w-full mt-2 p-2 rounded-md z-10 bg-slate-950 text-white overflow-y-scroll scrollbar-hide scr max-h-52">
      <div v-for="item in items">
        <p @click="valueDrop = item" class="cursor-pointer w-full duration-150 hover:bg-gray-700 rounded-sm py-1">{{item}}</p>
      </div>
    </div>
  </Transition>
</div>
</template>