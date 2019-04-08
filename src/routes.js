import Home from "./views/Home.vue";
import Welcome from "./views/Welcome.vue";
import QueryCustomer from "./views/QueryCustomer.vue";
import CustomerDataTableClient from "./views/CustomerDataTableClient.vue";
import CustomerDataTableServer from "./views/CustomerDataTableServer.vue";
import QueryDocument from "./views/QueryDocument.vue";
import UploadFile from "./views/UploadFile.vue";
import DownloadFile from "./views/DownloadFile.vue";
import AjaxSearch from "./views/AjaxSearch.vue";
import Country from "./views/Country.vue";
import CountryFragment from "./views/CountryFragment.vue";
import ItemQuery from "./views/ItemQuery.vue";
import ItemNew from "./views/ItemNew.vue";
import ItemView from "./views/ItemView.vue";
import ItemEdit from "./views/ItemEdit.vue";
import SearchUser from "./views/SearchUser.vue";
import CourseQuery from "./views/CourseQuery.vue";
import CourseNew from "./views/CourseNew.vue";
import CourseView from "./views/CourseView.vue";
import CourseEdit from "./views/CourseEdit.vue";
import ChartJs from "./views/ChartJs.vue";
import ViewLineChart from "./views/ViewLineChart.vue";
import RestCustomer from "./views/RestCustomer.vue";
import RestDownload from "./views/RestDownload.vue";
import RestUpload from "./views/RestUpload.vue";
import RestMultiUpload from "./views/RestMultiUpload.vue";
import CreateSampleForm from "./views/CreateSampleForm.vue";
import QuerySampleForm from "./views/QuerySampleForm.vue";
import WorkItemList from "./views/WorkItemList.vue";
import AdminBulletin from "./views/AdminBulletin.vue";
import BulletinView from "./views/BulletinView.vue";
import BulletinEdit from "./views/BulletinEdit.vue";

export default 
[
    {
      path: "/",
      name: "home",
      component: Welcome,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/QueryCustomer",
      name: "QueryCustomer",
      component: QueryCustomer,
    },
    {
      path: "/CustomerDataTableClient",
      name: "CustomerDataTableClient",
      component: CustomerDataTableClient,
    },
    {
      path: "/CustomerDataTableServer",
      name: "CustomerDataTableServer",
      component: CustomerDataTableServer,
    },
    {
      path: "/QueryDocument",
      name: "QueryDocument",
      component: QueryDocument
    },
    {
      path: "/UploadFile",
      name: "UploadFile",
      component: UploadFile
    },
    {
      path: "/DownloadFile",
      name: "DownloadFile",
      component: DownloadFile
    },
    {
      path: "/AjaxSearch",
      name: "AjaxSearch",
      component: AjaxSearch
    },
    {
      path: "/Country",
      name: "Country",
      component: Country
    },
    {
      path: "/CountryFragment",
      name: "CountryFragment",
      component: CountryFragment
    },
    {
      path: "/ItemQuery",
      name: "ItemQuery",
      component: ItemQuery
    },
    {
      path: "/ItemView/:itemId",
      name: "ItemView",
      component: ItemView
    },
    {
      path: "/ItemEdit/:itemId",
      name: "ItemEdit",
      component: ItemEdit
    },
    {
      path: "/ItemNew",
      name: "ItemNew",
      component: ItemNew
    },
    {
      path: "/SearchUser",
      name: "SearchUser",
      component: SearchUser
    },
    {
      path: "/CourseQuery",
      name: "CourseQuery",
      component: CourseQuery
    },
    {
      path: "/CourseNew",
      name: "CourseNew",
      component: CourseNew
    },
    {
      path: "/CourseView/:courseId",
      name: "CourseView",
      component: CourseView
    },
    {
      path: "/CourseEdit/:courseId",
      name: "CourseEdit",
      component: CourseEdit
    },
    {
      path: "/ChartJs",
      name: "ChartJs",
      component: ChartJs
    },
    {
      path: "/ViewLineChart",
      name: "ViewLineChart",
      component: ViewLineChart
    },
    {
      path: "/RestCustomer",
      name: "RestCustomer",
      component: RestCustomer
    },
    {
      path: "/RestDownload",
      name: "RestDownload",
      component: RestDownload
    },
    {
      path: "/RestUpload",
      name: "RestUpload",
      component: RestUpload
    },
    {
      path: "/RestMultiUpload",
      name: "RestMultiUpload",
      component: RestMultiUpload
    },
    {
      path: "/CreateSampleForm",
      name: "CreateSampleForm",
      component: CreateSampleForm
    },
    {
      path: "/QuerySampleForm",
      name: "QuerySampleForm",
      component: QuerySampleForm
    },
    {
      path: "/WorkItemList",
      name: "WorkItemList",
      component: WorkItemList
    },
    {
      path: "/Admin/Bulletin",
      name: "AdminBulletin",
      component: AdminBulletin
    },
    {
      path: "/BulletinView/:bulletinId",
      name: "BulletinView",
      component: BulletinView
    },
    {
      path: "/BulletinEdit/:bulletinId",
      name: "BulletinEdit",
      component: BulletinEdit
    }
  ];