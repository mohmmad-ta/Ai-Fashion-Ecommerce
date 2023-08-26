<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const btnType = ref('add')

const user = ref('')
onMounted(async ()=>{
  const userId = localStorage.getItem("id")
  if (userId){
    const {data} = await axios.get("users/me")
    user.value = data.data
  }else {
    return 0
  }
})
const logout = async ()=>{
  await axios.get("users/logout")
  localStorage.setItem("token", null);
  localStorage.setItem("id", null);
  router.push('/')
}
</script>

<template>
  <main>
    <div class="w-full h-screen pt-14 z-[2]">
      <div class="w-full h-full bg-slate-100 flex overflow-hidden">
        <div class="bg-white border-r-2 border-gray-300 flex-col w-96 flex h-full p-3">
          <div class="flex flex-wrap w-full gap-2 justify-between h-16 items-center">
            <div class="flex gap-2 items-center">
              <img crossorigin="anonymous" class="rounded-full h-12 w-12 border-2 border-amber-400 p-1" :src="user.photo" alt="">
              <div class="mt-[-5px]">
                <h2 class="text-md font-bold text-slate-950">{{user.name}}</h2>
                <p class="font-semibold text-sm text-gray-500">{{user.role}}</p>
              </div>
            </div>
            <i @click="logout" class="fa-solid fa-arrow-right-from-bracket p-2 rounded-full bg-zinc-900 duration-200 text-gray-500 hover:text-red-500 cursor-pointer"></i>
          </div>
          <div :class="btnType === 'add' ? 'border-amber-400 bg-gray-100':'border-gray-400 bg-gray-50'" class="flex flex-wrap gap-2 peer/input text-gray-600 items-center hover:bg-gray-100 duration-150 cursor-pointer font-bold border-l-4 w-full rounded-sm overflow-hidden px-3 my-2 py-2.5">
            <i class="fa-solid fa-plus peer-hover/input:text-amber-400"></i>Add product
          </div>
          <div :class="btnType === 'list' ? 'border-amber-400 bg-gray-100':'border-gray-400 bg-gray-50'" class="flex flex-wrap gap-2 peer/input text-gray-600 items-center hover:bg-gray-100 duration-150 cursor-pointer font-bold border-l-4 w-full rounded-sm overflow-hidden px-3 my-2 py-2.5">
            <i class="fa-solid fa-list"></i>List product
          </div>
        </div>

        <section class="bg-gray-100 flex justify-center py-10 w-full">
          <div class="rounded-lg bg-white p-8 shadow-lg h-fit lg:p-12">
            <form action="" class="space-y-4">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label class="text-sm m-1 text-slate-950" for="name">Name</label>
                  <input class="w-full bg-gray-100 rounded-md border-gray-200 p-2.5 text-sm" placeholder="Enter Name" type="text" id="name"/>
                </div>

                <div>
                  <label class="text-sm m-1 text-slate-950" for="price">Price</label>
                  <input class="w-full rounded-md border-gray-200 p-2.5 bg-gray-100 text-sm" placeholder="Enter Price" type="number" id="price"/>
                </div>
              </div>

              <div>
                <label class="text-sm m-1 text-slate-950" for="description">Description</label>
                <textarea class="w-full rounded-md border-gray-200 p-2.5 bg-gray-100 text-sm" placeholder="Enter Description" id="description"></textarea>
              </div>

              <div>
                <label class="text-sm m-1 text-slate-950" for="imageCover">Image Cover</label>
                <div class="flex items-center gap-2 bg-gray-100 rounded-md px-2">
                  <input class="w-full rounded-md border-gray-200 p-2.5 text-sm" type="file" id="imageCover" />
                </div>
              </div>

              <div>
                <label class="text-sm m-1 text-slate-950" for="images">Images</label>
                <div class="flex items-center gap-2 bg-gray-100 rounded-md px-2">
                  <input class="w-full rounded-md border-gray-200 p-2.5 text-sm" type="file" id="images" />
                  <input type="color" class="h-8 w-9">
                </div>
                <button type="submit" class="w-full rounded-lg bg-gray-100 mt-1 text-xs font-semibold py-2">Add product</button>
              </div>

              <div class="flex justify-center w-full">
                <button type="submit" class="inline-block w-full mt-4 rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto">Add product</button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </div>
  </main>
</template>
