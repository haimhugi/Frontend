import React, { useRef, useState } from 'react';
import 'antd/dist/antd.css';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip } from 'antd';

import Highlighter from 'react-highlight-words';




const USERS = [
    {
        Name: 'Mia Tremblay',
        Email: 'mia.tremblay@example.com',
        ID: '637011271',
        Phone: '+972506407314',
        IP: '29.53.136.109'
    },
    {
        Name: 'Naja Larsen',
        Email: 'naja.larsen@example.com',
        ID: '381393602',
        Phone: '+972544864314',
        IP: '192.219.255.118'
    },
    {
        Name: 'Mia Davies',
        Email: 'mia.davies@example.com',
        ID: '305970410',
        Phone: '+972549348293',
        IP: '254.12.52.38'
    },
    {
        Name: 'Anthony Fleming',
        Email: 'anthony.fleming@example.com',
        ID: '635922081',
        Phone: '+972527310869',
        IP: '146.229.76.244'
    },
]





const Users = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const onRemove = id => {

        console.log('remove user with the id: ' + id);
        //send req to database to delete use
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="">
                        <Button onClick={() => onRemove(record.ID)} style={{ fontSize: '16px', background: '#ff4d4d', border: 'white' }} type="primary" shape="circle" icon={<DeleteOutlined />} />
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            width: '30%',
            ...getColumnSearchProps('Name'),
            sorter: (a, b) => a.Name < b.Name,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            ...getColumnSearchProps('ID'),
            sorter: (a, b) => parseInt(a.ID) - parseInt(b.ID),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Phone',
            dataIndex: 'Phone',
            key: 'Phone',
            ...getColumnSearchProps('Phone')
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            ...getColumnSearchProps('Email')

        },
        {
            title: 'IP',
            dataIndex: 'IP',
            key: 'IP',
            ...getColumnSearchProps('IP')

        }
    ];
    return <Table rowKey={record => record.ID} columns={columns} dataSource={USERS} />;


};

export default Users;