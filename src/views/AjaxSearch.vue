<template>
<div>
<MenuComponent></MenuComponent>
<div id="body" class="ui-layout-center">
		<div class="content">
			<br />
			<div id="feedback"></div>
			<form class="form-horizontal" id="search-form">
				<div class="form-group form-group-lg">
					<label class="col-sm-2 control-label">User ID</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="userid" />
					</div>
				</div>

				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="submit" id="bth-search"
							class="btn btn-primary btn-lg">Search</button>
					</div>
				</div>
			</form>
	    </div>
</div>
</div>

</template>
<script>
export default{
    name:'AjaxSearch'
}

</script>
