<template>
    <div id="code" ref="coderef"></div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as monaco from 'monaco-editor';
const value = ref("hello,world");
const coderef = ref();

onMounted(() => {
    //挂载节点(防止元素没有加载进来，导致找不到元素报错)
    if(coderef.value == null){
        return 
    }
    else{
        const myEditor = monaco.editor.create(coderef.value, {
            value:value.value,
            language: "java",
            automaticLayout: true,
});
    }
});

</script>
<style coped>

#code {
    margin-top:10px;
    width: 100%;
    height: 200px;
}
</style>