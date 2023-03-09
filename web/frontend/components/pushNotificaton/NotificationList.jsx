import React from 'react'
import { Space, Table, Tag } from 'antd';

function NotificationList() {
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date & Time',
      key: 'date_time',
      dataIndex: 'date_time',
      render: (_, { date_time }) => (
        <>
          {date_time.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      image: '',
      title: "Product",
      description: 'Shoes for sale',
      date_time: ['09/03/2023'],
    },
   
  ];
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default NotificationList