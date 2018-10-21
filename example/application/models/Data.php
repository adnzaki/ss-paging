<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Data extends CI_Model
{
    public function getQuery($limit, $offset, $orderBy = 'nama', $searchBy = 'nama', $sort = 'ASC', $search = '') 
    {
        $this->search($searchBy, $search);
        $this->db->order_by($orderBy, $sort)->limit($limit, $offset);
        return $this->db->get('karyawan')->result();
    }

    public function getRows($searchBy, $search = '')
    {
        $this->search($searchBy, $search);
        return $this->db->get('karyawan')->num_rows();
    }

    private function search($searchBy, $search)
    {
        if(! empty($search))
        {
            // Menampung parameter pencarian "nama-umur-jabatan",
            // sehingga parameter bisa berdasarkan field nama, umur dan jabatan.
            // Kode ini tidak berkaitan dengan plugin SSPaging yang hanya mendukung 1 parameter pencarian
            if(strpos($searchBy, '-') !== false)
            {
                $searchBy = explode('-', $searchBy);
                $this->db->like($searchBy[0], $search); 
                $this->db->or_like($searchBy[1], $search); 
                $this->db->or_like($searchBy[2], $search); 
            }
            else 
            {
                $this->db->like($searchBy, $search); // cari berdasarkan satu parameter saja
            }
        }
    }
}