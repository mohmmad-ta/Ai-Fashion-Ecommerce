<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import {onMounted, ref, watch} from "vue";
const isBooking = ref(0)
const myBooking = ref()
const booking = async (productId, userShop, color, size)=>{
  const myId = localStorage.getItem("id")
  const {data} = await axios.post(`booking/my`, {
    product: productId,
    shop: userShop,
    user: myId,
    size: size,
    color: color
  })
  isBooking.value++
}
watch(isBooking, async (newParams, oldParams) => {
  await api()
});

const api = onMounted(async ()=>{
  const {data} = await axios.get(`booking/my`)
  myBooking.value = data.data
})
const deleteOneBooking = async (id)=>{
  await axios.delete(`booking/my/${id}`)
  isBooking.value++
}
const paid = async ()=>{
  await axios.patch("booking/paid",{
    paid: true
  })
  isBooking.value++
}
</script>

<template>
  <Navbar @paid="paid" @deleteOneBooking="deleteOneBooking" :myBooking="myBooking"/>
  <RouterView @booking="booking"/>
</template>

