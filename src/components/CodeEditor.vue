<template>
    <div id="code" ref="coderef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as monaco from 'monaco-editor';
import { QuestionSubmitAddRequest } from 'generated';
const value = ref("");
const coderef = ref();

//定义事件发送
const emit = defineEmits<{
    (e: 'change', value: string): void;
}>();

//当code发生变化的时候发送事件
watch(value, (newValue) => {
    console.log("新的值为：", newValue);
    emit('change', newValue);
});

//监控传入的参数变化
const props = defineProps<QuestionSubmitAddRequest>();
console.log("传入的参数为：", props);

onMounted(() => {
    //挂载节点(防止元素没有加载进来，导致找不到元素报错)
    if (coderef.value == null) {
        return
    }
    else {
        const myEditor = monaco.editor.create(coderef.value, {
            value: value.value,
            language: props.language,
            automaticLayout: true
        });
        // 监听 Monaco Editor 内容变化的内置事件（这是一个坑，这里存在很大的问题没有发现），注意事件的监听一定要是正确的对象
        myEditor.onDidChangeModelContent(() => {
            if (myEditor.getValue()) {
                // 将编辑器内容同步到响应式变量 value
                const newValue = myEditor.getValue();
                value.value = newValue;
            }
        });
    }
});

</script>
<style coped>
#code {
    margin-top: 10px;
    width: 100%;
    height: 200px;
}
</style>