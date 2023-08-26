<script setup>
import {RouterLink} from "vue-router";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import DropList from "@/components/DropList.vue";
import Sidbar from "@/components/Sidbar.vue";
import {onMounted, ref, watch, watchEffect} from "vue";
import axios from "axios";
const toggleSlid = ref('-right-96')
const toggleSign = ref('hidden')
const toggleLog = ref('hidden')
const isLogin = ref(false)
const props = defineProps({
  myBooking:Array
})
const emit = defineEmits(['deleteOneBooking', 'paid'])
const emitDeleteOneBooking = (id)=>{emit('deleteOneBooking', id)}
const emitpaid = ()=>{emit('paid')}


const open =()=>{
  if (toggleSign.value === 'hidden'){
    toggleSign.value = 'block'
    toggleLog.value = 'hidden'
  }else{
    toggleSign.value = 'hidden'
  }
}
const openLog =()=>{
  if (toggleLog.value === 'hidden'){
    toggleLog.value = 'block'
  }else{
    toggleLog.value = 'hidden'
  }
}
const side = ()=>{
  toggleSlid.value === '-right-96' ? toggleSlid.value ='right-0' : toggleSlid.value ='-right-96';
}

const user = ref('')
onMounted(async ()=>{
  const userId = localStorage.getItem("id")
  if (userId){
    const {data} = await axios.get("users/me")
    user.value = data.data
    if (userId === data.data.id){
      isLogin.value = true
    }
  }else {
    return 0
  }
})

const login = async (userEmail, userPassword)=>{
  if (userEmail !== '' && userPassword !== ''){
    const {data} = await axios.post("users/login", {
      email: userEmail,
      password: userPassword
    })
    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.data.user._id);
    isLogin.value = true
    openLog()
  }else {
    return 0
  }
}
const logout = async ()=>{
  await axios.get("users/logout")
  localStorage.setItem("token", null);
  localStorage.setItem("id", null);
  isLogin.value = false
  side()
}

const signup = async (userName, userEmail, userPassword, passwordConfirm)=>{
  if (userName !== '' && userEmail !== '' && userPassword !== '' && passwordConfirm !== ''){
    console.log(userName, userEmail, userPassword, passwordConfirm)
    const {data} = await axios.post("users/signup", {
      name: userName,
      email: userEmail,
      password: userPassword,
      passwordConfirm: passwordConfirm
    })
    open()
    openLog()
  }else {
    return 0
  }
}
</script>

<template>
  <header class="w-full bg-slate-950 text-white z-40 fixed top-0">
    <div class="container">
      <div class="flex justify-between items-center w-full py-3">
        <div class="relative overflow-hidden">
          <RouterLink to="/" class="font-bold text-2xl">ZUREA</RouterLink>
          <div class="w-32 h-0.5 bg-slate-950 absolute rotate-[15deg] top-6 left-[-20px]"></div>
        </div>
        <div class="flex rounded-sm overflow-hidden bg-white px-2 py-1 items-center gap-1">
          <input class="outline-none text-slate-950 w-72 md:w-96 peer/search font-semibold" type="text" placeholder="Search">
          <i class="fa-solid fa-magnifying-glass text-slate-950 ease-in duration-150 peer-focus/search:text-amber-400"></i>
        </div>
        <nav v-if="isLogin" class="flex gap-4 w-20 justify-center">
          <button v-if="user.role === 'user'" @click="side" type="button" class="hover:text-amber-400 duration-150">
            <i class="fa-sharp fa-solid fa-cart-shopping"></i>
          </button>
          <RouterLink v-else-if="user.role === 'admin' || user.role ==='shop'" to="/" class="hover:text-amber-400 duration-150">
            <i class="fa-solid fa-user"></i>
          </RouterLink>
        </nav>
        <nav v-else class="flex gap-4">
          <button @click="open" type="button" class="border-2 rounded-sm border-white px-2 py-0.5 hover:bg-white hover:text-slate-950 duration-150 ">Sign up</button>
        </nav>
      </div>
    </div>
  </header>
  <Transition>
    <Signup @signup="signup" @open="open" @openLog="openLog" :toggleSign="toggleSign" />
  </Transition>
  <Transition>
    <Login @login="login" @open="open" @openLog="openLog" :toggleLog="toggleLog" />
  </Transition>
  <Transition>
    <Sidbar @emitpaid="emitpaid" @logout="logout" @deleteBooking="emitDeleteOneBooking" :myBooking="myBooking" :user="user" :toggleSlid="toggleSlid" />
  </Transition>
</template>

<style scoped>
header a.router-link-exact-active {
  color: #e5b519;
}

header a.router-link-exact-active:hover {
  color: #e5b519;
}
</style>