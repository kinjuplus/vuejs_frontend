<template>
<div>
<a :href="'/itemView/'+this.row.id">{{$t('item.viewDetail')}}</a>&nbsp;
<a :href="'/itemEdit/'+this.row.id">{{$t('item.editDetail')}}</a>
</div>
</template>
<script>
export default{
    name:'itemDetailLink',
    props:['row']
}
</script>