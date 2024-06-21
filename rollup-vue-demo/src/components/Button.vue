<script setup lang="ts">
import { computed, toRefs } from 'vue';
defineOptions({
  name: 'CustomButton'
});
interface IProps {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'middle' | 'large';
}
const props = withDefaults(defineProps<IProps>(), {
  type: 'default',
  size: 'middle',
});
const emits = defineEmits(['click']);
const { size, type } = toRefs(props);

const buttonClass = computed(() => {
  return ['button', `button-${type.value}`, `button-${size.value}`];
});

const onClick = (e: Event) => {
  emits('click', e);
};
</script>
<template>
  <button :class="buttonClass" @click="onClick"><slot></slot></button>
</template>
<style lang="scss" scoped>
$button-height-map: (
  small: 32px,
  middle: 40px,
  large: 48px,
);
$gap: 8px;
$gap-middle: 16px;

$plain: #fff;
$primary: #1890ff;
$danger: #ff4d4f;

.button {
  margin: 0 $gap;
  color: #000;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 0 $gap-middle;
  &.button-primary {
    background-color: $primary;
    color: $plain;
    &:hover {
      background-color: darken($primary, 10%);
    }
    &:active {
      background-color: darken($primary, 20%);
    }
  }
  &.button-danger {
    background-color: $danger;
    color: $plain;
    &:hover {
      background-color: darken($danger, 10%);
    }
    &:active {
      background-color: darken($danger, 20%);
    }
  }

  @each $name, $size in $button-height-map {
    &.button-#{$name} {
      height: $size;
      line-height: $size;
    }
  }
}
</style>
