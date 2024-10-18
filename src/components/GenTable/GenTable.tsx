import React, { useEffect, useState } from 'react';
import { Input, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { KeyItem } from '../../types/Items';
import { EGenTable } from '../../shared/enums/table';

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
      const color = hash === 'sha1' ? 'red' : hash === 'sha256' ? 'green' : 'blue';
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

    useEffect(() => {
        const storedKeys = JSON.parse(localStorage.getItem('keys') || '[]');
        setKeys(storedKeys);
    }, []);

  return <Table<KeyItem> className='' columns={columns} dataSource={keys} pagination={{ pageSize: 9 }} />;
}

export default GenTable;
