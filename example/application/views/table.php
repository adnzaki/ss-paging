<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>SSPaging Example</title>
	<link rel="stylesheet" type="text/css" href="<?= base_url('public/css/bootstrap.min.css') ?>">
	<script src="<?= base_url('public/js/vue.js') ?>"></script>
	<style type="text/css">
	body {
		font-family: "Arial";
	}
	.cursor-pointer {
		cursor: pointer;
	}
	</style>
</head>
<body>

	<div class="container-fluid" id="app">
		<div class="row">
			<div class="col-sm-12 main">        
				<h2 class="sub-header">Data Karyawan</h2>
				<div class="row">
					<div class="col-sm-6">
						<label for="basicSelect">Tampilkan</label>
						<select v-model="rows" id="basicSelect" v-on:change="showPerPage">
							<option value="10">10 baris</option>
							<option value="25">25 baris</option>
							<option value="50">50 baris</option>
							<option value="100">100 baris</option>
							<option value="250">250 baris</option>
						</select>
					</div>
					<div class="col-sm-6">
						<div class="input-group mb-3">
							<input type="text" class="form-control" placeholder="Cari nama, umur, jabatan" 
							@keyup.enter="filter" v-model="search"
							aria-label="Cari karyawan" aria-describedby="basic-addon2">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" type="button" @click="filter">Cari</button>
							</div>
						</div>
					</div>	
				</div>
				<div class="table-responsive">
					<table class="table cursor-pointer">
						<thead class="thead-dark">
							<tr>
								<th scope="col">#</th>
								<th @click="sortData('nama')">Nama</th>
								<th @click="sortData('umur')">Umur</th>
								<th @click="sortData('jabatan')">Jabatan</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in data" :key="index">
								<td scope="row">{{ index + 1 }}</td>
								<td>{{ item.nama }}</td>
								<td>{{ item.umur }}</td>
								<td>{{ item.jabatan }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="row">
					<div class="col-sm-6">
						<br><p>{{ rowRange }}</p>
					</div>
					<div class="col-sm-6">
						<nav aria-label="Page navigation example">
							<ul class="pagination">
								<li v-bind:class="[linkClass]" @click="nav(first)">
									<a class="page-link" href="#" aria-label="Previous">
										<span aria-hidden="true">&laquo;</span>
										<span class="sr-only">Previous</span>
									</a>
								</li>
								<li v-bind:class="[linkClass]" @click="nav(prev)">
									<a class="page-link" href="#">Prev</a>
								</li>
								<li v-for="link in pageLinks" v-bind:class="[linkClass, activeLink(link)]" 
									v-if="numLinks" @click="nav((link - 1))">
									<a class="page-link" href="#">{{ link }}</a>
								</li>
								<li v-bind:class="[linkClass]" @click="nav(next)">
									<a class="page-link" href="#">Next</a>
								</li>
								<li v-bind:class="[linkClass]" @click="nav(last)">
									<a class="page-link" href="#" aria-label="Next">
										<span aria-hidden="true">&raquo;</span>
										<span class="sr-only">Next</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script>
		var baseUrl = "<?= base_url() ?>"
	</script>
	<script src="<?= base_url('public/js/ss-paging.js') ?>"></script>
	<script src="<?= base_url('public/js/app.js') ?>"></script>

</body>
</html>