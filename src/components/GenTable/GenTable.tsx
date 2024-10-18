import React, { useEffect, useState } from 'react';
import { Input, Table, Tag, Pagination } from 'antd';
import type { TableProps } from 'antd';
import { KeyItem } from '../../types/Items';
import { EGenTable, HashType } from '../../shared/enums/table';
import './GenTable.css';

const columns: TableProps<KeyItem>['columns'] = [
  {
    title: 'Name',
    dataIndex: EGenTable.NAME,
    key: EGenTable.NAME,
    render: (text) => <p>{text}</p>,
    width: 100
  },
  {
    title: 'Hash',
    dataIndex: EGenTable.HASH,
    key: EGenTable.HASH,
    render: (hash) => {
      const color = hash === HashType.SHA1 ? 'red' : hash === HashType.SHA256 ? 'green' : 'blue';
      return <Tag color={color}>{hash.toUpperCase()}</Tag>;
    },
    width: 50
  },
  {
    title: 'Public key',
    dataIndex: EGenTable.KEY,
    key: EGenTable.KEY,
    render: (key) => (
      <Input.TextArea
        value={key}
        autoSize={{ minRows: 1, maxRows: 4 }}
        readOnly
      />
    ),
  },
  {
    title: 'Private key',
    key: EGenTable.SEED,
    dataIndex: EGenTable.SEED,
    render: (seed) => {
      return (
        <Input
          value={seed.join(' ')}
          readOnly
          width={150}
        />
      );
    }
  },
];

const GenTable: React.FC = () => {
  const [keys, setKeys] = useState<KeyItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);

  useEffect(() => {
    const storedKeys = JSON.parse(localStorage.getItem('keys') || '[]');
    setKeys(storedKeys);
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = keys.slice(startIndex, endIndex);

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }
  };

  return (
    <Table<KeyItem>
      className='custom-table'
      columns={columns}
      dataSource={currentData}
      pagination={false}
      footer={() => (
        <div className='flex justify-between items-center'>
          <div>Total: {keys.length} key</div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={keys.length}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['5', '10', '15', '20']}
          />
        </div>
      )}
    />
  );
}

export default GenTable;
