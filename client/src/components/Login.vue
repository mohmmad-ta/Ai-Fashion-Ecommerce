<script setup>
import {ref} from "vue";

defineProps({
  toggleLog: String
})
const emit = defineEmits(['open', 'openLog', 'login']);
const openPup = ()=>{
  emit('openLog')
}
const togglePup = ()=>{
  emit('openLog')
  emit('open')
}
const user = ref({
  email: '',
  password: '',
})
const loginAcc = ()=>{
  emit('login', user.value.email, user.value.password)
}
</script>

<template>
  <div :class="toggleLog">
    <div class="flex fixed z-10 left-0 top-0 w-full h-screen py-20 md:py-0 justify-center items-center">
      <div @click="openPup" class="w-full h-full backdrop-blur-2xl fixed"></div>
      <div class="fixed">
        <div class="w-full justify-center md:max-h-[85vh] rounded-md md:p-5 flex items-center">
          <div class="flex flex-col max-w-96 py-3 bg-gray-50  gap-3 px-8 rounded-md">
            <div class="w-full text-center mt-1">
              <h2 class="font-bold text-2xl text-amber-400">Log In</h2>
            </div>
            <div class="w-full">
              <span class="font-semibold text-gray-500 text-sm">Email</span>
              <input v-model.trim="user.email" type="email" class="w-full px-2 py-1.5 outline-none rounded-sm bg-slate-100 bg-opacity-80 border-2 border-slate-300" placeholder="Enter your email">
            </div>
            <div class="w-full">
              <span class="font-semibold text-gray-500 text-sm">Password</span>
              <input v-model.trim="user.password" type="password" class="w-full px-2 py-1.5 outline-none rounded-sm bg-slate-100 bg-opacity-80 border-2 border-slate-300" placeholder="Enter your password">
            </div>

            <div class="flex justify-center items-center pb-3 mt-2">
              <button @click="loginAcc" type="button" class="font-bold rounded-sm bg-slate-950 text-white px-10 py-2.5 mt-4 cursor-pointer">Add to cart</button>
            </div>
            <span @click="togglePup" class="text-gray-600 font-semibold text-sm cursor-pointer">I don't have account ??</span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>