<script setup>
import {ref} from "vue";

defineProps({
  toggleSign: String
})
const emit = defineEmits(['open', 'openLog', 'signup']);
const openPup = ()=>{
  emit('open')
}
const togglePup = ()=>{
  emit('openLog')
  emit('open')
}
const user = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})
const signupAcc = ()=>{
  emit('signup', user.value.name, user.value.email, user.value.password, user.value.passwordConfirm)
}
</script>

<template>
  <div :class="toggleSign">
    <div class="flex fixed z-10 left-0 top-0 w-full h-screen py-20 md:py-0 justify-center items-center">
      <div @click="openPup" class="w-full h-full backdrop-blur-2xl fixed"></div>
      <div class="fixed">
        <div class="w-full justify-center md:max-h-[85vh] rounded-md md:p-5 flex items-center">
          <div class="flex flex-col max-w-96 py-3 bg-gray-50  gap-2 px-8 rounded-md">
            <div class="w-full text-center mt-1">
              <h2 class="font-bold text-2xl text-amber-400">Sign Up</h2>
            </div>
            <div class="w-full">
              <span class="font-semibold text-gray-500 text-sm">Name</span>
              <input v-model="user.name" type="text" class="w-full px-2 py-1.5 outline-none rounded-sm bg-slate-100 bg-opacity-80 border-2 border-slate-300" placeholder="Enter your name">
            </div>
            <div class="w-full">
              <span class="font-semibold text-gray-500 text-sm">Email</span>
              <input v-model="user.email" type="email" class="w-full px-2 py-1.5 outline-none rounded-sm bg-slate-100 bg-opacity-80 border-2 border-slate-300" placeholder="Enter your email">
            </div>
            <div class="w-full">
              <span class="font-semibold text-gray-500 text-sm">Password</span>
              <input v-model="user.password" type="password" class="w-full px-2 py-1.5 outline-none rounded-sm bg-slate-100 bg-opacity-80 border-2 border-slate-300" placeholder="Enter your password">
            </div>
            <div class="w-full">
              <span class="font-semibold text-gray-500 text-sm">Password</span>
              <input v-model="user.passwordConfirm" type="password" class="w-full px-2 py-1.5 outline-none rounded-sm bg-slate-100 bg-opacity-80 border-2 border-slate-300" placeholder="Enter your">
            </div>
            <span class="text-gray-600 font-semibold text-sm cursor-pointer">I forgot the password.</span>

            <div class="flex justify-center items-center pb-3">
              <button @click="signupAcc" type="button" class="font-bold rounded-sm bg-slate-950 text-white px-10 py-2.5 mt-4 cursor-pointer">Add to cart</button>
            </div>
            <span @click="togglePup" class="text-gray-600 font-semibold text-sm cursor-pointer">I have account ??</span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>