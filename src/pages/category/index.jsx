import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import { category } from "@service";
import { CategoryModal, GlobalTable } from "@components";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [editingCategory, setEditingCategory] = useState([]);
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

  const editItem = (item) => {
    setEditingCategory(item);
    setOpen(true);
  };

  const deleteItem = async (id) => {
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
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              onClick={() => editItem(record)}
              style={{ marginRight: "8px", backgroundColor: "#ffcc55" }}
              variant="solid"
              color="danger"
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteItem(record.id)}
          >
            <Tooltip title="Delete">
              <Button
                danger
                variant="solid"
                color="danger"
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
          </Space>
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
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: "10px" }}
      >
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
