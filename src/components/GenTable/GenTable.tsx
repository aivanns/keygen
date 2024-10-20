import React, { useEffect, useState } from 'react';
import { Input, Table, Tag, Pagination, notification } from 'antd';
import { TableProps, Select, Space } from 'antd';
import { KeyItem } from '../../types/Items';
import { EGenTable, HashType } from '../../shared/enums/table';
import './GenTable.css';
import DefaultButton from '../Button/DefaultButton';
import exportKeysToClipboard from '../../utils/export';
import type { SelectProps } from 'antd';

const options: SelectProps<KeyItem>['options'] = [
  {
    value: EGenTable.NAME,
    label: 'Key name'
  },
  {
    value: EGenTable.HASH,
    label: 'Hash'
  },
  {
    value: EGenTable.KEY,
    label: 'Public key'
  },
  {
    value: EGenTable.SEED,
    label: 'Private key'
  }
];

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
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedOptions, setSelectedOptions] = useState<EGenTable[]>([EGenTable.NAME, EGenTable.HASH, EGenTable.SEED, EGenTable.KEY]);
  const [api, contextHolder] = notification.useNotification();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = keys.slice(startIndex, endIndex);

  const openNotification = (msg: string, description: string) => {
    api.open({
      message: msg,
      description: description,
      showProgress: true,
    });
  };

  const handleExportKeys = async () => {
    try {
      await exportKeysToClipboard(selectedOptions);
      openNotification('Success!', 'Copied to clipboard');
    } catch (err) {
      openNotification('Error!', 'Failed to copy to clipboard');
    }
  }

  const handleSelectedOptions = (value: EGenTable[]) => {
    setSelectedOptions(value);
  }

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }
  };

  useEffect(() => {
    const storedKeys = JSON.parse(localStorage.getItem('keys') || '[]');
    setKeys(storedKeys);
  }, []);

  return (
    <>
      {contextHolder}
      <Table<KeyItem>
        className='custom-table'
      columns={columns}
      dataSource={currentData}
      pagination={false}
      footer={() => (
        <div className='flex justify-between items-center'>
          <div className='flex justify-between items-center'>
            <Space style={{ minWidth: '90%' }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ minWidth: '90%' }}
                placeholder="Export data"
                onChange={handleSelectedOptions}
                defaultValue={[EGenTable.NAME, EGenTable.HASH, EGenTable.SEED, EGenTable.KEY]}
                options={options}
              />
            </Space>
            <DefaultButton text='Export keys' onClick={handleExportKeys} options={selectedOptions}/>
          </div>
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
    </>
  );
}

export default GenTable;
