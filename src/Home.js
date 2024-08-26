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
    Button,
    IconMore24,
    Popper,
    MenuItem,
    Menu,
    IconDuplicate24,
    IconShare24,
    // Select,   
    // Option
} from '@dhis2/ui';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './components/sidebar.css';

let pageSize = 20;

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
    // const [page, setPage] = useState(1);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selected, setSelected] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('displayName');
    const [sortDirection, setSortDirection] = useState('asc');
    const [dataElementSearch, setDataElementSearch] = useState('');
    const [domainTypeSearch, setDomainTypeSearch] = useState('');
    const [valueTypeSearch, setValueTypeSearch] = useState('');
    const [dataSetSearch, setDataSetSearch] = useState('');
    const [categoryComboSearch, setCategoryComboSearch] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    // const navigate = useNavigate();
    const onChange = DeleteElement;
    

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

    // const handleSearch = (event) => {
    //     setSearchQuery(event.value);
    //     setPage(1);
    //     refetch({ page: 1, searchQuery: event.value, sortField, sortDirection });
    // };
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleDelete = async () => {
        try {
            await mutate({ id })
            alert('Data Element deleted successfully!')
            refetch()
        } catch (err) {
            console.error('Error deleting data element:', err)
        }
    }

    // const handlePageSizeChange = (event) => {
    //     const newPageSize = parseInt(event.selected);
    //     setPageSize(newPageSize);
    //     setPage(1); // Reset to first page
    //     refetch({ page: 1, pageSize: newPageSize, sortField, sortDirection, searchQuery });
    // };

    return (
        <div className='main-content'>
            <Sidebar />
            <div className='search'>
            <div className='searching'>
             <InputField
                value={dataElementSearch}
                onChange={handleInputChange(setDataElementSearch)}
                // onChange={(e) => setDataElementSearch(e.target.value)}
                type="search"
                placeholder="Search data elements"
            />
            <InputField
                value={domainTypeSearch}
                onChange={(e) => setDomainTypeSearch(e.target.value)}
                type="search"
                placeholder="Domain Type"
            />
            <InputField
                value={valueTypeSearch}
                onChange={(e) => setValueTypeSearch(e.target.value)}
                type="search"
                placeholder="Value Type"
            />
            <InputField
                value={dataSetSearch}
                onChange={(e) => setDataElementSearch(e.target.value)}
                type="search"
                placeholder="Data Set"
            />
            <InputField
                value={categoryComboSearch}
                onChange={(e) => setCategoryComboSearch(e.target.value)}
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
                                {/* <Link to={`/edit/${dataElement.id}`}>
                                    <IconEdit24 />
                                </Link> */}
                                    {/* <IconMore24 /> */}
                                     {/* <DeleteElement id={dataElement.id} refetch={refetch} />  */}
                                    {/* <div>
                                        <Button onClick={handleDelete} disabled={loading}>
                                            <IconMore24 />
                                        </Button>
                                        {error && (
                                            <AlertBar permanent critical>
                                                Error: {error.message}
                                            </AlertBar>
                                        )}
                                    </div> */}

                                    <div>
                                    <Button icon={<IconMore24 />} onClick={toggleMenu} />
                                    {isMenuOpen && (
                                        <Popper placement="bottom-start" onClickOutside={() => setIsMenuOpen(false)}>
                                            <Menu>
                                                <MenuItem
                                                        icon={<IconEdit24 />}
                                                        label="Edit"
                                                        onClick={() => navigate(`/edit/${dataElement.id}`)}
                                                        

                                                    />
                                                <MenuItem
                                                    icon={<IconDuplicate24 />}
                                                    label="Clone"
                                                    onClick={() => alert('Do you want to copy the Element API path?')}
                                                />
                                                
                                                <MenuItem
                                                    icon={<IconShare24 />}
                                                    label="Sharing Settings"
                                                    onClick={() => alert('Sharing action triggered')}
                                                />
                                                <MenuItem
                                                    icon={<DeleteElement dataElementId={dataElement.id} onDelete={onChange} />}
                                                />
                                                <MenuItem
                                                    // icon={<IconDetails24 />}
                                                    label="Show details"
                                                    onClick={() => alert('Show Data Element details')}
                                                />
                                            </Menu>


                                        </Popper>
                                    )}
                                            </div>
                                                                
                        
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
