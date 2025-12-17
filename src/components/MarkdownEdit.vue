<template>
    <Editor :value="props.value" :plugins="plugins"  @change="handleEditorChange"/>
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight';
import { Editor, Viewer } from '@bytemd/vue-next'
import {ref} from 'vue'
const value = ref("");
//为了实现组件的统一管理，建议将子组件中数据的填写和更改都交给父组件管理
/*-------------------------组件之间传参 */
// 接受参数类型定义
interface Props {
    value: string   
}

// 接受参数并设置默认值
const props = withDefaults(defineProps<Props>(), {
    value: ""
});
console.log(props.value);


// 发送事件其实是为了双向绑定的目的
// 定义发送事件
const emit = defineEmits<{
  (e: 'handle-change', val: string): void; // 事件名和父组件保持一致
}>();

// 编辑器内容变化时，触发事件传递值给父组件
const handleEditorChange = (v: string ) => {
    value.value = v;
    console.log("子组件传递给父组件的值为：", value.value);
  emit('handle-change', value.value); // 把编辑器的真实值传出去
};


// 引入组件
const plugins = [
    gfm(),
    highlight()
]


////在当前组件中其实就是在自组件中完成了数据的编辑，只不过把数据的最终存储和管理交给了父组件
//props是用来接受数据的，emit是用来发送数据的，于是就有了语法糖将两者结合在一起形成了v-model的双向绑定
</script>