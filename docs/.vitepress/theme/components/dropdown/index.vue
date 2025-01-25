<template>
  <div class="VPFlyout VPNavBarMenuGroup">
    <Dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <DropdownItem :config="{
          title: configs.title,
          isNew: configs.isNew,
          isTab: true,
        }" 
        style="
          background: transparent;
          color: var(--vp-c-text-1);
        "
        :style="configs.style"
        :isActive="isActive"
        />
      </a>
      <template #overlay>
        <Menu style="background: var(--vp-c-bg-elv); padding: 12px;">
          <DropdownItem v-for="item in configs.items" :key="item.title" :config="item"  />
        </Menu>
      </template>
    </Dropdown>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed, withDefaults } from 'vue';
import { useRoute, withBase } from 'vitepress';
import { Menu, Dropdown } from 'ant-design-vue';
import DropdownItem from '../dropdownItem/index.vue' 

interface Config {
  isNew?: boolean;
  title: string;
  style?: any;
  items: Configs[];
}

interface Configs extends Config {
  isLink?: boolean;
  link?: string;
  path?: string;
}

const props = withDefaults(defineProps<{
  configs: Configs;
}>(), {
  configs: () => ({
    isNew: false,
    title: 'DROPDOWN',
    style: {},
    items: []
  })
});
const route = useRoute();
const configs = computed(() => {
  return props.configs
})

const isActive = computed(() => {
  const urlNotHaveHTML = route.path.replace('.html', '')
  return configs.value.items.some(({path}) => {
    return path && withBase(path) === urlNotHaveHTML
  })
})
</script>
<style scoped>
.VPFlyout {
  display: flex;
  align-items: center;
}
.ant-dropdown-link {
  font-size: 14px;
  display: flex;
  align-items: center;
}
div, a, span {
  font-family: var(--vp-font-family-base);
}
</style>

