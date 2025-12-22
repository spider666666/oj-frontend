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
                <a-select :style="{ width: '320px' }" v-model="form.language" placeholder="请选择编程语言">
                    <a-option>java</a-option>
                    <a-option>cpp</a-option>
                    <a-option>html</a-option>
                </a-select>
                <code-editor :language="form.language" @change="HandleChange" />

                <a-button type="primary" @click="doSubmitQuestion">提交题目</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { QuestionSubmitControllerService, QuestionControllerService, QuestionVO, QuestionSubmitAddRequest } from "../../../generated";
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import CodeEditor from '@/components/CodeEditor.vue';
import { languages } from 'monaco-editor/esm/metadata';

/*-----------------------传参相关的内容----------------*/

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
/*----------------定义表单相关的接口和表单数据--------------- */

//定义表单，同时进行初始化
const form = ref<QuestionSubmitAddRequest>({
    code: "",
    language: "",
    questionId: props.id
});

const doSubmitQuestion = async () => {
    console.log("提交题目", form.value)
    const res = await QuestionSubmitControllerService.doSubmitUsingPost(form.value);
    if (res.code === 0) {
        Message.success("题目提交成功！")
    }
    else {
        Message.error("题目提交失败！" + res.message)
    }


}

onMounted(() => {
    loadData();
})

const HandleChange = (newCode: string) => {
    form.value.code = newCode;
    console.log("父组件获取到的表单数据为：", form.value.code)

}
</script>