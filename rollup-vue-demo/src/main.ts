import Button from '@/components/Button.vue';
import { App } from 'vue';

const components = [Button];

const install = (app: App) => {
  components.forEach((component) => {
    console.log(component.name)
    app.component(component.name as string, component);
  });
};

export default { install };
export { Button, install };
