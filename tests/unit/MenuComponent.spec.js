import { shallowMount,createLocalVue } from '@vue/test-utils';
import MenuComponent from '@/components/MenuComponent.vue';


describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(MenuComponent, {
      mocks: {
        $t: (msg) => msg,
        $store: {
           getters: {
             getUserInfo: { name:'test'}
           }
         }
      }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.find("#userName").text()).toBe("test");
  });
});