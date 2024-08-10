import React, { useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
// import DeleteElement from './components/DeleteElement';
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
import Sidebar from '../components/Sidebar';
import '../components/sidebar.css';
import NewElementGroup from './NewGroup';

let pageSize = 10;

const myQuery = {
    results: {
        resource: 'dataElementGroups',
        params: ({ page, sortField, sortDirection, searchQuery }) => ({
            pageSize,
            page,
            fields: ['id', 'displayName', 'lastUpdated'],
            order: `${sortField}:${sortDirection}`,
        }),
    },
};

const Overview = () => {
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
        if (selected.length === data.results.dataElementGroups.length) {
            setSelected([]);
        } else {
            setSelected(data.results.dataElementGroups.map((de) => de.id));
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
        <div>
            <Sidebar />
            <div className='search'>
                <div className='searching'>
                    <InputField
                        value={searchQuery}
                        onChange={handleSearch}
                        type="search"
                        placeholder="Search data element groups"
                    />
                </div>
            </div>
            <NewElementGroup refetch={refetch} />
            <div className='table-container'>
                <DataTable>
                    <TableHead width="48px">
                        <DataTableRow>
                            <DataTableColumnHeader>
                                <Checkbox
                                    checked={selected.length === data.results.dataElementGroups.length}
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
                            <DataTableColumnHeader>
                                Last Updated
                            </DataTableColumnHeader>
                            <DataTableColumnHeader>
                                <IconSettings24 />
                            </DataTableColumnHeader>
                        </DataTableRow>
                    </TableHead>
                    <TableBody>
                        {data.results.dataElementGroups.map((dataElementGroup) => (
                            <DataTableRow key={dataElementGroup.id}>
                                <DataTableCell>
                                    <Checkbox
                                        checked={selected.includes(dataElementGroup.id)}
                                        onChange={() => toggleSelected(dataElementGroup.id)}
                                        value={dataElementGroup.id}
                                    />
                                </DataTableCell>
                                <DataTableCell>{dataElementGroup.displayName}</DataTableCell>
                                <DataTableCell>{dataElementGroup.lastUpdated}</DataTableCell>
                                <DataTableCell>
                                    <Link to={`/edit/${dataElementGroup.id}`}>
                                        <IconEdit24 />
                                    </Link>
                                    {/* <IconDelete24 end />
                                    <DeleteElement id={dataElementGroup.id} refetch={refetch} /> */}
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

export default Overview;
