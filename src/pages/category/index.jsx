import React, { useEffect, useState } from "react";
import { Button, Popconfirm } from "antd"; 
import { category } from "@service"; 
import { CategoryModal, GlobalTable } from "@components"; 
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 3,
  });

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
  };

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setParams((prev) => ({
      ...prev,
      limit: pageSize,
      page: current,
    }));
    fetchCategories();  
  };

  const fetchCategories = async () => {
    try {
      const res = await category.get();
      setData(res?.data?.data?.categories);
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
      fetchCategories();
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
      fetchCategories();
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setOpen(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      render: (_, record) => (
        <span>
          <Button
            onClick={() => handleEdit(record)}
            style={{ marginRight: "8px", backgroundColor: "#ffcc55" }}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger variant="solid" color="danger">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const total = data.length;

  return (
    <div>
      <CategoryModal 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit} 
        editingCategory={editingCategory} 
      />
      <Button type="primary" onClick={handleCreate} style={{marginBottom:"10px"}}>
        Create Category
      </Button>
      <GlobalTable
        columns={columns}
        data={data}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "7", "10", "12"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Index;