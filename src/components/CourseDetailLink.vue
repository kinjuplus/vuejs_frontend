<template>
<div>
<a style="color:blue;cursor:pointer"  @click="courseView">{{$t('item.viewDetail')}}</a>&nbsp;
<a  style="color:blue;cursor:pointer" @click="courseEdit" >{{$t('item.editDetail')}}</a>
</div>
</template>
<script>
export default{
    name:'CourseDetailLink',
    props:['row'],
    methods:{
        courseView(){
             this.$router.push({ path: `/courseView/${this.row.id}` }); 
        },
        courseEdit(){
             this.$router.push({ path: `/courseEdit/${this.row.id}` }); 
        }
    }
}
</script>