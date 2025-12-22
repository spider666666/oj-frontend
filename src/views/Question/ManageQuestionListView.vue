<template>
    <a-table :data="data?.records" :pagination="pagination" @page-change="handleTableChange" style="margin-top: 30px">
        <template #columns>
            <a-table-column title="id" data-index="id"></a-table-column>
            <a-table-column title="题目" data-index="title"></a-table-column>
            <a-table-column title="内容" data-index="content" tooltip></a-table-column>
            <a-table-column title="标签" data-index="tags"></a-table-column>
            <a-table-column title="判题配置" data-index="judgeConfig" tooltip>
                <template #cell="{ record }">
                    {{ JSON.stringify(record.judgeConfig)}}
                </template>
            </a-table-column>
            <a-table-column title="通过数量" data-index="acceptedNum"></a-table-column>
            <a-table-column title="提交数量" data-index="submittedNum"></a-table-column>
            <a-table-column title="答案" data-index="answer"></a-table-column>
            <a-table-column title="操作栏">
                <template #cell="{ record }">
                    <div style="display: flex; gap: 8px;">
                        <a-button type="primary" @click="handleEditor(record)">编辑</a-button>
                        <a-button type="primary" @click="handleView(record)">查看</a-button>
                        <a-button status="danger" @click="handleDelete(record)">删除</a-button>
                    </div>

                </template>
            </a-table-column>
        </template>
    </a-table>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { Page_QuestionVO_, QuestionControllerService } from "../../../generated";
import { onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { QuestionQueryRequest } from '../../../generated';

const show = ref(true)
// 添加数据类型接口
const data = ref<Page_QuestionVO_>()

// 设置分页参数默认数据
const pagination = reactive({
    showTotal: true,
    current: 1,
    pageSize: 10,
    total: 0
})

//创建查询参数
const queryParams = reactive<QuestionQueryRequest>({
    current: pagination.current,
    pageSize: pagination.pageSize
})

// 或者使用下面的方法使得其变为响应式引用
// const queryParams = reactive<QuestionQueryRequest>({
//     // 用toRefs派生响应式引用，直接关联pagination的属性
//     ...toRefs(pagination),
// })

// 监听pagination的变化，实时同步到queryParams
watch(pagination, (newPagination) => {
    queryParams.current = newPagination.current;
    queryParams.pageSize = newPagination.pageSize;
    loadData()
}, { deep: true }); // 深度监听对象属性变化

// todo 缺少权限的校验
const loadData = async () => {
    const res = await QuestionControllerService.listQuestionVoByPageUsingPost(queryParams);
    console.log("查询数据为：", res)
    if (res.code === 0) {
        Message.success("查询成功")
        data.value = res.data
        console.log(data
            .value
        )
        pagination.total = res.data.total
    }
    else {
        Message.error("请检查网络设置")
    }
}

const handleTableChange = (page: number) => {
    pagination.current = page
}
onMounted(() => {
    loadData();
})

const router = useRouter()
//书写操作栏方法
const handleEditor = (record: any) => {
    //跳转到编辑页面
    router.push({
        path: "/add/question",
        query: { id: record.id }
    });
};
const handleView = (record: any) => {
    console.log("查看记录为", record);
    //跳转到查看页面
    // router.push({ path: `/question/view/${record.id}` });
};
const handleDelete = async (record: any) => {
    const res = await QuestionControllerService.deleteQuestionUsingPost({ id: record.id });
    if (res.code === 0) {
        Message.success("删除成功");
        loadData(); //刷新数据
    } else {
        Message.error("删除失败，请检查网络设置");
    }
};

</script>