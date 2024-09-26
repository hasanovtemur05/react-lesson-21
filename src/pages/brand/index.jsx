import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { brand, category } from "@service"; 
import { BrandModal, GlobalTable } from "@components";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editingBrand, setEditingBrand] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setEditingBrand(null);
  };

  const fetchBrands = async () => {
    try {
      const res = await brand.get();
      setData(res?.data?.data?.brands);
    } catch (error) {
      console.log("Error fetching brands");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await category.get();
      setCategories(res?.data?.data?.categories); 
    } catch (error) {
      console.log("Error fetching categories");
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const handleSubmit = async (brandData) => {
    try {
      if (editingBrand) {
        await brand.update(editingBrand.id, brandData);
      } else {
        await brand.create(brandData);
      }
      fetchBrands();
      handleClose();
    } catch (error) {
      console.log("Error submitting brand:", error);
    }
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await brand.delete(id);
      fetchBrands();
    } catch (error) {
      console.log("Error deleting brand:", error);
    }
  };

  const handleCreate = () => {
    setEditingBrand(null);
    setOpen(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Category ID',
      dataIndex: 'category_id',
    },
    {
      title: 'file',
      dataIndex: 'file',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <span>
          <Button onClick={() => handleEdit(record)} variant="outlined" color="primary" style={{ marginRight: '8px' }}>
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} variant="outlined" color="secondary">
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <BrandModal 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit} 
        editingBrand={editingBrand} 
        categories={categories} 
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>Create Brand</Button>
      <GlobalTable columns={columns} data={data} />
    </div>
  );
};

export default Index;
