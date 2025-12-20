<template>
    <a-table :data="data" :pagination="pagination" @change="handleTableChange" style="margin-top: 30px">
        <template #columns>
            <a-table-column title="id" data-index="id"></a-table-column>
            <a-table-column title="题目" data-index="title"></a-table-column>
            <a-table-column title="内容" data-index="content" tooltip></a-table-column>
            <a-table-column title="标签" data-index="tags"></a-table-column>
            <!-- <a-table-column title="判题配置" data-index="judgeConfig"></a-table-column> -->
            <a-table-column title="通过数量" data-index="acceptedNum"></a-table-column>
            <a-table-column title="提交数量" data-index="submittedNum"></a-table-column>
            <!-- <a-table-column title="答案" data-index="answer"></a-table-column> -->
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
import { QuestionControllerService } from "../../../generated";
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const show = ref(true)
// const data = reactive([{
//     "id": "",
//     "title": "",
//     "content": "",
//     "tags": [],
//     "answer": "",
//     "acceptedNum": 0,
//     "submittedNum": 0,
//     "judgeConfig": {
//         "timeLimit": "0",
//         "memoryLimit": "0",
//         "stackLimit": "0"
//     }
// }])
const data = ref([])

// 设置分页参数
const pagination = reactive({
    current: 0,
    pageSize: 10,
    total: 0,
})

//创建查询参数
const queryParams = reactive({
    ...pagination,
})


//缺少权限的校验
const loadData = async () => {
    const res = await QuestionControllerService.listQuestionVoByPageUsingPost(queryParams);
    if(res.code === 0){
        console.log("获取到的数据为",res);
        Message.success("查询成功")
        data.value = res.data.records
        pagination.total = res.data.total
        console.log("赋值后的数据为：",data)
    }
    else{
        Message.error("请检查网络设置")
    }
}

const handleTableChange = (pageInfo: any) =>{
    console.log("页面改变的信息为",pageInfo)
  pagination.current = pageInfo.current
  pagination.pageSize = pageInfo.pageSize

  queryParams.current = pageInfo.current
  queryParams.pageSize = pageInfo.pageSize
  loadData();
}
onMounted(()=>{
    loadData();
})

const router = useRouter()
//书写操作栏方法
const handleEditor = (record: any) => {
    console.log("编辑记录为", record);
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
    console.log("删除记录为", record);
    const res = await QuestionControllerService.deleteQuestionUsingPost({ id: record.id });
    if (res.code === 0) {
        Message.success("删除成功");
        loadData(); //刷新数据
    } else {
        Message.error("删除失败，请检查网络设置");
    }
};

</script>