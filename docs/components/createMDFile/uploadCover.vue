<template>
  <div class="cover">
    <UploadDragger
      v-if="!fileUrl"
      style="width: 180px; height: 100px; background-color: var(--color-bg-container); border-radius: 4px;"
      name="file"
      action="/api/upload"
      @change="handleChange"
      @drop="handleDrop"
      :disabled="value !== '本地上传'"
    >
      <div class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </div>
      <span class="ant-upload-text">{{ 
        value === '本地上传' ? '点击或拖拽图片到此处上传' : `请选择${value}`
      }}</span>
    </UploadDragger>
    <Image 
      :preview="{ visible: previewVisible, onVisibleChange: handleVisibleChange }" 
      v-else 
      :src="fileUrl.renderUrl" 
      style="width: 178px; height: 100px;border-radius: 8px;"
    >
      <template #previewMask>
      <div class="custom-preview-mask">
        <button @click="fileUrl=''">
          <DeleteOutlined />
        </button>
        <button @click="previewVisible=true">
          <EyeOutlined />
        </button>
      </div>
    </template>
    </Image>

    <div style="display: flex; flex-direction: column; height: 100px; flex: 1; margin-left: 6px;">
      <Segmented style="background-color: transparent;" @change="changeFind" v-model:value="value" block :options="data"/>
      <div class="content" style="flex: 1;">
        <img 
          :style="{
            border: `2px solid ${item === fileUrl ? 'var(--vp-c-brand-1)' : 'transparent'}`
          }"
          v-for="item in renderImages" 
          :src="item.renderUrl"
          class="img-cover"
          @click="handleMouseEnter(item)"
        />
        <span v-if="!renderImages?.length">
          暂无图片
        </span>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref, reactive, defineProps, defineModel, computed } from 'vue';
import { InboxOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { message, UploadDragger, Image, Segmented } from 'ant-design-vue';

const props = defineProps(['articleImages'])
const localUpload = ref([])

const previewVisible = ref(false);
const fileUrl = defineModel();

const data = reactive(['正文图', '标签图', '本地上传']);
const value = ref(data[0]);

const renderImages = computed(() => {
  if (value.value === '正文图') {
    fileUrl.value = props.articleImages[0]
    return props.articleImages;  
  }
  if (value.value === '本地上传') {
    fileUrl.value = props.articleImages[0]
    return localUpload.value;
  }
})
const handleChange = (info) => {
  console.log(info);
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
    localUpload.value.push(info.file.response.data)
    fileUrl.value = info.file.response.data;
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e) {
  console.log(e);
}

const handleMouseEnter = (item) => {
  console.log(item);
  fileUrl.value = item;
};

const changeFind = (val) => {
  if(val === '本地上传') {
    fileUrl.value = '';
  }
  value.value = val;
}

const handleVisibleChange = (val) => {
  if (fileUrl.value) {
    previewVisible.value = val;
  }
}
</script>
<style scoped lang="scss">
  .ant-upload-text {
    font-size: 10px !important;
    color: var(--color-text);
  }
  .ant-upload-drag-icon {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    color: var(--vp-c-brand-1);
  }
  .ant-upload-list {
    display: none !important;
  }
  .cover {
    display: flex;
    align-items: center;
  }
  .cover-image {
    width: 75px !important;
    height: auto;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: var(--color-bg-container);
    margin-top: 4px;
    .img-cover {
      width: 75px;
      height: 44px;
      border-radius: 4px;
      background-size: 100% 100%;
      cursor: pointer;
      object-fit: cover;
    }
  }
 .img-cover:hover {
    border: 2px solid var(--vp-c-brand-1) !important;
    opacity: 0.8;
  }
  .custom-preview-mask {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin: 4px;
      font-size: 16px;
      cursor: pointer;
    }
  }
</style>

