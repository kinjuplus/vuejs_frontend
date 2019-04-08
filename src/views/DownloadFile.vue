<template>
<div>
<MenuComponent/>
<div id="body" class="ui-layout-center">
	<div class="content" align="left">
       <h2><a href="/api/download/Link">{{$t('download.download')}}</a></h2>
       <h2><a href="/api/download/Link2">{{$t('download.download2')}}</a></h2>
	</div>
</div>
</div>
</template>
<script>

export default{
    name:'DownloadFile',
    mounted() {
    // let recaptchaScript = document.createElement('script')
    // recaptchaScript.setAttribute('src', 'biz-layout.js')
    // document.head.appendChild(recaptchaScript)
  }
}

</script>