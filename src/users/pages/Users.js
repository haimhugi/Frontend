import React, { useRef, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Highlighter from 'react-highlight-words';

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';


const Users = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [loadedUsers, setLoadedUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { sendRequest } = useHttpClient();




    useEffect(() => {
        setIsLoading(true);

        const sendRequest = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const responseData = await response.json();
                setLoadedUsers(responseData.users);
            } catch (err) {
                throw err;
            }
            setIsLoading(false);
        };
        sendRequest();
    }, []);

    const onRemove = async id => {
        try {
            await sendRequest(
                `http://localhost:5000/api/users/${id}`,
                'DELETE'
            );
        } catch (err) { }
        console.log('remove user with the id: ' + id);
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
                        <Button onClick={() => onRemove(record._id)} style={{ fontSize: '16px', background: '#ff4d4d', border: 'white' }} type="primary" shape="circle" icon={<DeleteOutlined />} />
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
    ]
    return <React.Fragment>
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        {!isLoading &&
            loadedUsers &&
            <Table rowKey={record => record.ID} columns={columns} dataSource={loadedUsers} />
        }
    </React.Fragment>


};

export default Users;