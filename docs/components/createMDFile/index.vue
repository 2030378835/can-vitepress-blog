<!-- md文件写作组件 搭配server本地node服务使用  不推荐打包该功能于线上-->
<script setup>
  import { ref, reactive, toRaw, onMounted, watch } from 'vue';
  import { useData } from "vitepress";
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { MdEditor } from 'md-editor-v3';
  import ActionComVue from '../action/index.vue'  
  import UploadCOverComVue from './uploadCover.vue'
  import { 
    Input, 
    Modal, 
    Button, 
    Form, 
    FormItem, 
    DatePicker, 
    Select, 
    SelectOption, 
    Textarea,
    RadioGroup,
    RadioButton,
    message,
    Tag
  } from 'ant-design-vue';
  import 'md-editor-v3/lib/style.css';
  const { isDark } = useData();

  const loading = ref(false);
  const open = ref(false);
  const tags = ref([])
  const mustText = ref(`## hello world`)
  // const upLoadImgList = ref(['/desktop/0.jpg', '/desktop/1.jpg', '/desktop/2.jpg', '/desktop/3.jpg']);
  const upLoadImgList = ref([]);
  const isBrower = ref(true)
  const titleLengthIsNot3 = ref(false)
  onMounted(() => {
    // 判断是否位本地环境
    const isLocalEnvironment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalEnvironment) {
      console.log('Running in local environment');
      isBrower.value = true
    } else {
      console.log('Running in production environment');
      isBrower.value = false
    }
  })

  const onUploadImg = async (files, callback) => {
    try {
      const res = await Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const form = new FormData();
            form.append('file', file);
            form.append('path', 'vue');
            fetch('/api/upload', {
              method: 'POST',
              body: form, // 不需要手动设置 Content-Type
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json(); // 解析 JSON 响应
            })
            .then((data) => {
              resolve(data); // 传递解析后的数据
            })
            .catch((error) => {
              reject(error); // 传递错误信息
            });
          });
        })
      );
      callback(res.map((item) => {
        upLoadImgList.value.push(item.data)
        return item.data.url
      })); // 假设返回的 JSON 对象包含 url 属性
    } catch (error) {
      console.error('Error uploading files:', error);
      callback([]); // 或者传递错误信息给回调函数
    }
  };
  const submitMd = (obj) => {
    obj.cover = obj.cover.url
    // 原生上传
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        message.success('提交成功');
        open.value = false;
        resetForm();
        mustText.value = '# hello world';
        console.log(result);
        return
      }
    };
    xhr.send(JSON.stringify({
      text:`---\n${JSON.stringify(obj)}\n---\n` + mustText.value,
      FilePath: obj.tags[0]
    }));  
  }
  const showModal = () => {
    if ( formState.title.length < 3 ) {
      message.error('标题不能小于3个字符');
      titleLengthIsNot3.value = true
      return
    }
    open.value = true;
    formState.description = mustText.value.slice(0, 200);
    // /getDirList
    // 原生上传
  
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/getDirList', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        tags.value = result.data;
        return
      }
    };
    xhr.send();
  }; 

  const formRef = ref();
  const labelCol = { span: 4 };
  const wrapperCol = { span: 19 };
  const formState = reactive({
    title: '',
    date: '',
    tags: [],
    description: '',
    cover: '',
    author: '',
  });
  const rules = {
    title: [
      { required: true, message: 'Please input Activity name', trigger: 'change' },
      { min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur' },
    ],
    tags: [{ required: true, message: 'Please input tags', trigger: 'blur' }],
    cover: [{ required: true, message: 'Please input cover', trigger: 'blur' }],
    date: [
      { required: true, message: 'Please pick a date', trigger: 'change' }
    ],
    description: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
  }; 
  const onSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log('values', formState, toRaw(formState));
        submitMd(formState);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  const resetForm = () => {
    formRef.value.resetFields();
  };
  const toolbarsExclude = [ 'mermaid', 'katex', 'github'];

  const tagState = reactive({
    visible: false,
  })

  const showSelect = () => {
    tagState.visible = true;
  };

  const handleClose = (removedTag) => {
    const tags = formState.tags.filter(tag => tag !== removedTag);
    formState.tags = tags;
  };
  const titleLengthJudg = () => {
    if (formState.title.length < 3) {
      titleLengthIsNot3.value = true
    } else {
      titleLengthIsNot3.value = false
    }
  }
</script>
<template>
  <Input 
    placeholder="请输入标题" 
    style="
      border-radius: 0px;
      height: 44px;
    "
    show-count 
    :maxlength="50"
    v-model:value="formState.title"
    :status="titleLengthIsNot3 ? 'error':'default'"
    @input="titleLengthJudg"
  />
  <MdEditor
    :toolbarsExclude="toolbarsExclude" 
    :theme="isDark?'dark':'light'" 
    v-model="mustText" 
    @onUploadImg="onUploadImg"
  />
  <div>
    <div style="height: 20px;"></div>
    <Button type="primary" @click="showModal">保存</Button>
    <Modal v-model:open="open" title="信息完善" width="700px">
      <template #footer>
        <div style="display: flex; align-items: center; justify-content: flex-end;">
          <ActionComVue v-if="!isBrower" style="flex: 1;" type="warning">💡 在线上环境写作功能不可用，在此只做UI展示！！</ActionComVue>
          <Button key="back" style="background-color: transparent;" @click="resetForm">重置</Button>
          <Button :disabled="!isBrower" key="submit" type="primary" :loading="loading" @click="onSubmit">提交</Button>
        </div>
      </template>
      <Form 
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <FormItem label="作者" prop="author">
          <Input v-model:value="formState.author" placeholder="请输作者，不输入默认网站作者" />
        </FormItem>
        <FormItem label="标签" prop="tags">
          <span v-show="!tagState.visible">
            <Tag class="tags" closable v-for="item in formState.tags" @close="handleClose(item)">
              {{ item }}
            </Tag>
          </span>
          <Select 
            @change="tagState.visible = false" 
            v-if="tagState.visible" 
            mode="tags" 
            v-model:value="formState.tags" 
            placeholder="请选择标签"
            @blur="tagState.visible = false"
          >
            <SelectOption style="color: black;" v-for="item in tags" :key="item" :value="item">
              {{ item }}
            </SelectOption>
          </Select>
          <Tag class="tags" style="color: var(--color-text);" v-else @click="showSelect">
            <plus-outlined />
            新标签
          </Tag>
        </FormItem>
        <FormItem label="封面" prop="cover">
          <!-- <RadioGroup v-model:value="formState.cover" style="padding: 1px;">
            <RadioButton :style="{
              backgroundImage: `url(${item})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }" v-for="item in upLoadImgList" :key="item" :value="item">
            </RadioButton>
          </RadioGroup> -->
          <UploadCOverComVue v-model="formState.cover" :articleImages="upLoadImgList" />
        </FormItem>
        <FormItem label="描述" prop="description">
          <Textarea v-model:value="formState.description" placeholder="描述一下吧"/>
        </FormItem>
        <FormItem label="日期" prop="date">
          <DatePicker valueFormat="YYYY-MM-DD" v-model:value="formState.date" placeholder="请选择日期"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-select-selection-item) {
  border-color: transparent;
  color: var(--color-text) !important;
}
/* 对所有输入框的 placeholder 设置颜色 */
input::placeholder,
textarea::placeholder,
select::placeholder {
  color: #9999995f; /* 设置 placeholder 的颜色 */
  opacity: 1; /* Firefox */
}
:deep(.ant-select-selection-placeholder) {
  color: #9999995f; /* 设置 placeholder 的颜色 */
}
:deep(.ant-picker-input>input::placeholder) {
  color: #9999995f !important;
}
.tags {
  color: var(--color-text);
  background-color: var(--color-bg-container);
  padding: 4px 8px;
  cursor: pointer;
}
.tags:hover {
  border: 1px solid var(--vp-c-brand-1);
}
// ant-select-dropdown css-1p3hq3p ant-select-dropdown-placement-bottomLeft
:deep(.ant-select-dropdown) {
  background: var(--color-bg-container) !important;
}
:depp(.ant-picker-dropdown) {
  background: var(--color-bg-container) !important;
}
:deep(.ant-picker-dropdown .ant-picker-panel-container) {
  background: var(--color-bg-container) !important;
}

</style>

