<template>
    <div class="container-gt">

        <div class="container-grade">
            <span>选择年级：</span>
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in data_grade" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>

        <div class="container-term">
            <span>选择学期：</span>
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>

        <Button type="primary" style="margin:10px auto;display:block" @click="handleSubmit('formValidate')">登录</Button>

    </div>
</template>

<script>
import stateGradeSemester from '@/store/datajs/stateGradeSemester'
export default {
    data(){
        return {
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            model1: '',
            data_grade:[],
            data_term:[]
        }
    },
    created () {
        console.log(stateGradeSemester,'ddddd');
        let data_grade = [];
        let data_term = [];
        stateGradeSemester.stateGradeSemester.map((item,index)=>{
            item.grade.map((g_item,g_index)=>{
                data_grade.push({
                    value:g_item.id,
                    label:g_item.name
                })
            })
        });
        this.data_grade = data_grade;
    },
    computed: {
        
    }
}
</script>
