import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { category } from "@service"; 
import { CategoryTable, CategoryModal } from "@components";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);  // Bu yerda data o'zgaruvchisi
  const [editingCategory, setEditingCategory] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  const fetchCategories = async () => {
    try {
      const res = await category.get();
      setData(res?.data?.data?.categories);  // categories ni data ga o'rnatish
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (categoryData) => {
    try {
      if (editingCategory) {
        await category.update(editingCategory.id, categoryData);
      } else {
        await category.create(categoryData);
      }
      fetchCategories();  // O'zgartirilganidan keyin kategoriyalar ro'yxatini yangilang
      handleClose();
    } catch (error) {
      console.log("Error submitting category:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await category.delete(id);
      fetchCategories();  // O'chirgandan keyin kategoriyalar ro'yxatini yangilang
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  return (
    <div>
      <CategoryModal 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit} 
        editingCategory={editingCategory} 
      />
      <Button variant="contained" color="primary" onClick={handleCreate}>Create Category</Button>
      <CategoryTable data={data} onEdit={handleEdit} onDelete={handleDelete} />  {/* data o'zgaruvchisi */}
    </div>
  );
};

export default Index;
