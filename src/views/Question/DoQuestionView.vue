<template>
    <div id="DoQuestionView">
        <a-row class="grid-demo" :gutter="[24, 12]">
            <a-col :span="12">
                <div :style="{ display: 'flex' }">
                    <a-card title="data.title" style="min-height: 100vh;">
                        <template #title>
                            {{ data?.title }}
                        </template>
                        <template #extra>
                            <a-link>放入标签的位置</a-link>
                        </template>
                        {{ data?.content }}
                        <!-- <div class="markdown-content" v-html="renderedHtml"></div> -->
                    </a-card>
                </div>
            </a-col>
            <a-col :span="12">
                <div>这里存放的是编写代码的地方</div>
                <code-editor />

                <a-button type="primary" @click="doSubmitQuestion">提交题目</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { QuestionControllerService, QuestionVO } from "../../../generated";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import CodeEditor from '@/components/CodeEditor.vue';



//根据用户根据路由id传递过来的参数进行数据的查询（一定要做一个props属性的开启）
//小细节：如果传入的数据类型不匹配，会默认使用默认值，所以要搞清楚这个函数的本质原理
const props = withDefaults(defineProps<{
    id: string
}>(), {
    id: ""
})

const data = ref<QuestionVO>();
// todo 缺少权限的校验
const loadData = async () => {
    console.log("题目id为：", props.id)
    const res = await QuestionControllerService.getQuestionVoByIdUsingGet(props.id); // 不清楚哪里来的bug
    console.log("查询数据为：", res.data)
    data.value = res.data
    if (res.code === 0) {
        Message.success("查询成功")
    }
    else {
        Message.error("请检查网络设置")
    }
}


const doSubmitQuestion = () => {
    console.log("提交题目")
    Message.success("题目提交成功！")

}

onMounted(() => {
    loadData();
})

//这里才提交之后，可能跳转到首页页面，显示当前用户提交题目的管理页面
const router = useRouter()
</script>