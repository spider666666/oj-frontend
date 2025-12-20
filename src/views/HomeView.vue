<template>
  <AddQuestionView/>
</template>

<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import MarkdownEdit from '@/components/MarkdownEdit.vue';
import AddQuestionView from '@/views/Question/AddQuestionView.vue';
import { ref } from 'vue';

const value = ref("");
const handleChange= (v:string) => {
  value.value = v;
  console.log("接受到子组件传递的值:", value.value);
}

</script>
