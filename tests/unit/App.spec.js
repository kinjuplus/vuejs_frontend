import { mount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import VueRouter from "vue-router";
import QueryCustomer from "@/views/QueryCustomer.vue";
import routes from "@/routes.js";

const localVue = createLocalVue();
localVue.use(VueRouter);

jest.mock("@/views/QueryCustomer.vue", () => ({
  name: "QueryCustomer",
  render: h => h("div")
}));


describe("App", () => {
  it("renders a child component via routing", () => {
    
    const router = new VueRouter({ routes });
    const wrapper = mount(App, { localVue, router });
    router.push({name:'QueryCustomer'});

    expect(wrapper.find(QueryCustomer).exists()).toBe(true);
  })
})