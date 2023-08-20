<template>
    <a-collapse v-model:activeKey="activeKey" accordion>
      <slot></slot>
    </a-collapse>
  </template>


<script setup>
import {  ref, } from 'vue';


const activeKey = ref(['']);


</script>