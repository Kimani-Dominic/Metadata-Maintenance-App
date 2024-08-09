import React, { useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import NewElement from './components/NewElement';
import DeleteElement from './components/DeleteElement';
import {
    DataTable,
    TableHead,
    TableBody,
    DataTableRow,
    DataTableCell,
    DataTableColumnHeader,
    Checkbox,
    IconSettings24,
    IconEdit24,
    IconDelete24,
    Pagination,
    CenteredContent,
    InputField,
    CircularLoader,
} from '@dhis2/ui';
import { Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/sidebar.css';

let pageSize = 10;

const myQuery = {
    results: {
        resource: 'dataElements',
        params: ({ page, sortField, sortDirection, searchQuery }) => ({
            pageSize,
            page,
            // filter: searchQuery ? `name:ilike:${searchQuery}` : '',
            fields: ['id', 'displayName', 'domainType', 'valueType', 'categoryCombo[name]', 'lastUpdated'],
            order: `${sortField}:${sortDirection}`,
        }),
    },
};

const Home = () => {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('displayName');
    const [sortDirection, setSortDirection] = useState('asc');
    const { loading, error, data, refetch } = useDataQuery(myQuery, {
        variables: { page, sortField, sortDirection, searchQuery },
    });

    if (error) {
        return <span>ERROR: {error.message}</span>;
    }
    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader aria-label="Large Loader" large />
            </CenteredContent>
        );
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
        refetch({ page: newPage, sortField, sortDirection, searchQuery });
    };

    const toggleSelected = (id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]
        );
    };

    const toggleAll = () => {
        if (selected.length === data.results.dataElements.length) {
            setSelected([]);
        } else {
            setSelected(data.results.dataElements.map((de) => de.id));
        }
    };

    const onSortIconClick = (field) => {
        const newSortDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(newSortDirection);
        refetch({ sortField: field, sortDirection: newSortDirection, searchQuery });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.value);
        setPage(1);
        refetch({ page: 1, searchQuery: event.value, sortField, sortDirection });
    };

    return (
        <div className='were'>
            <Sidebar />
            <div className='search'>
            <div className='searching'>
            <InputField
                value={searchQuery}
                onChange={handleSearch}
                type="search"
                placeholder="Search data elements"
            />
            <InputField
                value={searchQuery}
                onChange={handleSearch}
                type="search"
                placeholder="Domain Type"
            />
            <InputField
                value={searchQuery}
                onChange={handleSearch}
                type="search"
                placeholder="Value Type"
            />
            <InputField
                value={searchQuery}
                onChange={handleSearch}
                type="search"
                placeholder="Data Set"
            />
            <InputField
                value={searchQuery}
                onChange={handleSearch}
                type="search"
                placeholder="Category combo"
            />
            </div>
            </div>
            <NewElement refetch={refetch} />
            <div className='table-container'>
            <DataTable>
                <TableHead width="48px">
                    <DataTableRow>
                        <DataTableColumnHeader>
                            <Checkbox
                                checked={selected.length === data.results.dataElements.length}
                                onChange={toggleAll}
                            />
                        </DataTableColumnHeader>
                        <DataTableColumnHeader
                            name="displayName"
                            onSortIconClick={() => onSortIconClick('displayName')}
                            sortDirection={sortField === 'displayName' ? sortDirection : 'default'}
                            sortIconTitle="Sort by displayName"
                        >
                            Name
                        </DataTableColumnHeader>
                        <DataTableColumnHeader
                            name="domainType"
                            onSortIconClick={() => onSortIconClick('domainType')}
                            sortDirection={sortField === 'domainType' ? sortDirection : 'default'}
                            sortIconTitle="Sort by domainType"
                        >
                            Domain Type
                        </DataTableColumnHeader>
                        <DataTableColumnHeader
                            name="valueType"
                            onSortIconClick={() => onSortIconClick('valueType')}
                            sortDirection={sortField === 'valueType' ? sortDirection : 'default'}
                            sortIconTitle="Sort by valueType"
                        >
                            Value Type
                        </DataTableColumnHeader>
                        <DataTableColumnHeader
                            name="categoryCombo"
                            onSortIconClick={() => onSortIconClick('categoryCombo')}
                            sortDirection={sortField === 'categoryCombo' ? sortDirection : 'default'}
                            sortIconTitle="Sort by categoryCombo"
                        >
                            Category Combo
                        </DataTableColumnHeader>
                        <DataTableColumnHeader>
                            <IconSettings24 />
                        </DataTableColumnHeader>
                    </DataTableRow>
                </TableHead>
                <TableBody>
                    {data.results.dataElements.map((dataElement) => (
                        <DataTableRow key={dataElement.id}>
                            <DataTableCell>
                                <Checkbox
                                    checked={selected.includes(dataElement.id)}
                                    onChange={() => toggleSelected(dataElement.id)}
                                    value={dataElement.id}
                                />
                            </DataTableCell>
                            <DataTableCell>{dataElement.displayName}</DataTableCell>
                            <DataTableCell>{dataElement.domainType}</DataTableCell>
                            <DataTableCell>{dataElement.valueType}</DataTableCell>
                            <DataTableCell>{dataElement.categoryCombo.name}</DataTableCell>
                            <DataTableCell>{dataElement.lastUpdated}</DataTableCell>
                            <DataTableCell>
                                <Link to={`/edit/${dataElement.id}`}>
                                    <IconEdit24 />
                                </Link>
                                {/* <Link to={'/delete/${dataElement.id}'}> */}
                                {/* <DeleteElement id={dataElement.id} refetch={refetch}> */}
                                    <IconDelete24 end/>
                                    <DeleteElement id={dataElement.id} refetch={refetch}/>
                                   
                                {/* </DeleteElement> */}
                                {/* </Link> */}
                            </DataTableCell>
                        </DataTableRow>
                    ))}
                </TableBody>
            </DataTable>
            </div>
            <Pagination
                page={page}
                pageCount={Math.ceil(data.results.pager.total / pageSize)}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                className="pagination"
            />
        </div>
    );
};

export default Home;
