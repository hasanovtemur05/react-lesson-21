import { Table } from 'antd';

const GlobalTable = ({ columns, data, pagination, onChange }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={onChange}
    />
  );
};

export default GlobalTable;