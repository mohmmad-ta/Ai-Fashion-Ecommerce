<script setup>

const props = defineProps({
  toggleSlid: String,
  user:Object,
  myBooking:Array
})
const emit = defineEmits(['deleteBooking', 'logout', 'emitpaid'])
const emitDeleteBooking = (id)=>{emit('deleteBooking', id)}
const toLogout = ()=>{emit('logout')}
const paid = ()=>{emit('emitpaid')}


</script>

<template>
  <div :class="toggleSlid" class="border-l-2 border-gray-300 w-96 bg-white h-screen pt-16 pb-3 px-3 fixed duration-200 z-20 top-0">
    <div class="relative h-full w-full flex-col flex">
      <div class="flex flex-wrap w-full gap-2 justify-between h-16 items-center">
        <div class="flex gap-2 items-center">
          <img crossorigin="anonymous" class="rounded-full h-12 w-12 border-2 border-amber-400 p-1" :src="user.photo" alt="">
          <div class="mt-[-5px]">
            <h2 class="text-md font-bold text-slate-950">{{user.name}}</h2>
            <p class="font-semibold text-sm text-gray-500">{{user.role}}</p>
          </div>
        </div>
        <i @click="toLogout" class="fa-solid fa-arrow-right-from-bracket p-2 rounded-full bg-zinc-900 duration-200 text-gray-500 hover:text-red-500 cursor-pointer"></i>
      </div>
      <div class="flex flex-wrap h-10 items-center bg-zinc-900 justify-between w-full rounded-2xl overflow-hidden px-3 my-2 py-1">
        <i class="fa-solid fa-magnifying-glass cursor-pointer text-gray-400"></i>
        <input class="w-[90%] outline-none bg-zinc-900 text-zinc-200" type="text" placeholder="Search">
      </div>

      <div class="bg-zinc-900 w-full h-full rounded-md overflow-hidden">
        <div class="flex w-auto gap-2 justify-between mx-3 px-3 py-2 border-b-2 border-zinc-300 h-fit items-center mt-1 mb-4">
          <button class="text-sm font-semibold text-zinc-300">All Order :</button>
          <button @click="paid" class="text-sm font-semibold text-amber-400 flex gap-2 items-center">
            <i class="fa-solid fa-bag-shopping"></i> Buy Order
          </button>
        </div>
        <div class="overflow-y-scroll scrollbar-hide h-full px-3">
          <div v-for="myBookings in myBooking">
            <div class="flex flex-wrap w-full py-1.5 justify-between items-center">
              <div class="flex gap-2 items-center">
                <img class="rounded-sm h-16 w-16" crossorigin="anonymous" :src="myBookings.product.imageCover" alt="">
                <div class="flex flex-col gap-3">
                  <h2 class="text-sm font-bold text-zinc-200">{{myBookings.product.name}}</h2>
                  <div class="flex gap-3 items-center">
                    <p :style="`background: #${myBookings.color}`" class="rounded-full w-5 h-5 border-2 border-gray-600"></p>
                    <span class="bg-gray-50 text-slate-950 duration-150 cursor-pointer justify-center flex items-center h-full rounded-sm px-0.5 font-semibold text-xs">{{myBookings.size}}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-3 justify-center text-right">
                <span class="text-zinc-300 text-sm font-bold">$ {{myBookings.product.price}}</span>
                <button v-if="myBookings.paid === false" @click="emitDeleteBooking(myBookings._id)" type="button" class="text-zinc-500 text-sm hover:text-red-500 duration-150">Delete <i class="fa-solid fa-trash"></i></button>
                <button v-else-if="myBookings.paid === true" type="button" class="cursor-default text-green-500 text-sm">Is paid <i class="fa-solid fa-truck-fast"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>