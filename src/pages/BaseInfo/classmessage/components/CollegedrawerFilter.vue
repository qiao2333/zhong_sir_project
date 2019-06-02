<template>
    <a-drawer title="高级筛选" :width="650" @close="handleDrawerClose" :visible="visible" :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}">
        <a-form :form="form" @submit="handleSubmit" layout="inline" hideRequiredMark>
            <a-form-item label="起始学期">
                <a-select v-decorator="['startSemester']" showSearch placeholder="选择学期" optionFilterProp="children"
                    :filterOption="filterSelectedOption" style="width: 200px">
                    <a-select-option v-for=" item in semesterList" :key="item" :value="item">{{item}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="结束学期">
                <a-select v-decorator="['endSemester']" showSearch placeholder="选择学期" optionFilterProp="children"
                    :filterOption="filterSelectedOption" style="width: 200px">
                    <a-select-option v-for=" item in semesterList" :key="item" :value="item">{{item}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 26 }" label="学院">
                <a-checkbox :indeterminate="departmentFilter.indeterminate" @change="handleCheckAllDepartmentChange" :checked="departmentFilter.checkAll">
                    全选
                </a-checkbox>
                <a-checkbox-group v-decorator="['departmentList']" :indeterminate="departmentFilter.indeterminate"
                    :options="departmentFilter.options" @change="departmentCheckedBoxChange" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 26 }" label="课程类别">
                <a-checkbox :indeterminate="courseCategoryFilter.indeterminate" @change="handleCheckAllCourseCategoryChange"
                    :checked="courseCategoryFilter.checkAll">
                    全选
                </a-checkbox>
                <a-checkbox-group v-decorator="['courseCategoryList', {initialValue: courseCategoryFilter.options}]"
                    :indeterminate="courseCategoryFilter.indeterminate" :options="courseCategoryFilter.options" @change="courseCategoryCheckedBoxChange" />
            </a-form-item>
            <a-form-item label="课程">
                <a-select showSearch v-decorator="['courseList']" :allowClear="true" placeholder="选择课程"
                    optionFilterProp="children" mode="multiple" style="width: 535px" :filterOption="filterSelectedOption">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="tom">Tom</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="教师">
                <a-select v-decorator="['teacherList']" showSearch :allowClear="true" placeholder="选择教师"
                    optionFilterProp="children" mode="multiple" style="width: 535px" :filterOption="filterSelectedOption">
                    <a-select-option value="jack">Jack</a-select-option>
                    <a-select-option value="lucy">Lucy</a-select-option>
                    <a-select-option value="tom">Tom</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 26 }" label="年级">
                <a-checkbox :indeterminate="gradeFilter.indeterminate" @change="handleCheckAllGradeChange" :checked="gradeFilter.checkAll">
                    全选
                </a-checkbox>
                <a-checkbox-group v-decorator="['gradeList']" :indeterminate="gradeFilter.indeterminate" :options="gradeFilter.options"
                    @change="gradeCheckedBoxChange" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 26 }" label="班级">
                <a-checkbox :indeterminate="classFilter.indeterminate" @change="handleCheckAllClassChange" :checked="classFilter.checkAll">
                    全选
                </a-checkbox>
                <a-checkbox-group v-decorator="['classList']" :indeterminate="classFilter.indeterminate" :options="classFilter.options"
                    @change="classCheckedBoxChange" />
            </a-form-item>
            <a-form-item label="学号">
                <a-input v-decorator="['stuNO']" />
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" type="primary" icon="search">搜索</a-button>
            </a-form-item>
        </a-form>
    </a-drawer>
</template>

<script>
    const courseCategoryCategory = ["通识教育课", "学科基础课", "专业必修课", "专业选修课", "任意选修课", "实践教学课"]
    const departmentCategory = ["文学院", "数学院", "计算机学院", "经管学院", "体育学院", "外国语学院", "音乐学院"]
    const gradeCategory = ["12", "13", "14", "15", "16", "17", "18", "19", "20"]
    const classCategory = ["软件工程", "计算机科学与技术", "大数据"]
    const semesterList = ["2015", "2016", "2017", "2018", "2019", "2020"]
    export default {
        props: {
            visible: {
                type: Boolean,
                require: true,
                default: false
            }
        },
        data(){
            return {
                form: this.$form.createForm(this),
                semesterList: semesterList,
                courseCategoryFilter: {//课程类型过滤器
                    indeterminate: false,
                    options: courseCategoryCategory,//提供的可选择列表
                    checkedList: courseCategoryCategory,//已选列表
                    checkAll: true
                },
                departmentFilter: {//学院过滤器
                    indeterminate: false,
                    options: departmentCategory,
                    checkedList: departmentCategory,
                    checkAll: false
                },
                gradeFilter: {//年级过滤器
                    indeterminate: false,
                    options: gradeCategory,
                    checkedList: gradeCategory,
                    checkAll: false
                },
                classFilter: {//班级过滤器
                    indeterminate: false,
                    options: classCategory,
                    checkedList: classCategory,
                    checkAll: false
                }
            };
        },
        methods: {
            filterSelectedOption(input, option) {//下拉框输入文字自动匹配选项
                return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            },
            departmentCheckedBoxChange(checkedList) {//监视课学院类型复选框变化
                this.departmentFilter.indeterminate = !!checkedList.length && (
                    checkedList.length < this.departmentFilter.options.length)
                this.departmentFilter.checkAll = checkedList.length === this.departmentFilter.options.length
            },
            handleCheckAllDepartmentChange(e) {//处理学院全选复选框事件
                this.form.setFieldsValue({
                    departmentList: e.target.checked ? this.departmentFilter.options : []
                })
                Object.assign(this.departmentFilter, {
                    indeterminate: false,
                    checkAll: e.target.checked,
                })
            },
            courseCategoryCheckedBoxChange(checkedList) {
                this.courseCategoryFilter.indeterminate = !!checkedList.length && (
                    checkedList.length < this.courseCategoryFilter.options.length)
                this.courseCategoryFilter.checkAll = checkedList.length === this.courseCategoryFilter.options.length
            },
            handleCheckAllCourseCategoryChange(e) {
                this.form.setFieldsValue({
                    courseCategoryList: e.target.checked ? this.courseCategoryFilter.options : []
                })
                Object.assign(this.courseCategoryFilter, {
                    indeterminate: false,
                    checkAll: e.target.checked,
                })
            },
            gradeCheckedBoxChange(checkedList) {
                this.gradeFilter.indeterminate = !!checkedList.length && (
                    checkedList.length < this.gradeFilter.options.length)
                this.gradeFilter.checkAll = checkedList.length === this.gradeFilter.options.length
            },
            handleCheckAllGradeChange(e) {
                this.form.setFieldsValue({
                    gradeList: e.target.checked ? this.gradeFilter.options : [],
                })
                Object.assign(this.gradeFilter, {
                    indeterminate: false,
                    checkAll: e.target.checked,
                })
            },
            classCheckedBoxChange(checkedList) {
                this.classFilter.indeterminate = !!checkedList.length && (
                    checkedList.length < this.classFilter.options.length)
                this.classFilter.checkAll = checkedList.length === this.classFilter.options.length
            },
            handleCheckAllClassChange(e) {
                this.form.setFieldsValue({
                    classList: e.target.checked ? this.classFilter.options : [],
                })
                Obj
                Object.assign(this.classFilter, {
                    indeterminate: false,
                    checkAll: e.target.checked,
                })
            },
            handleDrawerClose() {//向父组件发起关闭请求
                this.$emit("colsingAdvice")
            },
            handleSubmit(e) {//根据过滤条件筛选数据
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
        }
    }
</script>

<style>
    .ant-cascader-input.ant-input {
        width: 533px;
    }
</style>
