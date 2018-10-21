<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Karyawan extends CI_Controller 
{
	public function __construct()
	{
		parent:: __construct();
		$this->load->model('Data');
	}

	public function index()
	{
		$this->load->view('table');
	}

	public function get($limit, $offset, $orderBy, $searchBy, $sort, $search = '')
	{
		echo json_encode([
			'container' => $this->Data->getQuery($limit, $offset, $orderBy, $searchBy, $sort, $search),
			'totalRows' => $this->Data->getRows($searchBy, $search)
		]);
	}
}
